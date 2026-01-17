/**
 * TED Connector
 *
 * Fetches tender notices from TED (Tenders Electronic Daily) API.
 * Uses the TED API v3 and RSS feeds for Belgian construction tenders.
 */

import type {
  TenderConnector,
  TenderSource,
  RawTenderData,
  NormalizedTender,
} from './types';
import { createClient } from '@/lib/supabase/server';
import { createRateLimiter } from './rate-limiter';
import { calculateMatchScore, generateTenderTags } from './match-calculator';

// ============================================================================
// CONFIGURATION
// ============================================================================

const TED_API_BASE = 'https://api.ted.europa.eu/v3';

// Belgian CPV codes for construction (45xxxxxx)
const CONSTRUCTION_CPV_PREFIX = '45';

// Country code for Belgium
const COUNTRY_CODE = 'BE';

// ============================================================================
// TED API TYPES
// ============================================================================

interface TEDNotice {
  'publication-number': string;
  'notice-type': string;
  'document-type': string;
  'publication-date': string;
  'deadline-receipt-tenders'?: string;
  'official-name'?: string;
  'contracting-authority-name'?: string;
  'contracting-authority-address'?: {
    town?: string;
    nuts?: string;
    'country-code'?: string;
  };
  'title-text'?: string;
  'short-description'?: string;
  'cpv-main'?: string;
  'cpv-additional'?: string[];
  'estimated-value'?: {
    value?: number;
    currency?: string;
  };
  links?: {
    html?: string;
    xml?: string;
  };
}

interface TEDSearchResponse {
  notices: TEDNotice[];
  total: number;
  page: number;
  pageSize: number;
}

// ============================================================================
// TED CONNECTOR CLASS
// ============================================================================

export class TEDConnector implements TenderConnector {
  readonly source: TenderSource = 'ted';
  private rateLimiter = createRateLimiter('ted');

  /**
   * Fetch tenders from TED API
   */
  async fetchTenders(): Promise<RawTenderData[]> {
    const tenders: RawTenderData[] = [];

    try {
      // Build search query for Belgian construction tenders
      const searchParams = new URLSearchParams({
        'country-code': COUNTRY_CODE,
        'cpv': `${CONSTRUCTION_CPV_PREFIX}*`,
        'publication-date': this.getDateRange(),
        'notice-type': 'cn', // Contract notices
        pageSize: '100',
        page: '1',
      });

      // Fetch from TED API with rate limiting
      const response = await this.rateLimiter.execute(async () => {
        const url = `${TED_API_BASE}/notices/search?${searchParams}`;
        console.log(`[TEDConnector] Fetching: ${url}`);

        const res = await fetch(url, {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'DeRaedt-TenderAgent/1.0',
          },
          next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) {
          throw new Error(`TED API error: ${res.status} ${res.statusText}`);
        }

        return res.json() as Promise<TEDSearchResponse>;
      });

      console.log(`[TEDConnector] Found ${response.total} notices`);

      // Process each notice
      for (const notice of response.notices) {
        try {
          const raw = this.parseNotice(notice);
          if (raw) {
            tenders.push(raw);
          }
        } catch (err) {
          console.error(
            `[TEDConnector] Failed to parse notice ${notice['publication-number']}:`,
            err
          );
        }
      }
    } catch (err) {
      console.error('[TEDConnector] Fetch error:', err);
      throw err;
    }

    return tenders;
  }

  /**
   * Check if a tender already exists in the database
   */
  async tenderExists(externalId: string): Promise<boolean> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('tenders')
      .select('id')
      .eq('source', 'ted')
      .eq('external_id', externalId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = not found
      console.error('[TEDConnector] Existence check error:', error);
    }

