/**
 * Rate Limiting Module
 *
 * Simple sliding window rate limiter for API endpoints.
 *
 * IMPORTANT: This is an in-memory rate limiter which has limitations in serverless:
 * - State is not shared across function instances
 * - State is lost when instances are recycled
 * For production at scale, consider Redis-based rate limiting (e.g., @upstash/ratelimit)
 *
 * However, this still provides protection against:
 * - Rapid-fire requests from the same IP within a single instance
 * - Basic abuse prevention during the instance lifetime
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store for rate limit data
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
  lastCleanup = now;
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Window size in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Number of remaining requests in the current window */
  remaining: number;
  /** Timestamp when the rate limit resets */
  resetAt: number;
}

/**
 * Check if a request should be rate limited.
 *
 * @param identifier - Unique identifier for the client (usually IP address)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  // Clean up expired entries periodically
  cleanupExpiredEntries();

  const now = Date.now();
  const key = identifier;

  const existing = rateLimitStore.get(key);

  // If no existing entry or entry has expired, create new one
  if (!existing || existing.resetAt < now) {
    const entry: RateLimitEntry = {
      count: 1,
      resetAt: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);
    return {
      allowed: true,
      remaining: config.limit - 1,
      resetAt: entry.resetAt,
    };
  }

  // Increment count
  existing.count++;

  // Check if limit exceeded
  if (existing.count > config.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  return {
    allowed: true,
    remaining: config.limit - existing.count,
    resetAt: existing.resetAt,
  };
}

/**
 * Get client IP from request headers.
 * Handles various proxy headers for accurate IP detection.
 *
 * @param headers - Request headers
 * @returns Client IP address or 'unknown'
 */
export function getClientIP(headers: Headers): string {
  // Check various headers in order of preference
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for may contain multiple IPs, use the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  const cfConnectingIP = headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return 'unknown';
}

// Default configurations for different endpoint types
export const RATE_LIMIT_CONFIGS = {
  /** Public form submissions: 10 requests per minute */
  form: {
    limit: 10,
    windowMs: 60 * 1000, // 1 minute
  },
  /** API reads: 100 requests per minute */
  read: {
    limit: 100,
    windowMs: 60 * 1000, // 1 minute
  },
  /** Authentication attempts: 5 requests per minute */
  auth: {
    limit: 5,
    windowMs: 60 * 1000, // 1 minute
  },
} as const;
