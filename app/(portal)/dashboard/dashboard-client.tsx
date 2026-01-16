'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Clock,
  TrendingUp,
  AlertTriangle,
  Download,
  ChevronRight,
  Target,
  Users,
  Shield,
  Calendar,
  Building2,
  Wrench,
  Handshake,
  Briefcase,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile } from '@/lib/supabase/types';

// Import seed data for demo
import tendersData from '@/scripts/seed/tenders.json';
import leadsData from '@/scripts/seed/leads.json';
import complianceData from '@/scripts/seed/compliance_docs.json';

interface DashboardClientProps {
  user: Profile;
}

// Type definitions for seed data
interface Tender {
  id: string;
  title: string;
  buyer: string;
  status: string;
  deadline_at: string;
  estimated_value: number;
  match_score: number;
}

interface Lead {
  id: string;
  lead_type: string;
  status: string;
  organisation: string;
  contact_name: string;
}

interface ComplianceDoc {
  id: string;
  name: string;
  doc_type: string;
  valid_to: string;
}

const tenders: Tender[] = tendersData as Tender[];
const leads: Lead[] = leadsData as Lead[];
const complianceDocs: ComplianceDoc[] = complianceData as ComplianceDoc[];

// Calculate tender pipeline counts
function getTenderPipelineCounts() {
  const counts: Record<string, number> = {
    new: 0,
    analyzing: 0,
    go: 0,
    no_go: 0,
    in_preparation: 0,
    submitted: 0,
    won: 0,
    lost: 0,
  };
  tenders.forEach((t) => {
    counts[t.status] = (counts[t.status] || 0) + 1;
  });
  return counts;
}

// Calculate lead pipeline counts by type
function getLeadPipelineCounts() {
  const counts: Record<string, { total: number; new: number }> = {
    project: { total: 0, new: 0 },
    facility: { total: 0, new: 0 },
    partner: { total: 0, new: 0 },
    procurement: { total: 0, new: 0 },
    contact: { total: 0, new: 0 },
  };
  leads.forEach((l) => {
    if (counts[l.lead_type]) {
      counts[l.lead_type].total++;
      if (l.status === 'new') {
        counts[l.lead_type].new++;
      }
    }
  });
  return counts;
}

// Calculate expiry radar
function getExpiryRadar() {
  const now = new Date();
  const docs30: ComplianceDoc[] = [];
  const docs60: ComplianceDoc[] = [];
  const docs90: ComplianceDoc[] = [];

  complianceDocs.forEach((doc) => {
    const expiryDate = new Date(doc.valid_to);
    const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil <= 30 && daysUntil > 0) {
      docs30.push(doc);
    } else if (daysUntil <= 60 && daysUntil > 30) {
      docs60.push(doc);
    } else if (daysUntil <= 90 && daysUntil > 60) {
      docs90.push(doc);
    }
  });

  return { docs30, docs60, docs90 };
}

// Get upcoming deadlines
function getUpcomingDeadlines() {
  const now = new Date();
  return tenders
    .filter((t) => t.deadline_at && ['new', 'analyzing', 'go', 'in_preparation'].includes(t.status))
    .map((t) => {
      const deadline = new Date(t.deadline_at);
      const daysUntil = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return { ...t, daysUntil };
    })
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 5);
}

// Get new/actionable items
function getAlerts() {
  const alerts: { type: 'warning' | 'info' | 'success'; message: string; link?: string }[] = [];

  // New leads
  const newLeads = leads.filter((l) => l.status === 'new').length;
  if (newLeads > 0) {
    alerts.push({
      type: 'info',
      message: `${newLeads} nieuwe lead${newLeads > 1 ? 's' : ''} wachtend op opvolging`,
      link: '/dashboard/leads',
    });
  }

  // Tenders needing decision
  const analyzing = tenders.filter((t) => t.status === 'analyzing').length;
  if (analyzing > 0) {
    alerts.push({
      type: 'warning',
      message: `${analyzing} tender${analyzing > 1 ? 's' : ''} wachtend op go/no-go beslissing`,
      link: '/dashboard/tenders',
    });
  }

  // Expiring documents
  const { docs30 } = getExpiryRadar();
  if (docs30.length > 0) {
    alerts.push({
      type: 'warning',
      message: `${docs30.length} document${docs30.length > 1 ? 'en' : ''} verloopt binnen 30 dagen`,
      link: '/dashboard/compliance',
    });
  }

  // Won tender celebration
  const won = tenders.filter((t) => t.status === 'won').length;
  if (won > 0) {
    alerts.push({
      type: 'success',
      message: `${won} gewonnen tender${won > 1 ? 's' : ''} deze periode`,
    });
  }

  return alerts;
}

