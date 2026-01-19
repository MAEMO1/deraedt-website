-- ============================================================================
-- Fix audit log function v2 - use to_jsonb to safely access fields
-- ============================================================================

CREATE OR REPLACE FUNCTION public.log_audit_event()
RETURNS TRIGGER AS $$
DECLARE
  v_user_id UUID;
  v_action TEXT;
  v_entity_id UUID;
  v_entity_name TEXT;
  v_changes JSONB;
  v_record_json JSONB;
  v_old_json JSONB;
BEGIN
  -- Get current user
  v_user_id := auth.uid();

  -- Convert records to JSONB for safe field access
  IF TG_OP = 'DELETE' THEN
    v_record_json := to_jsonb(OLD);
    v_action := 'DELETE';
  ELSE
    v_record_json := to_jsonb(NEW);
    IF TG_OP = 'INSERT' THEN
      v_action := 'CREATE';
    ELSE
      v_action := 'UPDATE';
      v_old_json := to_jsonb(OLD);
    END IF;
  END IF;

  -- Get entity ID
  v_entity_id := (v_record_json->>'id')::UUID;

  -- Get entity name based on table using JSONB (safe access, returns NULL if field doesn't exist)
  v_entity_name := COALESCE(
    v_record_json->>'company_name',  -- partners
    v_record_json->>'title',          -- leads, tenders, jobs, cases, facility_tickets
    v_record_json->>'name',           -- partner_documents, compliance_docs
    v_record_json->>'full_name',      -- profiles
    v_entity_id::TEXT                 -- fallback to ID
  );

  -- Track status changes for UPDATE
  IF TG_OP = 'UPDATE' AND v_record_json ? 'status' AND v_old_json ? 'status' THEN
    IF (v_old_json->>'status') IS DISTINCT FROM (v_record_json->>'status') THEN
      v_action := 'STATUS_CHANGE';
      v_changes := jsonb_build_object('status', jsonb_build_object('old', v_old_json->>'status', 'new', v_record_json->>'status'));
    ELSE
      v_changes := jsonb_build_object('modified', true);
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    v_changes := jsonb_build_object('modified', true);
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

COMMENT ON FUNCTION public.log_audit_event IS 'Audit trigger function v2 - uses JSONB for safe field access across different table schemas';
