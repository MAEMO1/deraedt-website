'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Wrench,
  MapPin,
  Clock,
  AlertTriangle,
  User,
  MessageSquare,
  X,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Image as ImageIcon,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile } from '@/lib/supabase/types';

interface FacilityClientProps {
  user: Profile;
}

interface Ticket {
  id: string;
  reference: string;
  title: string;
  description: string;
  location: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'waiting' | 'resolved';
  sla_due_at: string;
  assigned_to?: string;
  assigned_name?: string;
  reporter_name: string;
  reporter_email: string;
  reporter_phone?: string;
  photos?: string[];
  notes?: string[];
  created_at: string;
  updated_at: string;
}

// Mock tickets data
const mockTickets: Ticket[] = [
  {
    id: 'tkt-001',
    reference: 'FAC-2026-001',
    title: 'Lekkage plafond hal B',
    description: 'Waterlekkage aan het plafond bij de ingang van hal B. Druppels vallen op de vloer, potentieel gevaarlijk.',
    location: 'Kantoor Evergem - Hal B',
    urgency: 'high',
    status: 'in_progress',
    sla_due_at: '2026-01-17T14:00:00Z',
    assigned_to: 'user-002',
    assigned_name: 'Jan Vermeersch',
    reporter_name: 'Marie Peeters',
    reporter_email: 'marie.peeters@bedrijf.be',
    reporter_phone: '+32 478 12 34 56',
    photos: ['/uploads/ticket-001-1.jpg', '/uploads/ticket-001-2.jpg'],
    notes: ['Eerste inspectie gedaan - leidingwerk boven plafond'],
    created_at: '2026-01-15T09:30:00Z',
    updated_at: '2026-01-15T14:20:00Z',
  },
  {
    id: 'tkt-002',
    reference: 'FAC-2026-002',
    title: 'Verwarming defect vergaderzaal',
    description: 'Verwarming in vergaderzaal 2 werkt niet meer. Temperatuur daalt onder de 15 graden.',
    location: 'Kantoor Evergem - Vergaderzaal 2',
    urgency: 'medium',
    status: 'open',
    sla_due_at: '2026-01-18T17:00:00Z',
    reporter_name: 'Thomas De Smet',
    reporter_email: 'thomas.desmet@bedrijf.be',
    created_at: '2026-01-16T08:15:00Z',
    updated_at: '2026-01-16T08:15:00Z',
  },
  {
    id: 'tkt-003',
    reference: 'FAC-2026-003',
    title: 'Stroomuitval serverruimte',
    description: 'Gedeeltelijke stroomuitval in serverruimte. Noodstroom werkt maar moet dringend bekeken worden.',
    location: 'Kantoor Evergem - Serverruimte',
    urgency: 'critical',
    status: 'in_progress',
    sla_due_at: '2026-01-16T12:00:00Z',
    assigned_to: 'user-003',
    assigned_name: 'Pieter Claes',
    reporter_name: 'IT Dienst',
    reporter_email: 'it@bedrijf.be',
    reporter_phone: '+32 9 348 48 41',
    notes: ['Elektricien onderweg', 'Noodstroom houdt het nog 4 uur'],
    created_at: '2026-01-16T07:00:00Z',
    updated_at: '2026-01-16T09:30:00Z',
  },
  {
    id: 'tkt-004',
    reference: 'FAC-2026-004',
    title: 'Deur sluit niet goed',
    description: 'Achterdeur van magazijn sluit niet goed meer, wind komt binnen.',
    location: 'Magazijn Evergem - Achterdeur',
    urgency: 'low',
    status: 'waiting',
    sla_due_at: '2026-01-20T17:00:00Z',
    assigned_to: 'user-002',
    assigned_name: 'Jan Vermeersch',
    reporter_name: 'Koen Janssens',
    reporter_email: 'koen.janssens@bedrijf.be',
    notes: ['Wachten op vervangstuk deurpomp'],
    created_at: '2026-01-14T11:00:00Z',
    updated_at: '2026-01-15T10:00:00Z',
  },
  {
    id: 'tkt-005',
    reference: 'FAC-2026-005',
    title: 'Parkeerplaats verlichting',
    description: 'Verlichting op parkeerplaats deels uitgevallen. Veiligheidsprobleem in donkere uren.',
    location: 'Parking Evergem',
    urgency: 'medium',
    status: 'resolved',
    sla_due_at: '2026-01-15T17:00:00Z',
    assigned_to: 'user-003',
    assigned_name: 'Pieter Claes',
    reporter_name: 'Receptie',
    reporter_email: 'receptie@bedrijf.be',
    notes: ['Lampen vervangen', 'Probleem opgelost'],
    created_at: '2026-01-12T16:00:00Z',
    updated_at: '2026-01-14T15:30:00Z',
  },
];

