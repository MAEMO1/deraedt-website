import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  uploadFile,
  createMediaAsset,
  validateFile,
  DEFAULT_MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  formatFileSize,
} from '@/lib/supabase/storage';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string | null;
    const entityType = formData.get('entityType') as string | null;
    const entityId = formData.get('entityId') as string | null;
    const altText = formData.get('altText') as string | null;
    const caption = formData.get('caption') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided', code: 'NO_FILE' },
        { status: 400 }
      );
    }

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      return NextResponse.json(
        { error: validationError.message, code: validationError.code },
        { status: 400 }
      );
    }

    // Upload file to storage
    const uploadResult = await uploadFile(file, {
      folder: folder || undefined,
      generateUniqueName: true,
    });

    if ('error' in uploadResult) {
      return NextResponse.json(
        { error: uploadResult.error.message, code: uploadResult.error.code },
        { status: 500 }
      );
    }

    // Create media asset record
    const { data: asset, error: dbError } = await createMediaAsset(
      uploadResult.data,
      {
        uploadedBy: user.id,
        entityType: entityType || undefined,
        entityId: entityId || undefined,
        altText: altText || undefined,
        caption: caption || undefined,
      }
    );

    if (dbError) {
      return NextResponse.json(
        { error: 'Failed to create asset record', code: 'DB_ERROR', details: dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      asset,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

// GET endpoint for upload configuration
export async function GET() {
  return NextResponse.json({
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    maxFileSizeFormatted: formatFileSize(DEFAULT_MAX_FILE_SIZE),
    allowedTypes: Object.keys(ALLOWED_FILE_TYPES),
    allowedExtensions: Object.values(ALLOWED_FILE_TYPES).flat(),
  });
}
