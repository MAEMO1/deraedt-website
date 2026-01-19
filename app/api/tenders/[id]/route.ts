import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser, canPerformAction } from '@/lib/supabase/auth';

const updateTenderSchema = z.object({
  status: z.enum(['new', 'analyzing', 'go', 'no_go', 'in_preparation', 'submitted', 'won', 'lost']).optional(),
  decision_reason: z.string().optional(),
  decision_by: z.string().uuid().optional(),
  go_no_go_checklist: z.record(z.string(), z.unknown()).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateTenderSchema.parse(body);

    const supabase = await createClient();

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {};
    if (data.status !== undefined) updateData.status = data.status;
    if (data.decision_reason !== undefined) updateData.decision_reason = data.decision_reason;
    if (data.decision_by !== undefined) updateData.decision_by = data.decision_by;
    if (data.go_no_go_checklist !== undefined) updateData.go_no_go_checklist = data.go_no_go_checklist;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    const { data: tender, error } = await supabase
      .from('tenders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[PATCH /api/tenders/[id]] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update tender' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, tender });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error('[PATCH /api/tenders/[id]] Error:', error);
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

    const { data: tender, error } = await supabase
      .from('tenders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('[GET /api/tenders/[id]] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Tender not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, tender });
  } catch (error) {
    console.error('[GET /api/tenders/[id]] Error:', error);
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
    // RBAC check: only ADMIN or DIRECTIE can delete tenders
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    if (!canPerformAction(user.role, 'tenders:delete')) {
      console.warn('[DELETE /api/tenders/[id]] Forbidden - user role:', user.role);
      return NextResponse.json(
        { success: false, error: 'Forbidden: insufficient permissions' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const supabase = await createClient();

    const { error } = await supabase
      .from('tenders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[DELETE /api/tenders/[id]] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete tender' },
        { status: 500 }
      );
    }

    console.log('[DELETE /api/tenders/[id]] Tender deleted:', id);
    return NextResponse.json({ success: true, message: 'Tender deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/tenders/[id]] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
