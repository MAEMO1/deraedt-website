-- Create jobs table for vacancies

CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Job details
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  employment_type TEXT NOT NULL DEFAULT 'full_time' CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'internship')),
  location TEXT NOT NULL,

  -- Content
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',

  -- Salary (optional)
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  salary_currency TEXT DEFAULT 'EUR',

  -- Status
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed')),
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,

  -- External publishing
  vdab_sync_status TEXT DEFAULT 'not_synced',
  vdab_external_id TEXT,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create job applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,

  -- Applicant info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,

  -- Application content
  cv_url TEXT,
  cover_letter TEXT,

  -- Status tracking
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'screening', 'interview', 'offer', 'hired', 'rejected')),

  -- Internal tracking
  reviewer_id UUID REFERENCES public.profiles(id),
  notes TEXT,
  tags TEXT[] DEFAULT '{}',

  -- GDPR
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  retention_until DATE,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Policies for jobs (public can read published)
CREATE POLICY "Anyone can view published jobs" ON public.jobs
  FOR SELECT USING (status = 'published');

CREATE POLICY "Staff can manage jobs" ON public.jobs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('DIRECTIE', 'HR', 'ADMIN')
    )
  );

-- Policies for applications
CREATE POLICY "Staff can view applications" ON public.job_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('DIRECTIE', 'HR', 'ADMIN')
    )
  );

CREATE POLICY "Anyone can submit applications" ON public.job_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can update applications" ON public.job_applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('DIRECTIE', 'HR', 'ADMIN')
    )
  );

-- Indexes
CREATE INDEX jobs_status_idx ON public.jobs(status);
CREATE INDEX jobs_slug_idx ON public.jobs(slug);
CREATE INDEX applications_job_idx ON public.job_applications(job_id);
CREATE INDEX applications_status_idx ON public.job_applications(status);

-- Updated_at triggers
CREATE TRIGGER jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
