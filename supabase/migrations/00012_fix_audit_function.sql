-- ============================================================================
-- Fix audit log function to handle tables without title field
-- The partners table uses company_name instead of title/name
-- ============================================================================

CREATE OR REPLACE FUNCTION public.log_audit_event()
RETURNS TRIGGER AS $$
DECLARE
  v_user_id UUID;
  v_action TEXT;
  v_entity_id UUID;
  v_entity_name TEXT;
  v_changes JSONB;
BEGIN
  -- Get current user
  v_user_id := auth.uid();

  -- Determine action type and get entity name based on available columns
  IF TG_OP = 'INSERT' THEN
    v_action := 'CREATE';
    v_entity_id := NEW.id;
    -- Try different name columns that might exist
    v_entity_name := CASE
      WHEN TG_TABLE_NAME = 'partners' THEN NEW.company_name
      WHEN TG_TABLE_NAME = 'profiles' THEN NEW.full_name
      WHEN TG_TABLE_NAME IN ('leads', 'tenders', 'jobs', 'cases', 'facility_tickets') THEN NEW.title
      ELSE NEW.id::TEXT
    END;
    v_changes := NULL;
  ELSIF TG_OP = 'UPDATE' THEN
    v_action := 'UPDATE';
    v_entity_id := NEW.id;
    v_entity_name := CASE
      WHEN TG_TABLE_NAME = 'partners' THEN NEW.company_name
      WHEN TG_TABLE_NAME = 'profiles' THEN NEW.full_name
      WHEN TG_TABLE_NAME IN ('leads', 'tenders', 'jobs', 'cases', 'facility_tickets') THEN NEW.title
      ELSE NEW.id::TEXT
    END;
    -- Track status changes specially
    IF OLD.status IS DISTINCT FROM NEW.status THEN
      v_action := 'STATUS_CHANGE';
      v_changes := jsonb_build_object('status', jsonb_build_object('old', OLD.status, 'new', NEW.status));
    ELSE
      v_changes := jsonb_build_object('modified', true);
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    v_action := 'DELETE';
    v_entity_id := OLD.id;
    v_entity_name := CASE
      WHEN TG_TABLE_NAME = 'partners' THEN OLD.company_name
      WHEN TG_TABLE_NAME = 'profiles' THEN OLD.full_name
      WHEN TG_TABLE_NAME IN ('leads', 'tenders', 'jobs', 'cases', 'facility_tickets') THEN OLD.title
      ELSE OLD.id::TEXT
    END;
    v_changes := NULL;
  END IF;

  -- Insert audit log
  INSERT INTO public.audit_logs (
    user_id,
    action,
    entity_type,
    entity_id,
    entity_name,
    changes
  ) VALUES (
    v_user_id,
    v_action,
    TG_TABLE_NAME,
    v_entity_id,
    v_entity_name,
    v_changes
  );

  -- Return appropriate record
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.log_audit_event IS 'Audit trigger function - handles different table schemas';
