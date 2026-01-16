/**
 * VDAB Vacature Posting API Adapter
 *
 * This adapter provides an interface for publishing job vacancies to VDAB
 * (Vlaamse Dienst voor Arbeidsbemiddeling en Beroepsopleiding).
 *
 * NOTE: This is a stub implementation. In production, this would integrate
 * with the actual VDAB API. No credentials are available at this time.
 *
 * VDAB API Documentation: https://www.vdab.be/werkgevers/vacatures
 *
 * Required VDAB Fields:
 * ---------------------
 * - titel: Job title (max 100 chars)
 * - beschrijving: Job description (max 10000 chars)
 * - bedrijfsnaam: Company name
 * - werkplaats: Work location (postal code + municipality)
 * - contractType: Type of employment (voltijds, deeltijds, etc.)
 * - sector: NACE sector code
 * - beroepencode: ISCO-08 occupation code
 * - ervaringNiveau: Experience level (starter, ervaren, etc.)
 * - opleidingsniveau: Education level
 * - startdatum: Start date (expected or immediate)
 * - einddatum: End date (for temporary positions, optional)
 * - contactEmail: Contact email for applications
 * - contactTelefoon: Contact phone (optional)
 * - sollicitatieUrl: URL for online applications (optional)
 *
 * Authentication:
 * ---------------
 * VDAB API requires OAuth2 authentication with:
 * - Client ID (provided by VDAB)
 * - Client Secret (provided by VDAB)
 * - API Key (provided by VDAB)
 *
 * Rate Limits:
 * ------------
 * - 100 requests per minute
 * - 1000 requests per hour
 */

/**
 * Internal job format (from our database)
 */
export interface InternalJob {
  id: string;
  title: string;
  slug: string;
  department: string;
  employment_type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: string;
  created_at?: string;
}

/**
 * VDAB vacancy format (API payload)
 */
export interface VDABVacancy {
  // Required fields
  titel: string;
  beschrijving: string;
  bedrijfsnaam: string;
  werkplaats: {
    postcode: string;
    gemeente: string;
    land: string;
  };
  contractType: VDABContractType;
  sector: string;
  beroepencode: string;
  ervaringNiveau: VDABExperienceLevel;
  opleidingsniveau: VDABEducationLevel;
  startdatum: string;
  contactEmail: string;

  // Optional fields
  einddatum?: string;
  contactTelefoon?: string;
  sollicitatieUrl?: string;
  salaris?: {
    min?: number;
    max?: number;
    periode: 'uur' | 'maand' | 'jaar';
  };
  extraVoordelen?: string[];
  vereisten?: string[];
  talen?: VDABLanguageRequirement[];
}

export type VDABContractType =
  | 'voltijds'
  | 'deeltijds'
  | 'flexi'
  | 'interim'
  | 'studentenjob'
  | 'stage';

export type VDABExperienceLevel =
  | 'starter'
  | 'junior'
  | 'medior'
  | 'senior'
  | 'expert';

export type VDABEducationLevel =
  | 'geen_diploma'
  | 'lager_onderwijs'
  | 'secundair'
  | 'hoger_kort'
  | 'bachelor'
  | 'master'
  | 'doctoraat';

export interface VDABLanguageRequirement {
  taal: string;
  niveau: 'basis' | 'goed' | 'uitstekend' | 'moedertaal';
}

/**
 * VDAB sync status
 */
export interface VDABSyncStatus {
  jobId: string;
  vdabId?: string;
  status: 'not_synced' | 'pending' | 'synced' | 'error';
  lastSyncAt?: string;
  errorMessage?: string;
}

/**
 * VDAB API response
 */
export interface VDABApiResponse {
  success: boolean;
  vdabId?: string;
  message?: string;
  errors?: string[];
}

/**
 * Company configuration for VDAB
 */
const COMPANY_CONFIG = {
  bedrijfsnaam: 'Bouwwerken De Raedt Ivan NV',
  contactEmail: 'jobs@deraedt.be',
  contactTelefoon: '+32 9 348 48 40',
  sector: '41.20', // NACE: Bouw van gebouwen
  defaultLocation: {
    postcode: '9940',
    gemeente: 'Evergem',
    land: 'België',
  },
};

/**
 * Map internal employment type to VDAB contract type
 */
function mapEmploymentType(type: string): VDABContractType {
  const mapping: Record<string, VDABContractType> = {
    full_time: 'voltijds',
    part_time: 'deeltijds',
    contract: 'interim',
    internship: 'stage',
  };
  return mapping[type] || 'voltijds';
}

/**
 * Map department to ISCO-08 occupation code
 * See: https://www.ilo.org/public/english/bureau/stat/isco/isco08/
 */
function mapDepartmentToISCO(department: string): string {
  const mapping: Record<string, string> = {
    Bouw: '7111', // House builders
    Dakwerken: '7121', // Roofers
    Renovatie: '7111', // House builders
    Techniek: '7233', // Agricultural and industrial machinery mechanics
    Administratie: '4110', // General office clerks
    Operations: '3123', // Construction supervisors
    Sales: '3322', // Commercial sales representatives
    HR: '2423', // Personnel and careers professionals
  };
  return mapping[department] || '7111'; // Default to house builders
}

/**
 * Map internal job to VDAB vacancy format
 */
