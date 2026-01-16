import { createClient } from './server';
import type { UserRole, Profile } from './types';

/**
 * RBAC role hierarchy - higher roles include permissions of lower roles
 */
const ROLE_HIERARCHY: Record<UserRole, number> = {
  VIEWER: 0,
  OPERATIONS: 1,
  HR: 2,
  SALES: 2,
  ADMIN: 3,
  DIRECTIE: 4,
};

/**
 * Role-based access control definitions
 */
export const ROLE_PERMISSIONS = {
  // Routes each role can access
  routes: {
    '/dashboard': ['VIEWER', 'OPERATIONS', 'HR', 'SALES', 'ADMIN', 'DIRECTIE'],
    '/dashboard/leads': ['SALES', 'ADMIN', 'DIRECTIE'],
    '/dashboard/tenders': ['SALES', 'ADMIN', 'DIRECTIE'],
    '/dashboard/recruitment': ['HR', 'ADMIN', 'DIRECTIE'],
    '/dashboard/compliance': ['ADMIN', 'DIRECTIE'],
    '/dashboard/facility': ['OPERATIONS', 'ADMIN', 'DIRECTIE'],
    '/dashboard/partners': ['ADMIN', 'DIRECTIE'],
    '/dashboard/analytics': ['ADMIN', 'DIRECTIE'],
  } as Record<string, UserRole[]>,

  // Actions each role can perform
  actions: {
    'leads:read': ['SALES', 'ADMIN', 'DIRECTIE'],
    'leads:write': ['SALES', 'ADMIN', 'DIRECTIE'],
    'tenders:read': ['SALES', 'ADMIN', 'DIRECTIE'],
    'tenders:write': ['SALES', 'ADMIN', 'DIRECTIE'],
    'jobs:read': ['HR', 'ADMIN', 'DIRECTIE'],
    'jobs:write': ['HR', 'ADMIN', 'DIRECTIE'],
    'compliance:read': ['ADMIN', 'DIRECTIE'],
    'compliance:write': ['ADMIN', 'DIRECTIE'],
    'users:manage': ['ADMIN', 'DIRECTIE'],
  } as Record<string, UserRole[]>,
};

/**
 * Get the current authenticated user with profile
 */
export async function getCurrentUser(): Promise<Profile | null> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return null;
  }

  return profile as Profile;
}

/**
 * Get the current authenticated session
 */
export async function getSession() {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    return null;
  }

  return session;
}

/**
 * Check if user has a specific role
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Check if user can access a specific route
 */
export function canAccessRoute(userRole: UserRole, route: string): boolean {
  // Find the matching route pattern
  const matchedRoute = Object.keys(ROLE_PERMISSIONS.routes).find(pattern => {
    if (pattern === route) return true;
    // Simple prefix matching for nested routes
    if (route.startsWith(pattern + '/')) return true;
    return false;
  });

  if (!matchedRoute) {
    // Default: allow access to unprotected routes
    return true;
  }

  const allowedRoles = ROLE_PERMISSIONS.routes[matchedRoute];
  return allowedRoles.includes(userRole);
}

/**
 * Check if user can perform a specific action
 */
export function canPerformAction(userRole: UserRole, action: string): boolean {
  const allowedRoles = ROLE_PERMISSIONS.actions[action];
  if (!allowedRoles) {
    return false;
  }
  return allowedRoles.includes(userRole);
}

/**
 * Require authentication for a server component/action
 * Throws error if not authenticated
 */
export async function requireAuth(): Promise<Profile> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized: Authentication required');
  }

  return user;
}

/**
 * Require a specific role for a server component/action
 * Throws error if not authorized
 */
export async function requireRole(requiredRole: UserRole): Promise<Profile> {
  const user = await requireAuth();

  if (!hasRole(user.role, requiredRole)) {
    throw new Error(`Unauthorized: Role ${requiredRole} required`);
  }

  return user;
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}
