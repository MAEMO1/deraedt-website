import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use anon key for public access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * GET /api/partner-intake?token=xxx
 * Validate token and get partner info
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { success: false, error: 'Token is required' },
      { status: 400 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .rpc('validate_partner_intake_token', { p_token: token });

    if (error) {
      console.error('[GET /api/partner-intake] RPC error:', error);
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 400 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Token not found' },
        { status: 404 }
      );
    }

    const partner = data[0];

    if (!partner.is_valid) {
      return NextResponse.json(
        { success: false, error: 'Token expired' },
        { status: 410 }
      );
    }

    if (partner.is_completed) {
      return NextResponse.json(
        { success: false, error: 'Documents already submitted', completed: true },
        { status: 200 }
      );
    }

    // Get existing documents for this partner
    const { data: docs } = await supabase
      .from('partner_documents')
      .select('*')
      .eq('partner_id', partner.partner_id);

    return NextResponse.json({
      success: true,
      partner: {
        id: partner.partner_id,
        company_name: partner.company_name,
        contact_name: partner.contact_name,
        contact_email: partner.contact_email,
      },
      documents: docs || [],
    });
  } catch (err) {
    console.error('[GET /api/partner-intake] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/partner-intake
 * Complete the intake (mark as done)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .rpc('complete_partner_intake', { p_token: token });

    if (error) {
      console.error('[POST /api/partner-intake] RPC error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to complete intake' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Intake completed successfully',
    });
  } catch (err) {
    console.error('[POST /api/partner-intake] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
