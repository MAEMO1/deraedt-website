import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const createNoteSchema = z.object({
  content: z.string().min(1, 'Note content is required'),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await params;
    const body = await request.json();
    const data = createNoteSchema.parse(body);

    const supabase = await createClient();

    // Get current user for author_id
    const { data: { user } } = await supabase.auth.getUser();

    const { data: note, error } = await supabase
      .from('lead_notes')
      .insert({
        lead_id: leadId,
        author_id: user?.id || null,
        content: data.content,
      })
      .select()
      .single();

    if (error) {
      console.error('[POST /api/leads/[id]/notes] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create note' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, note });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error('[POST /api/leads/[id]/notes] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await params;
    const supabase = await createClient();

    const { data: notes, error } = await supabase
      .from('lead_notes')
      .select('*, profiles:author_id(full_name, email)')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[GET /api/leads/[id]/notes] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch notes' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, notes: notes || [] });
  } catch (error) {
    console.error('[GET /api/leads/[id]/notes] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
