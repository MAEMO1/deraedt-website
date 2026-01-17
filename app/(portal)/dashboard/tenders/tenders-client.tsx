'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  Clock,
  Building2,
  Euro,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile, Tender } from '@/lib/supabase/types';

interface TendersClientProps {
  user: Profile;
  tenders: Tender[];
}

const roleLabels: Record<string, string> = {
  DIRECTIE: 'Directie',
  SALES: 'Sales',
  HR: 'HR',
  OPERATIONS: 'Operations',
  ADMIN: 'Administrator',
  VIEWER: 'Viewer',
};

const statusLabels: Record<string, string> = {
  new: 'Nieuw',
  analyzing: 'Analyse',
  go: 'Go',
  no_go: 'No-Go',
  in_preparation: 'Voorbereiding',
  submitted: 'Ingediend',
  won: 'Gewonnen',
  lost: 'Verloren',
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  analyzing: 'bg-amber-100 text-amber-700 border-amber-200',
  go: 'bg-green-100 text-green-700 border-green-200',
  no_go: 'bg-red-100 text-red-700 border-red-200',
  in_preparation: 'bg-purple-100 text-purple-700 border-purple-200',
  submitted: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  won: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  lost: 'bg-gray-100 text-gray-700 border-gray-200',
};

const sourceLabels: Record<string, string> = {
  ted: 'TED',
  'e-procurement': 'e-Procurement',
  manual: 'Handmatig',
};

export function TendersClient({ user, tenders }: TendersClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const displayName = user.full_name || user.email.split('@')[0];

  // Filter tenders
  const filteredTenders = tenders.filter((tender) => {
    const matchesSearch =
      searchQuery === '' ||
      tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.buyer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tender.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort by deadline (closest first)
  const sortedTenders = [...filteredTenders].sort((a, b) => {
    const dateA = a.deadline_at ? new Date(a.deadline_at) : new Date('9999-12-31');
    const dateB = b.deadline_at ? new Date(b.deadline_at) : new Date('9999-12-31');
    return dateA.getTime() - dateB.getTime();
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);

    // Simulate TED RSS ingest
    console.log('[TED INGEST] Manual refresh triggered', {
      user: user.email,
      timestamp: new Date().toISOString(),
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert('TED RSS feed vernieuwd. In productie worden nieuwe tenders opgehaald.');
    setIsRefreshing(false);
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return { text: 'Verlopen', color: 'text-red-600' };
    if (daysUntil <= 7) return { text: `${daysUntil}d`, color: 'text-red-600' };
    if (daysUntil <= 14) return { text: `${daysUntil}d`, color: 'text-amber-600' };
    return { text: `${daysUntil}d`, color: 'text-green-600' };
  };

  const formatValue = (value?: number | null) => {
    if (!value) return '-';
    if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `€${(value / 1000).toFixed(0)}K`;
    return `€${value}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Tender Hub"
          userName={displayName}
          userRole={roleLabels[user.role] || user.role}
        />

        <main className="p-6">
          {/* Header Actions */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6560]" />
                <input
                  type="text"
                  placeholder="Zoeken..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6560]" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none appearance-none bg-white"
                >
                  <option value="all">Alle statussen</option>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 bg-[#0C0C0C] text-white px-4 py-2 text-sm font-medium hover:bg-[#9A6B4C] disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Vernieuwen...' : 'TED Feed Vernieuwen'}
            </button>
          </div>

          {/* Stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">Totaal Tenders</p>
              <p className="text-2xl font-bold text-[#0C0C0C]">{tenders.length}</p>
            </div>
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">Nieuw / Analyse</p>
              <p className="text-2xl font-bold text-[#0C0C0C]">
                {tenders.filter((t) => ['new', 'analyzing'].includes(t.status)).length}
              </p>
            </div>
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">In Voorbereiding</p>
              <p className="text-2xl font-bold text-[#0C0C0C]">
                {tenders.filter((t) => ['go', 'in_preparation'].includes(t.status)).length}
              </p>
            </div>
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">Gewonnen</p>
              <p className="text-2xl font-bold text-green-600">
                {tenders.filter((t) => t.status === 'won').length}
              </p>
            </div>
          </div>

          {/* Tender List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#0C0C0C]/5"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#0C0C0C]/5 text-left">
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Tender</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Opdrachtgever</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Deadline</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Status</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Match</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Waarde</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Bron</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase"></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTenders.map((tender) => {
                    const deadline = tender.deadline_at ? formatDeadline(tender.deadline_at) : null;
                    return (
                      <tr
                        key={tender.id}
                        className="border-b border-[#0C0C0C]/5 hover:bg-[#FAF7F2] cursor-pointer"
                      >
                        <td className="p-4">
                          <div className="max-w-sm">
                            <p className="font-medium text-[#0C0C0C] truncate">{tender.title}</p>
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {tender.tags?.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-1.5 py-0.5 bg-[#9A6B4C]/10 text-[#9A6B4C] rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#6B6560]" />
                            <div>
                              <p className="text-sm text-[#0C0C0C]">{tender.buyer}</p>
                              <p className="text-xs text-[#6B6560]">{tender.buyer_location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          {deadline ? (
                            <div className="flex items-center gap-2">
                              <Clock className={`w-4 h-4 ${deadline.color}`} />
                              <span className={`text-sm font-medium ${deadline.color}`}>
                                {deadline.text}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-[#6B6560]">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded border ${statusColors[tender.status]}`}>
                            {statusLabels[tender.status]}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#6B6560]" />
                            <span className={`text-sm font-medium ${
                              (tender.match_score || 0) >= 90
                                ? 'text-green-600'
                                : (tender.match_score || 0) >= 75
                                ? 'text-amber-600'
                                : 'text-[#6B6560]'
                            }`}>
                              {tender.match_score || '-'}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Euro className="w-4 h-4 text-[#6B6560]" />
                            <span className="text-sm text-[#0C0C0C]">
                              {formatValue(tender.estimated_value)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-xs text-[#6B6560]">
                            {sourceLabels[tender.source] || tender.source}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {tender.external_url && (
                              <a
                                href={tender.external_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                              >
                                <ExternalLink className="w-4 h-4 text-[#6B6560]" />
                              </a>
                            )}
                            <a
                              href={`/dashboard/tenders/${tender.id}`}
                              className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                            >
                              <ChevronRight className="w-4 h-4 text-[#6B6560]" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
