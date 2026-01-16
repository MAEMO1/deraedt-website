import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const applicationSchema = z.object({
  job_id: z.string().min(1, 'Job ID is required'),
  job_slug: z.string().min(1, 'Job slug is required'),
  full_name: z.string().min(2, 'Naam is verplicht'),
  email: z.string().email('Ongeldig emailadres'),
  phone: z.string().optional(),
  cover_letter: z.string().optional(),
  cv_url: z.string().optional(),
  gdpr_consent: z.boolean().refine((val) => val === true, {
    message: 'U moet akkoord gaan met de privacyverklaring',
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = applicationSchema.parse(body);

    const supabase = await createClient();

    // Calculate retention date (12 months from now per GDPR policy)
    const retentionDate = new Date();
    retentionDate.setMonth(retentionDate.getMonth() + 12);

    const { data: application, error } = await supabase
      .from('job_applications')
      .insert({
        job_id: data.job_id,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || null,
        cover_letter: data.cover_letter || null,
        cv_url: data.cv_url || null,
        gdpr_consent: data.gdpr_consent,
        retention_until: retentionDate.toISOString(),
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Application creation error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    // TODO: Send confirmation email when SMTP is configured
    // For now, we just log it
    console.log(`[APPLICATION] New application received for job ${data.job_slug}:`, {
      applicant: data.full_name,
      email: data.email,
      applicationId: application.id,
    });

    return NextResponse.json({
      success: true,
      application: {
        id: application.id,
        job_slug: data.job_slug,
      },
      message: 'Uw sollicitatie is ontvangen. U ontvangt een bevestiging per email.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error('Application API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
