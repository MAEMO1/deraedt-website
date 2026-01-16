/**
 * TED RSS Feed Parser
 *
 * This module provides utilities to parse tender opportunities from the
 * TED (Tenders Electronic Daily) RSS feed.
 *
 * TED RSS feed URL format:
 * https://ted.europa.eu/api/v3.0/notices/search?q=<query>&scope=3
 *
 * Relevant CPV codes for De Raedt:
 * - 45000000: Construction work
 * - 45210000: Building construction work
 * - 45260000: Roofing and other special trade construction work
 * - 45261000: Erection and related works of roof frames and coverings
 * - 45262500: Masonry and bricklaying work
 * - 45320000: Insulation work
 * - 45454100: Restoration work
 * - 45453100: Renovation work
 */

export interface TEDNotice {
  noticeId: string;
  title: string;
  buyer: string;
  buyerLocation: string;
  cpvCodes: string[];
  estimatedValue?: number;
  currency: string;
  publicationDate: string;
  deadlineDate: string;
  noticeUrl: string;
  type: string;
  country: string;
}

export interface NormalizedTender {
  id: string;
  source: 'ted' | 'e-procurement' | 'manual';
  external_id: string;
  external_url: string;
  title: string;
  buyer: string;
  buyer_location: string;
  cpv_codes: string[];
  estimated_value: number | null;
  currency: string;
  publication_date: string;
  deadline_at: string;
  status: 'new';
  match_score: number;
  tags: string[];
}

// Relevant CPV codes for De Raedt
const RELEVANT_CPV_CODES = [
  '45000000', // Construction work
  '45210000', // Building construction work
  '45260000', // Roofing work
  '45261000', // Roof frames and coverings
  '45262500', // Masonry work
  '45320000', // Insulation work
  '45454100', // Restoration work
  '45453100', // Renovation work
  '45212361', // Church buildings
  '45212200', // Sports facilities
];

/**
 * Calculate match score based on CPV codes overlap
 */
export function calculateMatchScore(cpvCodes: string[]): number {
  if (!cpvCodes || cpvCodes.length === 0) return 50;

  const matches = cpvCodes.filter((code) =>
    RELEVANT_CPV_CODES.some((relevant) => code.startsWith(relevant.slice(0, 5)))
  );

  const baseScore = 50 + (matches.length / cpvCodes.length) * 50;
  return Math.min(Math.round(baseScore), 100);
}

/**
 * Extract tags from CPV codes and title
 */
export function extractTags(cpvCodes: string[], title: string): string[] {
  const tags: string[] = [];

  // Tag based on CPV codes
  cpvCodes.forEach((code) => {
    if (code.startsWith('4521')) tags.push('nieuwbouw');
    if (code.startsWith('4526')) tags.push('dakwerken');
    if (code.startsWith('4545')) tags.push('renovatie');
    if (code.startsWith('4532')) tags.push('isolatie');
    if (code.startsWith('4526250')) tags.push('metselwerk');
  });

  // Tag based on title keywords
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('erfgoed') || lowerTitle.includes('monument') || lowerTitle.includes('historisch')) {
    tags.push('erfgoed');
  }
  if (lowerTitle.includes('school') || lowerTitle.includes('onderwijs')) {
    tags.push('onderwijs');
  }
  if (lowerTitle.includes('ziekenhuis') || lowerTitle.includes('zorg')) {
    tags.push('zorg');
  }
  if (lowerTitle.includes('gemeente') || lowerTitle.includes('stad') || lowerTitle.includes('overheid')) {
    tags.push('publiek');
  }

  return [...new Set(tags)]; // Remove duplicates
}

/**
 * Normalize a TED notice to our internal tender schema
 */
export function normalizeTEDNotice(notice: TEDNotice): NormalizedTender {
  return {
    id: `ted-${notice.noticeId}`,
    source: 'ted',
    external_id: notice.noticeId,
    external_url: notice.noticeUrl,
    title: notice.title,
    buyer: notice.buyer,
    buyer_location: notice.buyerLocation,
    cpv_codes: notice.cpvCodes,
    estimated_value: notice.estimatedValue || null,
    currency: notice.currency || 'EUR',
    publication_date: notice.publicationDate,
    deadline_at: notice.deadlineDate,
    status: 'new',
    match_score: calculateMatchScore(notice.cpvCodes),
    tags: extractTags(notice.cpvCodes, notice.title),
  };
}

/**
 * Parse TED RSS feed (stub - in production would fetch from actual RSS)
 *
 * Note: TED RSS feed requires CORS proxy or server-side fetching.
 * This is a stub that logs the request for demo purposes.
 */
export async function fetchTEDNotices(options?: {
  country?: string;
  cpvCodes?: string[];
  limit?: number;
}): Promise<{ success: boolean; notices: TEDNotice[]; message: string }> {
  const { country = 'BE', cpvCodes = RELEVANT_CPV_CODES, limit = 50 } = options || {};

  // Build query for TED API
  const query = `country:${country} AND cpv:(${cpvCodes.slice(0, 5).join(' OR ')})`;

  console.log('[TED RSS] Fetching notices with query:', {
    query,
    limit,
    timestamp: new Date().toISOString(),
  });

  // In production, this would fetch from:
  // https://ted.europa.eu/api/v3.0/notices/search?q=<query>&scope=3&limit=<limit>
  //
  // For demo, we return a message indicating the stub behavior
  return {
    success: true,
    notices: [],
    message: `TED RSS fetch stubbed. In production, would fetch ${limit} notices for ${country} with CPV codes: ${cpvCodes.slice(0, 3).join(', ')}...`,
  };
}

/**
 * Ingest TED notices into the system
 */
export async function ingestTEDNotices(): Promise<{
  success: boolean;
  newCount: number;
  updatedCount: number;
  message: string;
}> {
  console.log('[TED INGEST] Starting TED RSS ingestion...');

  const result = await fetchTEDNotices();

  if (!result.success) {
    return {
      success: false,
      newCount: 0,
      updatedCount: 0,
      message: 'Failed to fetch TED notices',
    };
  }

  // Normalize notices
  const normalizedTenders = result.notices.map(normalizeTEDNotice);

  console.log('[TED INGEST] Ingestion complete:', {
    fetchedCount: result.notices.length,
    normalizedCount: normalizedTenders.length,
    message: result.message,
  });

  return {
    success: true,
    newCount: normalizedTenders.length,
    updatedCount: 0,
    message: result.message,
  };
}
