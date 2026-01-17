import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Check if Supabase is configured
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const IS_SUPABASE_CONFIGURED = SUPABASE_URL && SUPABASE_ANON_KEY;

// Mock client for development without Supabase
function createMockClient() {
  const mockResponse = { data: null, error: { message: 'Supabase not configured - using seed data' } };
  return {
    from: () => ({
      select: () => ({
        order: () => Promise.resolve(mockResponse),
        eq: () => ({
          single: () => Promise.resolve(mockResponse),
          order: () => Promise.resolve(mockResponse),
        }),
        in: () => Promise.resolve(mockResponse),
        single: () => Promise.resolve(mockResponse),
      }),
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve(mockResponse),
        }),
      }),
      update: () => ({
        eq: () => ({
          select: () => ({
            single: () => Promise.resolve(mockResponse),
          }),
        }),
      }),
    }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    },
  };
}

export async function createClient() {
  // Return mock client if Supabase is not configured
  if (!IS_SUPABASE_CONFIGURED) {
    console.log('[Supabase] Not configured - using mock client with seed data fallback');
    return createMockClient() as ReturnType<typeof createServerClient>;
  }

  const cookieStore = await cookies();

  return createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}
