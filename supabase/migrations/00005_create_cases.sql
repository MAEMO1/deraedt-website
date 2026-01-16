-- Create case studies / referenties table

CREATE TABLE IF NOT EXISTS public.cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic info
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,

  -- Client/project details
  client_name TEXT NOT NULL,
  client_type TEXT CHECK (client_type IN ('public', 'private', 'education', 'healthcare', 'industrial')),
  location TEXT NOT NULL,
  year INTEGER NOT NULL,

  -- Scope
  scope TEXT NOT NULL,
  services TEXT[] DEFAULT '{}',

  -- Content
  summary TEXT NOT NULL,
  description TEXT,
  challenge TEXT,
  solution TEXT,
  results TEXT,

  -- KPIs (for procurement scoring)
  kpis JSONB DEFAULT '{}'::JSONB,
  -- Example: { "budget_adherence": 98, "timeline_adherence": 95, "safety_incidents": 0, "client_satisfaction": 9.2 }

  -- Media
  featured_image TEXT,
  images TEXT[] DEFAULT '{}',

  -- Status
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view published cases" ON public.cases
  FOR SELECT USING (is_published = true);

CREATE POLICY "Staff can manage cases" ON public.cases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('DIRECTIE', 'ADMIN')
    )
  );

-- Indexes
CREATE INDEX cases_published_idx ON public.cases(is_published);
CREATE INDEX cases_slug_idx ON public.cases(slug);
CREATE INDEX cases_year_idx ON public.cases(year DESC);
CREATE INDEX cases_client_type_idx ON public.cases(client_type);

-- Updated_at trigger
CREATE TRIGGER cases_updated_at
  BEFORE UPDATE ON public.cases
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
