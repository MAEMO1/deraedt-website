-- Create leads table for intake submissions

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_type TEXT NOT NULL CHECK (lead_type IN ('project', 'facility', 'partner', 'procurement', 'contact')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost')),

  -- Contact info
  organisation TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,

  -- Project details
  location TEXT,
  budget_band TEXT,
  timing TEXT,
  message TEXT,

  -- Internal tracking
  owner_id UUID REFERENCES public.profiles(id),
  next_action_date DATE,

  -- Metadata
  source TEXT DEFAULT 'website',
  attachments JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create lead notes table
CREATE TABLE IF NOT EXISTS public.lead_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;

-- Policies for leads
CREATE POLICY "Authenticated users can view leads" ON public.leads
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert leads" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can update leads" ON public.leads
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('DIRECTIE', 'SALES', 'ADMIN')
    )
  );

-- Policies for lead notes
CREATE POLICY "Authenticated users can view lead notes" ON public.lead_notes
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert lead notes" ON public.lead_notes
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Indexes
CREATE INDEX leads_status_idx ON public.leads(status);
CREATE INDEX leads_type_idx ON public.leads(lead_type);
CREATE INDEX leads_owner_idx ON public.leads(owner_id);
CREATE INDEX leads_created_idx ON public.leads(created_at DESC);

-- Updated_at trigger
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
