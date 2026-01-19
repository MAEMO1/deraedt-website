import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser, canPerformAction } from '@/lib/supabase/auth';

const updateTicketSchema = z.object({
  status: z.enum(['open', 'in_progress', 'waiting', 'resolved']).optional(),
  assigned_to: z.string().uuid().nullable().optional(),
  notes: z.array(z.string()).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateTicketSchema.parse(body);

    const supabase = await createClient();

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {};
    if (data.status !== undefined) updateData.status = data.status;
    if (data.assigned_to !== undefined) updateData.assigned_to = data.assigned_to;
    if (data.notes !== undefined) updateData.notes = data.notes;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    const { data: ticket, error } = await supabase
      .from('facility_tickets')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[PATCH /api/facility-tickets/[id]] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update ticket' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error('[PATCH /api/facility-tickets/[id]] Error:', error);
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

    const { data: ticket, error } = await supabase
      .from('facility_tickets')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('[GET /api/facility-tickets/[id]] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Ticket not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    console.error('[GET /api/facility-tickets/[id]] Error:', error);
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
    // RBAC check: only OPERATIONS, ADMIN, or DIRECTIE can delete tickets
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    if (!canPerformAction(user.role, 'facility:delete')) {
      console.warn('[DELETE /api/facility-tickets/[id]] Forbidden - user role:', user.role);
      return NextResponse.json(
        { success: false, error: 'Forbidden: insufficient permissions' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const supabase = await createClient();

    const { error } = await supabase
      .from('facility_tickets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[DELETE /api/facility-tickets/[id]] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete ticket' },
        { status: 500 }
      );
    }

    console.log('[DELETE /api/facility-tickets/[id]] Ticket deleted:', id);
    return NextResponse.json({ success: true, message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/facility-tickets/[id]] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
