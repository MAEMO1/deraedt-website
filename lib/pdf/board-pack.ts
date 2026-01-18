/**
 * Board Pack PDF Generator
 *
 * Generates executive summary PDF for directie cockpit.
 * Contains: KPIs, tender pipeline, lead pipeline, expiry radar, alerts.
 */

import { jsPDF } from 'jspdf';

interface KPIData {
  openTenders: number;
  activePipeline: string;
  newLeads: number;
  pendingApplications: number;
}

interface PipelineItem {
  label: string;
  count: number;
  color?: string;
}

interface ExpiryItem {
  name: string;
  type: string;
  expiresAt: string;
  daysRemaining: number;
}

interface Alert {
  type: 'info' | 'warning' | 'urgent';
  message: string;
  timestamp: string;
}

interface BoardPackData {
  generatedAt: string;
  kpis: KPIData;
  tenderPipeline: PipelineItem[];
  leadPipeline: PipelineItem[];
  expiryRadar: ExpiryItem[];
  alerts: Alert[];
}

// Brand color constants (for reference, hardcoded below for efficiency)
// primary: #0C0C0C, secondary: #6B6560, accent: #9A6B4C

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('nl-BE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('nl-BE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateBoardPackPDF(data: BoardPackData): ArrayBuffer {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Helper function to add a new page if needed
  const checkNewPage = (requiredSpace: number) => {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (y + requiredSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // ===== HEADER =====
  doc.setFillColor(12, 12, 12); // #0C0C0C
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text('DE RAEDT', margin, 25);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Board Pack - Directie Overzicht', margin, 33);

  doc.setFontSize(8);
  doc.text(`Gegenereerd: ${formatDateTime(data.generatedAt)}`, pageWidth - margin, 33, { align: 'right' });

  y = 55;

  // ===== KPI TILES =====
  doc.setTextColor(12, 12, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Kerncijfers', margin, y);
  y += 8;

  const kpiBoxWidth = (contentWidth - 15) / 4;
  const kpiBoxHeight = 25;

  const kpis = [
    { label: 'Open Tenders', value: data.kpis.openTenders.toString() },
    { label: 'Pipeline Waarde', value: data.kpis.activePipeline },
    { label: 'Nieuwe Leads', value: data.kpis.newLeads.toString() },
    { label: 'Sollicitaties', value: data.kpis.pendingApplications.toString() },
  ];

  kpis.forEach((kpi, index) => {
    const x = margin + index * (kpiBoxWidth + 5);

    // KPI box background
    doc.setFillColor(250, 247, 242); // #FAF7F2
    doc.setDrawColor(229, 229, 229);
    doc.roundedRect(x, y, kpiBoxWidth, kpiBoxHeight, 2, 2, 'FD');

    // KPI value
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(12, 12, 12);
    doc.text(kpi.value, x + kpiBoxWidth / 2, y + 11, { align: 'center' });

    // KPI label
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(107, 101, 96); // #6B6560
    doc.text(kpi.label, x + kpiBoxWidth / 2, y + 19, { align: 'center' });
  });

  y += kpiBoxHeight + 15;

  // ===== TENDER PIPELINE =====
  checkNewPage(50);
  doc.setTextColor(12, 12, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Tender Pipeline', margin, y);
  y += 8;

  if (data.tenderPipeline.length > 0) {
    const totalTenders = data.tenderPipeline.reduce((sum, item) => sum + item.count, 0);
    let barX = margin;
    const barHeight = 8;

    data.tenderPipeline.forEach((item) => {
      const barWidth = (item.count / totalTenders) * contentWidth;
      if (barWidth > 0) {
        // Use color from item or default
        const color = item.color || '#9A6B4C';
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        doc.setFillColor(r, g, b);
        doc.rect(barX, y, barWidth, barHeight, 'F');
        barX += barWidth;
      }
    });

    y += barHeight + 5;

    // Legend
    doc.setFontSize(7);
    let legendX = margin;
    data.tenderPipeline.forEach((item) => {
      const color = item.color || '#9A6B4C';
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      doc.setFillColor(r, g, b);
      doc.rect(legendX, y, 4, 4, 'F');
      doc.setTextColor(107, 101, 96);
      doc.text(`${item.label} (${item.count})`, legendX + 6, y + 3);
      legendX += 35;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(107, 101, 96);
    doc.text('Geen tender data beschikbaar', margin, y);
  }

  y += 15;

  // ===== LEAD PIPELINE =====
  checkNewPage(50);
  doc.setTextColor(12, 12, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Lead Pipeline', margin, y);
  y += 8;

  if (data.leadPipeline.length > 0) {
    const totalLeads = data.leadPipeline.reduce((sum, item) => sum + item.count, 0);
    let barX = margin;
    const barHeight = 8;

    data.leadPipeline.forEach((item) => {
      const barWidth = (item.count / totalLeads) * contentWidth;
      if (barWidth > 0) {
        const color = item.color || '#204CE5';
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        doc.setFillColor(r, g, b);
        doc.rect(barX, y, barWidth, barHeight, 'F');
        barX += barWidth;
      }
    });

    y += barHeight + 5;

    // Legend
    doc.setFontSize(7);
    let legendX = margin;
    data.leadPipeline.forEach((item) => {
      const color = item.color || '#204CE5';
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      doc.setFillColor(r, g, b);
      doc.rect(legendX, y, 4, 4, 'F');
      doc.setTextColor(107, 101, 96);
      doc.text(`${item.label} (${item.count})`, legendX + 6, y + 3);
      legendX += 35;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(107, 101, 96);
    doc.text('Geen lead data beschikbaar', margin, y);
  }

  y += 20;

  // ===== EXPIRY RADAR =====
  checkNewPage(60);
  doc.setTextColor(12, 12, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Expiry Radar - Documenten', margin, y);
  y += 8;

  if (data.expiryRadar.length > 0) {
    doc.setFontSize(8);

    // Table header
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(12, 12, 12);
    doc.text('Document', margin + 2, y + 5);
    doc.text('Type', margin + 70, y + 5);
    doc.text('Vervalt', margin + 110, y + 5);
    doc.text('Dagen', margin + 145, y + 5);
    y += 7;

    // Table rows
    doc.setFont('helvetica', 'normal');
    data.expiryRadar.slice(0, 10).forEach((item) => {
      if (checkNewPage(8)) {
        y += 5;
      }

      // Row background for urgent items
      if (item.daysRemaining <= 30) {
        doc.setFillColor(254, 242, 242); // light red
        doc.rect(margin, y, contentWidth, 7, 'F');
      }

      doc.setTextColor(12, 12, 12);
      doc.text(item.name.substring(0, 35), margin + 2, y + 5);
      doc.text(item.type, margin + 70, y + 5);
      doc.text(formatDate(item.expiresAt), margin + 110, y + 5);

      // Color code days remaining
      if (item.daysRemaining <= 30) {
        doc.setTextColor(239, 68, 68); // red
      } else if (item.daysRemaining <= 60) {
        doc.setTextColor(245, 158, 11); // orange
      } else {
        doc.setTextColor(107, 101, 96);
      }
      doc.text(item.daysRemaining.toString(), margin + 145, y + 5);

      y += 7;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(107, 101, 96);
    doc.text('Geen documenten vervallen binnen 90 dagen', margin, y);
  }

  y += 15;

  // ===== ALERTS =====
  checkNewPage(40);
  doc.setTextColor(12, 12, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Recente Alerts', margin, y);
  y += 8;

  if (data.alerts.length > 0) {
    data.alerts.slice(0, 8).forEach((alert) => {
      if (checkNewPage(12)) {
        y += 5;
      }

      // Alert background based on type
      if (alert.type === 'urgent') {
        doc.setFillColor(254, 242, 242); // light red
      } else if (alert.type === 'warning') {
        doc.setFillColor(255, 251, 235); // light yellow
      } else {
        doc.setFillColor(240, 249, 255); // light blue
      }
      doc.roundedRect(margin, y, contentWidth, 10, 1, 1, 'F');

      // Alert icon indicator
      if (alert.type === 'urgent') {
        doc.setFillColor(239, 68, 68);
      } else if (alert.type === 'warning') {
        doc.setFillColor(245, 158, 11);
      } else {
        doc.setFillColor(59, 130, 246);
      }
      doc.rect(margin, y, 3, 10, 'F');

      // Alert text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(12, 12, 12);
      doc.text(alert.message.substring(0, 80), margin + 5, y + 6);

      // Timestamp
      doc.setFontSize(6);
      doc.setTextColor(107, 101, 96);
      doc.text(formatDateTime(alert.timestamp), pageWidth - margin - 2, y + 6, { align: 'right' });

      y += 12;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(107, 101, 96);
    doc.text('Geen recente alerts', margin, y);
  }

  // ===== FOOTER =====
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(12, 12, 12);
  doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('Bouwwerken De Raedt Ivan NV - Vertrouwelijk', margin, pageHeight - 6);
  doc.text(`Pagina 1`, pageWidth - margin, pageHeight - 6, { align: 'right' });

  // Return as ArrayBuffer
  return doc.output('arraybuffer');
}
