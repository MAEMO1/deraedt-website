'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Loader2,
  Shield,
  Calendar,
} from 'lucide-react';
import Image from 'next/image';

interface Partner {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
}

interface PartnerDocument {
  id: string;
  doc_type: string;
  name: string;
  file_url: string | null;
  status: 'missing' | 'pending' | 'approved' | 'expired';
  valid_from: string | null;
  valid_to: string | null;
  uploaded_at: string | null;
}

interface PartnerIntakeClientProps {
  token: string;
}

const REQUIRED_DOCS = [
  {
    type: 'vca',
    label: 'VCA Certificaat',
    description: 'Geldig VCA* of VCA** certificaat',
    required: true,
  },
  {
    type: 'insurance',
    label: 'Verzekeringsbewijs',
    description: 'BA-verzekering met minimaal €2.500.000 dekking',
    required: true,
  },
  {
    type: 'reference',
    label: 'Referenties',
    description: 'Minimaal 3 projectreferenties van de afgelopen 3 jaar',
    required: true,
  },
  {
    type: 'kvk',
    label: 'KVK Uittreksel',
    description: 'Recent uittreksel Kamer van Koophandel (max 3 maanden oud)',
    required: false,
  },
];

const statusColors: Record<string, string> = {
  missing: 'bg-gray-100 text-gray-600 border-gray-200',
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  approved: 'bg-green-100 text-green-700 border-green-200',
  expired: 'bg-red-100 text-red-700 border-red-200',
};

const statusLabels: Record<string, string> = {
  missing: 'Niet geüpload',
  pending: 'In behandeling',
  approved: 'Goedgekeurd',
  expired: 'Verlopen',
};