    return !!data;
  }

  /**
   * Normalize raw tender data
   */
  normalize(raw: RawTenderData): NormalizedTender {
    return {
      source: raw.source,
      external_id: raw.externalId,
      external_url: raw.externalUrl,
      title: raw.title,
      buyer: raw.buyer,
      buyer_location: raw.buyerLocation,
      cpv_codes: raw.cpvCodes,
      estimated_value: raw.estimatedValue,
      currency: raw.currency || 'EUR',
      publication_date: raw.publicationDate?.toISOString().split('T')[0],
      deadline_at: raw.deadline?.toISOString(),
      status: 'new',
      match_score: 0, // Will be calculated separately
      tags: generateTenderTags(raw),
    };
  }

  /**
   * Process and import tenders with match score calculation
   */
  async processAndImport(
    tenders: RawTenderData[]
  ): Promise<{ imported: number; skipped: number; errors: string[] }> {
    const supabase = await createClient();
    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const raw of tenders) {
      try {
        // Skip if already exists
        const exists = await this.tenderExists(raw.externalId);
        if (exists) {
          skipped++;
          continue;
        }

        // Calculate match score
        const matchFactors = await calculateMatchScore(raw);

        // Skip if match score is too low (below 30%)
        if (matchFactors.total < 30) {
          console.log(
            `[TEDConnector] Skipping low-score tender: ${raw.externalId} (score: ${matchFactors.total})`
          );
          skipped++;
          continue;
        }

        // Normalize and add match score
        const normalized = this.normalize(raw);
        normalized.match_score = matchFactors.total;

        // Insert into database
        const { error } = await supabase.from('tenders').insert(normalized);

        if (error) {
          errors.push(`Failed to insert ${raw.externalId}: ${error.message}`);
        } else {
          imported++;
          console.log(
            `[TEDConnector] Imported: ${raw.title.slice(0, 50)}... (score: ${matchFactors.total})`
          );
        }
      } catch (err) {
        errors.push(`Error processing ${raw.externalId}: ${String(err)}`);
      }
    }

    return { imported, skipped, errors };
  }

  // ============================================================================
  // PRIVATE HELPERS
  // ============================================================================

  /**
   * Get date range for search (last 7 days)
   */
  private getDateRange(): string {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7);

    const format = (d: Date) => d.toISOString().split('T')[0];
    return `${format(start)}-${format(end)}`;
  }

  /**
   * Parse a TED notice into RawTenderData
   */
  private parseNotice(notice: TEDNotice): RawTenderData | null {
    // Skip if no title
    if (!notice['title-text']) {
      return null;
    }

    // Extract CPV codes
    const cpvCodes: string[] = [];
    if (notice['cpv-main']) {
      cpvCodes.push(notice['cpv-main']);
    }
    if (notice['cpv-additional']) {
      cpvCodes.push(...notice['cpv-additional']);
    }

    // Skip if no construction CPV codes
    if (!cpvCodes.some((c) => c.startsWith(CONSTRUCTION_CPV_PREFIX))) {
      return null;
    }

    // Extract location
    const address = notice['contracting-authority-address'];
    let buyerLocation: string | undefined;
    if (address) {
      const parts = [address.town, address.nuts, address['country-code']].filter(
        Boolean
      );
      buyerLocation = parts.join(', ');
    }

    // Parse dates
    let publicationDate: Date | undefined;
    if (notice['publication-date']) {
      publicationDate = new Date(notice['publication-date']);
    }

    let deadline: Date | undefined;
    if (notice['deadline-receipt-tenders']) {
      deadline = new Date(notice['deadline-receipt-tenders']);
    }

    return {
      source: 'ted',
      externalId: notice['publication-number'],
      externalUrl: notice.links?.html,
      title: notice['title-text'],
      buyer:
        notice['contracting-authority-name'] ||
        notice['official-name'] ||
        'Unknown',
      buyerLocation,
      cpvCodes,
      estimatedValue: notice['estimated-value']?.value,
      currency: notice['estimated-value']?.currency || 'EUR',
      publicationDate,
      deadline,
      rawJson: notice as unknown as Record<string, unknown>,
    };
  }
}

// ============================================================================
// FACTORY
// ============================================================================

export function createTEDConnector(): TEDConnector {
  return new TEDConnector();
}
