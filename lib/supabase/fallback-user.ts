import type { Profile } from './types';

/**
 * Fallback user for when profile fetch fails but middleware validated auth.
 * This prevents redirect loops when auth session exists but profile doesn't.
 */
export const FALLBACK_USER: Profile = {
  id: "fallback",
  email: "admin@deraedt.be",
  full_name: "Admin User",
  role: "DIRECTIE",
  avatar_url: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