const roleLabels: Record<string, string> = {
  DIRECTIE: 'Directie',
  SALES: 'Sales',
  HR: 'HR',
  OPERATIONS: 'Operations',
  ADMIN: 'Administrator',
  VIEWER: 'Viewer',
};

const tenderStageLabels: Record<string, string> = {
  new: 'Nieuw',
  analyzing: 'Analyse',
  go: 'Go',
  in_preparation: 'Voorbereiding',
  submitted: 'Ingediend',
  won: 'Gewonnen',
  lost: 'Verloren',
};

const leadTypeIcons: Record<string, React.ElementType> = {
  project: Building2,
  facility: Wrench,
  partner: Handshake,
  procurement: FileText,
  contact: Users,
};

const leadTypeLabels: Record<string, string> = {
  project: 'Project',
  facility: 'Facility',
  partner: 'Partner',
  procurement: 'Procurement',
  contact: 'Contact',
};

export function DashboardClient({ user }: DashboardClientProps) {
  const [isExporting, setIsExporting] = useState(false);
  const displayName = user.full_name || user.email.split('@')[0];
  const firstName = displayName.split(' ')[0];

  const tenderCounts = getTenderPipelineCounts();
  const leadCounts = getLeadPipelineCounts();
  const expiryRadar = getExpiryRadar();
  const deadlines = getUpcomingDeadlines();
  const alerts = getAlerts();

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export - in production this would generate a real PDF/CSV
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('[EXPORT] Board pack export triggered', {
      timestamp: new Date().toISOString(),
      user: user.email,
      data: {
        tenderCounts,
        leadCounts,
        expiryRadar: {
          critical: expiryRadar.docs30.length,
          warning: expiryRadar.docs60.length,
          upcoming: expiryRadar.docs90.length,
        },
      },
    });
    alert('Board pack export gestart. In productie wordt dit een PDF/CSV download.');
    setIsExporting(false);
  };

  // Calculate key metrics
  const totalTenderValue = tenders
    .filter((t) => ['go', 'in_preparation', 'submitted'].includes(t.status))
    .reduce((sum, t) => sum + (t.estimated_value || 0), 0);

  const winRate = tenders.length > 0
    ? Math.round((tenderCounts.won / (tenderCounts.won + tenderCounts.lost || 1)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Directie Cockpit"
          userName={displayName}
          userRole={roleLabels[user.role] || user.role}
        />

        <main className="p-6">
          {/* Welcome + Export */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-start justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-[#0C0C0C]">
                Goedemorgen, {firstName}
              </h2>
              <p className="mt-1 text-[#6B6560]">
                Overzicht van de huidige bedrijfssituatie
              </p>
            </div>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 bg-[#0C0C0C] text-white px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[#9A6B4C] disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Exporteren...' : 'Board Pack Export'}
            </button>
          </motion.div>

          {/* Alerts Section */}
          {alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 space-y-2"
            >
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 border-l-4 ${
                    alert.type === 'warning'
                      ? 'bg-amber-50 border-amber-500'
                      : alert.type === 'success'
                      ? 'bg-green-50 border-green-500'
                      : 'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle
                      className={`w-5 h-5 ${
                        alert.type === 'warning'
                          ? 'text-amber-600'
                          : alert.type === 'success'
                          ? 'text-green-600'
                          : 'text-blue-600'
                      }`}
                    />
                    <span className="text-sm font-medium text-[#0C0C0C]">
                      {alert.message}
                    </span>
                  </div>
                  {alert.link && (
                    <a
                      href={alert.link}
                      className="text-sm text-[#9A6B4C] hover:underline flex items-center gap-1"
                    >
                      Bekijken <ChevronRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* Key Metrics */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 border border-[#0C0C0C]/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C]">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-[#6B6560]">Actieve Tenders</p>
                  <p className="text-2xl font-bold text-[#0C0C0C]">
                    {tenderCounts.go + tenderCounts.in_preparation + tenderCounts.submitted}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white p-6 border border-[#0C0C0C]/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C]">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-[#6B6560]">Pipeline Waarde</p>
                  <p className="text-2xl font-bold text-[#0C0C0C]">
                    €{(totalTenderValue / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 border border-[#0C0C0C]/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C]">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-[#6B6560]">Nieuwe Leads</p>
                  <p className="text-2xl font-bold text-[#0C0C0C]">
                    {leads.filter((l) => l.status === 'new').length}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white p-6 border border-[#0C0C0C]/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-[#9A6B4C]/10 text-[#9A6B4C]">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-[#6B6560]">Win Rate</p>
                  <p className="text-2xl font-bold text-[#0C0C0C]">{winRate}%</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Tender Pipeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-[#0C0C0C]/5"
            >
              <div className="p-6 border-b border-[#0C0C0C]/5 flex items-center justify-between">
                <h3 className="font-semibold text-[#0C0C0C]">Tender Pipeline</h3>
                <a
                  href="/dashboard/tenders"
                  className="text-sm text-[#9A6B4C] hover:underline"
                >
                  Alle tenders →
                </a>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {['new', 'analyzing', 'go', 'in_preparation', 'submitted', 'won'].map((stage) => (
                    <div key={stage} className="flex items-center justify-between">
                      <span className="text-sm text-[#6B6560]">{tenderStageLabels[stage]}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-[#0C0C0C]/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              stage === 'won'
                                ? 'bg-green-500'
                                : stage === 'analyzing'
                                ? 'bg-amber-500'
                                : 'bg-[#9A6B4C]'
                            }`}
                            style={{
                              width: `${(tenderCounts[stage] / tenders.length) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-[#0C0C0C] w-6 text-right">
                          {tenderCounts[stage]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Lead Pipeline by Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white border border-[#0C0C0C]/5"
            >
              <div className="p-6 border-b border-[#0C0C0C]/5 flex items-center justify-between">
                <h3 className="font-semibold text-[#0C0C0C]">Lead Pipeline</h3>
                <a
                  href="/dashboard/leads"
                  className="text-sm text-[#9A6B4C] hover:underline"
                >
                  Alle leads →
                </a>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(leadCounts).map(([type, counts]) => {
                    const Icon = leadTypeIcons[type] || Users;
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[#9A6B4C]" />
                          <span className="text-sm text-[#6B6560]">{leadTypeLabels[type]}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-[#0C0C0C]">{counts.total} totaal</span>
                          {counts.new > 0 && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              {counts.new} nieuw
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Expiry Radar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-[#0C0C0C]/5"
            >
              <div className="p-6 border-b border-[#0C0C0C]/5 flex items-center justify-between">
                <h3 className="font-semibold text-[#0C0C0C]">Expiry Radar</h3>
                <a
                  href="/dashboard/compliance"
                  className="text-sm text-[#9A6B4C] hover:underline"
                >
                  Alle documenten →
                </a>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-red-50 border border-red-200">
                    <Shield className="w-6 h-6 text-red-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-600">{expiryRadar.docs30.length}</p>
                    <p className="text-xs text-red-500">30 dagen</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 border border-amber-200">
                    <Clock className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-amber-600">{expiryRadar.docs60.length}</p>
                    <p className="text-xs text-amber-500">60 dagen</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 border border-green-200">
                    <Calendar className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">{expiryRadar.docs90.length}</p>
                    <p className="text-xs text-green-500">90 dagen</p>
                  </div>
                </div>

                {expiryRadar.docs30.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#0C0C0C]/5">
                    <p className="text-xs font-medium text-red-600 mb-2">Kritiek (30 dagen):</p>
                    {expiryRadar.docs30.map((doc) => (
                      <p key={doc.id} className="text-sm text-[#6B6560]">
                        • {doc.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-white border border-[#0C0C0C]/5"
            >
              <div className="p-6 border-b border-[#0C0C0C]/5">
                <h3 className="font-semibold text-[#0C0C0C]">Komende Deadlines</h3>
              </div>
              <div className="divide-y divide-[#0C0C0C]/5">
                {deadlines.length === 0 ? (
                  <p className="p-6 text-sm text-[#6B6560]">Geen deadlines komende periode</p>
                ) : (
                  deadlines.map((tender) => (
                    <div key={tender.id} className="p-4 hover:bg-[#FAF7F2]">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#0C0C0C] truncate">
                            {tender.title}
                          </p>
                          <p className="text-xs text-[#6B6560]">{tender.buyer}</p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            tender.daysUntil <= 7
                              ? 'bg-red-100 text-red-700'
                              : tender.daysUntil <= 14
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {tender.daysUntil}d
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
