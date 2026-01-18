/**
 * Tender Agent
 *
 * Main orchestrator for the tender ingestion system.
 * Coordinates connectors, manages ingest runs, and handles errors.
 */

import type {
  TenderSource,
  TenderAgentResult,
  IngestRun,
} from './types';
import { createClient } from '@/lib/supabase/server';
import { createTEDConnector, TEDConnector } from './ted-connector';
import {
  createEProcurementConnector,
  EProcurementConnector,
} from './e-procurement-connector';

// Re-export types
export * from './types';

// Re-export utilities
export { calculateMatchScore, generateTenderTags, clearCpvCache } from './match-calculator';
export { createRateLimiter, clearRateLimitStates, getAllRateLimitStates } from './rate-limiter';
export { createTEDConnector } from './ted-connector';
export { createEProcurementConnector } from './e-procurement-connector';

// ============================================================================
// TENDER AGENT CLASS
// ============================================================================

export class TenderAgent {
  private tedConnector: TEDConnector;
  private eProcurementConnector: EProcurementConnector;

  constructor() {
    this.tedConnector = createTEDConnector();
    this.eProcurementConnector = createEProcurementConnector();
  }

  /**
   * Run ingestion for a specific source
   */
  async runIngest(source: TenderSource): Promise<TenderAgentResult> {
    const startedAt = new Date();
    const runId = await this.createIngestRun(source);

    const result: TenderAgentResult = {
      source,
      runId,
      startedAt,
      completedAt: new Date(),
      tendersFound: 0,
      tendersImported: 0,
      tendersSkipped: 0,
      errors: [],
      newTenders: [],
    };

    try {
      console.log(`[TenderAgent] Starting ${source} ingest run: ${runId}`);

      // Fetch tenders based on source
      let rawTenders;
      if (source === 'ted') {
        rawTenders = await this.tedConnector.fetchTenders();
      } else {
        rawTenders = await this.eProcurementConnector.fetchTenders();
      }

      result.tendersFound = rawTenders.length;
      console.log(`[TenderAgent] Found ${rawTenders.length} tenders from ${source}`);

      // Process and import
      let importResult;
      if (source === 'ted') {
        importResult = await this.tedConnector.processAndImport(rawTenders);
      } else {
        importResult = await this.eProcurementConnector.processAndImport(rawTenders);
      }

      result.tendersImported = importResult.imported;
      result.tendersSkipped = importResult.skipped;
      result.errors = importResult.errors;

      // Mark run as completed
      result.completedAt = new Date();
      await this.updateIngestRun(runId, {
        status: 'completed',
        completed_at: result.completedAt.toISOString(),
        tenders_found: result.tendersFound,
        tenders_imported: result.tendersImported,
        tenders_skipped: result.tendersSkipped,
      });

      console.log(
        `[TenderAgent] Completed ${source} ingest: ${result.tendersImported} imported, ${result.tendersSkipped} skipped`
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      result.errors.push(errorMessage);
      result.completedAt = new Date();

      await this.updateIngestRun(runId, {
        status: 'failed',
        completed_at: result.completedAt.toISOString(),
        error_message: errorMessage,
      });

      console.error(`[TenderAgent] ${source} ingest failed:`, err);
    }

    return result;
  }

  /**
   * Run ingestion for all sources
   */
  async runAllIngests(): Promise<TenderAgentResult[]> {
    const results: TenderAgentResult[] = [];

    // Run TED first
    const tedResult = await this.runIngest('ted');
    results.push(tedResult);

    // Then e-Procurement
    const eProcResult = await this.runIngest('e-procurement');
    results.push(eProcResult);

    return results;
  }

  /**
   * Process e-Procurement email notifications
   */
  async processEmails(
    emails: string[]
  ): Promise<{ imported: number; skipped: number; errors: string[] }> {
    return this.eProcurementConnector.processEmails(emails);
  }

  /**
   * Get recent ingest runs
   */
  async getRecentRuns(limit = 10): Promise<IngestRun[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('tender_ingest_runs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[TenderAgent] Failed to get recent runs:', error);
      return [];
    }

    return data as IngestRun[];
  }

  /**
   * Get ingest statistics
   */
  async getStats(): Promise<{
    totalRuns: number;
    successfulRuns: number;
    totalImported: number;
    lastRun?: IngestRun;
  }> {
    const supabase = await createClient();

    // Get total and successful runs
    const { count: totalRuns } = await supabase
      .from('tender_ingest_runs')
      .select('*', { count: 'exact', head: true });

    const { count: successfulRuns } = await supabase
      .from('tender_ingest_runs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    // Get total imported
    const { data: importStats } = await supabase
      .from('tender_ingest_runs')
      .select('tenders_imported')
      .eq('status', 'completed');

    const totalImported =
      importStats?.reduce((sum: number, r: { tenders_imported: number | null }) => sum + (r.tenders_imported || 0), 0) || 0;

    // Get last run
    const { data: lastRunData } = await supabase
      .from('tender_ingest_runs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(1)
      .single();

    return {
      totalRuns: totalRuns || 0,
      successfulRuns: successfulRuns || 0,
      totalImported,
      lastRun: lastRunData as IngestRun | undefined,
    };
  }

  // ============================================================================
  // PRIVATE HELPERS
  // ============================================================================

  /**
   * Create a new ingest run record
   */
  private async createIngestRun(source: TenderSource): Promise<string> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('tender_ingest_runs')
      .insert({
        source,
        status: 'running',
        started_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) {
      console.error('[TenderAgent] Failed to create ingest run:', error);
      // Return a temporary ID if insert fails
      return `temp-${Date.now()}`;
    }

    return data.id;
  }

  /**
   * Update an ingest run record
   */
  private async updateIngestRun(
    runId: string,
    updates: Partial<IngestRun>
  ): Promise<void> {
    // Skip update for temporary IDs
    if (runId.startsWith('temp-')) {
      return;
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from('tender_ingest_runs')
      .update(updates)
      .eq('id', runId);

    if (error) {
      console.error('[TenderAgent] Failed to update ingest run:', error);
    }
  }
}

// ============================================================================
// FACTORY
// ============================================================================

let agentInstance: TenderAgent | null = null;

/**
 * Get the singleton TenderAgent instance
 */
export function getTenderAgent(): TenderAgent {
  if (!agentInstance) {
    agentInstance = new TenderAgent();
  }
  return agentInstance;
}

/**
 * Create a new TenderAgent instance (for testing)
 */
export function createTenderAgent(): TenderAgent {
  return new TenderAgent();
}
