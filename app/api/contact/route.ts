import { NextRequest, NextResponse } from "next/server";
import { contactSchema, getLeadTypeFromSubject } from "@/lib/validations/contact";
import { createClient } from "@/lib/supabase/server";
import { sendContactNotification } from "@/lib/email";
import { checkRateLimit, getClientIP, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request.headers);
    const rateLimitKey = `contact:${clientIP}`;
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMIT_CONFIGS.form);

    if (!rateLimit.allowed) {
      console.warn(`[CONTACT] Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Te veel verzoeken. Probeer het later opnieuw.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimit.resetAt),
          },
        }
      );
    }

    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validatie gefaald", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { naam, organisatie, email, telefoon, onderwerp, bericht, honeypot } = result.data;

    // Honeypot check
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json(
        { error: "Bot gedetecteerd" },
        { status: 400 }
      );
    }

    // Map subject to lead type
    const leadType = getLeadTypeFromSubject(onderwerp);

    // Create lead in database
    const supabase = await createClient();

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        lead_type: leadType,
        contact_name: naam,
        contact_email: email,
        contact_phone: telefoon || null,
        organisation: organisatie || null,
        message: `[${onderwerp.toUpperCase()}] ${bericht}`,
        source: 'website-contact',
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error("Lead creation error:", error);
      // Still log the submission even if DB fails
      console.log("Contact form submission (DB failed):", {
        naam,
        email,
        onderwerp,
        bericht: bericht.substring(0, 100) + "...",
        timestamp: new Date().toISOString(),
      });

      // Return success to user even if DB insert fails
      // This prevents a bad UX while still logging the issue
      return NextResponse.json({
        success: true,
        message: "Bericht succesvol verzonden",
      });
    }

    // Log the successful submission
    console.log("Contact form submission:", {
      leadId: lead.id,
      leadType,
      naam,
      email,
      onderwerp,
      timestamp: new Date().toISOString(),
    });

    // Send notification email (non-blocking)
    sendContactNotification({
      naam,
      email,
      telefoon: telefoon || undefined,
      organisatie: organisatie || undefined,
      onderwerp,
      bericht,
      leadId: lead.id,
    }).catch((err) => {
      console.error('[CONTACT] Email notification failed:', err);
    });

    return NextResponse.json({
      success: true,
      message: "Bericht succesvol verzonden",
      leadId: lead.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden" },
      { status: 500 }
    );
  }
}
