/**
 * Rate Limiter
 *
 * Simple in-memory rate limiter for tender source APIs.
 * Uses sliding window algorithm.
 */

import type { TenderSource, RateLimitConfig, RateLimitState } from './types';

// ============================================================================
// RATE LIMIT CONFIGURATIONS
// ============================================================================

const RATE_LIMITS: Record<TenderSource, RateLimitConfig> = {
  ted: {
    source: 'ted',
    maxRequests: 60,
    windowMs: 60 * 60 * 1000, // 60 requests per hour
  },
  'e-procurement': {
    source: 'e-procurement',
    maxRequests: 100,
    windowMs: 24 * 60 * 60 * 1000, // 100 requests per day
  },
};

// ============================================================================
// STATE STORAGE
// ============================================================================

const rateLimitStates: Map<TenderSource, RateLimitState> = new Map();

// ============================================================================
// RATE LIMITER CLASS
// ============================================================================

export class RateLimiter {
  private config: RateLimitConfig;
  private state: RateLimitState;

  constructor(source: TenderSource) {
    this.config = RATE_LIMITS[source];

    // Get or create state
    let state = rateLimitStates.get(source);
    if (!state) {
      state = {
        source,
        requestCount: 0,
        windowStart: Date.now(),
      };
      rateLimitStates.set(source, state);
    }
    this.state = state;
  }

  /**
   * Check if a request is allowed
   */
  canRequest(): boolean {
    this.resetWindowIfExpired();
    return this.state.requestCount < this.config.maxRequests;
  }

  /**
   * Record a request
   */
  recordRequest(): void {
    this.resetWindowIfExpired();
    this.state.requestCount++;
    rateLimitStates.set(this.config.source, this.state);
  }

  /**
   * Get remaining requests in current window
   */
  getRemainingRequests(): number {
    this.resetWindowIfExpired();
    return Math.max(0, this.config.maxRequests - this.state.requestCount);
  }

  /**
   * Get time until window resets (in ms)
   */
  getTimeUntilReset(): number {
    const elapsed = Date.now() - this.state.windowStart;
    return Math.max(0, this.config.windowMs - elapsed);
  }

  /**
   * Wait for rate limit to reset (with backoff)
   */
  async waitForReset(): Promise<void> {
    const waitTime = this.getTimeUntilReset();
    if (waitTime > 0) {
      console.log(
        `[RateLimiter] ${this.config.source}: Waiting ${Math.round(waitTime / 1000)}s for rate limit reset`
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  /**
   * Execute a function with rate limiting
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (!this.canRequest()) {
      await this.waitForReset();
    }

    this.recordRequest();
    return fn();
  }

  /**
   * Reset window if expired
   */
  private resetWindowIfExpired(): void {
    const now = Date.now();
    const elapsed = now - this.state.windowStart;

    if (elapsed >= this.config.windowMs) {
      this.state = {
        source: this.config.source,
        requestCount: 0,
        windowStart: now,
      };
      rateLimitStates.set(this.config.source, this.state);
    }
  }

  /**
   * Get current state (for debugging/monitoring)
   */
  getState(): RateLimitState {
    this.resetWindowIfExpired();
    return { ...this.state };
  }
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Create a rate limiter for a source
 */
export function createRateLimiter(source: TenderSource): RateLimiter {
  return new RateLimiter(source);
}

/**
 * Clear all rate limit states (for testing)
 */
export function clearRateLimitStates(): void {
  rateLimitStates.clear();
}

/**
 * Get all rate limit states (for monitoring)
 */
export function getAllRateLimitStates(): Record<TenderSource, RateLimitState | undefined> {
  return {
    ted: rateLimitStates.get('ted'),
    'e-procurement': rateLimitStates.get('e-procurement'),
  };
}
