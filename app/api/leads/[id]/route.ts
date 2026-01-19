import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser, canPerformAction } from '@/lib/supabase/auth';

const updateLeadSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']).optional(),
  owner_id: z.string().uuid().nullable().optional(),
  next_action_date: z.string().nullable().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateLeadSchema.parse(body);

    const supabase = await createClient();

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {};
    if (data.status !== undefined) updateData.status = data.status;
    if (data.owner_id !== undefined) updateData.owner_id = data.owner_id;
    if (data.next_action_date !== undefined) updateData.next_action_date = data.next_action_date;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    const { data: lead, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[PATCH /api/leads/[id]] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update lead' },
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
    console.error('[PATCH /api/leads/[id]] Error:', error);
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
    const { id } = await params;
    const supabase = await createClient();

    const { data: lead, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('[GET /api/leads/[id]] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('[GET /api/leads/[id]] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // RBAC check: only SALES, ADMIN, or DIRECTIE can delete leads
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    if (!canPerformAction(user.role, 'leads:delete')) {
      console.warn('[DELETE /api/leads/[id]] Forbidden - user role:', user.role);
      return NextResponse.json(
        { success: false, error: 'Forbidden: insufficient permissions' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const supabase = await createClient();

    // First delete related lead_notes (cascade manually for safety)
    const { error: notesError } = await supabase
      .from('lead_notes')
      .delete()
      .eq('lead_id', id);

    if (notesError) {
      console.error('[DELETE /api/leads/[id]] Failed to delete notes:', notesError);
      // Continue anyway - notes might not exist
    }

    // Delete the lead itself
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[DELETE /api/leads/[id]] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete lead' },
        { status: 500 }
      );
    }

    console.log('[DELETE /api/leads/[id]] Lead deleted:', id);
    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/leads/[id]] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
