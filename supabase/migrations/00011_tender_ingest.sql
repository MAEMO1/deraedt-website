-- Tender Ingest System
-- Tracks ingestion runs and CPV relevance for matching

-- ============================================================================
-- TENDER INGEST RUNS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.tender_ingest_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Source info
  source TEXT NOT NULL CHECK (source IN ('ted', 'e-procurement')),

  -- Run stats
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),

  -- Results
  tenders_found INTEGER DEFAULT 0,
  tenders_imported INTEGER DEFAULT 0,
  tenders_skipped INTEGER DEFAULT 0,

  -- Error tracking
  error_message TEXT,

  -- Metadata
  run_metadata JSONB DEFAULT '{}'::JSONB
);

-- Enable RLS
ALTER TABLE public.tender_ingest_runs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can view ingest runs" ON public.tender_ingest_runs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('DIRECTIE', 'ADMIN')
    )
  );

CREATE POLICY "System can manage ingest runs" ON public.tender_ingest_runs
  FOR ALL USING (auth.uid() IS NULL);

-- Index for recent runs
CREATE INDEX tender_ingest_runs_started_at_idx ON public.tender_ingest_runs(started_at DESC);
CREATE INDEX tender_ingest_runs_source_idx ON public.tender_ingest_runs(source);

-- ============================================================================
-- CPV RELEVANCE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.cpv_relevance (
  cpv_code TEXT PRIMARY KEY,

  -- Relevance scoring
  relevance_score INTEGER NOT NULL DEFAULT 50 CHECK (relevance_score >= 0 AND relevance_score <= 100),
  category TEXT NOT NULL CHECK (category IN ('core', 'adjacent', 'opportunistic', 'excluded')),

  -- Description
  description_nl TEXT,
  description_en TEXT,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.cpv_relevance ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Authenticated users can view CPV relevance" ON public.cpv_relevance
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage CPV relevance" ON public.cpv_relevance
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('DIRECTIE', 'ADMIN')
    )
  );

-- Updated_at trigger
CREATE TRIGGER cpv_relevance_updated_at
  BEFORE UPDATE ON public.cpv_relevance
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================================
-- SEED CPV RELEVANCE DATA
-- ============================================================================

-- Core building & renovation CPV codes
INSERT INTO public.cpv_relevance (cpv_code, relevance_score, category, description_nl, description_en) VALUES
  -- Core: Building construction
  ('45210000', 100, 'core', 'Bouwen van gebouwen', 'Building construction work'),
  ('45211000', 100, 'core', 'Bouwen van meergezinswoningen en eengezinswoningen', 'Construction work for multi-dwelling buildings and individual houses'),
  ('45212000', 95, 'core', 'Bouwen van gebouwen voor ontspanning, sport, cultuur, logies en restaurants', 'Construction work for buildings relating to leisure, sports, culture, lodging and restaurants'),

  -- Core: Renovation & restoration
  ('45453100', 100, 'core', 'Restauratiewerkzaamheden', 'Restoration work'),
  ('45454100', 95, 'core', 'Renovatiewerkzaamheden', 'Refurbishment work'),
  ('45453000', 95, 'core', 'Revisie- en opknapwerkzaamheden', 'Overhaul and refurbishment work'),

  -- Core: Roofing
  ('45261000', 100, 'core', 'Dakbedekking en aanverwante werkzaamheden', 'Erection and related works of roof frames and coverings'),
  ('45261210', 100, 'core', 'Dakdekkerswerkzaamheden', 'Roof-covering work'),
  ('45261900', 95, 'core', 'Dakreparatie en -onderhoud', 'Roof repair and maintenance work'),

  -- Core: Insulation & energy
  ('45321000', 95, 'core', 'Thermische isolatie', 'Thermal insulation work'),
  ('45320000', 90, 'core', 'Isolatiewerkzaamheden', 'Insulation work'),

  -- Adjacent: General construction
  ('45000000', 70, 'adjacent', 'Bouwwerkzaamheden', 'Construction work'),
  ('45100000', 65, 'adjacent', 'Bouwrijp maken van terreinen', 'Site preparation work'),
  ('45200000', 75, 'adjacent', 'Volledige of gedeeltelijke bouw- en civieltechnische werkzaamheden', 'Works for complete or part construction and civil engineering work'),

  -- Adjacent: Specialized building works
  ('45262000', 70, 'adjacent', 'Speciale vaardigheden op bouwgebied', 'Special trade construction work other than roof works'),
  ('45410000', 60, 'adjacent', 'Stukadoorswerk', 'Plastering work'),
  ('45420000', 60, 'adjacent', 'Bouwtimmerwerk en schrijnwerk', 'Joinery and carpentry installation work'),
  ('45430000', 55, 'adjacent', 'Aanbrengen van vloeren en wandbekledingen', 'Floor and wall covering work'),
  ('45440000', 65, 'adjacent', 'Schilders- en glaszetterswerk', 'Painting and glazing work'),

  -- Opportunistic: Facility services
  ('50700000', 50, 'opportunistic', 'Reparatie en onderhoud van uitrusting in gebouwen', 'Repair and maintenance services of building installations'),
  ('50710000', 50, 'opportunistic', 'Reparatie en onderhoud van elektrische en mechanische uitrusting in gebouwen', 'Repair and maintenance services of electrical and mechanical building installations'),

  -- Opportunistic: Maintenance
  ('45454000', 45, 'opportunistic', 'Verbouwingswerk', 'Restructuring work'),
  ('90900000', 40, 'opportunistic', 'Schoonmaakdiensten en hygiënediensten', 'Cleaning and sanitation services'),

  -- Excluded: Not relevant
  ('45230000', 0, 'excluded', 'Aanleggen van pijpleidingen, communicatielijnen en stroomleidingen, autowegen, wegen, vliegvelden en spoorlijnen; verhardingen', 'Construction work for pipelines, communication and power lines, for highways, roads, airfields and railways'),
  ('45240000', 0, 'excluded', 'Waterbouwkundige werken', 'Construction work for water projects'),
  ('71000000', 0, 'excluded', 'Diensten op het gebied van architectuur, bouwkunde, engineering en inspectie', 'Architectural, construction, engineering and inspection services')
