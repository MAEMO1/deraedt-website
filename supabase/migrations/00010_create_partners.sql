-- ============================================================================
-- Partners and Partner Documents Tables
-- For partner prequalification with document compliance tracking
-- ============================================================================

-- Create enum for partner status
CREATE TYPE partner_status AS ENUM ('pending', 'approved', 'blocked');

-- Create enum for partner document type
CREATE TYPE partner_doc_type AS ENUM ('vca', 'insurance', 'reference', 'kvk', 'other');

-- Create enum for partner document status
CREATE TYPE partner_doc_status AS ENUM ('missing', 'pending', 'approved', 'expired');

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  address TEXT,
  specialty TEXT NOT NULL,
  status partner_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create partner_documents table
CREATE TABLE IF NOT EXISTS partner_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  doc_type partner_doc_type NOT NULL,
  name TEXT NOT NULL,
  file_url TEXT,
  valid_from DATE,
  valid_to DATE,
  status partner_doc_status NOT NULL DEFAULT 'missing',
  uploaded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for partners
CREATE INDEX idx_partners_status ON partners(status);
CREATE INDEX idx_partners_specialty ON partners(specialty);
CREATE INDEX idx_partners_created_at ON partners(created_at DESC);

-- Create indexes for partner_documents
CREATE INDEX idx_partner_documents_partner_id ON partner_documents(partner_id);
CREATE INDEX idx_partner_documents_doc_type ON partner_documents(doc_type);
CREATE INDEX idx_partner_documents_status ON partner_documents(status);
CREATE INDEX idx_partner_documents_valid_to ON partner_documents(valid_to);

-- Auto-update updated_at for partners
CREATE TRIGGER set_partners_updated_at
  BEFORE UPDATE ON partners
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Auto-update updated_at for partner_documents
CREATE TRIGGER set_partner_documents_updated_at
  BEFORE UPDATE ON partner_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Enable RLS
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for partners
-- All authenticated users can view partners
CREATE POLICY "partners_select" ON partners
  FOR SELECT
  TO authenticated
  USING (true);

-- OPERATIONS, ADMIN, DIRECTIE can insert
CREATE POLICY "partners_insert" ON partners
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('OPERATIONS', 'ADMIN', 'DIRECTIE')
    )
  );

-- OPERATIONS, ADMIN, DIRECTIE can update
CREATE POLICY "partners_update" ON partners
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('OPERATIONS', 'ADMIN', 'DIRECTIE')
    )
  );

-- Only ADMIN, DIRECTIE can delete
CREATE POLICY "partners_delete" ON partners
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('ADMIN', 'DIRECTIE')
    )
  );

-- RLS Policies for partner_documents
-- All authenticated users can view
CREATE POLICY "partner_documents_select" ON partner_documents
  FOR SELECT
  TO authenticated
  USING (true);

-- OPERATIONS, ADMIN, DIRECTIE can insert
CREATE POLICY "partner_documents_insert" ON partner_documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('OPERATIONS', 'ADMIN', 'DIRECTIE')
    )
  );

-- OPERATIONS, ADMIN, DIRECTIE can update
CREATE POLICY "partner_documents_update" ON partner_documents
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('OPERATIONS', 'ADMIN', 'DIRECTIE')
    )
  );

-- Only ADMIN, DIRECTIE can delete
CREATE POLICY "partner_documents_delete" ON partner_documents
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('ADMIN', 'DIRECTIE')
    )
  );

-- Add audit triggers
CREATE TRIGGER audit_partners
  AFTER INSERT OR UPDATE OR DELETE ON partners
  FOR EACH ROW
  EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_partner_documents
  AFTER INSERT OR UPDATE OR DELETE ON partner_documents
  FOR EACH ROW
  EXECUTE FUNCTION log_audit_event();

-- Create view for partners with document completeness
CREATE OR REPLACE VIEW partner_compliance_status AS
SELECT
  p.id,
  p.company_name,
  p.status,
  COUNT(pd.id) FILTER (WHERE pd.doc_type IN ('vca', 'insurance', 'reference') AND pd.status = 'approved') as approved_required_docs,
  3 as total_required_docs,
  COUNT(pd.id) FILTER (WHERE pd.valid_to IS NOT NULL AND pd.valid_to < CURRENT_DATE) as expired_docs
FROM partners p
LEFT JOIN partner_documents pd ON pd.partner_id = p.id
GROUP BY p.id, p.company_name, p.status;

COMMENT ON TABLE partners IS 'Partner companies for prequalification';
COMMENT ON TABLE partner_documents IS 'Documents submitted by partners for compliance';
