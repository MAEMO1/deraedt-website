import { NextResponse } from 'next/server';
import { generateBoardPackPDF } from '@/lib/pdf/board-pack';
import { getExpiryRadar, getLeads, getTenders, getJobApplications } from '@/lib/supabase/queries';
import type { ComplianceDoc } from '@/lib/supabase/types';

// Helper to calculate days remaining
function calculateDaysRemaining(validTo: string): number {
  const today = new Date();
  const expiry = new Date(validTo);
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export async function POST() {
  try {
    // Fetch all required data
    const [expiryRadar, leads, tenders, applications] = await Promise.all([
      getExpiryRadar(),
      getLeads(),
      getTenders(),
      getJobApplications(),
    ]);

    // Calculate KPIs
    const openTenders = tenders.filter((t) => ['new', 'analyzing', 'go', 'in_preparation'].includes(t.status)).length;
    const activePipelineValue = tenders
      .filter((t) => t.status === 'go' || t.status === 'in_preparation')
      .reduce((sum, t) => sum + (t.estimated_value || 0), 0);
    const newLeads = leads.filter((l) => l.status === 'new').length;
    const pendingApplications = applications.filter((a) => a.status === 'new' || a.status === 'screening').length;

    // Format pipeline value
    const formatValue = (value: number): string => {
      if (value >= 1000000) {
        return `€${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `€${(value / 1000).toFixed(0)}K`;
      }
      return `€${value}`;
    };

    // Calculate tender pipeline stages
    const tenderStages = [
      { label: 'Nieuw', status: 'new', color: '#9CA3AF' },
      { label: 'Analyseren', status: 'analyzing', color: '#F59E0B' },
      { label: 'Go', status: 'go', color: '#10B981' },
      { label: 'Voorbereiding', status: 'in_preparation', color: '#3B82F6' },
      { label: 'Ingediend', status: 'submitted', color: '#8B5CF6' },
    ];

    const tenderPipeline = tenderStages.map((stage) => ({
      label: stage.label,
      count: tenders.filter((t) => t.status === stage.status).length,
      color: stage.color,
    })).filter((item) => item.count > 0);

    // Calculate lead pipeline stages
    const leadStages = [
      { label: 'Nieuw', status: 'new', color: '#9CA3AF' },
      { label: 'Contact', status: 'contacted', color: '#F59E0B' },
      { label: 'Gekwalificeerd', status: 'qualified', color: '#10B981' },
      { label: 'Offerte', status: 'proposal', color: '#3B82F6' },
    ];

    const leadPipeline = leadStages.map((stage) => ({
      label: stage.label,
      count: leads.filter((l) => l.status === stage.status).length,
      color: stage.color,
    })).filter((item) => item.count > 0);

    // Flatten expiry radar and format
    const allExpiringDocs: ComplianceDoc[] = [
      ...expiryRadar.expired,
      ...expiryRadar.within30,
      ...expiryRadar.within60,
      ...expiryRadar.within90,
    ];

    const expiryItems = allExpiringDocs.map((doc) => ({
      name: doc.name,
      type: doc.doc_type,
      expiresAt: doc.valid_to,
      daysRemaining: calculateDaysRemaining(doc.valid_to),
    })).sort((a, b) => a.daysRemaining - b.daysRemaining);

    // Generate alerts
    const alerts: Array<{ type: 'info' | 'warning' | 'urgent'; message: string; timestamp: string }> = [];

    // New leads alert
    if (newLeads > 0) {
      alerts.push({
        type: 'info',
        message: `${newLeads} nieuwe leads wachten op opvolging`,
        timestamp: new Date().toISOString(),
      });
    }

    // Expiring docs alerts
    const urgentDocs = [...expiryRadar.expired, ...expiryRadar.within30];
    if (urgentDocs.length > 0) {
      alerts.push({
        type: 'urgent',
        message: `${urgentDocs.length} documenten vervallen binnen 30 dagen`,
        timestamp: new Date().toISOString(),
      });
    }

    // Tenders in analysis
    const analyzingTenders = tenders.filter((t) => t.status === 'analyzing');
    if (analyzingTenders.length > 0) {
      alerts.push({
        type: 'warning',
        message: `${analyzingTenders.length} tenders wachten op go/no-go beslissing`,
        timestamp: new Date().toISOString(),
      });
    }

    // Upcoming deadlines
    const upcomingDeadlines = tenders.filter((t) => {
      if (!t.deadline_at) return false;
      const daysUntil = Math.ceil((new Date(t.deadline_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      return daysUntil > 0 && daysUntil <= 7 && ['go', 'in_preparation'].includes(t.status);
    });

    if (upcomingDeadlines.length > 0) {
      upcomingDeadlines.forEach((tender) => {
        alerts.push({
          type: 'urgent',
          message: `Deadline nadert: ${tender.title}`,
          timestamp: tender.deadline_at || new Date().toISOString(),
        });
      });
    }

    // Build PDF data
    const pdfData = {
      generatedAt: new Date().toISOString(),
      kpis: {
        openTenders,
        activePipeline: formatValue(activePipelineValue),
        newLeads,
        pendingApplications,
      },
      tenderPipeline,
      leadPipeline,
      expiryRadar: expiryItems,
      alerts,
    };

    // Generate PDF
    const pdfBuffer = generateBoardPackPDF(pdfData);

    // Log export action
    console.log('[EXPORT] Board Pack PDF generated at', new Date().toISOString());

    // Return PDF as download
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="board-pack-${new Date().toISOString().split('T')[0]}.pdf"`,
      },
    });
  } catch (error) {
    console.error('[EXPORT] Board Pack generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate board pack' },
      { status: 500 }
    );
  }
}
