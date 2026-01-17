import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const debug: Record<string, unknown> = {};

  try {
    const body = await request.json();
    debug.body = body;

    const { email, password } = body;
    debug.hasEmail = !!email;
    debug.hasPassword = !!password;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    debug.hasSupabaseUrl = !!supabaseUrl;
    debug.hasSupabaseAnonKey = !!supabaseAnonKey;
    debug.supabaseUrlPrefix = supabaseUrl?.substring(0, 30) + '...';

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ debug, error: 'Missing env vars' }, { status: 500 });
    }

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {
            // no-op for debug
          },
        },
      }
    );

    debug.supabaseClientCreated = true;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    debug.signInComplete = true;
    debug.hasData = !!data;
    debug.hasUser = !!data?.user;
    debug.hasSession = !!data?.session;
    debug.error = error?.message;

    if (error) {
      return NextResponse.json({ debug, error: error.message }, { status: 401 });
    }

    return NextResponse.json({
      debug,
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    });
  } catch (err) {
    debug.catchError = err instanceof Error ? err.message : String(err);
    debug.stack = err instanceof Error ? err.stack : undefined;
    return NextResponse.json({ debug, error: 'Exception caught' }, { status: 500 });
  }
}
