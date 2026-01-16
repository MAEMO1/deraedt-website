'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Shield,
  Calendar,
  Building2,
  AlertTriangle,
  Download,
  CheckSquare,
  Square,
  Package,
  Upload,
  Eye,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile } from '@/lib/supabase/types';

// Import seed data for demo
import complianceData from '@/scripts/seed/compliance_docs.json';

interface ComplianceClientProps {
  user: Profile;
}

interface ComplianceDoc {
  id: string;
  name: string;
  doc_type: string;
  issuer: string;
  reference_number: string;
  valid_from: string;
  valid_to: string;
  scope?: string;
  is_public: boolean;
  include_in_tender_pack: boolean;
  notes?: string;
}

const complianceDocs: ComplianceDoc[] = complianceData as ComplianceDoc[];

// Calculate status from expiry date
function getStatusFromExpiry(validTo: string): string {
  const expiryDate = new Date(validTo);
  const now = new Date();
  const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) return 'expired';
  if (daysUntil <= 30) return 'expiring_soon';
  return 'valid';
}

const roleLabels: Record<string, string> = {
  DIRECTIE: 'Directie',
  SALES: 'Sales',
  HR: 'HR',
  OPERATIONS: 'Operations',
  ADMIN: 'Administrator',
  VIEWER: 'Viewer',
};

const docTypeLabels: Record<string, string> = {
  iso: 'ISO Certificaat',
  vca: 'VCA Certificaat',
  co2: 'CO₂ Prestatieladder',
  erkenning: 'Erkenning',
  insurance: 'Verzekering',
  policy: 'Beleidsdocument',
};

const docTypeIcons: Record<string, string> = {
  iso: '🏆',
  vca: '🛡️',
  co2: '🌱',
  erkenning: '🏗️',
  insurance: '📋',
  policy: '📖',
};

const statusLabels: Record<string, string> = {
  valid: 'Geldig',
  expiring_soon: 'Bijna Verlopen',
  expired: 'Verlopen',
  pending_renewal: 'In Verlenging',
};

const statusColors: Record<string, string> = {
  valid: 'bg-green-100 text-green-700 border-green-200',
  expiring_soon: 'bg-amber-100 text-amber-700 border-amber-200',
  expired: 'bg-red-100 text-red-700 border-red-200',
  pending_renewal: 'bg-blue-100 text-blue-700 border-blue-200',
};

