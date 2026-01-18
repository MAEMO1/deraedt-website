/**
 * Match Score Calculator
 *
 * Calculates relevance scores for tenders based on CPV codes,
 * location, value, and deadline proximity.
 */

import type {
  RawTenderData,
  MatchScoreFactors,
  MatchCalculatorConfig,
  CpvRelevance,
} from './types';
import { createClient } from '@/lib/supabase/server';

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

const DEFAULT_CONFIG: MatchCalculatorConfig = {
  weights: {
    cpv: 0.6, // 60% weight
    location: 0.25, // 25% weight
    value: 0.1, // 10% weight
    deadline: 0.05, // 5% weight
  },
  preferredLocations: [
    'oost-vlaanderen',
    'gent',
    'dendermonde',
    'sint-niklaas',
    'lokeren',
    'wetteren',
    'aalst',
    'zele',
    'hamme',
    'temse',
    'beveren',
  ],
  valueRange: {
    min: 50000, // Minimum viable project
    max: 5000000, // Maximum comfortable
    sweetSpotMin: 200000, // Ideal minimum
    sweetSpotMax: 2000000, // Ideal maximum
  },
};

// ============================================================================
// CPV CACHE
// ============================================================================

let cpvCache: Map<string, CpvRelevance> | null = null;
let cpvCacheExpiry = 0;

