/**
 * e-Procurement Connector
 *
 * Handles Belgian e-Procurement platform tenders.
 * Can parse email notifications and fetch from the API.
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

const E_PROCUREMENT_SEARCH_URL =
  'https://www.publicprocurement.be/api/v1/tenders/search';

// ============================================================================
// EMAIL PARSING PATTERNS
// ============================================================================

const EMAIL_PATTERNS = {
  // Reference number: BE-VL-2025-0892
  referenceNumber: /(?:BE-\w+-\d{4}-\d+|PPS\d+)/gi,

  // Title: often in subject or first line
  title:
    /(?:Onderwerp|Subject|Titel):\s*(.+?)(?:\r?\n|$)/i,

  // Buyer/Contracting authority
  buyer:
    /(?:Aanbestedende overheid|Aanbesteder|Opdrachtgever):\s*(.+?)(?:\r?\n|$)/i,

  // Location
  location:
    /(?:Plaats|Locatie|Uitvoering):\s*(.+?)(?:\r?\n|$)/i,

  // CPV codes: 45xxxxxx format
  cpvCode: /\b(45\d{6})\b/g,

  // Deadline
  deadline:
    /(?:Uiterste datum|Deadline|Limietdatum):\s*(\d{1,2}[-/]\d{1,2}[-/]\d{4}(?:\s+\d{1,2}:\d{2})?)/i,

  // Estimated value
  value:
    /(?:Geraamde waarde|Geschatte waarde|Budget):\s*[€]?\s*([\d.,]+)\s*(?:EUR|euro)?/i,

  // Publication date
  publicationDate:
    /(?:Publicatiedatum|Gepubliceerd op):\s*(\d{1,2}[-/]\d{1,2}[-/]\d{4})/i,

  // External URL
  url: /(?:https?:\/\/(?:www\.)?publicprocurement\.be\/[^\s<>"]+)/gi,
};

// ============================================================================
// E-PROCUREMENT CONNECTOR CLASS
// ============================================================================

export class EProcurementConnector implements TenderConnector {
  readonly source: TenderSource = 'e-procurement';
  private rateLimiter = createRateLimiter('e-procurement');

  /**
   * Fetch tenders from e-Procurement API
   */
  async fetchTenders(): Promise<RawTenderData[]> {
    const tenders: RawTenderData[] = [];

    try {
      // Build search query for Belgian construction tenders
      const searchParams = new URLSearchParams({
        type: 'CONTRACT_NOTICE',
        cpvCode: '45*', // Construction
        region: 'BE-VOV', // Oost-Vlaanderen first
        publicationDateFrom: this.getDateFrom(),
        pageSize: '50',
        page: '0',
      });

      // Fetch with rate limiting
      const response = await this.rateLimiter.execute(async () => {
        const url = `${E_PROCUREMENT_SEARCH_URL}?${searchParams}`;
        console.log(`[EProcurementConnector] Fetching: ${url}`);

        const res = await fetch(url, {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'DeRaedt-TenderAgent/1.0',
          },
          next: { revalidate: 3600 },
        });

        if (!res.ok) {
          // e-Procurement might require authentication
          // Log and return empty for now
          console.warn(
            `[EProcurementConnector] API returned ${res.status} - may require auth`
          );
          return { content: [], totalElements: 0 };
        }

        return res.json();
      });

      const items = response?.content || [];
      console.log(`[EProcurementConnector] Found ${items.length} notices`);

      for (const item of items) {
        try {
          const raw = this.parseApiResponse(item);
          if (raw) {
            tenders.push(raw);
          }
        } catch (err) {
          console.error('[EProcurementConnector] Failed to parse item:', err);
        }
      }
    } catch (err) {
      console.error('[EProcurementConnector] Fetch error:', err);
      // Don't throw - return what we have
    }

    return tenders;
  }

  /**
   * Parse email notification content
   */
  parseEmail(emailContent: string): RawTenderData | null {
    try {
      // Extract reference number
      const refMatch = emailContent.match(EMAIL_PATTERNS.referenceNumber);
      if (!refMatch) {
        console.warn('[EProcurementConnector] No reference number found in email');
        return null;
      }

      // Extract title
      const titleMatch = emailContent.match(EMAIL_PATTERNS.title);
      const title = titleMatch?.[1]?.trim() || 'Untitled tender';

      // Extract buyer
      const buyerMatch = emailContent.match(EMAIL_PATTERNS.buyer);
      const buyer = buyerMatch?.[1]?.trim() || 'Unknown buyer';

      // Extract location
      const locationMatch = emailContent.match(EMAIL_PATTERNS.location);
      const buyerLocation = locationMatch?.[1]?.trim();

      // Extract CPV codes
      const cpvMatches = emailContent.matchAll(EMAIL_PATTERNS.cpvCode);
      const cpvCodes = [...new Set([...cpvMatches].map((m) => m[1]))];

      // Extract deadline
      let deadline: Date | undefined;
      const deadlineMatch = emailContent.match(EMAIL_PATTERNS.deadline);
      if (deadlineMatch) {
        deadline = this.parseDate(deadlineMatch[1]);
      }

      // Extract value
      let estimatedValue: number | undefined;
      const valueMatch = emailContent.match(EMAIL_PATTERNS.value);
      if (valueMatch) {
        estimatedValue = parseFloat(
          valueMatch[1].replace(/\./g, '').replace(',', '.')
        );
      }

      // Extract publication date
      let publicationDate: Date | undefined;
      const pubDateMatch = emailContent.match(EMAIL_PATTERNS.publicationDate);
      if (pubDateMatch) {
        publicationDate = this.parseDate(pubDateMatch[1]);
      }

      // Extract URL
      const urlMatch = emailContent.match(EMAIL_PATTERNS.url);
      const externalUrl = urlMatch?.[0];

      return {
        source: 'e-procurement',
        externalId: refMatch[0],
        externalUrl,
        title,
        buyer,
        buyerLocation,
        cpvCodes,
        estimatedValue,
        currency: 'EUR',
        publicationDate,
        deadline,
        rawHtml: emailContent,
      };
    } catch (err) {
      console.error('[EProcurementConnector] Email parse error:', err);
      return null;
    }
  }

  /**
   * Check if a tender already exists
   */
  async tenderExists(externalId: string): Promise<boolean> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('tenders')
      .select('id')
      .eq('source', 'e-procurement')
      .eq('external_id', externalId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('[EProcurementConnector] Existence check error:', error);
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
      match_score: 0,
      tags: generateTenderTags(raw),
    };
  }

  /**
   * Process emails and import tenders
   */
  async processEmails(
    emails: string[]
  ): Promise<{ imported: number; skipped: number; errors: string[] }> {
    const supabase = await createClient();
    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const emailContent of emails) {
      try {
        const raw = this.parseEmail(emailContent);
        if (!raw) {
          skipped++;
          continue;
        }

        // Skip if already exists
        const exists = await this.tenderExists(raw.externalId);
        if (exists) {
          skipped++;
          continue;
        }

        // Calculate match score
        const matchFactors = await calculateMatchScore(raw);

        // Skip if match score is too low
        if (matchFactors.total < 30) {
          console.log(
            `[EProcurementConnector] Skipping low-score: ${raw.externalId} (${matchFactors.total})`
          );
          skipped++;
          continue;
        }

        // Normalize and add score
        const normalized = this.normalize(raw);
        normalized.match_score = matchFactors.total;

        // Insert
        const { error } = await supabase.from('tenders').insert(normalized);

        if (error) {
          errors.push(`Failed to insert ${raw.externalId}: ${error.message}`);
        } else {
          imported++;
          console.log(
            `[EProcurementConnector] Imported: ${raw.title.slice(0, 50)}...`
          );
        }
      } catch (err) {
        errors.push(`Email processing error: ${String(err)}`);
      }
    }

    return { imported, skipped, errors };
  }

  /**
   * Process and import tenders from API
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
        const exists = await this.tenderExists(raw.externalId);
        if (exists) {
          skipped++;
          continue;
        }

        const matchFactors = await calculateMatchScore(raw);
        if (matchFactors.total < 30) {
          skipped++;
          continue;
        }

        const normalized = this.normalize(raw);
        normalized.match_score = matchFactors.total;

        const { error } = await supabase.from('tenders').insert(normalized);

        if (error) {
          errors.push(`Insert error ${raw.externalId}: ${error.message}`);
        } else {
          imported++;
        }
      } catch (err) {
        errors.push(`Processing error: ${String(err)}`);
      }
    }

    return { imported, skipped, errors };
  }

  // ============================================================================
  // PRIVATE HELPERS
  // ============================================================================

  /**
   * Get date from 7 days ago
   */
  private getDateFrom(): string {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().split('T')[0];
  }

  /**
   * Parse date string (DD-MM-YYYY or DD/MM/YYYY format)
   */
  private parseDate(dateStr: string): Date | undefined {
    try {
      // Handle DD-MM-YYYY or DD/MM/YYYY
      const parts = dateStr.split(/[-/]/);
      if (parts.length >= 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    } catch {
      console.warn('[EProcurementConnector] Failed to parse date:', dateStr);
    }
    return undefined;
  }

  /**
   * Parse API response item
   */
  private parseApiResponse(item: Record<string, unknown>): RawTenderData | null {
    try {
      const id = item.id || item.referenceNumber;
      if (!id) return null;

      const cpvCodes: string[] = [];
      if (item.cpvCode) {
        if (Array.isArray(item.cpvCode)) {
          cpvCodes.push(...item.cpvCode);
        } else {
          cpvCodes.push(String(item.cpvCode));
        }
      }

      // Only construction tenders
      if (!cpvCodes.some((c) => c.startsWith('45'))) {
        return null;
      }

      return {
        source: 'e-procurement',
        externalId: String(id),
        externalUrl: item.url as string | undefined,
        title: (item.title || item.shortDescription || 'Untitled') as string,
        buyer: (item.contractingAuthority || item.buyer || 'Unknown') as string,
        buyerLocation: item.location as string | undefined,
        cpvCodes,
        estimatedValue: item.estimatedValue as number | undefined,
        currency: 'EUR',
        publicationDate: item.publicationDate
          ? new Date(item.publicationDate as string)
          : undefined,
        deadline: item.deadline
          ? new Date(item.deadline as string)
          : undefined,
        rawJson: item,
      };
    } catch {
      return null;
    }
  }
}

// ============================================================================
// FACTORY
// ============================================================================

export function createEProcurementConnector(): EProcurementConnector {
  return new EProcurementConnector();
}
