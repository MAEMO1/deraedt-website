/**
 * Environment Configuration
 *
 * This module provides typed access to environment variables with
 * runtime validation. Validation happens lazily when values are accessed,
 * not at import time, to allow builds to succeed without all env vars set.
 *
 * For runtime checks:
 * - Use isEmailConfigured() before sending emails
 * - Use isSupabaseConfigured() before database operations
 * - Use requireEnv() to get a required env var or throw
 */

/**
 * Environment variable configuration (read-only at import time)
 */
export const env = {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

  // Email
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  FROM_EMAIL: process.env.FROM_EMAIL || 'noreply@deraedt.be',
  NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL || 'info@deraedt.be',
  HR_EMAIL: process.env.HR_EMAIL || 'hr@deraedt.be',

  // Cron
  CRON_SECRET: process.env.CRON_SECRET,

  // Meta
  NODE_ENV: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

/**
 * Helper to check if email service is available
 */
export function isEmailConfigured(): boolean {
  return !!env.RESEND_API_KEY;
}

/**
 * Helper to check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/**
 * Helper to get a required env var or throw
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
