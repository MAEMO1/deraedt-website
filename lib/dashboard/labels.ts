/**
 * Centralized labels and colors for dashboard components
 * DRY: Used across tenders, leads, compliance, facility, cases, recruitment clients
 */

// ============================================================================
// ROLE LABELS (used in all dashboard components)
// ============================================================================
export const ROLE_LABELS: Record<string, string> = {
  DIRECTIE: 'Directie',
  SALES: 'Sales',
  HR: 'HR',
  OPERATIONS: 'Operations',
  ADMIN: 'Administrator',
  VIEWER: 'Viewer',
};

// ============================================================================
// TENDER STATUS
// ============================================================================
export const TENDER_STATUS_LABELS: Record<string, string> = {
  new: 'Nieuw',
  analyzing: 'Analyse',
  go: 'Go',
  no_go: 'No-Go',
  in_preparation: 'Voorbereiding',
  submitted: 'Ingediend',
  won: 'Gewonnen',
  lost: 'Verloren',
};

export const TENDER_STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  analyzing: 'bg-amber-100 text-amber-700 border-amber-200',
  go: 'bg-green-100 text-green-700 border-green-200',
  no_go: 'bg-red-100 text-red-700 border-red-200',
  in_preparation: 'bg-purple-100 text-purple-700 border-purple-200',
  submitted: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  won: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  lost: 'bg-gray-100 text-gray-700 border-gray-200',
};

export const TENDER_SOURCE_LABELS: Record<string, string> = {
  ted: 'TED',
  'e-procurement': 'e-Procurement',
  manual: 'Handmatig',
};

// ============================================================================
// LEAD STATUS
// ============================================================================
export const LEAD_STATUS_LABELS: Record<string, string> = {
  new: 'Nieuw',
  contacted: 'Gecontacteerd',
  qualified: 'Gekwalificeerd',
  proposal: 'Offerte',
  won: 'Gewonnen',
  lost: 'Verloren',
};

export const LEAD_STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-purple-100 text-purple-700 border-purple-200',
  qualified: 'bg-amber-100 text-amber-700 border-amber-200',
  proposal: 'bg-orange-100 text-orange-700 border-orange-200',
  won: 'bg-green-100 text-green-700 border-green-200',
  lost: 'bg-red-100 text-red-700 border-red-200',
};

export const LEAD_TYPE_LABELS: Record<string, string> = {
  project: 'Project',
  facility: 'Facility',
  partner: 'Partner',
  procurement: 'Procurement',
  contact: 'Contact',
};

export const LEAD_STAGES = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'] as const;

// ============================================================================
// COMPLIANCE DOCUMENTS
// ============================================================================
export const COMPLIANCE_DOC_TYPE_LABELS: Record<string, string> = {
  iso: 'ISO Certificaat',
  vca: 'VCA Certificaat',
  co2: 'CO₂ Prestatieladder',
  erkenning: 'Erkenning',
  insurance: 'Verzekering',
  policy: 'Beleidsdocument',
  other: 'Andere',
};

export const COMPLIANCE_DOC_TYPE_ICONS: Record<string, string> = {
  iso: '🏆',
  vca: '🛡️',
  co2: '🌱',
  erkenning: '🏗️',
  insurance: '📋',
  policy: '📖',
  other: '📄',
};

export const COMPLIANCE_STATUS_LABELS: Record<string, string> = {
  valid: 'Geldig',
  expiring_soon: 'Bijna Verlopen',
  expired: 'Verlopen',
  pending_renewal: 'In Verlenging',
};

export const COMPLIANCE_STATUS_COLORS: Record<string, string> = {
  valid: 'bg-green-100 text-green-700 border-green-200',
  expiring_soon: 'bg-amber-100 text-amber-700 border-amber-200',
  expired: 'bg-red-100 text-red-700 border-red-200',
  pending_renewal: 'bg-blue-100 text-blue-700 border-blue-200',
};