export function mapJobToVDAB(job: InternalJob): VDABVacancy {
  // Build full description including requirements and benefits
  const fullDescription = [
    job.description,
    '',
    'Wat wij verwachten:',
    ...job.requirements.map((r) => `• ${r}`),
    '',
    'Wat wij bieden:',
    ...job.benefits.map((b) => `• ${b}`),
  ].join('\n');

  return {
    // Required fields
    titel: job.title.substring(0, 100), // Max 100 chars
    beschrijving: fullDescription.substring(0, 10000), // Max 10000 chars
    bedrijfsnaam: COMPANY_CONFIG.bedrijfsnaam,
    werkplaats: {
      postcode: COMPANY_CONFIG.defaultLocation.postcode,
      gemeente: job.location || COMPANY_CONFIG.defaultLocation.gemeente,
      land: COMPANY_CONFIG.defaultLocation.land,
    },
    contractType: mapEmploymentType(job.employment_type),
    sector: COMPANY_CONFIG.sector,
    beroepencode: mapDepartmentToISCO(job.department),
    ervaringNiveau: 'junior', // Default, could be configurable
    opleidingsniveau: 'secundair', // Default for construction jobs
    startdatum: new Date().toISOString().split('T')[0], // Immediate start
    contactEmail: COMPANY_CONFIG.contactEmail,

    // Optional fields
    contactTelefoon: COMPANY_CONFIG.contactTelefoon,
    sollicitatieUrl: `https://deraedt.be/werken-bij/${job.slug}`,
    vereisten: job.requirements,
    extraVoordelen: job.benefits,
    talen: [
      { taal: 'Nederlands', niveau: 'goed' },
    ],
  };
}

/**
 * In-memory sync status store (in production, this would be in database)
 */
const syncStatusStore: Map<string, VDABSyncStatus> = new Map();

/**
 * Get sync status for a job
 */
export function getVDABSyncStatus(jobId: string): VDABSyncStatus {
  return (
    syncStatusStore.get(jobId) || {
      jobId,
      status: 'not_synced',
    }
  );
}

/**
 * Get all sync statuses
 */
export function getAllVDABSyncStatuses(): VDABSyncStatus[] {
  return Array.from(syncStatusStore.values());
}

/**
 * Publish a job to VDAB (STUB - logs only)
 *
 * In production, this would:
 * 1. Authenticate with VDAB OAuth2
 * 2. POST the vacancy to VDAB API
 * 3. Store the returned VDAB ID
 * 4. Update sync status
 */
export async function publishToVDAB(job: InternalJob): Promise<VDABApiResponse> {
  const vacancy = mapJobToVDAB(job);

  // Update status to pending
  syncStatusStore.set(job.id, {
    jobId: job.id,
    status: 'pending',
    lastSyncAt: new Date().toISOString(),
  });

  // Log what would be sent (STUB)
  console.log('[VDAB ADAPTER] Publishing vacancy to VDAB', {
    action: 'publish',
    jobId: job.id,
    jobTitle: job.title,
    timestamp: new Date().toISOString(),
    payload: vacancy,
  });

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate successful response
  const mockVdabId = `VDAB-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  // Update status to synced
  syncStatusStore.set(job.id, {
    jobId: job.id,
    vdabId: mockVdabId,
    status: 'synced',
    lastSyncAt: new Date().toISOString(),
  });

  console.log('[VDAB ADAPTER] Vacancy published successfully', {
    action: 'publish_success',
    jobId: job.id,
    vdabId: mockVdabId,
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    vdabId: mockVdabId,
    message: 'Vacature succesvol gepubliceerd op VDAB (STUB)',
  };
}

/**
 * Update a job on VDAB (STUB - logs only)
 */
export async function updateOnVDAB(
  job: InternalJob,
  vdabId: string
): Promise<VDABApiResponse> {
  const vacancy = mapJobToVDAB(job);

  console.log('[VDAB ADAPTER] Updating vacancy on VDAB', {
    action: 'update',
    jobId: job.id,
    vdabId,
    timestamp: new Date().toISOString(),
    payload: vacancy,
  });

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Update sync status
  syncStatusStore.set(job.id, {
    jobId: job.id,
    vdabId,
    status: 'synced',
    lastSyncAt: new Date().toISOString(),
  });

  return {
    success: true,
    vdabId,
    message: 'Vacature succesvol bijgewerkt op VDAB (STUB)',
  };
}

/**
 * Remove a job from VDAB (STUB - logs only)
 */
export async function removeFromVDAB(
  jobId: string,
  vdabId: string
): Promise<VDABApiResponse> {
  console.log('[VDAB ADAPTER] Removing vacancy from VDAB', {
    action: 'remove',
    jobId,
    vdabId,
    timestamp: new Date().toISOString(),
  });

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Update sync status
  syncStatusStore.set(jobId, {
    jobId,
    status: 'not_synced',
    lastSyncAt: new Date().toISOString(),
  });

  return {
    success: true,
    message: 'Vacature succesvol verwijderd van VDAB (STUB)',
  };
}

/**
 * Validate a job before publishing to VDAB
 */
export function validateForVDAB(job: InternalJob): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!job.title || job.title.length < 3) {
    errors.push('Titel is verplicht (min 3 tekens)');
  }
  if (job.title && job.title.length > 100) {
    errors.push('Titel mag max 100 tekens zijn');
  }
  if (!job.description || job.description.length < 50) {
    errors.push('Beschrijving is verplicht (min 50 tekens)');
  }
  if (!job.location) {
    errors.push('Locatie is verplicht');
  }
  if (job.status !== 'published') {
    errors.push('Vacature moet gepubliceerd zijn om naar VDAB te sturen');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
