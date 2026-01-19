import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser, canPerformAction } from '@/lib/supabase/auth';

const updateApplicationSchema = z.object({
  status: z.enum(['new', 'screening', 'interview', 'offer', 'hired', 'rejected']).optional(),
  notes: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateApplicationSchema.parse(body);

    const supabase = await createClient();

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {};
    if (data.status !== undefined) updateData.status = data.status;
    if (data.notes !== undefined) updateData.notes = data.notes;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    const { data: application, error } = await supabase
      .from('job_applications')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[PATCH /api/applications/[id]] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update application' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error('[PATCH /api/applications/[id]] Error:', error);
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

    const { data: application, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('[GET /api/applications/[id]] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('[GET /api/applications/[id]] Error:', error);
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
    // RBAC check: only HR, ADMIN, or DIRECTIE can delete applications
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    if (!canPerformAction(user.role, 'applications:delete')) {
      console.warn('[DELETE /api/applications/[id]] Forbidden - user role:', user.role);
      return NextResponse.json(
        { success: false, error: 'Forbidden: insufficient permissions' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const supabase = await createClient();

    // First fetch the application to get CV URL
    const { data: application } = await supabase
      .from('job_applications')
      .select('cv_url')
      .eq('id', id)
      .single();

    // Delete CV from storage if it exists
    if (application?.cv_url) {
      try {
        // Extract path from URL (assumes Supabase storage URL format)
        const urlParts = application.cv_url.split('/storage/v1/object/public/');
        if (urlParts.length > 1) {
          const pathParts = urlParts[1].split('/');
          const bucket = pathParts[0];
          const path = pathParts.slice(1).join('/');

          const { error: storageError } = await supabase
            .storage
            .from(bucket)
            .remove([path]);

          if (storageError) {
            console.error('[DELETE /api/applications/[id]] Failed to delete CV:', storageError);
            // Continue anyway - file might not exist
          }
        }
      } catch (e) {
        console.error('[DELETE /api/applications/[id]] CV deletion error:', e);
      }
    }

    // Delete the application
    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[DELETE /api/applications/[id]] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete application' },
        { status: 500 }
      );
    }

    console.log('[DELETE /api/applications/[id]] Application deleted:', id);
    return NextResponse.json({ success: true, message: 'Application and CV deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/applications/[id]] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
