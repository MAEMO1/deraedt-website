import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email en wachtwoord zijn verplicht' },
        { status: 400 }
      );
    }

    // Track cookies to set
    const cookiesToSet: Array<{ name: string; value: string; options: Record<string, unknown> }> = [];

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookies) {
            cookiesToSet.push(...cookies);
          },
        },
      }
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    // Create success response
    const response = NextResponse.json({
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    });

    // Apply all cookies that Supabase wants to set
    for (const cookie of cookiesToSet) {
      response.cookies.set(cookie.name, cookie.value, cookie.options);
    }

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Er is een fout opgetreden' },
      { status: 500 }
    );
  }
}
