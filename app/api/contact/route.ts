import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";

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

    const { naam, email, telefoon, onderwerp, bericht } = result.data;

    // Honeypot check
    if (result.data.honeypot && result.data.honeypot.length > 0) {
      return NextResponse.json(
        { error: "Bot gedetecteerd" },
        { status: 400 }
      );
    }

    // Log the submission (in production, send email via Resend or similar)
    console.log("Contact form submission:", {
      naam,
      email,
      telefoon,
      onderwerp,
      bericht: bericht.substring(0, 100) + "...",
      timestamp: new Date().toISOString(),
    });

    // In production, you would send an email here:
    // await resend.emails.send({
    //   from: "website@deraedt.be",
    //   to: "info@deraedt.be",
    //   subject: `Nieuw contactformulier: ${onderwerp}`,
    //   html: `...`,
    // });

    return NextResponse.json({
      success: true,
      message: "Bericht succesvol verzonden",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden" },
      { status: 500 }
    );
  }
}
