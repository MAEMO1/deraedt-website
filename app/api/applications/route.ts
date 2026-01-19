import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { sendApplicationConfirmation, sendApplicationNotification } from '@/lib/email';
import { checkFormRateLimit, handleApiError, handleDatabaseError } from '@/lib/api';

const applicationSchema = z.object({
  job_id: z.string().min(1, 'Job ID is required'),
  job_slug: z.string().min(1, 'Job slug is required'),
  job_title: z.string().min(1, 'Job title is required'),
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
    // Rate limiting
    const rateCheck = checkFormRateLimit(request, 'applications', 'APPLICATIONS');
    if (!rateCheck.allowed) return rateCheck.response!;

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
      return handleDatabaseError(error, 'APPLICATIONS', 'submit application');
    }

    console.log(`[APPLICATION] New application received for job ${data.job_slug}:`, {
      applicant: data.full_name,
      email: data.email,
      applicationId: application.id,
    });

    // Send emails (non-blocking)
    const emailData = {
      fullName: data.full_name,
      email: data.email,
      jobTitle: data.job_title,
      jobSlug: data.job_slug,
      applicationId: application.id,
      phone: data.phone,
      cvUrl: data.cv_url,
    };

    // Send confirmation to applicant
    sendApplicationConfirmation(emailData).catch((err) => {
      console.error('[APPLICATION] Confirmation email failed:', err);
    });

    // Send notification to HR
    sendApplicationNotification(emailData).catch((err) => {
      console.error('[APPLICATION] HR notification email failed:', err);
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
    return handleApiError(error, 'APPLICATIONS');
  }
}