// Mock team members for assignment
const teamMembers = [
  { id: 'user-001', name: 'Sophie De Raedt' },
  { id: 'user-002', name: 'Jan Vermeersch' },
  { id: 'user-003', name: 'Pieter Claes' },
  { id: 'user-004', name: 'Els Vandenberghe' },
];

const roleLabels: Record<string, string> = {
  DIRECTIE: 'Directie',
  SALES: 'Sales',
  HR: 'HR',
  OPERATIONS: 'Operations',
  ADMIN: 'Administrator',
  VIEWER: 'Viewer',
};

const urgencyLabels: Record<string, string> = {
  low: 'Laag',
  medium: 'Medium',
  high: 'Hoog',
  critical: 'Kritiek',
};

const urgencyColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-700 border-gray-200',
  medium: 'bg-blue-100 text-blue-700 border-blue-200',
  high: 'bg-amber-100 text-amber-700 border-amber-200',
  critical: 'bg-red-100 text-red-700 border-red-200',
};

const statusLabels: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Behandeling',
  waiting: 'Wachtend',
  resolved: 'Opgelost',
};

const statusColors: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700 border-blue-200',
  in_progress: 'bg-amber-100 text-amber-700 border-amber-200',
  waiting: 'bg-purple-100 text-purple-700 border-purple-200',
  resolved: 'bg-green-100 text-green-700 border-green-200',
};

