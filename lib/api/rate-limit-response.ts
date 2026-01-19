import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP, RATE_LIMIT_CONFIGS, type RateLimitConfig } from '@/lib/rate-limit';

/**
 * Rate limit check result
 */
export interface RateLimitCheckResult {
  allowed: boolean;
  response?: NextResponse;
}

/**
 * Check rate limit and return a response if exceeded
 *
 * Usage:
 * ```ts
 * const rateCheck = checkFormRateLimit(request, 'leads', 'LEADS');
 * if (!rateCheck.allowed) return rateCheck.response!;
 * ```
 */
export function checkFormRateLimit(
  request: NextRequest,
  resourceKey: string,
  logContext: string
): RateLimitCheckResult {
  return checkRateLimitWithConfig(
    request,
    resourceKey,
    RATE_LIMIT_CONFIGS.form,
    logContext
  );
}

/**
 * Check rate limit with custom config and return a response if exceeded
 */
export function checkRateLimitWithConfig(
  request: NextRequest,
  resourceKey: string,
  config: RateLimitConfig,
  logContext: string
): RateLimitCheckResult {
  const clientIP = getClientIP(request.headers);
  const rateLimitKey = `${resourceKey}:${clientIP}`;
  const rateLimit = checkRateLimit(rateLimitKey, config);

  if (!rateLimit.allowed) {
    console.warn(`[${logContext}] Rate limit exceeded for IP: ${clientIP}`);
    return {
      allowed: false,
      response: NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimit.resetAt),
          },
        }
      ),
    };
  }

  return { allowed: true };
}