export function PartnerIntakeClient({ token }: PartnerIntakeClientProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [documents, setDocuments] = useState<PartnerDocument[]>([]);
  const [completed, setCompleted] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const res = await fetch(`/api/partner-intake?token=${token}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Er is een fout opgetreden');
          if (data.completed) {
            setCompleted(true);
          }
          return;
        }

        setPartner(data.partner);
        setDocuments(data.documents || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Kan gegevens niet ophalen');
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerData();
  }, [token]);

  const getDocumentStatus = (docType: string): PartnerDocument | null => {
    return documents.find((d) => d.doc_type === docType) || null;
  };

  const handleFileUpload = async (
    docType: string,
    file: File,
    validFrom?: string,
    validTo?: string
  ) => {
    setUploading(docType);
    setUploadError(null);

    const formData = new FormData();
    formData.append('token', token);
    formData.append('doc_type', docType);
    formData.append('file', file);
    if (validFrom) formData.append('valid_from', validFrom);
    if (validTo) formData.append('valid_to', validTo);

    try {
      const res = await fetch('/api/partner-intake/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setUploadError(data.error || 'Upload mislukt');
        return;
      }

      // Update documents list
      setDocuments((prev) => {
        const existing = prev.findIndex((d) => d.doc_type === docType);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = data.document;
          return updated;
        }
        return [...prev, data.document];
      });
    } catch (err) {
      console.error('Upload error:', err);
      setUploadError('Netwerkfout bij uploaden');
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async () => {
    // Check if all required docs are uploaded
    const requiredTypes = REQUIRED_DOCS.filter((d) => d.required).map((d) => d.type);
    const uploadedTypes = documents.filter((d) => d.status !== 'missing').map((d) => d.doc_type);
    const missingRequired = requiredTypes.filter((t) => !uploadedTypes.includes(t));

    if (missingRequired.length > 0) {
      setUploadError('Upload eerst alle verplichte documenten');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/partner-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setUploadError(data.error || 'Indienen mislukt');
        return;
      }

      setCompleted(true);
    } catch (err) {
      console.error('Submit error:', err);
      setUploadError('Netwerkfout bij indienen');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#9A6B4C]" />
      </div>
    );
  }

  if (error && !completed) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="bg-white p-8 max-w-md w-full text-center border border-[#0C0C0C]/10">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-display text-[#0C0C0C] mb-2">Link Ongeldig</h1>
          <p className="text-[#6B6560]">{error}</p>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 max-w-md w-full text-center border border-[#0C0C0C]/10"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-xl font-display text-[#0C0C0C] mb-2">
            Documenten Ingediend
          </h1>
          <p className="text-[#6B6560] mb-4">
            Bedankt! Uw documenten zijn succesvol ingediend en worden beoordeeld door ons team.
            U ontvangt bericht zodra de beoordeling is afgerond.
          </p>
          <p className="text-sm text-[#6B6560]">
            U kunt dit venster nu sluiten.
          </p>
        </motion.div>
      </div>
    );
  }

  const requiredDocs = REQUIRED_DOCS.filter((d) => d.required);
  const uploadedRequiredCount = requiredDocs.filter((d) =>
    documents.some((doc) => doc.doc_type === d.type && doc.status !== 'missing')
  ).length;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#0C0C0C]/10">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.svg"
              alt="De Raedt"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <div className="h-8 w-px bg-[#0C0C0C]/10" />
            <div>
              <h1 className="font-display text-lg text-[#0C0C0C]">Partner Prequalificatie</h1>
              <p className="text-sm text-[#6B6560]">Document Upload Portal</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Partner Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 border border-[#0C0C0C]/10 mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#9A6B4C]/10 rounded flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-[#9A6B4C]" />
            </div>
            <div>
              <h2 className="font-display text-lg text-[#0C0C0C]">{partner?.company_name}</h2>
              <p className="text-sm text-[#6B6560]">
                Contactpersoon: {partner?.contact_name} ({partner?.contact_email})
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 border border-[#0C0C0C]/10 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0C0C0C]">Voortgang</h3>
            <span className="text-sm text-[#6B6560]">
              {uploadedRequiredCount} van {requiredDocs.length} verplichte documenten
            </span>
          </div>
          <div className="w-full bg-[#0C0C0C]/5 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9A6B4C] transition-all duration-500"
              style={{ width: `${(uploadedRequiredCount / requiredDocs.length) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Error Message */}
        {uploadError && (
          <div className="bg-red-50 border border-red-200 p-4 mb-6 text-red-700 text-sm">
            {uploadError}
          </div>
        )}

        {/* Document List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {REQUIRED_DOCS.map((docDef) => {
            const existingDoc = getDocumentStatus(docDef.type);
            const isUploading = uploading === docDef.type;

            return (
              <div
                key={docDef.type}
                className="bg-white p-6 border border-[#0C0C0C]/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#FAF7F2] rounded flex items-center justify-center flex-shrink-0">
                      {existingDoc && existingDoc.status === 'approved' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : existingDoc && existingDoc.status === 'pending' ? (
                        <Clock className="w-5 h-5 text-amber-600" />
                      ) : (
                        <FileText className="w-5 h-5 text-[#6B6560]" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#0C0C0C]">
                        {docDef.label}
                        {docDef.required && <span className="text-red-500 ml-1">*</span>}
                      </h4>
                      <p className="text-sm text-[#6B6560] mt-1">{docDef.description}</p>
                      {existingDoc && existingDoc.status !== 'missing' && (
                        <span
                          className={`inline-block mt-2 text-xs px-2 py-1 rounded border ${statusColors[existingDoc.status]}`}
                        >
                          {statusLabels[existingDoc.status]}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {isUploading ? (
                      <div className="flex items-center gap-2 text-[#6B6560]">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Uploaden...</span>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(docDef.type, file);
                            }
                          }}
                        />
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0C0C0C] text-white text-sm hover:bg-[#9A6B4C] transition-colors">
                          <Upload className="w-4 h-4" />
                          {existingDoc && existingDoc.status !== 'missing'
                            ? 'Vervangen'
                            : 'Uploaden'}
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Date fields for certificates */}
                {(docDef.type === 'vca' || docDef.type === 'insurance') &&
                  existingDoc &&
                  existingDoc.status !== 'missing' && (
                    <div className="mt-4 pt-4 border-t border-[#0C0C0C]/5 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#6B6560] mb-1">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Geldig vanaf
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 text-sm border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                          defaultValue={existingDoc.valid_from || ''}
                          onChange={() => {
                            // Could trigger update here
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#6B6560] mb-1">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Geldig tot
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 text-sm border border-[#0C0C0C]/10 focus:border-[#9A6B4C] focus:outline-none"
                          defaultValue={existingDoc.valid_to || ''}
                          onChange={() => {
                            // Could trigger update here
                          }}
                        />
                      </div>
                    </div>
                  )}
              </div>
            );
          })}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <button
            onClick={handleSubmit}
            disabled={submitting || uploadedRequiredCount < requiredDocs.length}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#9A6B4C] text-white font-medium hover:bg-[#0C0C0C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Indienen...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Documenten Indienen
              </>
            )}
          </button>
          <p className="text-center text-sm text-[#6B6560] mt-3">
            Na het indienen worden uw documenten beoordeeld door ons team.
          </p>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-4 bg-amber-50 border border-amber-200 text-sm"
        >
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div className="text-amber-800">
              <p className="font-medium mb-1">Belangrijk</p>
              <ul className="list-disc list-inside space-y-1 text-amber-700">
                <li>Alleen PDF en afbeeldingen worden geaccepteerd (max 10MB)</li>
                <li>Documenten met * zijn verplicht voor prequalificatie</li>
                <li>Zorg dat certificaten nog minimaal 3 maanden geldig zijn</li>
                <li>Deze link is 30 dagen geldig</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#0C0C0C]/10 mt-16">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-[#6B6560]">
          <p>© {new Date().getFullYear()} Bouwwerken De Raedt Ivan NV. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  );
}
