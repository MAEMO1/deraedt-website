'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  ChevronRight,
  X,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile, Lead } from '@/lib/supabase/types';

interface LeadsClientProps {
  user: Profile;
  leads: Lead[];
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

// Mock team members for assignment
const teamMembers = [
  { id: 'user-1', name: 'Jan Peeters', role: 'Sales' },
  { id: 'user-2', name: 'Marie Janssens', role: 'Operations' },
  { id: 'user-3', name: 'Thomas De Raedt', role: 'Directie' },
];

const stages = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];

export function LeadsClient({ user, leads: initialLeads }: LeadsClientProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'pipeline' | 'list'>('pipeline');
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [nextActionDates, setNextActionDates] = useState<Record<string, string>>({});
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  const displayName = user.full_name || user.email.split('@')[0];

  // Filter leads
  const filteredLeads = initialLeads.filter((lead) => {
    const matchesSearch =
      searchQuery === '' ||
      lead.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.organisation?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      lead.contact_email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || lead.lead_type === filterType;
    return matchesSearch && matchesType;
  });

  // Group leads by stage for pipeline view
  const leadsByStage = stages.reduce((acc, stage) => {
    acc[stage] = filteredLeads.filter((lead) => lead.status === stage);
    return acc;
  }, {} as Record<string, Lead[]>);

  const handleAddNote = (leadId: string, note: string) => {
    setNotes((prev) => ({
      ...prev,
      [leadId]: note,
    }));
    console.log('[LEAD NOTE] Added note to lead', { leadId, note, user: user.email });
  };

  const handleSetNextAction = (leadId: string, date: string) => {
    setNextActionDates((prev) => ({
      ...prev,
      [leadId]: date,
    }));
    console.log('[LEAD REMINDER] Set next action date', { leadId, date, user: user.email });
  };

  const handleAssign = (leadId: string, userId: string) => {
    setAssignments((prev) => ({
      ...prev,
      [leadId]: userId,
    }));
    const assignee = teamMembers.find((m) => m.id === userId);
    console.log('[LEAD ASSIGNMENT] Assigned lead', { leadId, userId, assigneeName: assignee?.name, user: user.email });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Lead Hub"
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

              {/* Type Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6560]" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none appearance-none bg-white"
                >
                  <option value="all">Alle types</option>
                  {Object.entries(typeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex border border-[#0C0C0C]/10">
                <button
                  onClick={() => setViewMode('pipeline')}
                  className={`px-4 py-2 text-sm ${
                    viewMode === 'pipeline' ? 'bg-[#0C0C0C] text-white' : 'text-[#6B6560]'
                  }`}
                >
                  Pipeline
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-sm ${
                    viewMode === 'list' ? 'bg-[#0C0C0C] text-white' : 'text-[#6B6560]'
                  }`}
                >
                  Lijst
                </button>
              </div>

              <button className="flex items-center gap-2 bg-[#9A6B4C] text-white px-4 py-2 text-sm font-medium hover:bg-[#BA8B6C]">
                <Plus className="w-4 h-4" />
                Nieuwe Lead
              </button>
            </div>
          </div>

          {/* Pipeline View */}
          {viewMode === 'pipeline' && (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {stages.map((stage) => (
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-shrink-0 w-72"
                >
                  <div className="bg-white border border-[#0C0C0C]/5">
                    <div className={`p-4 border-b border-[#0C0C0C]/5 ${statusColors[stage].split(' ')[0]}`}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">{statusLabels[stage]}</h3>
                        <span className="text-xs px-2 py-0.5 bg-white/50 rounded-full">
                          {leadsByStage[stage].length}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 space-y-2 min-h-[300px]">
                      {leadsByStage[stage].map((lead) => (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className="p-3 bg-[#FAF7F2] hover:bg-[#F0EAE0] cursor-pointer transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-xs px-2 py-0.5 bg-[#0C0C0C]/5 rounded">
                              {typeLabels[lead.lead_type]}
                            </span>
                            {nextActionDates[lead.id] && (
                              <Clock className="w-3 h-3 text-[#9A6B4C]" />
                            )}
                          </div>
                          <p className="font-medium text-sm text-[#0C0C0C] truncate">
                            {lead.organisation}
                          </p>
                          <p className="text-xs text-[#6B6560] truncate">{lead.contact_name}</p>
                          {lead.budget_band && (
                            <p className="text-xs text-[#9A6B4C] mt-1">{lead.budget_band}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="bg-white border border-[#0C0C0C]/5">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#0C0C0C]/5 text-left">
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Organisatie</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Contact</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Type</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Status</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Budget</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Toegewezen</th>
                      <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Actie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="border-b border-[#0C0C0C]/5 hover:bg-[#FAF7F2] cursor-pointer"
                      >
                        <td className="p-4">
                          <p className="font-medium text-[#0C0C0C]">{lead.organisation}</p>
                          <p className="text-xs text-[#6B6560]">{lead.location}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-[#0C0C0C]">{lead.contact_name}</p>
                          <p className="text-xs text-[#6B6560]">{lead.contact_email}</p>
                        </td>
                        <td className="p-4">
                          <span className="text-xs px-2 py-1 bg-[#0C0C0C]/5 rounded">
                            {typeLabels[lead.lead_type]}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded border ${statusColors[lead.status]}`}>
                            {statusLabels[lead.status]}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-[#0C0C0C]">{lead.budget_band || '-'}</td>
                        <td className="p-4">
                          {assignments[lead.id] ? (
                            <span className="text-xs text-[#6B6560]">
                              {teamMembers.find((m) => m.id === assignments[lead.id])?.name}
                            </span>
                          ) : (
                            <span className="text-xs text-[#6B6560]/50">Niet toegewezen</span>
                          )}
                        </td>
                        <td className="p-4">
                          <ChevronRight className="w-4 h-4 text-[#6B6560]" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-[#0C0C0C]/5 flex items-start justify-between">
              <div>
                <span className={`text-xs px-2 py-1 rounded border ${statusColors[selectedLead.status]}`}>
                  {statusLabels[selectedLead.status]}
                </span>
                <h2 className="font-semibold text-xl text-[#0C0C0C] mt-2">
                  {selectedLead.organisation}
                </h2>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-[#FAF7F2]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-[#FAF7F2]">
                  <User className="w-4 h-4 text-[#9A6B4C]" />
                  <div>
                    <p className="text-xs text-[#6B6560]">Contact</p>
                    <p className="text-sm font-medium text-[#0C0C0C]">{selectedLead.contact_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#FAF7F2]">
                  <Mail className="w-4 h-4 text-[#9A6B4C]" />
                  <div>
                    <p className="text-xs text-[#6B6560]">Email</p>
                    <a href={`mailto:${selectedLead.contact_email}`} className="text-sm text-[#9A6B4C] hover:underline">
                      {selectedLead.contact_email}
                    </a>
                  </div>
                </div>
                {selectedLead.contact_phone && (
                  <div className="flex items-center gap-3 p-3 bg-[#FAF7F2]">
                    <Phone className="w-4 h-4 text-[#9A6B4C]" />
                    <div>
                      <p className="text-xs text-[#6B6560]">Telefoon</p>
                      <a href={`tel:${selectedLead.contact_phone}`} className="text-sm text-[#9A6B4C] hover:underline">
                        {selectedLead.contact_phone}
                      </a>
                    </div>
                  </div>
                )}
                {selectedLead.location && (
                  <div className="flex items-center gap-3 p-3 bg-[#FAF7F2]">
                    <MapPin className="w-4 h-4 text-[#9A6B4C]" />
                    <div>
                      <p className="text-xs text-[#6B6560]">Locatie</p>
                      <p className="text-sm font-medium text-[#0C0C0C]">{selectedLead.location}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Lead Details */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-3 border border-[#0C0C0C]/5">
                  <p className="text-xs text-[#6B6560]">Type</p>
                  <p className="text-sm font-medium text-[#0C0C0C]">{typeLabels[selectedLead.lead_type]}</p>
                </div>
                {selectedLead.budget_band && (
                  <div className="p-3 border border-[#0C0C0C]/5">
                    <p className="text-xs text-[#6B6560]">Budget</p>
                    <p className="text-sm font-medium text-[#0C0C0C]">{selectedLead.budget_band}</p>
                  </div>
                )}
                {selectedLead.timing && (
                  <div className="p-3 border border-[#0C0C0C]/5">
                    <p className="text-xs text-[#6B6560]">Timing</p>
                    <p className="text-sm font-medium text-[#0C0C0C]">{selectedLead.timing}</p>
                  </div>
                )}
              </div>

              {/* Message */}
              {selectedLead.message && (
                <div className="p-4 bg-[#FAF7F2] border-l-4 border-[#9A6B4C]">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-[#9A6B4C]" />
                    <p className="text-xs font-medium text-[#6B6560]">Bericht</p>
                  </div>
                  <p className="text-sm text-[#0C0C0C]">{selectedLead.message}</p>
                </div>
              )}

              {/* Assignment */}
              <div>
                <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                  Toewijzen aan
                </label>
                <select
                  value={assignments[selectedLead.id] || ''}
                  onChange={(e) => handleAssign(selectedLead.id, e.target.value)}
                  className="w-full p-3 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                >
                  <option value="">-- Selecteer teamlid --</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* Next Action Date */}
              <div>
                <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#9A6B4C]" />
                    Volgende actie datum
                  </div>
                </label>
                <input
                  type="date"
                  value={nextActionDates[selectedLead.id] || ''}
                  onChange={(e) => handleSetNextAction(selectedLead.id, e.target.value)}
                  className="w-full p-3 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-[#0C0C0C] mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#9A6B4C]" />
                    Notities
                  </div>
                </label>
                <textarea
                  value={notes[selectedLead.id] || ''}
                  onChange={(e) => setNotes((prev) => ({ ...prev, [selectedLead.id]: e.target.value }))}
                  placeholder="Voeg notities toe..."
                  rows={3}
                  className="w-full p-3 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none resize-none"
                />
                <button
                  onClick={() => handleAddNote(selectedLead.id, notes[selectedLead.id] || '')}
                  className="mt-2 px-4 py-2 bg-[#0C0C0C] text-white text-sm hover:bg-[#9A6B4C]"
                >
                  Opslaan
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-[#0C0C0C]/5">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-[#0C0C0C]/10 text-[#0C0C0C] hover:bg-[#FAF7F2]">
                  <AlertCircle className="w-4 h-4" />
                  Markeer als Verloren
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#9A6B4C] text-white hover:bg-[#BA8B6C]">
                  <CheckCircle className="w-4 h-4" />
                  Markeer als Gewonnen
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
