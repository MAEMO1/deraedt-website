import { type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { updateSession } from '@/lib/supabase/middleware';
import { locales, defaultLocale } from '@/i18n/config';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // nl not in URL, fr/en are
});

// Paths that should NOT have i18n routing
const i18nExcludedPaths = [
  '/dashboard',
  '/login',
  '/api',
  '/auth',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path should be excluded from i18n
  const isExcludedPath = i18nExcludedPaths.some(
    (path) => pathname.startsWith(path) || pathname === path
  );

  // For excluded paths (dashboard, login, api, auth), only run Supabase middleware
  if (isExcludedPath) {
    return updateSession(request);
  }

  // For public/marketing paths, run i18n middleware first
  const intlResponse = intlMiddleware(request);

  // Then run Supabase session update (preserves intl response)
  return updateSession(request, intlResponse);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images and other static assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