export function ComplianceClient({ user }: ComplianceClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const [showExpiryRadar, setShowExpiryRadar] = useState(true);

  const displayName = user.full_name || user.email.split('@')[0];

  // Calculate days until expiry for each doc
  const getExpiryInfo = (validTo: string) => {
    const expiryDate = new Date(validTo);
    const now = new Date();
    const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return { days: daysUntil, status: 'expired', color: 'text-red-600' };
    if (daysUntil <= 30) return { days: daysUntil, status: '30', color: 'text-red-600' };
    if (daysUntil <= 60) return { days: daysUntil, status: '60', color: 'text-amber-600' };
    if (daysUntil <= 90) return { days: daysUntil, status: '90', color: 'text-amber-500' };
    return { days: daysUntil, status: 'valid', color: 'text-green-600' };
  };

  // Categorize documents by expiry
  const expiryRadar = {
    expired: complianceDocs.filter((doc) => getExpiryInfo(doc.valid_to).status === 'expired'),
    within30: complianceDocs.filter((doc) => getExpiryInfo(doc.valid_to).status === '30'),
    within60: complianceDocs.filter((doc) => getExpiryInfo(doc.valid_to).status === '60'),
    within90: complianceDocs.filter((doc) => getExpiryInfo(doc.valid_to).status === '90'),
  };

  // Filter documents
  const filteredDocs = complianceDocs.filter((doc) => {
    const matchesSearch =
      searchQuery === '' ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || doc.doc_type === filterType;
    return matchesSearch && matchesType;
  });

  // Get unique document types
  const docTypes = [...new Set(complianceDocs.map((doc) => doc.doc_type))];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-BE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const toggleDocSelection = (docId: string) => {
    setSelectedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(docId)) {
        next.delete(docId);
      } else {
        next.add(docId);
      }
      return next;
    });
  };

  const selectAllDocs = () => {
    if (selectedDocs.size === filteredDocs.length) {
      setSelectedDocs(new Set());
    } else {
      setSelectedDocs(new Set(filteredDocs.map((doc) => doc.id)));
    }
  };

  const handleExportTenderPack = () => {
    const selectedDocsList = complianceDocs.filter((doc) => selectedDocs.has(doc.id));

    // Log the export (in production, this would generate a PDF/ZIP)
    console.log('[TENDER PACK EXPORT]', {
      user: user.email,
      timestamp: new Date().toISOString(),
      documents: selectedDocsList.map((doc) => ({
        id: doc.id,
        name: doc.name,
        type: doc.doc_type,
        valid_to: doc.valid_to,
      })),
    });

    alert(
      `Tender Pack met ${selectedDocs.size} document(en) wordt samengesteld.\n\nIn productie wordt een ZIP/PDF gegenereerd met:\n${selectedDocsList.map((d) => `- ${d.name}`).join('\n')}`
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Compliance Vault"
          userName={displayName}
          userRole={roleLabels[user.role] || user.role}
        />

        <main className="p-6">
          {/* Expiry Radar */}
          {showExpiryRadar && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="bg-white border border-[#0C0C0C]/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-display text-[#0C0C0C] flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Expiry Radar
                  </h2>
                  <button
                    onClick={() => setShowExpiryRadar(false)}
                    className="text-sm text-[#6B6560] hover:text-[#0C0C0C]"
                  >
                    Verbergen
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Expired */}
                  <div className={`p-4 rounded-lg border ${expiryRadar.expired.length > 0 ? 'bg-red-50 border-red-200' : 'bg-[#FAF7F2] border-[#0C0C0C]/5'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-red-700 uppercase">Verlopen</span>
                      <span className={`text-2xl font-bold ${expiryRadar.expired.length > 0 ? 'text-red-600' : 'text-[#6B6560]'}`}>
                        {expiryRadar.expired.length}
                      </span>
                    </div>
                    {expiryRadar.expired.length > 0 && (
                      <ul className="text-xs text-red-700 space-y-1">
                        {expiryRadar.expired.slice(0, 2).map((doc) => (
                          <li key={doc.id} className="truncate">{doc.name}</li>
                        ))}
                        {expiryRadar.expired.length > 2 && (
                          <li className="italic">+{expiryRadar.expired.length - 2} meer</li>
                        )}
                      </ul>
                    )}
                  </div>

                  {/* Within 30 days */}
                  <div className={`p-4 rounded-lg border ${expiryRadar.within30.length > 0 ? 'bg-red-50 border-red-200' : 'bg-[#FAF7F2] border-[#0C0C0C]/5'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-red-700 uppercase">30 dagen</span>
                      <span className={`text-2xl font-bold ${expiryRadar.within30.length > 0 ? 'text-red-600' : 'text-[#6B6560]'}`}>
                        {expiryRadar.within30.length}
                      </span>
                    </div>
                    {expiryRadar.within30.length > 0 && (
                      <ul className="text-xs text-red-700 space-y-1">
                        {expiryRadar.within30.slice(0, 2).map((doc) => (
                          <li key={doc.id} className="truncate">{doc.name}</li>
                        ))}
                        {expiryRadar.within30.length > 2 && (
                          <li className="italic">+{expiryRadar.within30.length - 2} meer</li>
                        )}
                      </ul>
                    )}
                  </div>

                  {/* Within 60 days */}
                  <div className={`p-4 rounded-lg border ${expiryRadar.within60.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-[#FAF7F2] border-[#0C0C0C]/5'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-amber-700 uppercase">60 dagen</span>
                      <span className={`text-2xl font-bold ${expiryRadar.within60.length > 0 ? 'text-amber-600' : 'text-[#6B6560]'}`}>
                        {expiryRadar.within60.length}
                      </span>
                    </div>
                    {expiryRadar.within60.length > 0 && (
                      <ul className="text-xs text-amber-700 space-y-1">
                        {expiryRadar.within60.slice(0, 2).map((doc) => (
                          <li key={doc.id} className="truncate">{doc.name}</li>
                        ))}
                        {expiryRadar.within60.length > 2 && (
                          <li className="italic">+{expiryRadar.within60.length - 2} meer</li>
                        )}
                      </ul>
                    )}
                  </div>

                  {/* Within 90 days */}
                  <div className={`p-4 rounded-lg border ${expiryRadar.within90.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-[#FAF7F2] border-[#0C0C0C]/5'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-amber-700 uppercase">90 dagen</span>
                      <span className={`text-2xl font-bold ${expiryRadar.within90.length > 0 ? 'text-amber-500' : 'text-[#6B6560]'}`}>
                        {expiryRadar.within90.length}
                      </span>
                    </div>
                    {expiryRadar.within90.length > 0 && (
                      <ul className="text-xs text-amber-700 space-y-1">
                        {expiryRadar.within90.slice(0, 2).map((doc) => (
                          <li key={doc.id} className="truncate">{doc.name}</li>
                        ))}
                        {expiryRadar.within90.length > 2 && (
                          <li className="italic">+{expiryRadar.within90.length - 2} meer</li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

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
                  {docTypes.map((type) => (
                    <option key={type} value={type}>
                      {docTypeLabels[type] || type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Upload button */}
              <button className="flex items-center gap-2 border border-[#0C0C0C]/10 text-[#0C0C0C] px-4 py-2 text-sm font-medium hover:bg-[#0C0C0C]/5">
                <Upload className="w-4 h-4" />
                Document Uploaden
              </button>

              {/* Tender Pack Export */}
              <button
                onClick={handleExportTenderPack}
                disabled={selectedDocs.size === 0}
                className="flex items-center gap-2 bg-[#0C0C0C] text-white px-4 py-2 text-sm font-medium hover:bg-[#9A6B4C] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Package className="w-4 h-4" />
                Tender Pack ({selectedDocs.size})
              </button>
            </div>
          </div>

          {/* Document List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#0C0C0C]/5"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#0C0C0C]/5 text-left">
                    <th className="p-4">
                      <button
                        onClick={selectAllDocs}
                        className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                      >
                        {selectedDocs.size === filteredDocs.length && filteredDocs.length > 0 ? (
                          <CheckSquare className="w-4 h-4 text-[#9A6B4C]" />
                        ) : (
                          <Square className="w-4 h-4 text-[#6B6560]" />
                        )}
                      </button>
                    </th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Document</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Type</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Uitgever</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Geldig tot</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Status</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase">Scope</th>
                    <th className="p-4 text-xs font-semibold text-[#6B6560] uppercase"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocs.map((doc) => {
                    const expiryInfo = getExpiryInfo(doc.valid_to);
                    const isSelected = selectedDocs.has(doc.id);

                    return (
                      <tr
                        key={doc.id}
                        className={`border-b border-[#0C0C0C]/5 hover:bg-[#FAF7F2] cursor-pointer ${
                          isSelected ? 'bg-[#9A6B4C]/5' : ''
                        }`}
                        onClick={() => toggleDocSelection(doc.id)}
                      >
                        <td className="p-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDocSelection(doc.id);
                            }}
                            className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-[#9A6B4C]" />
                            ) : (
                              <Square className="w-4 h-4 text-[#6B6560]" />
                            )}
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center bg-[#9A6B4C]/10 rounded text-lg">
                              {docTypeIcons[doc.doc_type] || '📄'}
                            </div>
                            <div>
                              <p className="font-medium text-[#0C0C0C]">{doc.name}</p>
                              <p className="text-xs text-[#6B6560]">
                                Geldig vanaf {formatDate(doc.valid_from)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-[#0C0C0C]">
                            {docTypeLabels[doc.doc_type] || doc.doc_type}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#6B6560]" />
                            <span className="text-sm text-[#0C0C0C]">{doc.issuer}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Calendar className={`w-4 h-4 ${expiryInfo.color}`} />
                            <div>
                              <p className={`text-sm font-medium ${expiryInfo.color}`}>
                                {formatDate(doc.valid_to)}
                              </p>
                              <p className={`text-xs ${expiryInfo.color}`}>
                                {expiryInfo.days < 0
                                  ? `${Math.abs(expiryInfo.days)}d verlopen`
                                  : `${expiryInfo.days}d`}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded border ${statusColors[getStatusFromExpiry(doc.valid_to)]}`}>
                            {statusLabels[getStatusFromExpiry(doc.valid_to)]}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-[#6B6560]">{doc.scope || '-'}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // View document
                                console.log('[VIEW DOC]', doc.id);
                              }}
                              className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                              title="Bekijken"
                            >
                              <Eye className="w-4 h-4 text-[#6B6560]" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Download document
                                console.log('[DOWNLOAD DOC]', doc.id);
                              }}
                              className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                              title="Downloaden"
                            >
                              <Download className="w-4 h-4 text-[#6B6560]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredDocs.length === 0 && (
              <div className="p-12 text-center">
                <Shield className="w-12 h-12 text-[#6B6560]/30 mx-auto mb-4" />
                <p className="text-[#6B6560]">Geen documenten gevonden</p>
              </div>
            )}
          </motion.div>

          {/* Tender Pack Template Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 bg-[#9A6B4C]/10 border border-[#9A6B4C]/20 p-6"
          >
            <div className="flex items-start gap-4">
              <Package className="w-6 h-6 text-[#9A6B4C] flex-shrink-0" />
              <div>
                <h3 className="font-display text-lg text-[#0C0C0C] mb-2">Tender Pack Templates</h3>
                <p className="text-sm text-[#6B6560] mb-4">
                  Selecteer documenten in de lijst en klik op &quot;Tender Pack&quot; om een downloadbaar pakket samen te stellen.
                  Ideaal voor aanbestedingen waar alle certificaten in één keer moeten worden aangeleverd.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-white text-[#0C0C0C] rounded">ISO certificaten</span>
                  <span className="text-xs px-2 py-1 bg-white text-[#0C0C0C] rounded">VCA certificaten</span>
                  <span className="text-xs px-2 py-1 bg-white text-[#0C0C0C] rounded">Verzekeringen</span>
                  <span className="text-xs px-2 py-1 bg-white text-[#0C0C0C] rounded">Erkenningen</span>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
