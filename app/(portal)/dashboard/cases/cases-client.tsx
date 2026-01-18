'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Filter,
  Building2,
  MapPin,
  Calendar,
  ExternalLink,
  Star,
  Eye,
  EyeOff,
  TrendingUp,
  CheckCircle,
  X,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile, Case } from '@/lib/supabase/types';

interface CasesClientProps {
  user: Profile;
  cases: Case[];
}

const roleLabels: Record<string, string> = {
  DIRECTIE: 'Directie',
  SALES: 'Sales',
  HR: 'HR',
  OPERATIONS: 'Operations',
  ADMIN: 'Administrator',
  VIEWER: 'Viewer',
};

const clientTypeLabels: Record<string, string> = {
  public: 'Overheid',
  industrial: 'Industrie',
  education: 'Onderwijs',
  healthcare: 'Zorg',
  residential: 'Residentieel',
  commercial: 'Commercieel',
};

const clientTypeColors: Record<string, string> = {
  public: 'bg-blue-100 text-blue-700 border-blue-200',
  industrial: 'bg-amber-100 text-amber-700 border-amber-200',
  education: 'bg-green-100 text-green-700 border-green-200',
  healthcare: 'bg-red-100 text-red-700 border-red-200',
  residential: 'bg-purple-100 text-purple-700 border-purple-200',
  commercial: 'bg-indigo-100 text-indigo-700 border-indigo-200',
};

interface CaseKPIs {
  budget_adherence?: number;
  timeline_adherence?: number;
  safety_incidents?: number;
  client_satisfaction?: number;
  response_time_hours?: number;
  first_time_fix_rate?: number;
  energy_improvement_percent?: number;
  production_downtime_hours?: number;
  resident_complaints?: number;
}

