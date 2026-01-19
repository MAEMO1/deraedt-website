'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  X,
  Loader2,
} from 'lucide-react';
import { Sidebar, DashboardHeader } from '@/components/portal';
import type { Profile, ComplianceDoc, ComplianceDocType } from '@/lib/supabase/types';
import {
  ROLE_LABELS,
  COMPLIANCE_DOC_TYPE_LABELS,
  COMPLIANCE_DOC_TYPE_ICONS,
  COMPLIANCE_STATUS_LABELS,
  COMPLIANCE_STATUS_COLORS,
  getDisplayName,
  getStatusFromExpiry,
} from '@/lib/dashboard';

interface ComplianceClientProps {
  user: Profile;
  complianceDocs: ComplianceDoc[];
}

const DOC_TYPE_OPTIONS: { value: ComplianceDocType; label: string }[] = [
  { value: 'iso', label: 'ISO Certificaat' },
  { value: 'vca', label: 'VCA Certificaat' },
  { value: 'co2', label: 'CO₂ Prestatieladder' },
  { value: 'insurance', label: 'Verzekering' },
  { value: 'erkenning', label: 'Erkenning' },
  { value: 'policy', label: 'Beleidsdocument' },
  { value: 'other', label: 'Andere' },
];

interface UploadFormData {
  name: string;
  doc_type: ComplianceDocType;
  issuer: string;
  reference_number: string;
  scope: string;
  valid_from: string;
  valid_to: string;
}

export function ComplianceClient({ user, complianceDocs }: ComplianceClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const [showExpiryRadar, setShowExpiryRadar] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadForm, setUploadForm] = useState<UploadFormData>({
    name: '',
    doc_type: 'iso',
    issuer: '',
    reference_number: '',
    scope: '',
    valid_from: '',
    valid_to: '',
  });

  const displayName = getDisplayName(user);

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
      (doc.issuer?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        alert('Alleen PDF en afbeeldingen (JPG, PNG, WebP) zijn toegestaan');
        return;
      }

      if (file.size > maxSize) {
        alert('Bestand mag maximaal 10MB zijn');
        return;
      }

      setUploadFile(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.name || !uploadForm.valid_from || !uploadForm.valid_to) {
      alert('Vul alle verplichte velden in');
      return;
    }

    setIsUploading(true);
    try {
      let fileUrl: string | undefined;

      // Upload file if provided
      if (uploadFile) {
        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('bucket', 'compliance');

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          fileUrl = uploadResult.url;
        }
      }

      // Create compliance doc record
      const response = await fetch('/api/compliance-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...uploadForm,
          file_url: fileUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create document');
      }

      // Reset form and close modal
      setUploadForm({
        name: '',
        doc_type: 'iso',
        issuer: '',
        reference_number: '',
        scope: '',
        valid_from: '',
        valid_to: '',
      });
      setUploadFile(null);
      setShowUploadModal(false);

      // Reload page to refresh data
      window.location.reload();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Er ging iets mis bij het uploaden');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader
          title="Compliance Vault"
          userName={displayName}
          userRole={ROLE_LABELS[user.role] || user.role}
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
                      {COMPLIANCE_DOC_TYPE_LABELS[type] || type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Upload button */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 border border-[#0C0C0C]/10 text-[#0C0C0C] px-4 py-2 text-sm font-medium hover:bg-[#0C0C0C]/5"
              >
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
                              {COMPLIANCE_DOC_TYPE_ICONS[doc.doc_type] || '📄'}
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
                            {COMPLIANCE_DOC_TYPE_LABELS[doc.doc_type] || doc.doc_type}
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
                          <span className={`text-xs px-2 py-1 rounded border ${COMPLIANCE_STATUS_COLORS[getStatusFromExpiry(doc.valid_to)]}`}>
                            {COMPLIANCE_STATUS_LABELS[getStatusFromExpiry(doc.valid_to)]}
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

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#0C0C0C]/10 flex items-center justify-between">
                <h2 className="text-xl font-display text-[#0C0C0C]">Document Uploaden</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1 hover:bg-[#0C0C0C]/5 rounded"
                >
                  <X className="w-5 h-5 text-[#6B6560]" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                    Naam *
                  </label>
                  <input
                    type="text"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                    required
                  />
                </div>

                {/* Doc Type */}
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                    Document Type *
                  </label>
                  <select
                    value={uploadForm.doc_type}
                    onChange={(e) => setUploadForm({ ...uploadForm, doc_type: e.target.value as ComplianceDocType })}
                    className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                  >
                    {DOC_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Issuer */}
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                    Uitgever
                  </label>
                  <input
                    type="text"
                    value={uploadForm.issuer}
                    onChange={(e) => setUploadForm({ ...uploadForm, issuer: e.target.value })}
                    className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                    placeholder="bijv. Bureau Veritas"
                  />
                </div>

                {/* Reference Number */}
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                    Referentienummer
                  </label>
                  <input
                    type="text"
                    value={uploadForm.reference_number}
                    onChange={(e) => setUploadForm({ ...uploadForm, reference_number: e.target.value })}
                    className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                  />
                </div>

                {/* Scope */}
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                    Scope
                  </label>
                  <input
                    type="text"
                    value={uploadForm.scope}
                    onChange={(e) => setUploadForm({ ...uploadForm, scope: e.target.value })}
                    className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                    placeholder="bijv. Algemene bouwwerken"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                      Geldig vanaf *
                    </label>
                    <input
                      type="date"
                      value={uploadForm.valid_from}
                      onChange={(e) => setUploadForm({ ...uploadForm, valid_from: e.target.value })}
                      className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                      Geldig tot *
                    </label>
                    <input
                      type="date"
                      value={uploadForm.valid_to}
                      onChange={(e) => setUploadForm({ ...uploadForm, valid_to: e.target.value })}
                      className="w-full px-3 py-2 border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-1">
                    Document (PDF of afbeelding)
                  </label>
                  <label className="flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed border-[#0C0C0C]/10 hover:border-[#9A6B4C] cursor-pointer transition-colors">
                    <Upload className="w-5 h-5 text-[#6B6560]" />
                    <span className="text-sm text-[#6B6560]">
                      {uploadFile ? uploadFile.name : 'Klik om te uploaden'}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,image/jpeg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="mt-1 text-xs text-[#6B6560]">Max 10MB</p>
                </div>

                {/* Submit */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 border border-[#0C0C0C]/10 text-[#0C0C0C] font-medium hover:bg-[#0C0C0C]/5"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0C0C0C] text-white font-medium hover:bg-[#9A6B4C] disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploaden...
                      </>
                    ) : (
                      'Document Toevoegen'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
