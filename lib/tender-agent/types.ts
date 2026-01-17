/**
 * Tender Agent Types
 *
 * Type definitions for the tender ingestion system.
 */

// ============================================================================
// TENDER SOURCE TYPES
// ============================================================================

export type TenderSource = 'ted' | 'e-procurement';

export type TenderStatus =
  | 'new'
  | 'analyzing'
  | 'go'
  | 'no_go'
  | 'in_preparation'
  | 'submitted'
  | 'won'
  | 'lost';

// ============================================================================
// RAW TENDER DATA
// ============================================================================

/**
 * Raw tender data from external sources before normalization
 */
export interface RawTenderData {
  source: TenderSource;
  externalId: string;
  externalUrl?: string;

  // Basic info
  title: string;
  buyer: string;
  buyerLocation?: string;

  // Classification
  cpvCodes: string[];

  // Value
  estimatedValue?: number;
  currency?: string;

  // Dates
  publicationDate?: Date;
  deadline?: Date;

  // Raw content
  rawHtml?: string;
  rawJson?: Record<string, unknown>;
}

// ============================================================================
// NORMALIZED TENDER
// ============================================================================

/**
 * Normalized tender ready for database insertion
 */
export interface NormalizedTender {
  source: TenderSource;
  external_id: string;
  external_url?: string;

  title: string;
  buyer: string;
  buyer_location?: string;

  cpv_codes: string[];
  estimated_value?: number;
  currency: string;

  publication_date?: string; // ISO date string
  deadline_at?: string; // ISO timestamp string

  status: TenderStatus;
  match_score: number;

  tags: string[];
  notes?: string;
}

// ============================================================================
// INGEST RUN
// ============================================================================

export type IngestRunStatus = 'running' | 'completed' | 'failed';

export interface IngestRun {
  id: string;
  source: TenderSource;
  started_at: string;
  completed_at?: string;
  status: IngestRunStatus;
  tenders_found: number;
  tenders_imported: number;
  tenders_skipped: number;
  error_message?: string;
  run_metadata: Record<string, unknown>;
}

// ============================================================================
// CPV RELEVANCE
// ============================================================================

export type CpvCategory = 'core' | 'adjacent' | 'opportunistic' | 'excluded';

export interface CpvRelevance {
  cpv_code: string;
  relevance_score: number;
  category: CpvCategory;
  description_nl?: string;
  description_en?: string;
}

// ============================================================================
// CONNECTOR INTERFACE
// ============================================================================

/**
 * Interface for tender source connectors
 */
export interface TenderConnector {
  /** Source identifier */
  readonly source: TenderSource;

  /** Fetch new tenders from the source */
  fetchTenders(): Promise<RawTenderData[]>;

  /** Check if a tender already exists */
  tenderExists(externalId: string): Promise<boolean>;

  /** Normalize raw tender data */
  normalize(raw: RawTenderData): NormalizedTender;
}

// ============================================================================
// RATE LIMITER
// ============================================================================

export interface RateLimitConfig {
  source: TenderSource;
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitState {
  source: TenderSource;
  requestCount: number;
  windowStart: number;
}

// ============================================================================
// MATCH CALCULATOR
// ============================================================================

export interface MatchScoreFactors {
  cpvScore: number;
  locationScore: number;
  valueScore: number;
  deadlineScore: number;
  total: number;
}

export interface MatchCalculatorConfig {
  weights: {
    cpv: number;
    location: number;
    value: number;
    deadline: number;
  };
  preferredLocations: string[];
  valueRange: {
    min: number;
    max: number;
    sweetSpotMin: number;
    sweetSpotMax: number;
  };
}

// ============================================================================
// AGENT RESULT
// ============================================================================

export interface TenderAgentResult {
  source: TenderSource;
  runId: string;
  startedAt: Date;
  completedAt: Date;
  tendersFound: number;
  tendersImported: number;
  tendersSkipped: number;
  errors: string[];
  newTenders: NormalizedTender[];
}
