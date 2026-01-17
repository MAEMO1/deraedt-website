-- ============================================================================
-- Facility Tickets Table
-- For tracking facility/intervention tickets with SLA
-- ============================================================================

-- Create enum for ticket urgency
CREATE TYPE ticket_urgency AS ENUM ('low', 'medium', 'high', 'critical');

-- Create enum for ticket status
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'waiting', 'resolved');

-- Create facility_tickets table
CREATE TABLE IF NOT EXISTS facility_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  urgency ticket_urgency NOT NULL DEFAULT 'medium',
  status ticket_status NOT NULL DEFAULT 'open',
  sla_due_at TIMESTAMPTZ NOT NULL,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reporter_name TEXT NOT NULL,
  reporter_email TEXT NOT NULL,
  reporter_phone TEXT,
  photos TEXT[] DEFAULT '{}',
  notes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_facility_tickets_status ON facility_tickets(status);
CREATE INDEX idx_facility_tickets_urgency ON facility_tickets(urgency);
CREATE INDEX idx_facility_tickets_sla_due_at ON facility_tickets(sla_due_at);
CREATE INDEX idx_facility_tickets_assigned_to ON facility_tickets(assigned_to);
CREATE INDEX idx_facility_tickets_created_at ON facility_tickets(created_at DESC);

-- Auto-generate reference number
CREATE OR REPLACE FUNCTION generate_ticket_reference()
RETURNS TRIGGER AS $$
DECLARE
  year_part TEXT;
  next_num INT;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');

  SELECT COALESCE(MAX(
    CAST(SUBSTRING(reference FROM 'FAC-' || year_part || '-(\d+)') AS INT)
  ), 0) + 1
  INTO next_num
  FROM facility_tickets
  WHERE reference LIKE 'FAC-' || year_part || '-%';

  NEW.reference := 'FAC-' || year_part || '-' || LPAD(next_num::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_ticket_reference
  BEFORE INSERT ON facility_tickets
  FOR EACH ROW
  WHEN (NEW.reference IS NULL OR NEW.reference = '')
  EXECUTE FUNCTION generate_ticket_reference();

-- Auto-update updated_at
CREATE TRIGGER set_facility_tickets_updated_at
  BEFORE UPDATE ON facility_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE facility_tickets ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- All authenticated users can view tickets
CREATE POLICY "facility_tickets_select" ON facility_tickets
  FOR SELECT
  TO authenticated
  USING (true);

-- OPERATIONS, ADMIN, DIRECTIE can insert
CREATE POLICY "facility_tickets_insert" ON facility_tickets
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
CREATE POLICY "facility_tickets_update" ON facility_tickets
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
CREATE POLICY "facility_tickets_delete" ON facility_tickets
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('ADMIN', 'DIRECTIE')
    )
  );

-- Add audit trigger
CREATE TRIGGER audit_facility_tickets
  AFTER INSERT OR UPDATE OR DELETE ON facility_tickets
  FOR EACH ROW
  EXECUTE FUNCTION log_audit_event();

COMMENT ON TABLE facility_tickets IS 'Facility/intervention tickets with SLA tracking';
