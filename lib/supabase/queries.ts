/**
 * Supabase Data Queries
 *
 * Server-side data fetching functions for all dashboard modules.
 * Falls back to seed data when Supabase returns empty results.
 */

import { createClient } from './server';
import type {
  Tender,
  Lead,
  Job,
  JobApplication,
  ComplianceDoc,
  Case,
} from './types';

// Import seed data as fallback
import tendersData from '@/scripts/seed/tenders.json';
import leadsData from '@/scripts/seed/leads.json';
import jobsData from '@/scripts/seed/jobs.json';
import complianceDocsData from '@/scripts/seed/compliance_docs.json';
import casesData from '@/scripts/seed/cases.json';

// ============================================================================
// TENDERS
// ============================================================================

export async function getTenders(): Promise<Tender[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('tenders')
      .select('*')
      .order('deadline_at', { ascending: true });

    if (error) {
      console.error('[getTenders] Supabase error:', error);
      return tendersData as unknown as Tender[];
    }

    if (!data || data.length === 0) {
      console.log('[getTenders] No data in Supabase, using seed data');
      return tendersData as unknown as Tender[];
    }

    return data;
  } catch (err) {
    console.error('[getTenders] Error:', err);
    return tendersData as unknown as Tender[];
  }
}

export async function getTenderById(id: string): Promise<Tender | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('tenders')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      // Fallback to seed data
      const seedTender = (tendersData as unknown as Tender[]).find(t => t.id === id);
      return seedTender || null;
    }

    return data;
  } catch (err) {
    console.error('[getTenderById] Error:', err);
    const seedTender = (tendersData as unknown as Tender[]).find(t => t.id === id);
    return seedTender || null;
  }
}

// ============================================================================
// LEADS
// ============================================================================

export async function getLeads(): Promise<Lead[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getLeads] Supabase error:', error);
      return leadsData as unknown as Lead[];
    }

    if (!data || data.length === 0) {
      console.log('[getLeads] No data in Supabase, using seed data');
      return leadsData as unknown as Lead[];
    }

    return data;
  } catch (err) {
    console.error('[getLeads] Error:', err);
    return leadsData as unknown as Lead[];
  }
}

export async function getLeadById(id: string): Promise<Lead | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      const seedLead = (leadsData as unknown as Lead[]).find(l => l.id === id);
      return seedLead || null;
    }

    return data;
  } catch (err) {
    console.error('[getLeadById] Error:', err);
    const seedLead = (leadsData as unknown as Lead[]).find(l => l.id === id);
    return seedLead || null;
  }
}

// ============================================================================
// COMPLIANCE DOCS
// ============================================================================

export async function getComplianceDocs(): Promise<ComplianceDoc[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('compliance_docs')
      .select('*')
      .order('valid_to', { ascending: true });

    if (error) {
      console.error('[getComplianceDocs] Supabase error:', error);
      return complianceDocsData as unknown as ComplianceDoc[];
    }

    if (!data || data.length === 0) {
      console.log('[getComplianceDocs] No data in Supabase, using seed data');
      return complianceDocsData as unknown as ComplianceDoc[];
    }

    return data;
  } catch (err) {
    console.error('[getComplianceDocs] Error:', err);
    return complianceDocsData as unknown as ComplianceDoc[];
  }
}

export async function getExpiryRadar(): Promise<{
  expired: ComplianceDoc[];
  within30: ComplianceDoc[];
  within60: ComplianceDoc[];
  within90: ComplianceDoc[];
}> {
  const docs = await getComplianceDocs();
  const now = new Date();

  const getExpiryDays = (validTo: string) => {
    const expiryDate = new Date(validTo);
    return Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  return {
    expired: docs.filter(d => getExpiryDays(d.valid_to) < 0),
    within30: docs.filter(d => {
      const days = getExpiryDays(d.valid_to);
      return days >= 0 && days <= 30;
    }),
    within60: docs.filter(d => {
      const days = getExpiryDays(d.valid_to);
      return days > 30 && days <= 60;
    }),
    within90: docs.filter(d => {
      const days = getExpiryDays(d.valid_to);
      return days > 60 && days <= 90;
    }),
  };
}

// ============================================================================
// JOBS
// ============================================================================

export async function getJobs(): Promise<Job[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getJobs] Supabase error:', error);
      return jobsData as unknown as Job[];
    }

    if (!data || data.length === 0) {
      console.log('[getJobs] No data in Supabase, using seed data');
      return jobsData as unknown as Job[];
    }

    return data;
  } catch (err) {
    console.error('[getJobs] Error:', err);
    return jobsData as unknown as Job[];
  }
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      const seedJob = (jobsData as unknown as Job[]).find(j => j.slug === slug);
      return seedJob || null;
    }

    return data;
  } catch (err) {
    console.error('[getJobBySlug] Error:', err);
    const seedJob = (jobsData as unknown as Job[]).find(j => j.slug === slug);
    return seedJob || null;
  }
}

// ============================================================================
// JOB APPLICATIONS
// ============================================================================

export async function getJobApplications(): Promise<JobApplication[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getJobApplications] Supabase error:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('[getJobApplications] Error:', err);
    return [];
  }
}

export async function getApplicationsByJobId(jobId: string): Promise<JobApplication[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getApplicationsByJobId] Supabase error:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('[getApplicationsByJobId] Error:', err);
    return [];
  }
}

// ============================================================================
// CASES
// ============================================================================

export async function getCases(): Promise<Case[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('is_published', true)
      .order('year', { ascending: false });

    if (error) {
      console.error('[getCases] Supabase error:', error);
      return casesData as unknown as Case[];
    }

    if (!data || data.length === 0) {
      console.log('[getCases] No data in Supabase, using seed data');
      return casesData as unknown as Case[];
    }

    return data;
  } catch (err) {
    console.error('[getCases] Error:', err);
    return casesData as unknown as Case[];
  }
}

// ============================================================================
// DASHBOARD AGGREGATED DATA
// ============================================================================

export interface DashboardData {
  tenders: Tender[];
  leads: Lead[];
  complianceDocs: ComplianceDoc[];
  expiryRadar: {
    expired: ComplianceDoc[];
    within30: ComplianceDoc[];
    within60: ComplianceDoc[];
    within90: ComplianceDoc[];
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  const [tenders, leads, complianceDocs, expiryRadar] = await Promise.all([
    getTenders(),
    getLeads(),
    getComplianceDocs(),
    getExpiryRadar(),
  ]);

  return {
    tenders,
    leads,
    complianceDocs,
    expiryRadar,
  };
}

// ============================================================================
// ANALYTICS DATA
// ============================================================================

export interface AnalyticsData {
  tenders: Tender[];
  leads: Lead[];
  jobs: Job[];
  applications: JobApplication[];
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  const [tenders, leads, jobs, applications] = await Promise.all([
    getTenders(),
    getLeads(),
    getJobs(),
    getJobApplications(),
  ]);

  return {
    tenders,
    leads,
    jobs,
    applications,
  };
}
