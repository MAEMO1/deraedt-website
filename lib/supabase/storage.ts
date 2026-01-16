import { createClient } from './server';

// Allowed file types
export const ALLOWED_FILE_TYPES = {
  // Images
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
  'image/svg+xml': ['.svg'],
  // Documents
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'text/csv': ['.csv'],
} as const;

// File categories for easier filtering
export const FILE_CATEGORIES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  document: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
  ],
} as const;

// Default limits
export const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const DEFAULT_BUCKET = 'uploads';

export interface UploadOptions {
  bucket?: string;
  folder?: string;
  maxSize?: number;
  allowedTypes?: string[];
  generateUniqueName?: boolean;
}

export interface UploadResult {
  filename: string;
  originalFilename: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
  storageBucket: string;
  publicUrl: string | null;
}

export interface UploadError {
  code: 'FILE_TOO_LARGE' | 'INVALID_TYPE' | 'UPLOAD_FAILED' | 'STORAGE_ERROR';
  message: string;
}

/**
 * Validate file before upload
 */
export function validateFile(
  file: File,
  options: Pick<UploadOptions, 'maxSize' | 'allowedTypes'> = {}
): UploadError | null {
  const maxSize = options.maxSize ?? DEFAULT_MAX_FILE_SIZE;
  const allowedTypes = options.allowedTypes ?? Object.keys(ALLOWED_FILE_TYPES);

  // Check file size
  if (file.size > maxSize) {
    return {
      code: 'FILE_TOO_LARGE',
      message: `File size exceeds ${formatFileSize(maxSize)} limit`,
    };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      code: 'INVALID_TYPE',
      message: `File type ${file.type} is not allowed`,
    };
  }

  return null;
}

/**
 * Generate a unique filename
 */
export function generateUniqueFilename(originalFilename: string): string {
  const ext = originalFilename.split('.').pop() || '';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}.${ext}`;
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
  file: File,
  options: UploadOptions = {}
): Promise<{ data: UploadResult } | { error: UploadError }> {
  const {
    bucket = DEFAULT_BUCKET,
    folder = '',
    maxSize = DEFAULT_MAX_FILE_SIZE,
    allowedTypes = Object.keys(ALLOWED_FILE_TYPES),
    generateUniqueName = true,
  } = options;

  // Validate file
  const validationError = validateFile(file, { maxSize, allowedTypes });
  if (validationError) {
    return { error: validationError };
  }

  // Generate filename
  const filename = generateUniqueName ? generateUniqueFilename(file.name) : file.name;
  const storagePath = folder ? `${folder}/${filename}` : filename;

  try {
    const supabase = await createClient();

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      return {
        error: {
          code: 'UPLOAD_FAILED',
          message: uploadError.message,
        },
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(storagePath);

    return {
      data: {
        filename,
        originalFilename: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        storagePath,
        storageBucket: bucket,
        publicUrl: urlData?.publicUrl || null,
      },
    };
  } catch (err) {
    return {
      error: {
        code: 'STORAGE_ERROR',
        message: err instanceof Error ? err.message : 'Unknown storage error',
      },
    };
  }
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(
  storagePath: string,
  bucket: string = DEFAULT_BUCKET
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.storage
      .from(bucket)
      .remove([storagePath]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Create a media asset record in the database
 */
export async function createMediaAsset(
  uploadResult: UploadResult,
  options: {
    uploadedBy?: string;
    entityType?: string;
    entityId?: string;
    altText?: string;
    caption?: string;
    metadata?: Record<string, unknown>;
  } = {}
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('media_assets')
    .insert({
      filename: uploadResult.filename,
      original_filename: uploadResult.originalFilename,
      mime_type: uploadResult.mimeType,
      size_bytes: uploadResult.sizeBytes,
      storage_bucket: uploadResult.storageBucket,
      storage_path: uploadResult.storagePath,
      public_url: uploadResult.publicUrl,
      uploaded_by: options.uploadedBy,
      entity_type: options.entityType,
      entity_id: options.entityId,
      alt_text: options.altText,
      caption: options.caption,
      metadata: options.metadata,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file category from MIME type
 */
export function getFileCategory(mimeType: string): 'image' | 'document' | 'other' {
  if (FILE_CATEGORIES.image.includes(mimeType as (typeof FILE_CATEGORIES.image)[number])) {
    return 'image';
  }
  if (FILE_CATEGORIES.document.includes(mimeType as (typeof FILE_CATEGORIES.document)[number])) {
    return 'document';
  }
  return 'other';
}