// ============================================================================
// FACILITY TICKETS
// ============================================================================
export const TICKET_URGENCY_LABELS: Record<string, string> = {
  low: 'Laag',
  medium: 'Medium',
  high: 'Hoog',
  critical: 'Kritiek',
};

export const TICKET_URGENCY_COLORS: Record<string, string> = {
  low: 'bg-gray-100 text-gray-700 border-gray-200',
  medium: 'bg-blue-100 text-blue-700 border-blue-200',
  high: 'bg-amber-100 text-amber-700 border-amber-200',
  critical: 'bg-red-100 text-red-700 border-red-200',
};

export const TICKET_STATUS_LABELS: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Behandeling',
  waiting: 'Wachtend',
  resolved: 'Opgelost',
};

export const TICKET_STATUS_COLORS: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700 border-blue-200',
  in_progress: 'bg-amber-100 text-amber-700 border-amber-200',
  waiting: 'bg-purple-100 text-purple-700 border-purple-200',
  resolved: 'bg-green-100 text-green-700 border-green-200',
};

// ============================================================================
// CASES (Projects/References)
// ============================================================================
export const CLIENT_TYPE_LABELS: Record<string, string> = {
  public: 'Overheid',
  industrial: 'Industrie',
  education: 'Onderwijs',
  healthcare: 'Zorg',
  residential: 'Residentieel',
  commercial: 'Commercieel',
};

export const CLIENT_TYPE_COLORS: Record<string, string> = {
  public: 'bg-blue-100 text-blue-700 border-blue-200',
  industrial: 'bg-amber-100 text-amber-700 border-amber-200',
  education: 'bg-green-100 text-green-700 border-green-200',
  healthcare: 'bg-red-100 text-red-700 border-red-200',
  residential: 'bg-purple-100 text-purple-700 border-purple-200',
  commercial: 'bg-indigo-100 text-indigo-700 border-indigo-200',
};

// ============================================================================
// RECRUITMENT / JOBS
// ============================================================================
export const JOB_STATUS_LABELS: Record<string, string> = {
  draft: 'Concept',
  published: 'Gepubliceerd',
  closed: 'Gesloten',
};

export const JOB_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700 border-gray-200',
  published: 'bg-green-100 text-green-700 border-green-200',
  closed: 'bg-red-100 text-red-700 border-red-200',
};

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  new: 'Nieuw',
  screening: 'Screening',
  interview: 'Interview',
  offer: 'Aanbod',
  hired: 'Aangenomen',
  rejected: 'Afgewezen',
};

export const APPLICATION_STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  screening: 'bg-amber-100 text-amber-700 border-amber-200',
  interview: 'bg-purple-100 text-purple-700 border-purple-200',
  offer: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  hired: 'bg-green-100 text-green-700 border-green-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
};

export const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  full_time: 'Voltijds',
  part_time: 'Deeltijds',
  contract: 'Contract',
  internship: 'Stage',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get display name from user profile
 */
export function getDisplayName(user: { full_name?: string | null; email: string }): string {
  return user.full_name || user.email.split('@')[0];
}

/**
 * Calculate status from expiry date for compliance docs
 */
export function getStatusFromExpiry(validTo: string): string {
  const expiryDate = new Date(validTo);
  const now = new Date();
  const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) return 'expired';
  if (daysUntil <= 30) return 'expiring_soon';
  return 'valid';
}

/**
 * Get expiry info for compliance documents
 */
export function getExpiryInfo(validTo: string): { days: number; status: string; color: string } {
  const expiryDate = new Date(validTo);
  const now = new Date();
  const daysUntil = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) return { days: daysUntil, status: 'expired', color: 'text-red-600' };
  if (daysUntil <= 30) return { days: daysUntil, status: '30', color: 'text-red-600' };
  if (daysUntil <= 60) return { days: daysUntil, status: '60', color: 'text-amber-600' };
  if (daysUntil <= 90) return { days: daysUntil, status: '90', color: 'text-amber-500' };
  return { days: daysUntil, status: 'ok', color: 'text-green-600' };
}