ON CONFLICT (cpv_code) DO UPDATE SET
  relevance_score = EXCLUDED.relevance_score,
  category = EXCLUDED.category,
  description_nl = EXCLUDED.description_nl,
  description_en = EXCLUDED.description_en,
  updated_at = NOW();

-- ============================================================================
-- HELPER FUNCTION: Calculate match score
-- ============================================================================

CREATE OR REPLACE FUNCTION public.calculate_tender_match_score(
  p_cpv_codes TEXT[],
  p_buyer_location TEXT DEFAULT NULL,
  p_estimated_value DECIMAL DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
  v_cpv_score INTEGER := 0;
  v_location_score INTEGER := 0;
  v_value_score INTEGER := 0;
  v_max_cpv_score INTEGER := 0;
  v_cpv_record RECORD;
BEGIN
  -- CPV Score: Take highest relevant CPV code score (weight: 60%)
  FOR v_cpv_record IN
    SELECT relevance_score
    FROM public.cpv_relevance
    WHERE cpv_code = ANY(p_cpv_codes)
    ORDER BY relevance_score DESC
    LIMIT 1
  LOOP
    v_max_cpv_score := v_cpv_record.relevance_score;
  END LOOP;

  -- If no CPV match found, check for parent codes (first 5 digits)
  IF v_max_cpv_score = 0 AND array_length(p_cpv_codes, 1) > 0 THEN
    FOR v_cpv_record IN
      SELECT MAX(relevance_score) as max_score
      FROM public.cpv_relevance cr
      WHERE EXISTS (
        SELECT 1 FROM unnest(p_cpv_codes) cpv
        WHERE LEFT(cpv, 5) = LEFT(cr.cpv_code, 5)
      )
    LOOP
      v_max_cpv_score := COALESCE(v_cpv_record.max_score, 0) * 0.7; -- 70% of parent score
    END LOOP;
  END IF;

  v_cpv_score := (v_max_cpv_score * 0.6)::INTEGER;

  -- Location Score: Oost-Vlaanderen preferred (weight: 25%)
  IF p_buyer_location IS NOT NULL THEN
    IF p_buyer_location ILIKE '%oost-vlaanderen%' OR
       p_buyer_location ILIKE '%gent%' OR
       p_buyer_location ILIKE '%dendermonde%' OR
       p_buyer_location ILIKE '%sint-niklaas%' OR
       p_buyer_location ILIKE '%lokeren%' OR
       p_buyer_location ILIKE '%wetteren%' OR
       p_buyer_location ILIKE '%aalst%' THEN
      v_location_score := 25;
    ELSIF p_buyer_location ILIKE '%vlaanderen%' OR
          p_buyer_location ILIKE '%antwerpen%' OR
          p_buyer_location ILIKE '%west-vlaanderen%' OR
          p_buyer_location ILIKE '%vlaams-brabant%' OR
          p_buyer_location ILIKE '%limburg%' THEN
      v_location_score := 15;
    ELSIF p_buyer_location ILIKE '%belgi%' OR
          p_buyer_location ILIKE '%brussel%' THEN
      v_location_score := 10;
    ELSE
      v_location_score := 5;
    END IF;
  END IF;

  -- Value Score: Sweet spot 200K - 2M EUR (weight: 15%)
  IF p_estimated_value IS NOT NULL THEN
    IF p_estimated_value >= 200000 AND p_estimated_value <= 2000000 THEN
      v_value_score := 15;
    ELSIF p_estimated_value >= 100000 AND p_estimated_value <= 5000000 THEN
      v_value_score := 10;
    ELSIF p_estimated_value >= 50000 THEN
      v_value_score := 5;
    END IF;
  ELSE
    v_value_score := 8; -- Unknown value, neutral score
  END IF;

  RETURN LEAST(100, v_cpv_score + v_location_score + v_value_score);
END;
$$ LANGUAGE plpgsql STABLE;