async function getCpvRelevanceMap(): Promise<Map<string, CpvRelevance>> {
  const now = Date.now();

  // Return cached if still valid (1 hour cache)
  if (cpvCache && now < cpvCacheExpiry) {
    return cpvCache;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('cpv_relevance')
    .select('*');

  if (error || !data) {
    console.error('[MatchCalculator] Failed to load CPV relevance:', error);
    // Return empty map, will use fallback scoring
    return new Map();
  }

  cpvCache = new Map(data.map((r: CpvRelevance) => [r.cpv_code, r]));
  cpvCacheExpiry = now + 60 * 60 * 1000; // 1 hour

  return cpvCache;
}

// ============================================================================
// SCORE CALCULATION
// ============================================================================

/**
 * Calculate CPV-based score (0-100)
 */
async function calculateCpvScore(cpvCodes: string[]): Promise<number> {
  if (!cpvCodes || cpvCodes.length === 0) {
    return 0;
  }

  const cpvMap = await getCpvRelevanceMap();

  // Find the highest scoring CPV code
  let maxScore = 0;

  for (const cpv of cpvCodes) {
    // Check exact match
    const exact = cpvMap.get(cpv);
    if (exact) {
      maxScore = Math.max(maxScore, exact.relevance_score);
      continue;
    }

    // Check parent code (first 5 digits)
    const parent = cpv.slice(0, 5) + '00000';
    const parentMatch = cpvMap.get(parent);
    if (parentMatch) {
      // 70% of parent score
      maxScore = Math.max(maxScore, Math.round(parentMatch.relevance_score * 0.7));
      continue;
    }

    // Check root code (first 2 digits)
    for (const [code, relevance] of cpvMap.entries()) {
      if (code.startsWith(cpv.slice(0, 2))) {
        // 50% of root category score
        maxScore = Math.max(maxScore, Math.round(relevance.relevance_score * 0.5));
        break;
      }
    }
  }

  return maxScore;
}

/**
 * Calculate location-based score (0-100)
 */
function calculateLocationScore(
  location: string | undefined,
  config: MatchCalculatorConfig
): number {
  if (!location) {
    return 50; // Unknown location gets neutral score
  }

  const normalized = location.toLowerCase();

  // Check preferred locations (Oost-Vlaanderen region)
  for (const preferred of config.preferredLocations) {
    if (normalized.includes(preferred)) {
      return 100;
    }
  }

  // Other Flemish provinces
  const flemishProvinces = [
    'antwerpen',
    'west-vlaanderen',
    'vlaams-brabant',
    'limburg',
    'vlaanderen',
  ];
  for (const province of flemishProvinces) {
    if (normalized.includes(province)) {
      return 70;
    }
  }

  // Belgium
  if (normalized.includes('belgi') || normalized.includes('brussel')) {
    return 50;
  }

  // Other EU
  return 20;
}

/**
 * Calculate value-based score (0-100)
 */
function calculateValueScore(
  value: number | undefined,
  config: MatchCalculatorConfig
): number {
  if (!value || value <= 0) {
    return 50; // Unknown value gets neutral score
  }

  const { min, max, sweetSpotMin, sweetSpotMax } = config.valueRange;

  // Too small
  if (value < min) {
    return 20;
  }

  // Too large
  if (value > max) {
    return 30;
  }

  // Sweet spot
  if (value >= sweetSpotMin && value <= sweetSpotMax) {
    return 100;
  }

  // Below sweet spot but acceptable
  if (value < sweetSpotMin) {
    const ratio = (value - min) / (sweetSpotMin - min);
    return Math.round(50 + ratio * 50);
  }

  // Above sweet spot but acceptable
  const ratio = (max - value) / (max - sweetSpotMax);
  return Math.round(50 + ratio * 50);
}

/**
 * Calculate deadline-based score (0-100)
 * Prefers tenders with 2-8 weeks lead time
 */
function calculateDeadlineScore(deadline: Date | undefined): number {
  if (!deadline) {
    return 50; // Unknown deadline gets neutral score
  }

  const now = new Date();
  const daysUntilDeadline = Math.ceil(
    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Already passed
  if (daysUntilDeadline < 0) {
    return 0;
  }

  // Too soon (less than 1 week)
  if (daysUntilDeadline < 7) {
    return 20;
  }

  // Ideal window (2-8 weeks)
  if (daysUntilDeadline >= 14 && daysUntilDeadline <= 56) {
    return 100;
  }

  // 1-2 weeks
  if (daysUntilDeadline < 14) {
    return 60;
  }

  // 8-12 weeks
  if (daysUntilDeadline <= 84) {
    return 80;
  }

  // More than 12 weeks
  return 60;
}

// ============================================================================
// MAIN CALCULATOR
// ============================================================================

/**
 * Calculate match score for a tender
 */
export async function calculateMatchScore(
  tender: RawTenderData,
  config: MatchCalculatorConfig = DEFAULT_CONFIG
): Promise<MatchScoreFactors> {
  const cpvScore = await calculateCpvScore(tender.cpvCodes);
  const locationScore = calculateLocationScore(tender.buyerLocation, config);
  const valueScore = calculateValueScore(tender.estimatedValue, config);
  const deadlineScore = calculateDeadlineScore(tender.deadline);

  const total = Math.round(
    cpvScore * config.weights.cpv +
      locationScore * config.weights.location +
      valueScore * config.weights.value +
      deadlineScore * config.weights.deadline
  );

  return {
    cpvScore,
    locationScore,
    valueScore,
    deadlineScore,
    total: Math.min(100, Math.max(0, total)),
  };
}

/**
 * Generate tags based on tender characteristics
 */
export function generateTenderTags(tender: RawTenderData): string[] {
  const tags: string[] = [];

  // Source tag
  tags.push(tender.source);

  // CPV-based tags
  const cpvTagMap: Record<string, string[]> = {
    '452': ['bouw'],
    '4521': ['nieuwbouw'],
    '4545': ['renovatie'],
    '4526': ['dakwerken'],
    '4532': ['isolatie'],
    '4521236': ['kerk', 'erfgoed'],
    '4545310': ['restauratie', 'erfgoed'],
  };

  for (const cpv of tender.cpvCodes) {
    for (const [prefix, cpvTags] of Object.entries(cpvTagMap)) {
      if (cpv.startsWith(prefix)) {
        tags.push(...cpvTags);
      }
    }
  }

  // Location-based tags
  if (tender.buyerLocation) {
    const loc = tender.buyerLocation.toLowerCase();
    if (loc.includes('oost-vlaanderen')) tags.push('oost-vlaanderen');
    if (loc.includes('gent')) tags.push('gent');
    if (loc.includes('waasland') || loc.includes('sint-niklaas')) tags.push('waasland');
  }

  // Value-based tags
  if (tender.estimatedValue) {
    if (tender.estimatedValue >= 1000000) {
      tags.push('groot-project');
    } else if (tender.estimatedValue < 200000) {
      tags.push('klein-project');
    }
  }

  // Buyer-based tags
  const buyer = tender.buyer.toLowerCase();
  if (buyer.includes('gemeente') || buyer.includes('stad') || buyer.includes('provincie')) {
    tags.push('publiek');
  }
  if (buyer.includes('sociale') || buyer.includes('shm')) {
    tags.push('sociaal');
  }
  if (buyer.includes('school') || buyer.includes('onderwijs')) {
    tags.push('onderwijs');
  }
  if (buyer.includes('kerk') || buyer.includes('parochie')) {
    tags.push('kerk');
  }

  // Deduplicate
  return [...new Set(tags)];
}

/**
 * Clear the CPV cache (useful for testing or admin updates)
 */
export function clearCpvCache(): void {
  cpvCache = null;
  cpvCacheExpiry = 0;
}
