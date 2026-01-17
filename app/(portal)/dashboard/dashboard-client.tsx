'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  Download,
  ChevronRight,
  Target,
  Users,
  Building2,
  Wrench,
  Handshake,
  Briefcase,
  ArrowUpRight,
  Bell,
  Check,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile, Tender, Lead, ComplianceDoc } from '@/lib/supabase/types';

interface DashboardClientProps {
  user: Profile;
  tenders: Tender[];
  leads: Lead[];
  complianceDocs: ComplianceDoc[];
}

// Calculate tender pipeline counts
function getTenderPipelineCounts(tenders: Tender[]) {
  const counts: Record<string, number> = {
    new: 0, analyzing: 0, go: 0, no_go: 0,
    in_preparation: 0, submitted: 0, won: 0, lost: 0,
  };
  tenders.forEach((t) => { counts[t.status] = (counts[t.status] || 0) + 1; });
  return counts;
}

// Calculate lead pipeline counts by type
function getLeadPipelineCounts(leads: Lead[]) {
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
      if (l.status === 'new') counts[l.lead_type].new++;
    }
  });
  return counts;
}

// Calculate expiry radar
function getExpiryRadar(complianceDocs: ComplianceDoc[]) {
  const now = new Date();
  const docs30: ComplianceDoc[] = [];
  const docs60: ComplianceDoc[] = [];
  const docs90: ComplianceDoc[] = [];

  complianceDocs.forEach((doc) => {
    const expiryDate = new Date(doc.valid_to);
    const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntil <= 30 && daysUntil > 0) docs30.push(doc);
    else if (daysUntil <= 60 && daysUntil > 30) docs60.push(doc);
    else if (daysUntil <= 90 && daysUntil > 60) docs90.push(doc);
  });

  return { docs30, docs60, docs90 };
}

// Get upcoming deadlines
function getUpcomingDeadlines(tenders: Tender[]) {
  const now = new Date();
  return tenders
    .filter((t): t is Tender & { deadline_at: string } =>
      t.deadline_at !== null && ['new', 'analyzing', 'go', 'in_preparation'].includes(t.status))
    .map((t) => ({
      ...t,
      daysUntil: Math.ceil((new Date(t.deadline_at).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    }))
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 5);
}

// Get alerts
function getAlerts(tenders: Tender[], leads: Lead[], complianceDocs: ComplianceDoc[]) {
  const alerts: { type: 'warning' | 'info' | 'success'; message: string; link?: string }[] = [];
  const newLeads = leads.filter((l) => l.status === 'new').length;
  if (newLeads > 0) alerts.push({ type: 'info', message: `${newLeads} nieuwe lead${newLeads > 1 ? 's' : ''} wachtend`, link: '/dashboard/leads' });

  const analyzing = tenders.filter((t) => t.status === 'analyzing').length;
  if (analyzing > 0) alerts.push({ type: 'warning', message: `${analyzing} tender${analyzing > 1 ? 's' : ''} wachtend op go/no-go`, link: '/dashboard/tenders' });

  const { docs30 } = getExpiryRadar(complianceDocs);
  if (docs30.length > 0) alerts.push({ type: 'warning', message: `${docs30.length} document${docs30.length > 1 ? 'en' : ''} verloopt binnen 30d`, link: '/dashboard/compliance' });

  const won = tenders.filter((t) => t.status === 'won').length;
  if (won > 0) alerts.push({ type: 'success', message: `${won} gewonnen tender${won > 1 ? 's' : ''}` });

  return alerts;
}

const roleLabels: Record<string, string> = {
  DIRECTIE: 'Directie', SALES: 'Sales', HR: 'HR',
  OPERATIONS: 'Operations', ADMIN: 'Administrator', VIEWER: 'Viewer',
};

const tenderStages = [
  { key: 'new', label: 'Nieuw', color: '#4F46E5' },
  { key: 'analyzing', label: 'Analyse', color: '#F59E0B' },
  { key: 'go', label: 'Go', color: '#10B981' },
  { key: 'in_preparation', label: 'Prep', color: '#8B5CF6' },
  { key: 'submitted', label: 'Ingediend', color: '#0EA5E9' },
  { key: 'won', label: 'Gewonnen', color: '#22C55E' },
];

const leadTypeConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  project: { icon: Building2, label: 'Project', color: '#C9A87C' },
  facility: { icon: Wrench, label: 'Facility', color: '#0EA5E9' },
  partner: { icon: Handshake, label: 'Partner', color: '#8B5CF6' },
  procurement: { icon: FileText, label: 'Procurement', color: '#10B981' },
  contact: { icon: Users, label: 'Contact', color: '#6B7280' },
};