export function CasesClient({ user, cases }: CasesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const displayName = user.full_name || user.email.split('@')[0];

  // Get unique years for filter
  const years = [...new Set(cases.map((c) => c.year))].sort((a, b) => (b || 0) - (a || 0));

  // Filter cases
  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      searchQuery === '' ||
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (caseItem.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (caseItem.location?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesType = filterType === 'all' || caseItem.client_type === filterType;
    const matchesYear = filterYear === 'all' || caseItem.year?.toString() === filterYear;
    return matchesSearch && matchesType && matchesYear;
  });

  // Stats
  const totalCases = cases.length;
  const publishedCases = cases.filter((c) => c.is_published).length;
  const featuredCases = cases.filter((c) => c.is_featured).length;

  const formatKPIs = (kpis: CaseKPIs | null | undefined) => {
    if (!kpis) return [];
    const formatted: { label: string; value: string; color: string }[] = [];

    if (kpis.budget_adherence !== undefined) {
      formatted.push({
        label: 'Budget',
        value: `${kpis.budget_adherence}%`,
        color: kpis.budget_adherence >= 95 ? 'text-green-600' : 'text-amber-600',
      });
    }
    if (kpis.timeline_adherence !== undefined) {
      formatted.push({
        label: 'Planning',
        value: `${kpis.timeline_adherence}%`,
        color: kpis.timeline_adherence >= 95 ? 'text-green-600' : 'text-amber-600',
      });
    }
    if (kpis.client_satisfaction !== undefined) {
      formatted.push({
        label: 'Tevredenheid',
        value: `${kpis.client_satisfaction}/10`,
        color: kpis.client_satisfaction >= 9 ? 'text-green-600' : 'text-amber-600',
      });
    }
    if (kpis.safety_incidents !== undefined) {
      formatted.push({
        label: 'Incidenten',
        value: kpis.safety_incidents.toString(),
        color: kpis.safety_incidents === 0 ? 'text-green-600' : 'text-red-600',
      });
    }

    return formatted;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Cases & Referenties"
          userName={displayName}
          userRole={roleLabels[user.role] || user.role}
        />

        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#0C0C0C]/5 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#9A6B4C]/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#9A6B4C]" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#0C0C0C]">{totalCases}</p>
                  <p className="text-xs text-[#6B6560]">Totaal cases</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-[#0C0C0C]/5 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#0C0C0C]">{publishedCases}</p>
                  <p className="text-xs text-[#6B6560]">Gepubliceerd</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-[#0C0C0C]/5 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#0C0C0C]">{featuredCases}</p>
                  <p className="text-xs text-[#6B6560]">Uitgelicht</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters */}
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

              {/* Type Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6560]" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none appearance-none bg-white"
                >
                  <option value="all">Alle sectoren</option>
                  {Object.entries(clientTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6560]" />
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none appearance-none bg-white"
                >
                  <option value="all">Alle jaren</option>
                  {years.map((year) => (
                    <option key={year} value={year?.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-sm text-[#6B6560]">
              {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''} gevonden
            </p>
          </div>

          {/* Cases Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCases.map((caseItem, index) => {
              const kpis = formatKPIs(caseItem.kpis as CaseKPIs | null | undefined);
              return (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCase(caseItem)}
                  className="bg-white border border-[#0C0C0C]/5 p-5 cursor-pointer hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {caseItem.client_type && (
                        <span
                          className={`text-xs px-2 py-1 rounded border ${
                            clientTypeColors[caseItem.client_type] || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {clientTypeLabels[caseItem.client_type] || caseItem.client_type}
                        </span>
                      )}
                      {caseItem.is_featured && (
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {caseItem.is_published ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-[#0C0C0C] mb-2 line-clamp-2">
                    {caseItem.title}
                  </h3>

                  {/* Client & Location */}
                  <p className="text-sm text-[#6B6560] mb-1">{caseItem.client_name}</p>
                  <div className="flex items-center gap-1 text-xs text-[#6B6560]">
                    <MapPin className="w-3 h-3" />
                    <span>{caseItem.location}</span>
                    <span className="mx-1">•</span>
                    <span>{caseItem.year}</span>
                  </div>

                  {/* KPIs Preview */}
                  {kpis.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[#0C0C0C]/5 flex gap-4">
                      {kpis.slice(0, 3).map((kpi) => (
                        <div key={kpi.label} className="text-center">
                          <p className={`text-sm font-semibold ${kpi.color}`}>{kpi.value}</p>
                          <p className="text-[10px] text-[#6B6560]">{kpi.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-[#6B6560]/30 mx-auto mb-4" />
              <p className="text-[#6B6560]">Geen cases gevonden met deze filters.</p>
            </div>
          )}
        </main>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-[#0C0C0C]/5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {selectedCase.client_type && (
                    <span
                      className={`text-xs px-2 py-1 rounded border ${
                        clientTypeColors[selectedCase.client_type] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {clientTypeLabels[selectedCase.client_type] || selectedCase.client_type}
                    </span>
                  )}
                  {selectedCase.is_featured && (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded">
                      <Star className="w-3 h-3" />
                      Uitgelicht
                    </span>
                  )}
                  {selectedCase.is_published ? (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                      <CheckCircle className="w-3 h-3" />
                      Gepubliceerd
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      <EyeOff className="w-3 h-3" />
                      Concept
                    </span>
                  )}
                </div>
                <h2 className="font-semibold text-xl text-[#0C0C0C]">{selectedCase.title}</h2>
              </div>
              <button onClick={() => setSelectedCase(null)} className="p-2 hover:bg-[#FAF7F2]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Client Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-[#FAF7F2]">
                  <Building2 className="w-5 h-5 text-[#9A6B4C]" />
                  <div>
                    <p className="text-xs text-[#6B6560]">Opdrachtgever</p>
                    <p className="font-medium text-[#0C0C0C]">{selectedCase.client_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#FAF7F2]">
                  <MapPin className="w-5 h-5 text-[#9A6B4C]" />
                  <div>
                    <p className="text-xs text-[#6B6560]">Locatie</p>
                    <p className="font-medium text-[#0C0C0C]">{selectedCase.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#FAF7F2]">
                  <Calendar className="w-5 h-5 text-[#9A6B4C]" />
                  <div>
                    <p className="text-xs text-[#6B6560]">Jaar</p>
                    <p className="font-medium text-[#0C0C0C]">{selectedCase.year}</p>
                  </div>
                </div>
                {selectedCase.services && Array.isArray(selectedCase.services) && (
                  <div className="flex items-center gap-3 p-3 bg-[#FAF7F2]">
                    <TrendingUp className="w-5 h-5 text-[#9A6B4C]" />
                    <div>
                      <p className="text-xs text-[#6B6560]">Diensten</p>
                      <p className="font-medium text-[#0C0C0C]">
                        {(selectedCase.services as string[]).join(', ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Scope */}
              {selectedCase.scope && (
                <div>
                  <h3 className="font-medium text-[#0C0C0C] mb-2">Scope</h3>
                  <p className="text-[#6B6560] text-sm">{selectedCase.scope}</p>
                </div>
              )}

              {/* Summary */}
              {selectedCase.summary && (
                <div className="p-4 bg-[#FAF7F2] border-l-4 border-[#9A6B4C]">
                  <p className="text-[#0C0C0C] italic">{selectedCase.summary}</p>
                </div>
              )}

              {/* KPIs */}
              {selectedCase.kpis && (
                <div>
                  <h3 className="font-medium text-[#0C0C0C] mb-3">Prestatie-indicatoren</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {formatKPIs(selectedCase.kpis as CaseKPIs).map((kpi) => (
                      <div
                        key={kpi.label}
                        className="p-3 bg-white border border-[#0C0C0C]/5 text-center"
                      >
                        <p className={`text-xl font-semibold ${kpi.color}`}>{kpi.value}</p>
                        <p className="text-xs text-[#6B6560]">{kpi.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* View on Website */}
              {selectedCase.slug && selectedCase.is_published && (
                <div className="pt-4 border-t border-[#0C0C0C]/5">
                  <Link
                    href={`/projecten/${selectedCase.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-[#9A6B4C] hover:underline text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Bekijk op website
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
