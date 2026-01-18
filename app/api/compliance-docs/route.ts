import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import type { ComplianceDocType } from '@/lib/supabase/types';

const DOC_TYPES: ComplianceDocType[] = [
  'iso',
  'vca',
  'co2',
  'insurance',
  'erkenning',
  'policy',
  'other',
];

const createComplianceDocSchema = z.object({
  name: z.string().min(1, 'Naam is verplicht'),
  doc_type: z.enum(DOC_TYPES as [ComplianceDocType, ...ComplianceDocType[]]),
  issuer: z.string().optional(),
  reference_number: z.string().optional(),
  scope: z.string().optional(),
  valid_from: z.string().min(1, 'Geldig vanaf datum is verplicht'),
  valid_to: z.string().min(1, 'Geldig tot datum is verplicht'),
  file_url: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createComplianceDocSchema.parse(body);

    const supabase = await createClient();

    const { data: doc, error } = await supabase
      .from('compliance_docs')
      .insert({
        name: data.name,
        doc_type: data.doc_type,
        issuer: data.issuer || null,
        reference_number: data.reference_number || null,
        scope: data.scope || null,
        valid_from: data.valid_from,
        valid_to: data.valid_to,
        file_url: data.file_url || null,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('[POST /api/compliance-docs] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create compliance document' },
        { status: 500 }
      );
    }

    console.log('[POST /api/compliance-docs] Document created:', doc.id);
    return NextResponse.json({ success: true, doc });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error('[POST /api/compliance-docs] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: docs, error } = await supabase
      .from('compliance_docs')
      .select('*')
      .order('valid_to', { ascending: true });

    if (error) {
      console.error('[GET /api/compliance-docs] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch compliance documents' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, docs });
  } catch (error) {
    console.error('[GET /api/compliance-docs] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
