-- ============================================================================
-- Partner Intake Tokens - Self-service document upload
-- Partners receive unique link to upload their documents
-- ============================================================================

-- Add intake token to partners table
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS intake_token UUID DEFAULT gen_random_uuid(),
ADD COLUMN IF NOT EXISTS intake_token_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
ADD COLUMN IF NOT EXISTS intake_completed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS invited_at TIMESTAMPTZ;

-- Create unique index on intake_token
CREATE UNIQUE INDEX IF NOT EXISTS idx_partners_intake_token ON public.partners(intake_token);

-- Function to generate new intake token
CREATE OR REPLACE FUNCTION public.generate_partner_intake_token(p_partner_id UUID)
RETURNS UUID AS $$
DECLARE
  v_token UUID;
BEGIN
  v_token := gen_random_uuid();

  UPDATE public.partners
  SET
    intake_token = v_token,
    intake_token_expires_at = NOW() + INTERVAL '30 days',
    invited_at = NOW()
  WHERE id = p_partner_id;

  RETURN v_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to validate intake token
CREATE OR REPLACE FUNCTION public.validate_partner_intake_token(p_token UUID)
RETURNS TABLE (
  partner_id UUID,
  company_name TEXT,
  contact_name TEXT,
  contact_email TEXT,
  is_valid BOOLEAN,
  is_completed BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id as partner_id,
    p.company_name,
    p.contact_name,
    p.contact_email,
    (p.intake_token_expires_at > NOW()) as is_valid,
    (p.intake_completed_at IS NOT NULL) as is_completed
  FROM public.partners p
  WHERE p.intake_token = p_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark intake as completed
CREATE OR REPLACE FUNCTION public.complete_partner_intake(p_token UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.partners
  SET intake_completed_at = NOW()
  WHERE intake_token = p_token
    AND intake_token_expires_at > NOW()
    AND intake_completed_at IS NULL;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS policy for public document upload via token
-- Allow unauthenticated users to insert documents if they have valid token
CREATE POLICY "partner_documents_public_insert" ON public.partner_documents
  FOR INSERT
  TO anon
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.partners p
      WHERE p.id = partner_id
      AND p.intake_token_expires_at > NOW()
      AND p.intake_completed_at IS NULL
    )
  );

-- Allow unauthenticated users to read their own partner's documents
CREATE POLICY "partner_documents_public_select" ON public.partner_documents
  FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.partners p
      WHERE p.id = partner_id
      AND p.intake_token_expires_at > NOW()
    )
  );

-- Grant execute on functions to anon role
GRANT EXECUTE ON FUNCTION public.validate_partner_intake_token(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.complete_partner_intake(UUID) TO anon;

COMMENT ON COLUMN public.partners.intake_token IS 'Unique token for partner self-service document upload';
COMMENT ON COLUMN public.partners.intake_token_expires_at IS 'Token expiry (30 days from generation)';
COMMENT ON COLUMN public.partners.intake_completed_at IS 'When partner completed document submission';
COMMENT ON COLUMN public.partners.invited_at IS 'When invite was sent to partner';
