import { NextRequest, NextResponse } from "next/server";
import { contactSchema, getLeadTypeFromSubject } from "@/lib/validations/contact";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
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

    // TODO: Send notification email when SMTP is configured
    // await resend.emails.send({
    //   from: "website@deraedt.be",
    //   to: "info@deraedt.be",
    //   subject: `Nieuw contactformulier: ${onderwerp}`,
    //   html: `...`,
    // });

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
