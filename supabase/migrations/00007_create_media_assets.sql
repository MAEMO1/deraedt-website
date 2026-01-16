-- Create media assets table for tracking uploaded files

CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- File info
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,

  -- Storage
  storage_bucket TEXT NOT NULL DEFAULT 'uploads',
  storage_path TEXT NOT NULL,
  public_url TEXT,

  -- Metadata
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  caption TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,

  -- Ownership
  uploaded_by UUID REFERENCES public.profiles(id),

  -- Relations (polymorphic - can link to any entity)
  entity_type TEXT,
  entity_id UUID,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Authenticated users can view media assets" ON public.media_assets
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can upload media assets" ON public.media_assets
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can manage media assets" ON public.media_assets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('DIRECTIE', 'ADMIN')
    )
  );

CREATE POLICY "Users can delete own uploads" ON public.media_assets
  FOR DELETE USING (uploaded_by = auth.uid());

-- Indexes
CREATE INDEX media_assets_entity_idx ON public.media_assets(entity_type, entity_id);
CREATE INDEX media_assets_uploader_idx ON public.media_assets(uploaded_by);
CREATE INDEX media_assets_mime_type_idx ON public.media_assets(mime_type);

-- Updated_at trigger
CREATE TRIGGER media_assets_updated_at
  BEFORE UPDATE ON public.media_assets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
