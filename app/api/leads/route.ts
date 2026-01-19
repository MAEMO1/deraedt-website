import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIP, RATE_LIMIT_CONFIGS } from '@/lib/rate-limit';

const leadSchema = z.object({
  lead_type: z.enum(['project', 'facility', 'partner', 'procurement', 'contact']),
  contact_name: z.string().min(1, 'Name is required'),
  contact_email: z.string().email('Invalid email'),
  contact_phone: z.string().nullable().optional(),
  organisation: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  budget_band: z.string().nullable().optional(),
  timing: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  source: z.string().default('website'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request.headers);
    const rateLimitKey = `leads:${clientIP}`;
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMIT_CONFIGS.form);

    if (!rateLimit.allowed) {
      console.warn(`[LEADS] Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
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
    const data = leadSchema.parse(body);

    const supabase = await createClient();

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        lead_type: data.lead_type,
        contact_name: data.contact_name,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone || null,
        organisation: data.organisation || null,
        location: data.location || null,
        budget_band: data.budget_band || null,
        timing: data.timing || null,
        message: data.message || null,
        source: data.source,
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Lead creation error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error('Lead API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
