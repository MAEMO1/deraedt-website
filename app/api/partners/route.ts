import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import type { PartnerStatus } from '@/lib/supabase/types';

const PARTNER_SPECIALTIES = [
  'elektriciteit',
  'sanitair',
  'hvac',
  'dakwerken',
  'metselwerk',
  'schrijnwerk',
  'schilderwerken',
  'vloeren',
  'grondwerken',
  'staalconstructies',
  'andere',
] as const;

const createPartnerSchema = z.object({
  company_name: z.string().min(1, 'Bedrijfsnaam is verplicht'),
  contact_name: z.string().min(1, 'Contactpersoon is verplicht'),
  contact_email: z.string().email('Ongeldig e-mailadres'),
  contact_phone: z.string().optional(),
  address: z.string().optional(),
  specialty: z.string().min(1, 'Specialiteit is verplicht'),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createPartnerSchema.parse(body);

    const supabase = await createClient();

    const { data: partner, error } = await supabase
      .from('partners')
      .insert({
        company_name: data.company_name,
        contact_name: data.contact_name,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone || null,
        address: data.address || null,
        specialty: data.specialty,
        notes: data.notes || null,
        status: 'pending' as PartnerStatus,
      })
      .select()
      .single();

    if (error) {
      console.error('[POST /api/partners] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create partner' },
        { status: 500 }
      );
    }

    // Create default document placeholders for required docs
    const requiredDocs = ['vca', 'insurance', 'reference'];
    const docInserts = requiredDocs.map((docType) => ({
      partner_id: partner.id,
      doc_type: docType,
      name: docType === 'vca' ? 'VCA Certificaat' : docType === 'insurance' ? 'Verzekering' : 'Referenties',
      status: 'missing' as const,
    }));

    await supabase.from('partner_documents').insert(docInserts);

    console.log('[POST /api/partners] Partner created:', partner.company_name);
    return NextResponse.json({ success: true, partner });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error('[POST /api/partners] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: partners, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[GET /api/partners] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch partners' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, partners });
  } catch (error) {
    console.error('[GET /api/partners] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Export specialties for use in forms
export { PARTNER_SPECIALTIES };