// Animated counter component
function AnimatedValue({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return <span className="tabular-nums">{prefix}{displayValue.toLocaleString('nl-BE')}{suffix}</span>;
}

// Radial progress component
function RadialProgress({ value, max, size = 80, strokeWidth = 6, color = '#C9A87C' }: { value: number; max: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / max) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-2xl text-white">{value}</span>
      </div>
    </div>
  );
}

export function DashboardClient({ user, tenders, leads, complianceDocs }: DashboardClientProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const displayName = user.full_name || user.email.split('@')[0];
  const firstName = displayName.split(' ')[0];

  const tenderCounts = getTenderPipelineCounts(tenders);
  const leadCounts = getLeadPipelineCounts(leads);
  const expiryRadar = getExpiryRadar(complianceDocs);
  const deadlines = getUpcomingDeadlines(tenders);
  const alerts = getAlerts(tenders, leads, complianceDocs);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('[EXPORT] Board pack triggered');
    alert('Board pack export gestart.');
    setIsExporting(false);
  };

  const totalTenderValue = tenders
    .filter((t) => ['go', 'in_preparation', 'submitted'].includes(t.status))
    .reduce((sum, t) => sum + (t.estimated_value || 0), 0);

  const winRate = tenders.length > 0
    ? Math.round((tenderCounts.won / (tenderCounts.won + tenderCounts.lost || 1)) * 100)
    : 0;

  const greeting = currentTime.getHours() < 12 ? 'Goedemorgen' : currentTime.getHours() < 18 ? 'Goedemiddag' : 'Goedenavond';

  return (
    <div className="min-h-screen bg-[#0A0A09]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Directie Cockpit"
          userName={displayName}
          userRole={roleLabels[user.role] || user.role}
        />

        <main className="p-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-display text-4xl text-white tracking-tight">
                  {greeting}, <span className="text-[#C9A87C]">{firstName}</span>
                </h1>
                <p className="mt-2 text-white/40 text-sm">
                  {currentTime.toLocaleDateString('nl-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] text-white px-5 py-3 text-sm font-medium transition-all hover:bg-white/[0.1] hover:border-white/[0.15] disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                {isExporting ? 'Exporteren...' : 'Board Pack'}
              </button>
            </div>
          </motion.div>

          {/* Alerts Strip */}
          <AnimatePresence>
            {alerts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 flex flex-wrap gap-3"
              >
                {alerts.map((alert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium ${
                      alert.type === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      alert.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}
                  >
                    {alert.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                     alert.type === 'success' ? <Check className="w-4 h-4" /> :
                     <Bell className="w-4 h-4" />}
                    <span>{alert.message}</span>
                    {alert.link && (
                      <Link href={alert.link} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Key Metrics Row */}
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Target, label: 'Actieve Tenders', value: tenderCounts.go + tenderCounts.in_preparation + tenderCounts.submitted, color: '#C9A87C' },
              { icon: TrendingUp, label: 'Pipeline Waarde', value: totalTenderValue, prefix: '€', suffix: '', format: 'currency', color: '#10B981' },
              { icon: Users, label: 'Nieuwe Leads', value: leads.filter((l) => l.status === 'new').length, color: '#0EA5E9' },
              { icon: Briefcase, label: 'Win Rate', value: winRate, suffix: '%', color: '#8B5CF6' },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="group relative bg-white/[0.02] border border-white/[0.06] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: metric.color, opacity: 0.5 }} />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{metric.label}</p>
                    <p className="font-display text-4xl text-white">
                      {metric.format === 'currency' ? (
                        <span className="tabular-nums">€{(metric.value / 1000000).toFixed(1)}M</span>
                      ) : (
                        <AnimatedValue value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                      )}
                    </p>
                  </div>
                  <div className="p-3 bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors" style={{ color: metric.color }}>
                    <metric.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Tender Pipeline - Full visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
                <h3 className="font-semibold text-white">Tender Pipeline</h3>
                <Link href="/dashboard/tenders" className="text-sm text-[#C9A87C] hover:text-[#E5D4B8] transition-colors flex items-center gap-1">
                  Bekijk alles <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-6">
                {/* Pipeline Visualization */}
                <div className="flex items-end justify-between gap-2 h-40 mb-6">
                  {tenderStages.map((stage) => {
                    const count = tenderCounts[stage.key] || 0;
                    const maxCount = Math.max(...tenderStages.map(s => tenderCounts[s.key] || 0), 1);
                    const height = (count / maxCount) * 100;
                    return (
                      <div key={stage.key} className="flex-1 flex flex-col items-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full min-h-[4px] rounded-t relative overflow-hidden"
                          style={{ backgroundColor: `${stage.color}20` }}
                        >
                          <div className="absolute inset-0" style={{ backgroundColor: stage.color, opacity: 0.8 }} />
                        </motion.div>
                        <div className="mt-3 text-center">
                          <div className="font-display text-xl text-white">{count}</div>
                          <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{stage.label}</div>
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
              transition={{ delay: 0.35 }}
              className="bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
                <h3 className="font-semibold text-white">Expiry Radar</h3>
                <Link href="/dashboard/compliance" className="text-sm text-[#C9A87C] hover:text-[#E5D4B8] transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-6 flex justify-center gap-6">
                <RadialProgress value={expiryRadar.docs30.length} max={5} color="#EF4444" />
                <RadialProgress value={expiryRadar.docs60.length} max={5} color="#F59E0B" />
                <RadialProgress value={expiryRadar.docs90.length} max={5} color="#22C55E" />
              </div>
              <div className="px-6 pb-6 flex justify-center gap-8 text-xs text-white/40">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" />30 dagen</span>
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500" />60 dagen</span>
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" />90 dagen</span>
              </div>
            </motion.div>

            {/* Lead Pipeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
                <h3 className="font-semibold text-white">Lead Pipeline</h3>
                <Link href="/dashboard/leads" className="text-sm text-[#C9A87C] hover:text-[#E5D4B8] transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-4">
                {Object.entries(leadCounts).map(([type, counts]) => {
                  const config = leadTypeConfig[type];
                  if (!config) return null;
                  const Icon = config.icon;
                  return (
                    <div key={type} className="flex items-center gap-4 p-3 hover:bg-white/[0.02] transition-colors">
                      <div className="p-2" style={{ backgroundColor: `${config.color}15`, color: config.color }}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white">{config.label}</div>
                        <div className="text-xs text-white/40">{counts.total} totaal</div>
                      </div>
                      {counts.new > 0 && (
                        <span className="text-xs font-medium px-2 py-1 bg-blue-500/20 text-blue-400">
                          +{counts.new}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06]"
            >
              <div className="p-6 border-b border-white/[0.06]">
                <h3 className="font-semibold text-white">Komende Deadlines</h3>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {deadlines.length === 0 ? (
                  <p className="p-6 text-sm text-white/40">Geen deadlines komende periode</p>
                ) : (
                  deadlines.map((tender, i) => (
                    <motion.div
                      key={tender.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className={`w-12 h-12 flex items-center justify-center font-display text-lg ${
                        tender.daysUntil <= 7 ? 'bg-red-500/10 text-red-400' :
                        tender.daysUntil <= 14 ? 'bg-amber-500/10 text-amber-400' :
                        'bg-green-500/10 text-green-400'
                      }`}>
                        {tender.daysUntil}d
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{tender.title}</p>
                        <p className="text-xs text-white/40 mt-0.5">{tender.buyer}</p>
                      </div>
                      <Link href={`/dashboard/tenders/${tender.id}`} className="p-2 text-white/30 hover:text-[#C9A87C] transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
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
