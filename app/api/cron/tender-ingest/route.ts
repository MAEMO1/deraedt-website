/**
 * Tender Ingest Cron Job
 *
 * Runs on a schedule to fetch new tenders from TED and e-Procurement.
 * Vercel Cron: Weekdays at 7:00, 12:00, 17:00 CET
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTenderAgent } from '@/lib/tender-agent';

// Verify cron secret to prevent unauthorized access
const CRON_SECRET = process.env.CRON_SECRET;

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes max for long-running ingests

export async function GET(request: NextRequest) {
  // Verify authorization - ALWAYS require CRON_SECRET
  const authHeader = request.headers.get('authorization');
  const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

  // Log all access attempts
  console.log('[TenderIngestCron] Access attempt from:', clientIP);

  // CRON_SECRET must be configured
  if (!CRON_SECRET) {
    console.error('[TenderIngestCron] CRON_SECRET not configured - rejecting request');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  // Validate the bearer token
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    console.warn('[TenderIngestCron] Unauthorized request - invalid token');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const startTime = Date.now();
  console.log('[TenderIngestCron] Starting tender ingest job');

  try {
    const agent = getTenderAgent();
    const results = await agent.runAllIngests();

    const totalImported = results.reduce((sum, r) => sum + r.tendersImported, 0);
    const totalSkipped = results.reduce((sum, r) => sum + r.tendersSkipped, 0);
    const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
    const duration = Date.now() - startTime;

    console.log(
      `[TenderIngestCron] Completed in ${duration}ms: ${totalImported} imported, ${totalSkipped} skipped, ${totalErrors} errors`
    );

    return NextResponse.json({
      success: true,
      duration,
      results: results.map((r) => ({
        source: r.source,
        runId: r.runId,
        tendersFound: r.tendersFound,
        tendersImported: r.tendersImported,
        tendersSkipped: r.tendersSkipped,
        errorCount: r.errors.length,
        errors: r.errors.slice(0, 5), // Only return first 5 errors
      })),
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[TenderIngestCron] Fatal error:', err);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        duration: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggers from admin
export async function POST(request: NextRequest) {
  return GET(request);
}
