import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser, canPerformAction } from '@/lib/supabase/auth';
import { sendPartnerInvite } from '@/lib/email';

/**
 * POST /api/partners/[id]/invite
 * Generate or regenerate invite link for partner
 *
 * Body (optional):
 * - sendEmail: boolean - If true, sends invite email to partner
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Parse optional body
  let sendEmail = false;
  try {
    const body = await request.json();
    sendEmail = body?.sendEmail === true;
  } catch {
    // No body or invalid JSON - that's fine, defaults to false
  }

  // Check authentication
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Check permission (OPERATIONS, ADMIN, DIRECTIE can send invites)
  if (!canPerformAction(user.role, 'partners:invite')) {
    return NextResponse.json(
      { success: false, error: 'Forbidden' },
      { status: 403 }
    );
  }

  try {
    const supabase = await createClient();

    // Generate new intake token
    const { error: tokenError } = await supabase
      .rpc('generate_partner_intake_token', { p_partner_id: id });

    if (tokenError) {
      console.error('[POST /api/partners/[id]/invite] Token error:', tokenError);
      return NextResponse.json(
        { success: false, error: `Failed to generate token: ${tokenError.message}` },
        { status: 500 }
      );
    }

    // Get updated partner info
    const { data: partner, error: fetchError } = await supabase
      .from('partners')
      .select('id, company_name, contact_name, contact_email, intake_token, intake_token_expires_at, invited_at')
      .eq('id', id)
      .single();

    if (fetchError || !partner) {
      return NextResponse.json(
        { success: false, error: 'Partner not found' },
        { status: 404 }
      );
    }

    // Build invite URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://deraedt-website.vercel.app';
    const inviteUrl = `${baseUrl}/partner-intake/${partner.intake_token}`;

    // Send email if requested
    let emailSent = false;
    if (sendEmail && partner.contact_email) {
      emailSent = await sendPartnerInvite({
        companyName: partner.company_name,
        contactName: partner.contact_name || partner.company_name,
        contactEmail: partner.contact_email,
        inviteUrl,
        expiresAt: partner.intake_token_expires_at,
      });

      if (!emailSent) {
        console.warn('[POST /api/partners/[id]/invite] Email failed to send, but invite link was generated');
      }
    }

    return NextResponse.json({
      success: true,
      emailSent,
      invite: {
        url: inviteUrl,
        token: partner.intake_token,
        expires_at: partner.intake_token_expires_at,
        partner: {
          id: partner.id,
          company_name: partner.company_name,
          contact_name: partner.contact_name,
          contact_email: partner.contact_email,
        },
      },
    });
  } catch (err) {
    console.error('[POST /api/partners/[id]/invite] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
