-- Create tenders table for tender opportunities

CREATE TABLE IF NOT EXISTS public.tenders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Source info
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('ted', 'e-procurement', 'manual')),
  external_id TEXT,
  external_url TEXT,

  -- Tender details
  title TEXT NOT NULL,
  buyer TEXT NOT NULL,
  buyer_location TEXT,
  cpv_codes TEXT[] DEFAULT '{}',
  estimated_value DECIMAL(15,2),
  currency TEXT DEFAULT 'EUR',

  -- Dates
  publication_date DATE,
  deadline_at TIMESTAMPTZ,

  -- Status tracking
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'analyzing', 'go', 'no_go', 'in_preparation', 'submitted', 'won', 'lost')),
  match_score INTEGER CHECK (match_score >= 0 AND match_score <= 100),

  -- Go/No-Go decision
  decision_date DATE,
  decision_reason TEXT,
  decision_by UUID REFERENCES public.profiles(id),

  -- Checklist (JSON for flexibility)
  go_no_go_checklist JSONB DEFAULT '{
    "capacity": null,
    "risk": null,
    "margin": null,
    "planning": null,
    "references": null
  }'::JSONB,

  -- Assignment
  owner_id UUID REFERENCES public.profiles(id),

  -- Attachments
  attachments JSONB DEFAULT '[]'::JSONB,

  -- Metadata
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.tenders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Authenticated users can view tenders" ON public.tenders
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can manage tenders" ON public.tenders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('DIRECTIE', 'SALES', 'ADMIN')
    )
  );

-- Indexes
CREATE INDEX tenders_status_idx ON public.tenders(status);
CREATE INDEX tenders_deadline_idx ON public.tenders(deadline_at);
CREATE INDEX tenders_owner_idx ON public.tenders(owner_id);
CREATE INDEX tenders_source_idx ON public.tenders(source);

-- Updated_at trigger
CREATE TRIGGER tenders_updated_at
  BEFORE UPDATE ON public.tenders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
