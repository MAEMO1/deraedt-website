'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Loader2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile, Lead, LeadNote } from '@/lib/supabase/types';

interface LeadDetailClientProps {
  user: Profile;
  lead: Lead;
  notes: LeadNote[];
  teamMembers: Profile[];
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
  contacted: 'Gecontacteerd',
  qualified: 'Gekwalificeerd',
  proposal: 'Offerte',
  won: 'Gewonnen',
  lost: 'Verloren',
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-purple-100 text-purple-700 border-purple-200',
  qualified: 'bg-amber-100 text-amber-700 border-amber-200',
  proposal: 'bg-orange-100 text-orange-700 border-orange-200',
  won: 'bg-green-100 text-green-700 border-green-200',
  lost: 'bg-red-100 text-red-700 border-red-200',
};

const typeLabels: Record<string, string> = {
  project: 'Project',
  facility: 'Facility',
  partner: 'Partner',
  procurement: 'Procurement',
  contact: 'Contact',
};

const sourceLabels: Record<string, string> = {
  website: 'Website',
  'website-contact': 'Contactformulier',
  projectplanner: 'Projectplanner',
  'tender-pack-request': 'Tender Pack',
  manual: 'Handmatig',
};

export function LeadDetailClient({ user, lead: initialLead, notes: initialNotes, teamMembers }: LeadDetailClientProps) {
  const [lead, setLead] = useState<Lead>(initialLead);
  const [notes, setNotes] = useState<LeadNote[]>(initialNotes);
  const [noteInput, setNoteInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const displayName = user.full_name || user.email.split('@')[0];

  const formatDate = (dateString: string | null) => {
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

  // Update lead in Supabase
  const updateLead = useCallback(async (updates: Partial<Lead>) => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success) {
        setLead((prev) => ({ ...prev, ...data.lead }));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
        return true;
      } else {
        setSaveError(data.error || 'Opslaan mislukt');
        return false;
      }
    } catch (err) {
      console.error('[updateLead] Error:', err);
      setSaveError('Netwerkfout bij opslaan');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [lead.id]);

  // Add note
  const handleAddNote = useCallback(async () => {
    const content = noteInput.trim();
    if (!content) return;

    setIsSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/leads/${lead.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (data.success) {
        setNotes((prev) => [data.note, ...prev]);
        setNoteInput('');
      } else {
        setSaveError(data.error || 'Notitie opslaan mislukt');
      }
    } catch (err) {
      console.error('[handleAddNote] Error:', err);
      setSaveError('Netwerkfout bij opslaan notitie');
    } finally {
      setIsSaving(false);
    }
  }, [lead.id, noteInput]);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Lead Detail"
          userName={displayName}
          userRole={roleLabels[user.role] || user.role}
        />

        <main className="p-6">
          {/* Back Link */}
          <Link
            href="/dashboard/leads"
            className="inline-flex items-center gap-2 text-[#6B6560] hover:text-[#0C0C0C] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Terug naar Lead Hub</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#0C0C0C]/5 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs px-3 py-1 rounded border ${statusColors[lead.status]}`}>
                        {statusLabels[lead.status]}
                      </span>
                      <span className="text-xs px-3 py-1 bg-[#0C0C0C]/5 rounded">
                        {typeLabels[lead.lead_type]}
                      </span>
                    </div>
                    <h1 className="text-2xl font-semibold text-[#0C0C0C]">
                      {lead.organisation || lead.contact_name}
                    </h1>
                    {lead.organisation && (
                      <p className="text-[#6B6560] mt-1">{lead.contact_name}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-[#6B6560]">
                    <p>Aangemaakt</p>
                    <p className="font-medium text-[#0C0C0C]">{formatDate(lead.created_at)}</p>
                  </div>
                </div>

                {/* Contact Info Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-4 bg-[#FAF7F2]">
                    <User className="w-5 h-5 text-[#9A6B4C]" />
                    <div>
                      <p className="text-xs text-[#6B6560]">Contact</p>
                      <p className="font-medium text-[#0C0C0C]">{lead.contact_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#FAF7F2]">
                    <Mail className="w-5 h-5 text-[#9A6B4C]" />
                    <div>
                      <p className="text-xs text-[#6B6560]">Email</p>
                      <a
                        href={`mailto:${lead.contact_email}`}
                        className="font-medium text-[#9A6B4C] hover:underline flex items-center gap-1"
                      >
                        {lead.contact_email}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  {lead.contact_phone && (
                    <div className="flex items-center gap-3 p-4 bg-[#FAF7F2]">
                      <Phone className="w-5 h-5 text-[#9A6B4C]" />
                      <div>
                        <p className="text-xs text-[#6B6560]">Telefoon</p>
                        <a
                          href={`tel:${lead.contact_phone}`}
                          className="font-medium text-[#9A6B4C] hover:underline flex items-center gap-1"
                        >
                          {lead.contact_phone}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                  {lead.location && (
                    <div className="flex items-center gap-3 p-4 bg-[#FAF7F2]">
                      <MapPin className="w-5 h-5 text-[#9A6B4C]" />
                      <div>
                        <p className="text-xs text-[#6B6560]">Locatie</p>
                        <p className="font-medium text-[#0C0C0C]">{lead.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Details */}
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  {lead.budget_band && (
                    <div className="p-4 border border-[#0C0C0C]/5">
                      <p className="text-xs text-[#6B6560] mb-1">Budget</p>
                      <p className="font-semibold text-[#0C0C0C]">{lead.budget_band}</p>
                    </div>
                  )}
                  {lead.timing && (
                    <div className="p-4 border border-[#0C0C0C]/5">
                      <p className="text-xs text-[#6B6560] mb-1">Timing</p>
                      <p className="font-semibold text-[#0C0C0C]">{lead.timing}</p>
                    </div>
                  )}
                  <div className="p-4 border border-[#0C0C0C]/5">
                    <p className="text-xs text-[#6B6560] mb-1">Bron</p>
                    <p className="font-semibold text-[#0C0C0C]">
                      {sourceLabels[lead.source || 'website'] || lead.source}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Message */}
              {lead.message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white border border-[#0C0C0C]/5 p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-[#9A6B4C]" />
                    <h2 className="font-semibold text-[#0C0C0C]">Bericht</h2>
                  </div>
                  <div className="p-4 bg-[#FAF7F2] border-l-4 border-[#9A6B4C]">
                    <p className="text-[#0C0C0C] whitespace-pre-wrap">{lead.message}</p>
                  </div>
                </motion.div>
              )}

              {/* Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-[#0C0C0C]/5 p-6"
              >
                <h2 className="font-semibold text-[#0C0C0C] mb-4">Notities</h2>

                {/* Add Note Form */}
                <div className="mb-6">
                  <div className="flex gap-3">
                    <textarea
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      placeholder="Nieuwe notitie toevoegen..."
                      rows={3}
                      className="flex-1 p-3 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none resize-none"
                    />
                    <button
                      onClick={handleAddNote}
                      disabled={!noteInput.trim() || isSaving}
                      className="px-4 py-2 bg-[#9A6B4C] text-white text-sm font-medium hover:bg-[#BA8B6C] disabled:opacity-50 disabled:cursor-not-allowed h-fit"
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Notes List */}
                {notes.length > 0 ? (
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div
                        key={note.id}
                        className="p-4 bg-[#FAF7F2] border-l-2 border-[#9A6B4C]/30"
                      >
                        <p className="text-[#0C0C0C] whitespace-pre-wrap">{note.content}</p>
                        <p className="text-xs text-[#6B6560] mt-2">
                          {formatDateTime(note.created_at)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#6B6560] text-sm">Nog geen notities toegevoegd.</p>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status & Error Messages */}
              {saveError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {saveError}
                </div>
              )}
              {saveSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Opgeslagen
                </div>
              )}

              {/* Actions Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-[#0C0C0C]/5 p-6"
              >
                <h2 className="font-semibold text-[#0C0C0C] mb-4">Acties</h2>

                {/* Status */}
                <div className="mb-4">
                  <label className="block text-sm text-[#6B6560] mb-2">Status</label>
                  <select
                    value={lead.status}
                    onChange={(e) => updateLead({ status: e.target.value as Lead['status'] })}
                    disabled={isSaving}
                    className="w-full p-3 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none disabled:opacity-50"
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assignment */}
                <div className="mb-4">
                  <label className="block text-sm text-[#6B6560] mb-2">Toegewezen aan</label>
                  <select
                    value={lead.owner_id || ''}
                    onChange={(e) => updateLead({ owner_id: e.target.value || null })}
                    disabled={isSaving}
                    className="w-full p-3 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none disabled:opacity-50"
                  >
                    <option value="">-- Selecteer teamlid --</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.full_name || member.email}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Next Action Date */}
                <div>
                  <label className="block text-sm text-[#6B6560] mb-2">Volgende actie</label>
                  <input
                    type="date"
                    value={lead.next_action_date || ''}
                    onChange={(e) => updateLead({ next_action_date: e.target.value || null })}
                    disabled={isSaving}
                    className="w-full p-3 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none disabled:opacity-50"
                  />
                </div>
              </motion.div>

              {/* Quick Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-[#0C0C0C]/5 p-6"
              >
                <h2 className="font-semibold text-[#0C0C0C] mb-4">Overzicht</h2>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B6560]">ID</span>
                    <span className="font-mono text-xs text-[#0C0C0C]">{lead.id.slice(0, 8)}...</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B6560]">Aangemaakt</span>
                    <span className="text-[#0C0C0C]">{formatDate(lead.created_at)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B6560]">Bijgewerkt</span>
                    <span className="text-[#0C0C0C]">{formatDate(lead.updated_at)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B6560]">Notities</span>
                    <span className="text-[#0C0C0C]">{notes.length}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
