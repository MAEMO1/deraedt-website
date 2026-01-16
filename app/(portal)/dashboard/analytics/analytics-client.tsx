'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Briefcase,
  Eye,
  Clock,
  Target,
  Award,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile } from '@/lib/supabase/types';

// Import seed data for demo metrics
import leadsData from '@/scripts/seed/leads.json';
import tendersData from '@/scripts/seed/tenders.json';

interface AnalyticsClientProps {
  user: Profile;
}

interface Lead {
  id: string;
  lead_type: string;
  status: string;
  created_at?: string;
}

interface Tender {
  id: string;
  status: string;
  estimated_value?: number;
}

const leads: Lead[] = leadsData as Lead[];
const tenders: Tender[] = tendersData as Tender[];

// Mock analytics events data
const mockAnalyticsEvents = {
  pageViews: {
    '/werken-bij': { views: 1245, period: 'week' },
    '/projecten': { views: 892, period: 'week' },
    '/diensten': { views: 756, period: 'week' },
    '/contact': { views: 534, period: 'week' },
  },
  jobPageViews: {
    'projectleider-bouw': 312,
    'dakwerker-ervaren': 287,
    'calculator-bouw': 198,
    'stage-bouwkunde': 156,
  },
  applications: {
    'projectleider-bouw': 8,
    'dakwerker-ervaren': 12,
    'calculator-bouw': 5,
    'stage-bouwkunde': 15,
  },
  leadsPerMonth: [
    { month: 'Aug', count: 12 },
    { month: 'Sep', count: 18 },
    { month: 'Okt', count: 15 },
    { month: 'Nov', count: 22 },
    { month: 'Dec', count: 19 },
    { month: 'Jan', count: 24 },
  ],
  responseTimeHours: 4.2, // Average hours to first response
  tenderWinRate: 0.42, // 42%
  conversionRate: 0.18, // 18% of leads converted
};

const roleLabels: Record<string, string> = {
  DIRECTIE: 'Directie',
  SALES: 'Sales',
  HR: 'HR',
  OPERATIONS: 'Operations',
  ADMIN: 'Administrator',
  VIEWER: 'Viewer',
};

