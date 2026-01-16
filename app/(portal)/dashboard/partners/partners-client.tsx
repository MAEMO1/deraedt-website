'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  AlertTriangle,
  X,
  Check,
  Eye,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile } from '@/lib/supabase/types';

interface PartnersClientProps {
  user: Profile;
}

interface PartnerDocument {
  id: string;
  type: 'vca' | 'insurance' | 'reference' | 'kvk' | 'other';
  name: string;
  file_url?: string;
  valid_from?: string;
  valid_to?: string;
  status: 'missing' | 'pending' | 'approved' | 'expired';
  uploaded_at?: string;
}

interface Partner {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  address?: string;
  specialty: string;
  status: 'pending' | 'approved' | 'blocked';
  documents: PartnerDocument[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Mock partners data
const mockPartners: Partner[] = [
  {
    id: 'partner-001',
    company_name: 'Elektro Vandenberghe BVBA',
    contact_name: 'Marc Vandenberghe',
    contact_email: 'marc@elektrovandenberghe.be',
    contact_phone: '+32 477 12 34 56',
    address: 'Industrielaan 25, 9040 Gent',
    specialty: 'Elektriciteit',
    status: 'approved',
    documents: [
      {
        id: 'doc-001',
        type: 'vca',
        name: 'VCA* Certificaat',
        file_url: '/uploads/partner-001-vca.pdf',
        valid_from: '2025-01-01',
        valid_to: '2028-01-01',
        status: 'approved',
        uploaded_at: '2025-01-15T10:00:00Z',
      },
      {
        id: 'doc-002',
        type: 'insurance',
        name: 'BA Verzekering',
        file_url: '/uploads/partner-001-insurance.pdf',
        valid_from: '2026-01-01',
        valid_to: '2026-12-31',
        status: 'approved',
        uploaded_at: '2026-01-05T14:30:00Z',
      },
      {
        id: 'doc-003',
        type: 'reference',
        name: 'Referenties',
        file_url: '/uploads/partner-001-refs.pdf',
        status: 'approved',
        uploaded_at: '2025-01-15T10:15:00Z',
      },
    ],
    notes: 'Betrouwbare partner, werkt al 5 jaar samen met ons.',
    created_at: '2023-03-15T09:00:00Z',
    updated_at: '2026-01-05T14:30:00Z',
  },
  {
    id: 'partner-002',
    company_name: 'Sanitair Solutions NV',
    contact_name: 'Katrien De Wit',
    contact_email: 'katrien@sanitairsolutions.be',
    contact_phone: '+32 479 23 45 67',
    address: 'Havenstraat 12, 9000 Gent',
    specialty: 'Sanitair & HVAC',
    status: 'pending',
    documents: [
      {
        id: 'doc-004',
        type: 'vca',
        name: 'VCA* Certificaat',
        file_url: '/uploads/partner-002-vca.pdf',
        valid_from: '2024-06-01',
        valid_to: '2027-06-01',
        status: 'pending',
        uploaded_at: '2026-01-14T11:00:00Z',
      },
      {
        id: 'doc-005',
        type: 'insurance',
        name: 'BA Verzekering',
        status: 'missing',
      },
      {
        id: 'doc-006',
        type: 'reference',
        name: 'Referenties',
        status: 'missing',
      },
    ],
    created_at: '2026-01-14T10:00:00Z',
    updated_at: '2026-01-14T11:00:00Z',
  },
  {
    id: 'partner-003',
    company_name: 'Dakwerken Janssen',
    contact_name: 'Peter Janssen',
    contact_email: 'peter@dakwerkenjanssen.be',
    contact_phone: '+32 476 34 56 78',
    address: 'Kerkstraat 45, 9940 Evergem',
    specialty: 'Dakwerken',
    status: 'blocked',
    documents: [
      {
        id: 'doc-007',
        type: 'vca',
        name: 'VCA* Certificaat',
        file_url: '/uploads/partner-003-vca.pdf',
        valid_from: '2022-01-01',
        valid_to: '2025-01-01',
        status: 'expired',
        uploaded_at: '2022-01-15T09:00:00Z',
      },
      {
        id: 'doc-008',
        type: 'insurance',
        name: 'BA Verzekering',
        file_url: '/uploads/partner-003-insurance.pdf',
        valid_from: '2025-01-01',
        valid_to: '2025-12-31',
        status: 'expired',
        uploaded_at: '2025-01-10T10:00:00Z',
      },
      {
        id: 'doc-009',
        type: 'reference',
        name: 'Referenties',
        file_url: '/uploads/partner-003-refs.pdf',
        status: 'approved',
        uploaded_at: '2022-01-15T09:30:00Z',
      },
    ],
    notes: 'Geblokkeerd wegens verlopen documenten. Wacht op vernieuwing.',
    created_at: '2022-01-10T09:00:00Z',
    updated_at: '2025-12-15T10:00:00Z',
  },
  {
    id: 'partner-004',
    company_name: 'Schilderwerken De Meyer',
    contact_name: 'Luc De Meyer',
    contact_email: 'luc@schilderwerkendemeyer.be',
    address: 'Nieuwstraat 78, 9050 Gentbrugge',
    specialty: 'Schilderwerken',
    status: 'approved',
    documents: [
      {
        id: 'doc-010',
        type: 'vca',
        name: 'VCA* Certificaat',
        file_url: '/uploads/partner-004-vca.pdf',
        valid_from: '2025-03-01',
        valid_to: '2028-03-01',
        status: 'approved',
        uploaded_at: '2025-03-10T14:00:00Z',
      },
      {
        id: 'doc-011',
        type: 'insurance',
        name: 'BA Verzekering',
        file_url: '/uploads/partner-004-insurance.pdf',
        valid_from: '2026-01-01',
        valid_to: '2026-12-31',
        status: 'approved',
        uploaded_at: '2026-01-08T09:00:00Z',
      },
      {
        id: 'doc-012',
        type: 'reference',
        name: 'Referenties',
        file_url: '/uploads/partner-004-refs.pdf',
        status: 'approved',
        uploaded_at: '2025-03-10T14:15:00Z',
      },
    ],
    created_at: '2025-03-01T09:00:00Z',
    updated_at: '2026-01-08T09:00:00Z',
  },
];

const roleLabels: Record<string, string> = {
  DIRECTIE: 'Directie',
  SALES: 'Sales',
  HR: 'HR',
  OPERATIONS: 'Operations',
  ADMIN: 'Administrator',
  VIEWER: 'Viewer',
};

const partnerStatusLabels: Record<string, string> = {
  pending: 'In Behandeling',
  approved: 'Goedgekeurd',
  blocked: 'Geblokkeerd',
};

const partnerStatusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  approved: 'bg-green-100 text-green-700 border-green-200',
  blocked: 'bg-red-100 text-red-700 border-red-200',
};

const docStatusLabels: Record<string, string> = {
  missing: 'Ontbreekt',
  pending: 'Te Beoordelen',
  approved: 'Goedgekeurd',
  expired: 'Verlopen',
};

const docStatusColors: Record<string, string> = {
  missing: 'text-gray-500',
  pending: 'text-amber-600',
  approved: 'text-green-600',
  expired: 'text-red-600',
};

const docTypeLabels: Record<string, string> = {
  vca: 'VCA Certificaat',
  insurance: 'Verzekering',
  reference: 'Referenties',
  kvk: 'KVK Uittreksel',
  other: 'Anders',
};

const requiredDocuments = ['vca', 'insurance', 'reference'];

export function PartnersClient({ user }: PartnersClientProps) {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const displayName = user.full_name || user.email.split('@')[0];

  // Filter partners
  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      searchQuery === '' ||
      partner.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || partner.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-BE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDocExpiryStatus = (doc: PartnerDocument) => {
    if (!doc.valid_to) return null;

    const now = new Date();
    const expiryDate = new Date(doc.valid_to);
    const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return { text: 'Verlopen', color: 'text-red-600', expired: true };
    if (daysUntil <= 30) return { text: `${daysUntil}d`, color: 'text-red-600', expired: false };
    if (daysUntil <= 90) return { text: `${daysUntil}d`, color: 'text-amber-600', expired: false };
    return { text: formatDate(doc.valid_to), color: 'text-green-600', expired: false };
  };

  const getDocumentCompleteness = (documents: PartnerDocument[]) => {
    const required = requiredDocuments.length;
    const approved = documents.filter(
      (d) => requiredDocuments.includes(d.type) && d.status === 'approved'
    ).length;
    return { approved, required };
  };

  const handleStatusChange = (partnerId: string, newStatus: string) => {
    setPartners((prev) =>
      prev.map((p) =>
        p.id === partnerId
          ? { ...p, status: newStatus as Partner['status'], updated_at: new Date().toISOString() }
          : p
      )
    );

    // Update selected partner if open
    if (selectedPartner?.id === partnerId) {
      setSelectedPartner((prev) =>
        prev ? { ...prev, status: newStatus as Partner['status'], updated_at: new Date().toISOString() } : null
      );
    }

    console.log('[PARTNER STATUS CHANGE]', {
      partner_id: partnerId,
      new_status: newStatus,
      user: user.email,
      timestamp: new Date().toISOString(),
    });
  };

  const handleDocumentApprove = (partnerId: string, docId: string) => {
    setPartners((prev) =>
      prev.map((p) =>
        p.id === partnerId
          ? {
              ...p,
              documents: p.documents.map((d) =>
                d.id === docId ? { ...d, status: 'approved' as const } : d
              ),
              updated_at: new Date().toISOString(),
            }
          : p
      )
    );

    // Update selected partner if open
    if (selectedPartner?.id === partnerId) {
      setSelectedPartner((prev) =>
        prev
          ? {
              ...prev,
              documents: prev.documents.map((d) =>
                d.id === docId ? { ...d, status: 'approved' as const } : d
              ),
              updated_at: new Date().toISOString(),
            }
          : null
      );
    }

    console.log('[DOCUMENT APPROVED]', {
      partner_id: partnerId,
      document_id: docId,
      user: user.email,
      timestamp: new Date().toISOString(),
    });
  };

  const handleCreatePartner = () => {
    console.log('[CREATE PARTNER]', {
      user: user.email,
      timestamp: new Date().toISOString(),
    });
    alert('Partner aanmaken functionaliteit. In productie opent dit een intake formulier.');
  };

  // Stats
  const totalPartners = partners.length;
  const approvedPartners = partners.filter((p) => p.status === 'approved').length;
  const pendingPartners = partners.filter((p) => p.status === 'pending').length;
  const expiredDocs = partners.flatMap((p) => p.documents).filter((d) => {
    const expiry = getDocExpiryStatus(d);
    return expiry?.expired;
  }).length;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Partner Prequal"
          userName={displayName}
          userRole={roleLabels[user.role] || user.role}
        />

        <main className="p-6">
          {/* Stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">Totaal Partners</p>
              <p className="text-2xl font-bold text-[#0C0C0C]">{totalPartners}</p>
            </div>
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">Goedgekeurd</p>
              <p className="text-2xl font-bold text-green-600">{approvedPartners}</p>
            </div>
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">In Behandeling</p>
              <p className="text-2xl font-bold text-amber-600">{pendingPartners}</p>
            </div>
            <div className="bg-white p-4 border border-[#0C0C0C]/5">
              <p className="text-xs text-[#6B6560]">Verlopen Documenten</p>
              <p className={`text-2xl font-bold ${expiredDocs > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {expiredDocs}
              </p>
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
                  {Object.entries(partnerStatusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleCreatePartner}
              className="flex items-center gap-2 bg-[#0C0C0C] text-white px-4 py-2 text-sm font-medium hover:bg-[#9A6B4C]"
            >
              <Plus className="w-4 h-4" />
              Nieuwe Partner
            </button>
          </div>

          {/* Partner List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#0C0C0C]/5"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#0C0C0C]/5 text-left">
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Partner</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Specialiteit</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Contact</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Documenten</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Status</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartners.map((partner) => {
                    const docCompleteness = getDocumentCompleteness(partner.documents);
                    return (
                      <tr
                        key={partner.id}
                        className="border-b border-[#0C0C0C]/5 hover:bg-[#FAF7F2] cursor-pointer"
                        onClick={() => setSelectedPartner(partner)}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#9A6B4C]/10 rounded flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-[#9A6B4C]" />
                            </div>
                            <div>
                              <p className="font-medium text-[#0C0C0C]">{partner.company_name}</p>
                              <p className="text-xs text-[#6B6560]">{partner.contact_name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-[#0C0C0C]">{partner.specialty}</span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <p className="text-[#0C0C0C]">{partner.contact_email}</p>
                            {partner.contact_phone && (
                              <p className="text-[#6B6560]">{partner.contact_phone}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {docCompleteness.approved === docCompleteness.required ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-amber-600" />
                              )}
                            </div>
                            <span className="text-sm text-[#6B6560]">
                              {docCompleteness.approved}/{docCompleteness.required}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded border ${partnerStatusColors[partner.status]}`}>
                            {partnerStatusLabels[partner.status]}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPartner(partner);
                            }}
                            className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                          >
                            <Eye className="w-4 h-4 text-[#6B6560]" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredPartners.length === 0 && (
              <div className="p-12 text-center">
                <Building2 className="w-12 h-12 text-[#6B6560]/30 mx-auto mb-4" />
                <p className="text-[#6B6560]">Geen partners gevonden</p>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Partner Detail Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-[#0C0C0C]/10 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-display text-[#0C0C0C]">{selectedPartner.company_name}</h2>
                <p className="text-sm text-[#6B6560]">{selectedPartner.specialty}</p>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="p-2 hover:bg-[#0C0C0C]/5 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-[#0C0C0C] mb-3">Contactpersoon</h4>
                  <dl className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[#6B6560]">Naam:</span>
                      <span className="font-medium text-[#0C0C0C]">{selectedPartner.contact_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#6B6560]" />
                      <a href={`mailto:${selectedPartner.contact_email}`} className="text-[#9A6B4C] hover:underline">
                        {selectedPartner.contact_email}
                      </a>
                    </div>
                    {selectedPartner.contact_phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#6B6560]" />
                        <a href={`tel:${selectedPartner.contact_phone}`} className="text-[#9A6B4C] hover:underline">
                          {selectedPartner.contact_phone}
                        </a>
                      </div>
                    )}
                    {selectedPartner.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#6B6560]" />
                        <span className="text-[#0C0C0C]">{selectedPartner.address}</span>
                      </div>
                    )}
                  </dl>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#0C0C0C] mb-3">Status</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(partnerStatusLabels).map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => handleStatusChange(selectedPartner.id, value)}
                        className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                          selectedPartner.status === value
                            ? partnerStatusColors[value]
                            : 'border-[#0C0C0C]/10 hover:bg-[#FAF7F2]'
                        }`}
                      >
                        {selectedPartner.status === value && <CheckCircle className="w-3 h-3 inline mr-1" />}
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Document Checklist */}
              <div>
                <h4 className="text-sm font-semibold text-[#0C0C0C] mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Document Checklist
                </h4>

                <div className="space-y-3">
                  {selectedPartner.documents.map((doc) => {
                    const expiryStatus = getDocExpiryStatus(doc);
                    const isRequired = requiredDocuments.includes(doc.type);

                    return (
                      <div
                        key={doc.id}
                        className={`p-4 rounded border ${
                          doc.status === 'approved'
                            ? 'bg-green-50 border-green-200'
                            : doc.status === 'expired'
                            ? 'bg-red-50 border-red-200'
                            : doc.status === 'pending'
                            ? 'bg-amber-50 border-amber-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {doc.status === 'approved' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : doc.status === 'expired' ? (
                              <XCircle className="w-5 h-5 text-red-600" />
                            ) : doc.status === 'pending' ? (
                              <Clock className="w-5 h-5 text-amber-600" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-gray-400" />
                            )}
                            <div>
                              <p className="font-medium text-[#0C0C0C]">
                                {docTypeLabels[doc.type] || doc.name}
                                {isRequired && <span className="text-red-500 ml-1">*</span>}
                              </p>
                              <p className={`text-xs ${docStatusColors[doc.status]}`}>
                                {docStatusLabels[doc.status]}
                                {expiryStatus && doc.status !== 'missing' && (
                                  <span className={`ml-2 ${expiryStatus.color}`}>
                                    • Geldig tot {expiryStatus.text}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {doc.file_url && (
                              <button
                                onClick={() => console.log('[VIEW DOC]', doc.id)}
                                className="p-1 hover:bg-white rounded text-[#6B6560]"
                                title="Bekijken"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                            {doc.status === 'missing' && (
                              <button
                                className="flex items-center gap-1 px-2 py-1 text-xs bg-white border border-[#0C0C0C]/10 hover:bg-[#FAF7F2] rounded"
                                onClick={() => console.log('[UPLOAD DOC]', doc.type)}
                              >
                                <Upload className="w-3 h-3" />
                                Uploaden
                              </button>
                            )}
                            {doc.status === 'pending' && (
                              <button
                                className="flex items-center gap-1 px-2 py-1 text-xs bg-green-600 text-white hover:bg-green-700 rounded"
                                onClick={() => handleDocumentApprove(selectedPartner.id, doc.id)}
                              >
                                <Check className="w-3 h-3" />
                                Goedkeuren
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-3 text-xs text-[#6B6560]">
                  * Verplichte documenten voor prequalificatie
                </p>
              </div>

              {/* Notes */}
              {selectedPartner.notes && (
                <div>
                  <h4 className="text-sm font-semibold text-[#0C0C0C] mb-2">Notities</h4>
                  <p className="text-sm text-[#6B6560] bg-[#FAF7F2] p-4 rounded">
                    {selectedPartner.notes}
                  </p>
                </div>
              )}

              {/* Timestamps */}
              <div className="pt-4 border-t border-[#0C0C0C]/10 text-xs text-[#6B6560]">
                <p>Geregistreerd: {formatDate(selectedPartner.created_at)}</p>
                <p>Laatst bijgewerkt: {formatDate(selectedPartner.updated_at)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
