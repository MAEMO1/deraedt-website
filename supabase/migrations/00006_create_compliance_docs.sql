-- Create compliance documents table for certificates and policies

CREATE TABLE IF NOT EXISTS public.compliance_docs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Document type
  doc_type TEXT NOT NULL CHECK (doc_type IN ('iso', 'vca', 'co2', 'insurance', 'erkenning', 'policy', 'other')),

  -- Document details
  name TEXT NOT NULL,
  issuer TEXT,
  reference_number TEXT,
  scope TEXT,

  -- Validity
  valid_from DATE NOT NULL,
  valid_to DATE NOT NULL,

  -- File
  file_url TEXT,

  -- Visibility
  is_public BOOLEAN NOT NULL DEFAULT false,

  -- Tender pack inclusion
  include_in_tender_pack BOOLEAN NOT NULL DEFAULT true,

  -- Metadata
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.compliance_docs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view public compliance docs" ON public.compliance_docs
  FOR SELECT USING (is_public = true);

CREATE POLICY "Staff can view all compliance docs" ON public.compliance_docs
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage compliance docs" ON public.compliance_docs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('DIRECTIE', 'ADMIN')
    )
  );

-- Indexes
CREATE INDEX compliance_type_idx ON public.compliance_docs(doc_type);
CREATE INDEX compliance_valid_to_idx ON public.compliance_docs(valid_to);
CREATE INDEX compliance_public_idx ON public.compliance_docs(is_public);

-- Updated_at trigger
CREATE TRIGGER compliance_docs_updated_at
  BEFORE UPDATE ON public.compliance_docs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- View for expiring documents (30/60/90 days)
CREATE OR REPLACE VIEW public.compliance_expiry_radar AS
SELECT
  id,
  doc_type,
  name,
  valid_to,
  CASE
    WHEN valid_to <= CURRENT_DATE + INTERVAL '30 days' THEN 'critical'
    WHEN valid_to <= CURRENT_DATE + INTERVAL '60 days' THEN 'warning'
    WHEN valid_to <= CURRENT_DATE + INTERVAL '90 days' THEN 'upcoming'
    ELSE 'ok'
  END as expiry_status,
  valid_to - CURRENT_DATE as days_until_expiry
FROM public.compliance_docs
WHERE valid_to <= CURRENT_DATE + INTERVAL '90 days'
ORDER BY valid_to ASC;