export function AnalyticsClient({ user }: AnalyticsClientProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  const displayName = user.full_name || user.email.split('@')[0];

  // Calculate metrics from seed data
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const convertedLeads = leads.filter((l) => l.status === 'won').length;

  const totalTenders = tenders.length;
  const wonTenders = tenders.filter((t) => t.status === 'won').length;
  const tenderWinRate = totalTenders > 0 ? (wonTenders / totalTenders) * 100 : 0;
  const pipelineValue = tenders
    .filter((t) => ['new', 'analyzing', 'go', 'in_preparation'].includes(t.status))
    .reduce((sum, t) => sum + (t.estimated_value || 0), 0);

  const totalJobViews = Object.values(mockAnalyticsEvents.jobPageViews).reduce((a, b) => a + b, 0);
  const totalApplications = Object.values(mockAnalyticsEvents.applications).reduce((a, b) => a + b, 0);
  const applicationRate = totalJobViews > 0 ? (totalApplications / totalJobViews) * 100 : 0;

  // Chart helper: max value for scaling
  const maxLeadsPerMonth = Math.max(...mockAnalyticsEvents.leadsPerMonth.map((m) => m.count));

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Analytics"
          userName={displayName}
          userRole={roleLabels[user.role] || user.role}
        />

        <main className="p-6">
          {/* Period Selector */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-display text-[#0C0C0C]">Overzicht</h2>
            <div className="flex gap-2">
              {(['week', 'month', 'quarter'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1.5 text-sm rounded ${
                    selectedPeriod === period
                      ? 'bg-[#0C0C0C] text-white'
                      : 'bg-white border border-[#0C0C0C]/10 text-[#6B6560] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {period === 'week' ? 'Week' : period === 'month' ? 'Maand' : 'Kwartaal'}
                </button>
              ))}
            </div>
          </div>

          {/* KPI Tiles */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Leads */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 border border-[#0C0C0C]/5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +12%
                </span>
              </div>
              <p className="text-3xl font-bold text-[#0C0C0C]">{totalLeads}</p>
              <p className="text-sm text-[#6B6560]">Totaal Leads</p>
              <p className="text-xs text-[#6B6560] mt-2">{newLeads} nieuw deze maand</p>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 border border-[#0C0C0C]/5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingDown className="w-4 h-4" />
                  -18%
                </span>
              </div>
              <p className="text-3xl font-bold text-[#0C0C0C]">
                {mockAnalyticsEvents.responseTimeHours.toFixed(1)}u
              </p>
              <p className="text-sm text-[#6B6560]">Gem. Responstijd</p>
              <p className="text-xs text-[#6B6560] mt-2">Time-to-first-response</p>
            </motion.div>

            {/* Tender Win Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 border border-[#0C0C0C]/5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +5%
                </span>
              </div>
              <p className="text-3xl font-bold text-[#0C0C0C]">
                {tenderWinRate.toFixed(0)}%
              </p>
              <p className="text-sm text-[#6B6560]">Tender Win Rate</p>
              <p className="text-xs text-[#6B6560] mt-2">{wonTenders} gewonnen van {totalTenders}</p>
            </motion.div>

            {/* Pipeline Value */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 border border-[#0C0C0C]/5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#0C0C0C]">
                €{(pipelineValue / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-[#6B6560]">Pipeline Waarde</p>
              <p className="text-xs text-[#6B6560] mt-2">Actieve tenders</p>
            </motion.div>
          </div>

          {/* Charts Row */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            {/* Leads per Month */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-[#0C0C0C]/5 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#0C0C0C] flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#9A6B4C]" />
                  Leads per Maand
                </h3>
              </div>

              <div className="flex items-end justify-between h-48 gap-4">
                {mockAnalyticsEvents.leadsPerMonth.map((month, index) => (
                  <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-sm font-semibold text-[#0C0C0C]">{month.count}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(month.count / maxLeadsPerMonth) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="w-full bg-[#9A6B4C] rounded-t"
                      style={{ minHeight: 4 }}
                    />
                    <span className="text-xs text-[#6B6560]">{month.month}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Job Views vs Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white border border-[#0C0C0C]/5 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#0C0C0C] flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#9A6B4C]" />
                  Vacatures: Views vs Sollicitaties
                </h3>
              </div>

              <div className="space-y-4">
                {Object.entries(mockAnalyticsEvents.jobPageViews).map(([job, views]) => {
                  const applications = mockAnalyticsEvents.applications[job as keyof typeof mockAnalyticsEvents.applications] || 0;
                  const convRate = views > 0 ? (applications / views) * 100 : 0;

                  return (
                    <div key={job} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#0C0C0C] capitalize">
                          {job.replace(/-/g, ' ')}
                        </span>
                        <span className="text-[#6B6560]">
                          {convRate.toFixed(1)}% conversie
                        </span>
                      </div>
                      <div className="flex gap-2 h-6">
                        <div className="flex-1 bg-[#0C0C0C]/5 rounded overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="h-full bg-blue-200 rounded"
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-xs text-[#0C0C0C]">
                            <Eye className="w-3 h-3 mr-1" />
                            {views} views
                          </span>
                        </div>
                        <div
                          className="bg-green-500 rounded flex items-center justify-center px-2 text-white text-xs"
                          style={{ width: Math.max(50, applications * 4) }}
                        >
                          {applications}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-[#0C0C0C]/10 flex justify-between text-sm">
                <span className="text-[#6B6560]">Totaal: {totalJobViews} views</span>
                <span className="text-[#6B6560]">{totalApplications} sollicitaties</span>
                <span className="font-medium text-[#0C0C0C]">{applicationRate.toFixed(1)}% gem. conversie</span>
              </div>
            </motion.div>
          </div>

          {/* Additional Metrics */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Conversion Funnel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white border border-[#0C0C0C]/5 p-6"
            >
              <h3 className="font-semibold text-[#0C0C0C] mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#9A6B4C]" />
                Lead Conversie
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B6560]">Leads</span>
                  <span className="font-semibold text-[#0C0C0C]">{totalLeads}</span>
                </div>
                <div className="h-2 bg-[#0C0C0C]/10 rounded">
                  <div className="h-full w-full bg-blue-500 rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B6560]">Gekwalificeerd</span>
                  <span className="font-semibold text-[#0C0C0C]">
                    {leads.filter((l) => ['qualified', 'proposal', 'won'].includes(l.status)).length}
                  </span>
                </div>
                <div className="h-2 bg-[#0C0C0C]/10 rounded">
                  <div
                    className="h-full bg-amber-500 rounded"
                    style={{
                      width: `${(leads.filter((l) => ['qualified', 'proposal', 'won'].includes(l.status)).length / totalLeads) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B6560]">Gewonnen</span>
                  <span className="font-semibold text-[#0C0C0C]">{convertedLeads}</span>
                </div>
                <div className="h-2 bg-[#0C0C0C]/10 rounded">
                  <div
                    className="h-full bg-green-500 rounded"
                    style={{ width: `${(convertedLeads / totalLeads) * 100}%` }}
                  />
                </div>

                <div className="pt-4 border-t border-[#0C0C0C]/10">
                  <p className="text-sm text-[#6B6560]">
                    Conversieratio:{' '}
                    <span className="font-semibold text-green-600">
                      {((convertedLeads / totalLeads) * 100).toFixed(1)}%
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Top Performing Pages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white border border-[#0C0C0C]/5 p-6"
            >
              <h3 className="font-semibold text-[#0C0C0C] mb-6 flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#9A6B4C]" />
                Top Pagina&apos;s
              </h3>

              <div className="space-y-4">
                {Object.entries(mockAnalyticsEvents.pageViews)
                  .sort(([, a], [, b]) => b.views - a.views)
                  .map(([page, data], index) => (
                    <div key={page} className="flex items-center gap-4">
                      <span className="w-6 h-6 bg-[#9A6B4C]/10 rounded flex items-center justify-center text-xs font-semibold text-[#9A6B4C]">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#0C0C0C]">{page}</p>
                        <p className="text-xs text-[#6B6560]">{data.views} views/week</p>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white border border-[#0C0C0C]/5 p-6"
            >
              <h3 className="font-semibold text-[#0C0C0C] mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#9A6B4C]" />
                Performance Highlights
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-100">
                  <Award className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-700">Tender Win Rate +5%</p>
                    <p className="text-xs text-green-600">Boven sectorgemiddelde (35%)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded border border-blue-100">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-700">Responstijd verbeterd</p>
                    <p className="text-xs text-blue-600">4.2u → doelstelling: &lt;6u</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded border border-amber-100">
                  <Briefcase className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-700">Hoge interesse vacatures</p>
                    <p className="text-xs text-amber-600">+{totalApplications} sollicitaties deze maand</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
