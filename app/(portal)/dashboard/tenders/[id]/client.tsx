'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Building2,
  Euro,
  TrendingUp,
  ExternalLink,
  Check,
  X,
  AlertTriangle,
  FileText,
  Users,
  Calculator,
  Calendar,
  Award,
  MessageSquare,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile, Tender } from '@/lib/supabase/types';

interface TenderDetailClientProps {
  user: Profile;
  tender: Tender;
}

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  checked: boolean;
  notes: string;
}

interface Decision {
  type: 'go' | 'no_go';
  reason: string;
  user_id: string;
  user_name: string;
  timestamp: string;
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

const initialChecklist: Omit<ChecklistItem, 'checked' | 'notes'>[] = [
  {
    id: 'capacity',
    label: 'Capaciteit',
    description: 'Hebben we voldoende mensen en middelen beschikbaar?',
    icon: Users,
  },
  {
    id: 'risk',
    label: 'Risico',
    description: 'Is het risicoprofiel aanvaardbaar? (technisch, juridisch, financieel)',
    icon: AlertTriangle,
  },
  {
    id: 'margin',
    label: 'Marge',
    description: 'Is de verwachte marge voldoende gezien scope en risico?',
    icon: Calculator,
  },
  {
    id: 'planning',
    label: 'Planning',
    description: 'Past de deadline en doorlooptijd in onze planning?',
    icon: Calendar,
  },
  {
    id: 'references',
    label: 'Referenties',
    description: 'Hebben we relevante referenties voor deze opdracht?',
    icon: Award,
  },
];

export function TenderDetailClient({ user, tender }: TenderDetailClientProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    initialChecklist.map((item) => ({ ...item, checked: false, notes: '' }))
  );
  const [decisionReason, setDecisionReason] = useState('');
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [currentStatus, setCurrentStatus] = useState(tender.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayName = user.full_name || user.email.split('@')[0];

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return { text: 'Verlopen', color: 'text-red-600', days: daysUntil };
    if (daysUntil <= 7) return { text: `${daysUntil} dagen`, color: 'text-red-600', days: daysUntil };
    if (daysUntil <= 14) return { text: `${daysUntil} dagen`, color: 'text-amber-600', days: daysUntil };
    return { text: `${daysUntil} dagen`, color: 'text-green-600', days: daysUntil };
  };

  const formatValue = (value?: number | null) => {
    if (!value) return '-';
    if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `€${(value / 1000).toFixed(0)}K`;
    return `€${value}`;
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('nl-BE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('nl-BE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCheckItem = (itemId: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleNotesChange = (itemId: string, notes: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, notes } : item
      )
    );
  };

