import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role for storage uploads (anon can't upload by default)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const DOC_TYPE_LABELS: Record<string, string> = {
  vca: 'VCA Certificaat',
  insurance: 'Verzekeringsbewijs',
  reference: 'Referenties',
  kvk: 'KVK Uittreksel',
  other: 'Overig Document',
};

/**
 * POST /api/partner-intake/upload
 * Upload a document for a partner
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = formData.get('token') as string;
    const docType = formData.get('doc_type') as string;
    const file = formData.get('file') as File;
    const validFrom = formData.get('valid_from') as string | null;
    const validTo = formData.get('valid_to') as string | null;

    // Validate required fields
    if (!token || !docType || !file) {
      return NextResponse.json(
        { success: false, error: 'Token, doc_type, and file are required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Only PDF and image files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Validate token and get partner
    const { data: tokenData, error: tokenError } = await supabase
      .rpc('validate_partner_intake_token', { p_token: token });

    if (tokenError || !tokenData || tokenData.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 400 }
      );
    }

    const partner = tokenData[0];

    if (!partner.is_valid) {
      return NextResponse.json(
        { success: false, error: 'Token expired' },
        { status: 410 }
      );
    }

    if (partner.is_completed) {
      return NextResponse.json(
        { success: false, error: 'Intake already completed' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'pdf';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const filename = `${partner.partner_id}/${docType}/${timestamp}-${random}.${ext}`;

    // Convert File to Buffer for Supabase upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('partner-documents')
      .upload(filename, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('[UPLOAD] Storage error:', uploadError);
      // If bucket doesn't exist, try 'uploads' bucket instead
      if (uploadError.message.includes('Bucket not found')) {
        const { error: fallbackError } = await supabase.storage
          .from('uploads')
          .upload(`partners/${filename}`, buffer, {
            contentType: file.type,
            cacheControl: '3600',
            upsert: true,
          });

        if (fallbackError) {
          return NextResponse.json(
            { success: false, error: `Upload failed: ${fallbackError.message}` },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { success: false, error: `Upload failed: ${uploadError.message}` },
          { status: 500 }
        );
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('partner-documents')
      .getPublicUrl(filename);

    const fileUrl = urlData?.publicUrl || null;

    // Check if document of this type already exists for this partner
    const { data: existingDoc } = await supabase
      .from('partner_documents')
      .select('id')
      .eq('partner_id', partner.partner_id)
      .eq('doc_type', docType)
      .single();

    if (existingDoc) {
      // Update existing document
      const { data: doc, error: updateError } = await supabase
        .from('partner_documents')
        .update({
          name: DOC_TYPE_LABELS[docType] || file.name,
          file_url: fileUrl,
          valid_from: validFrom || null,
          valid_to: validTo || null,
          status: 'pending',
          uploaded_at: new Date().toISOString(),
        })
        .eq('id', existingDoc.id)
        .select()
        .single();

      if (updateError) {
        console.error('[UPLOAD] Update error:', updateError);
        return NextResponse.json(
          { success: false, error: `Database error: ${updateError.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        document: doc,
        message: 'Document updated successfully',
      });
    } else {
      // Create new document record
      const { data: doc, error: insertError } = await supabase
        .from('partner_documents')
        .insert({
          partner_id: partner.partner_id,
          doc_type: docType,
          name: DOC_TYPE_LABELS[docType] || file.name,
          file_url: fileUrl,
          valid_from: validFrom || null,
          valid_to: validTo || null,
          status: 'pending',
          uploaded_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError) {
        console.error('[UPLOAD] Insert error:', insertError);
        return NextResponse.json(
          { success: false, error: `Database error: ${insertError.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        document: doc,
        message: 'Document uploaded successfully',
      });
    }
  } catch (err) {
    console.error('[POST /api/partner-intake/upload] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