export function FacilityClient({ user }: FacilityClientProps) {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const displayName = user.full_name || user.email.split('@')[0];

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      searchQuery === '' ||
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesUrgency = filterUrgency === 'all' || ticket.urgency === filterUrgency;
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  // Sort by urgency (critical first) then by SLA
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    }
    return new Date(a.sla_due_at).getTime() - new Date(b.sla_due_at).getTime();
  });

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('nl-BE', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSLAStatus = (slaDueAt: string, status: string) => {
    if (status === 'resolved') {
      return { text: 'Opgelost', color: 'text-green-600', overdue: false };
    }

    const now = new Date();
    const dueDate = new Date(slaDueAt);
    const hoursUntil = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntil < 0) {
      return { text: 'Overschreden', color: 'text-red-600', overdue: true };
    }
    if (hoursUntil <= 2) {
      return { text: `${Math.round(hoursUntil * 60)}min`, color: 'text-red-600', overdue: false };
    }
    if (hoursUntil <= 24) {
      return { text: `${Math.round(hoursUntil)}u`, color: 'text-amber-600', overdue: false };
    }
    return { text: formatDateTime(slaDueAt), color: 'text-[#6B6560]', overdue: false };
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, status: newStatus as Ticket['status'], updated_at: new Date().toISOString() }
          : t
      )
    );

    // Update selected ticket if open
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket((prev) =>
        prev ? { ...prev, status: newStatus as Ticket['status'], updated_at: new Date().toISOString() } : null
      );
    }

    console.log('[TICKET STATUS CHANGE]', {
      ticket_id: ticketId,
      new_status: newStatus,
      user: user.email,
      timestamp: new Date().toISOString(),
    });
  };

  const handleAssignmentChange = (ticketId: string, assignedTo: string) => {
    const member = teamMembers.find((m) => m.id === assignedTo);
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              assigned_to: assignedTo || undefined,
              assigned_name: member?.name,
              updated_at: new Date().toISOString(),
            }
          : t
      )
    );

    // Update selected ticket if open
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket((prev) =>
        prev
          ? {
              ...prev,
              assigned_to: assignedTo || undefined,
              assigned_name: member?.name,
              updated_at: new Date().toISOString(),
            }
          : null
      );
    }

    console.log('[TICKET ASSIGNMENT]', {
      ticket_id: ticketId,
      assigned_to: assignedTo,
      assigned_name: member?.name,
      user: user.email,
      timestamp: new Date().toISOString(),
    });
  };

  const handleCreateTicket = () => {
    console.log('[CREATE TICKET]', {
      user: user.email,
      timestamp: new Date().toISOString(),
    });
    alert('Ticket aanmaken functionaliteit. In productie opent dit een formulier of verwijst naar het publieke interventie formulier.');
  };

  // Stats
  const openTickets = tickets.filter((t) => t.status === 'open').length;
  const inProgressTickets = tickets.filter((t) => t.status === 'in_progress').length;
  const overdueTickets = tickets.filter((t) => {
    const sla = getSLAStatus(t.sla_due_at, t.status);
    return sla.overdue;
  }).length;
  const resolvedToday = tickets.filter((t) => {
    const today = new Date().toDateString();
    return t.status === 'resolved' && new Date(t.updated_at).toDateString() === today;
  }).length;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Facility Desk"
          userName={displayName}
          userRole={roleLabels[user.role] || user.role}
        />

        <main className="p-6">
          {/* Stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">Open Tickets</p>
              <p className="text-2xl font-bold text-blue-600">{openTickets}</p>
            </div>
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">In Behandeling</p>
              <p className="text-2xl font-bold text-amber-600">{inProgressTickets}</p>
            </div>
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">SLA Overschreden</p>
              <p className={`text-2xl font-bold ${overdueTickets > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {overdueTickets}
              </p>
            </div>
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">Vandaag Opgelost</p>
              <p className="text-2xl font-bold text-green-600">{resolvedToday}</p>
            </div>
          </div>

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

              {/* Urgency Filter */}
              <select
                value={filterUrgency}
                onChange={(e) => setFilterUrgency(e.target.value)}
                className="px-4 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none appearance-none bg-white"
              >
                <option value="all">Alle urgentie</option>
                {Object.entries(urgencyLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleCreateTicket}
              className="flex items-center gap-2 bg-[#0C0C0C] text-white px-4 py-2 text-sm font-medium hover:bg-[#9A6B4C]"
            >
              <Plus className="w-4 h-4" />
              Nieuw Ticket
            </button>
          </div>

          {/* Ticket List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#0C0C0C]/5"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#0C0C0C]/5 text-left">
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Ticket</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Locatie</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Urgentie</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Status</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">SLA</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Toegewezen</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase"></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTickets.map((ticket) => {
                    const slaStatus = getSLAStatus(ticket.sla_due_at, ticket.status);
                    return (
                      <tr
                        key={ticket.id}
                        className={`border-b border-[#0C0C0C]/5 hover:bg-[#FAF7F2] cursor-pointer ${
                          slaStatus.overdue ? 'bg-red-50' : ''
                        }`}
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-[#0C0C0C]">{ticket.title}</p>
                            <p className="text-xs text-[#6B6560]">{ticket.reference}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#6B6560]" />
                            <span className="text-sm text-[#0C0C0C]">{ticket.location}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded border ${urgencyColors[ticket.urgency]}`}>
                            {urgencyLabels[ticket.urgency]}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded border ${statusColors[ticket.status]}`}>
                            {statusLabels[ticket.status]}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {slaStatus.overdue && <AlertCircle className="w-4 h-4 text-red-600" />}
                            <span className={`text-sm font-medium ${slaStatus.color}`}>
                              {slaStatus.text}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#6B6560]" />
                            <span className="text-sm text-[#0C0C0C]">
                              {ticket.assigned_name || 'Niet toegewezen'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTicket(ticket);
                            }}
                            className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                          >
                            <ChevronRight className="w-4 h-4 text-[#6B6560]" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {sortedTickets.length === 0 && (
              <div className="p-12 text-center">
                <Wrench className="w-12 h-12 text-[#6B6560]/30 mx-auto mb-4" />
                <p className="text-[#6B6560]">Geen tickets gevonden</p>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-[#0C0C0C]/10 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-display text-[#0C0C0C]">{selectedTicket.title}</h2>
                <p className="text-sm text-[#6B6560]">{selectedTicket.reference}</p>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-2 hover:bg-[#0C0C0C]/5 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* SLA Warning */}
              {(() => {
                const slaStatus = getSLAStatus(selectedTicket.sla_due_at, selectedTicket.status);
                if (slaStatus.overdue) {
                  return (
                    <div className="bg-red-50 border border-red-200 p-4 rounded flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-semibold text-red-700">SLA Overschreden</p>
                        <p className="text-sm text-red-600">
                          Deadline was {formatDateTime(selectedTicket.sla_due_at)}
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Info Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-[#0C0C0C] mb-3">Details</h4>
                  <dl className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#6B6560] mt-0.5" />
                      <div>
                        <dt className="text-[#6B6560]">Locatie</dt>
                        <dd className="font-medium text-[#0C0C0C]">{selectedTicket.location}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#6B6560] mt-0.5" />
                      <div>
                        <dt className="text-[#6B6560]">Urgentie</dt>
                        <dd>
                          <span className={`text-xs px-2 py-1 rounded border ${urgencyColors[selectedTicket.urgency]}`}>
                            {urgencyLabels[selectedTicket.urgency]}
                          </span>
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-[#6B6560] mt-0.5" />
                      <div>
                        <dt className="text-[#6B6560]">SLA Deadline</dt>
                        <dd className="font-medium text-[#0C0C0C]">
                          {formatDateTime(selectedTicket.sla_due_at)}
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#0C0C0C] mb-3">Melder</h4>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-[#6B6560]">Naam</dt>
                      <dd className="font-medium text-[#0C0C0C]">{selectedTicket.reporter_name}</dd>
                    </div>
                    <div>
                      <dt className="text-[#6B6560]">Email</dt>
                      <dd>
                        <a href={`mailto:${selectedTicket.reporter_email}`} className="text-[#9A6B4C] hover:underline">
                          {selectedTicket.reporter_email}
                        </a>
                      </dd>
                    </div>
                    {selectedTicket.reporter_phone && (
                      <div>
                        <dt className="text-[#6B6560]">Telefoon</dt>
                        <dd>
                          <a href={`tel:${selectedTicket.reporter_phone}`} className="text-[#9A6B4C] hover:underline">
                            {selectedTicket.reporter_phone}
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-[#0C0C0C] mb-2">Beschrijving</h4>
                <p className="text-sm text-[#6B6560] bg-[#FAF7F2] p-4 rounded">
                  {selectedTicket.description}
                </p>
              </div>

              {/* Photos */}
              {selectedTicket.photos && selectedTicket.photos.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-[#0C0C0C] mb-2">Foto&apos;s</h4>
                  <div className="flex gap-2">
                    {selectedTicket.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="w-20 h-20 bg-[#FAF7F2] border border-[#0C0C0C]/10 rounded flex items-center justify-center"
                      >
                        <ImageIcon className="w-6 h-6 text-[#6B6560]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Change */}
              <div>
                <h4 className="text-sm font-semibold text-[#0C0C0C] mb-2">Status</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => handleStatusChange(selectedTicket.id, value)}
                      className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                        selectedTicket.status === value
                          ? statusColors[value]
                          : 'border-[#0C0C0C]/10 hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {selectedTicket.status === value && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assignment */}
              <div>
                <h4 className="text-sm font-semibold text-[#0C0C0C] mb-2">Toewijzen aan</h4>
                <select
                  value={selectedTicket.assigned_to || ''}
                  onChange={(e) => handleAssignmentChange(selectedTicket.id, e.target.value)}
                  className="w-full px-4 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none bg-white"
                >
                  <option value="">Niet toegewezen</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              {selectedTicket.notes && selectedTicket.notes.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-[#0C0C0C] mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Notities
                  </h4>
                  <ul className="space-y-2">
                    {selectedTicket.notes.map((note, index) => (
                      <li key={index} className="text-sm text-[#6B6560] bg-[#FAF7F2] p-3 rounded">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Timestamps */}
              <div className="pt-4 border-t border-[#0C0C0C]/10 text-xs text-[#6B6560]">
                <p>Aangemaakt: {formatDateTime(selectedTicket.created_at)}</p>
                <p>Laatst bijgewerkt: {formatDateTime(selectedTicket.updated_at)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