  const handleDecision = async (type: 'go' | 'no_go') => {
    if (!decisionReason.trim()) {
      alert('Voeg een reden toe voor uw beslissing.');
      return;
    }

    setIsSubmitting(true);

    const decision: Decision = {
      type,
      reason: decisionReason,
      user_id: user.id,
      user_name: displayName,
      timestamp: new Date().toISOString(),
    };

    try {
      // Save decision to database
      const response = await fetch(`/api/tenders/${tender.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: type,
          decision_reason: decisionReason,
          decision_by: user.id,
          go_no_go_checklist: Object.fromEntries(
            checklist.map((item) => [item.id, { checked: item.checked, notes: item.notes }])
          ),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('[TENDER DECISION] API error:', error);
        alert('Fout bij opslaan van beslissing. Probeer het opnieuw.');
        setIsSubmitting(false);
        return;
      }

      console.log('[TENDER DECISION] Saved:', {
        tender_id: tender.id,
        decision,
      });

      setDecisions((prev) => [decision, ...prev]);
      setCurrentStatus(type);
      setDecisionReason('');
    } catch (error) {
      console.error('[TENDER DECISION] Error:', error);
      alert('Fout bij opslaan van beslissing. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deadline = tender.deadline_at ? formatDeadline(tender.deadline_at) : null;
  const checkedCount = checklist.filter((item) => item.checked).length;
  const allChecked = checkedCount === checklist.length;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Tender Detail"
          userName={displayName}
          userRole={roleLabels[user.role] || user.role}
        />

        <main className="p-6">
          {/* Back Link */}
          <Link
            href="/dashboard/tenders"
            className="inline-flex items-center gap-2 text-[#6B6560] hover:text-[#0C0C0C] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Terug naar overzicht</span>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#0C0C0C]/5 p-6 mb-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs px-2 py-1 rounded border ${statusColors[currentStatus]}`}>
                    {statusLabels[currentStatus]}
                  </span>
                  <span className="text-xs text-[#6B6560]">
                    {sourceLabels[tender.source] || tender.source}
                  </span>
                </div>
                <h1 className="text-2xl font-display text-[#0C0C0C]">{tender.title}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-[#6B6560]">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {tender.buyer}
                    {tender.buyer_location && ` — ${tender.buyer_location}`}
                  </span>
                  {deadline ? (
                    <span className={`flex items-center gap-2 ${deadline.color}`}>
                      <Clock className="w-4 h-4" />
                      Deadline: {formatDate(tender.deadline_at)} ({deadline.text})
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-[#6B6560]">
                      <Clock className="w-4 h-4" />
                      Geen deadline
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                  <Euro className="w-5 h-5 text-[#6B6560]" />
                  <span className="text-2xl font-semibold text-[#0C0C0C]">
                    {formatValue(tender.estimated_value)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#6B6560]" />
                  <span
                    className={`text-sm font-medium ${
                      (tender.match_score || 0) >= 90
                        ? 'text-green-600'
                        : (tender.match_score || 0) >= 75
                        ? 'text-amber-600'
                        : 'text-[#6B6560]'
                    }`}
                  >
                    Match: {tender.match_score || '-'}%
                  </span>
                </div>
                {tender.external_url && (
                  <a
                    href={tender.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#9A6B4C] hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Bekijk origineel
                  </a>
                )}
              </div>
            </div>

            {/* Tags */}
            {tender.tags && tender.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tender.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-[#9A6B4C]/10 text-[#9A6B4C] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CPV Codes */}
            {tender.cpv_codes && tender.cpv_codes.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#6B6560]">CPV:</span>
                {tender.cpv_codes.map((code) => (
                  <span
                    key={code}
                    className="text-xs px-2 py-0.5 bg-[#0C0C0C]/5 text-[#6B6560] rounded font-mono"
                  >
                    {code}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Go/No-Go Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white border border-[#0C0C0C]/5 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-display text-[#0C0C0C] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#9A6B4C]" />
                    Go/No-Go Checklist
                  </h2>
                  <span className="text-sm text-[#6B6560]">
                    {checkedCount} / {checklist.length} afgevinkt
                  </span>
                </div>

                <div className="space-y-4">
                  {checklist.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className={`border rounded-lg p-4 transition-colors ${
                          item.checked
                            ? 'border-green-200 bg-green-50/50'
                            : 'border-[#0C0C0C]/10'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <button
                            onClick={() => handleCheckItem(item.id)}
                            className={`w-8 h-8 flex items-center justify-center rounded border-2 transition-colors flex-shrink-0 ${
                              item.checked
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-[#0C0C0C]/20 hover:border-[#9A6B4C]'
                            }`}
                          >
                            {item.checked && <Check className="w-4 h-4" />}
                          </button>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="w-4 h-4 text-[#9A6B4C]" />
                              <span className="font-medium text-[#0C0C0C]">{item.label}</span>
                            </div>
                            <p className="text-sm text-[#6B6560] mb-3">{item.description}</p>

                            <textarea
                              value={item.notes}
                              onChange={(e) => handleNotesChange(item.id, e.target.value)}
                              placeholder="Notities toevoegen..."
                              className="w-full px-3 py-2 text-sm border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none resize-none"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Decision Section */}
                <div className="mt-8 pt-6 border-t border-[#0C0C0C]/10">
                  <h3 className="text-lg font-display text-[#0C0C0C] mb-4">Beslissing</h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                      Reden voor beslissing
                    </label>
                    <textarea
                      value={decisionReason}
                      onChange={(e) => setDecisionReason(e.target.value)}
                      placeholder="Beschrijf de reden voor uw go/no-go beslissing..."
                      className="w-full px-4 py-3 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none resize-none"
                      rows={3}
                    />
                  </div>

                  {!allChecked && (
                    <p className="text-sm text-amber-600 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Niet alle checklist items zijn afgevinkt. Overweeg alle punten voor een beslissing.
                    </p>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleDecision('go')}
                      disabled={isSubmitting || currentStatus === 'go' || currentStatus === 'no_go'}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 font-semibold uppercase tracking-wide text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                      Go
                    </button>
                    <button
                      onClick={() => handleDecision('no_go')}
                      disabled={isSubmitting || currentStatus === 'go' || currentStatus === 'no_go'}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 font-semibold uppercase tracking-wide text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                      No-Go
                    </button>
                  </div>

                  {(currentStatus === 'go' || currentStatus === 'no_go') && (
                    <div
                      className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                        currentStatus === 'go'
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <CheckCircle
                        className={`w-5 h-5 ${
                          currentStatus === 'go' ? 'text-green-600' : 'text-red-600'
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          currentStatus === 'go' ? 'text-green-700' : 'text-red-700'
                        }`}
                      >
                        Beslissing geregistreerd: {currentStatus === 'go' ? 'GO' : 'NO-GO'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Decision Log & Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Decision Log */}
              <div className="bg-white border border-[#0C0C0C]/5 p-6">
                <h3 className="text-lg font-display text-[#0C0C0C] mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#9A6B4C]" />
                  Beslissingslog
                </h3>

                {decisions.length === 0 ? (
                  <p className="text-sm text-[#6B6560] italic">
                    Nog geen beslissingen geregistreerd.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {decisions.map((decision, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          decision.type === 'go'
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-sm font-semibold uppercase ${
                              decision.type === 'go' ? 'text-green-700' : 'text-red-700'
                            }`}
                          >
                            {decision.type === 'go' ? 'GO' : 'NO-GO'}
                          </span>
                          <span className="text-xs text-[#6B6560]">
                            {formatDateTime(decision.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-[#0C0C0C] mb-2">{decision.reason}</p>
                        <p className="text-xs text-[#6B6560]">Door: {decision.user_name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tender Info */}
              <div className="bg-white border border-[#0C0C0C]/5 p-6">
                <h3 className="text-lg font-display text-[#0C0C0C] mb-4">Tender Info</h3>

                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-[#6B6560]">Publicatiedatum</dt>
                    <dd className="font-medium text-[#0C0C0C]">
                      {tender.publication_date ? formatDate(tender.publication_date) : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6B6560]">Deadline</dt>
                    <dd className="font-medium text-[#0C0C0C]">
                      {formatDate(tender.deadline_at)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6B6560]">Bron</dt>
                    <dd className="font-medium text-[#0C0C0C]">
                      {sourceLabels[tender.source] || tender.source}
                    </dd>
                  </div>
                  {tender.external_id && (
                    <div>
                      <dt className="text-[#6B6560]">Referentie</dt>
                      <dd className="font-mono text-xs text-[#0C0C0C]">{tender.external_id}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
