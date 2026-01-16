-- Create audit log table for tracking all important events

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Who performed the action
  user_id UUID REFERENCES public.profiles(id),
  user_email TEXT,
  user_role TEXT,

  -- What action was performed
  action TEXT NOT NULL CHECK (action IN (
    'LOGIN', 'LOGOUT', 'LOGIN_FAILED',
    'CREATE', 'UPDATE', 'DELETE',
    'VIEW', 'DOWNLOAD', 'EXPORT',
    'STATUS_CHANGE', 'ASSIGNMENT'
  )),

  -- What entity was affected
  entity_type TEXT,
  entity_id UUID,
  entity_name TEXT,

  -- Additional context
  metadata JSONB DEFAULT '{}'::JSONB,
  changes JSONB,  -- For UPDATE: { field: { old: x, new: y } }

  -- Request context
  ip_address TEXT,
  user_agent TEXT,

  -- Timestamp
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Policies - only admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('DIRECTIE', 'ADMIN')
    )
  );

-- Insert policy for system and authenticated users
CREATE POLICY "System can insert audit logs" ON public.audit_logs
  FOR INSERT WITH CHECK (true);

-- Indexes for common queries
CREATE INDEX audit_logs_user_idx ON public.audit_logs(user_id);
CREATE INDEX audit_logs_action_idx ON public.audit_logs(action);
CREATE INDEX audit_logs_entity_idx ON public.audit_logs(entity_type, entity_id);
CREATE INDEX audit_logs_created_idx ON public.audit_logs(created_at DESC);

-- Function to log actions from triggers
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

  -- Determine action type
  IF TG_OP = 'INSERT' THEN
    v_action := 'CREATE';
    v_entity_id := NEW.id;
    v_entity_name := COALESCE(NEW.title, NEW.name, NEW.contact_name, NEW.full_name, NEW.id::TEXT);
    v_changes := NULL;
  ELSIF TG_OP = 'UPDATE' THEN
    v_action := 'UPDATE';
    v_entity_id := NEW.id;
    v_entity_name := COALESCE(NEW.title, NEW.name, NEW.contact_name, NEW.full_name, NEW.id::TEXT);
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
    v_entity_name := COALESCE(OLD.title, OLD.name, OLD.contact_name, OLD.full_name, OLD.id::TEXT);
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

-- Create triggers for important tables

-- Leads audit
CREATE TRIGGER audit_leads
  AFTER INSERT OR UPDATE OR DELETE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- Tenders audit
CREATE TRIGGER audit_tenders
  AFTER INSERT OR UPDATE OR DELETE ON public.tenders
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- Jobs audit
CREATE TRIGGER audit_jobs
  AFTER INSERT OR UPDATE OR DELETE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- Job applications audit
CREATE TRIGGER audit_job_applications
  AFTER INSERT OR UPDATE OR DELETE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- Cases audit
CREATE TRIGGER audit_cases
  AFTER INSERT OR UPDATE OR DELETE ON public.cases
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- Compliance docs audit
CREATE TRIGGER audit_compliance_docs
  AFTER INSERT OR UPDATE OR DELETE ON public.compliance_docs
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();
