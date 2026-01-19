/**
 * Supabase Data Queries
 *
 * Server-side data fetching functions for all dashboard modules.
 * Falls back to seed data ONLY in development when Supabase returns empty results.
 * In production, returns empty arrays instead of seed data.
 */

import { createClient } from './server';
import type {
  Tender,
  Lead,
  LeadNote,
  Job,
  JobApplication,
  ComplianceDoc,
  Case,
  FacilityTicket,
  Partner,
  PartnerDocument,
  Profile,
} from './types';

// Import seed data as fallback (ONLY used in development)
import tendersData from '@/scripts/seed/tenders.json';
import leadsData from '@/scripts/seed/leads.json';
import jobsData from '@/scripts/seed/jobs.json';
import complianceDocsData from '@/scripts/seed/compliance_docs.json';
import casesData from '@/scripts/seed/cases.json';
import facilityTicketsData from '@/scripts/seed/facility_tickets.json';
import partnersData from '@/scripts/seed/partners.json';
import profilesData from '@/scripts/seed/profiles.json';

/**
 * Check if seed data fallback is allowed.
 * Only allow in development, never in production.
 */
function canUseSeedData(): boolean {
  return process.env.NODE_ENV !== 'production';
}

/**
 * Get seed data fallback or empty array based on environment.
 * In production, always returns empty array.
 */
function getSeedFallback<T>(seedData: T[], queryName: string): T[] {
  if (canUseSeedData()) {
    console.warn(`[${queryName}] Using seed data fallback (development mode)`);
    return seedData;
  }
  console.error(`[${queryName}] No data available (production mode - seed fallback disabled)`);
  return [];
}

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
      return getSeedFallback(tendersData as unknown as Tender[], 'getTenders');
    }

    if (!data || data.length === 0) {
      return getSeedFallback(tendersData as unknown as Tender[], 'getTenders');
    }

    return data;
  } catch (err) {
    console.error('[getTenders] Error:', err);
    return getSeedFallback(tendersData as unknown as Tender[], 'getTenders');
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
      if (canUseSeedData()) {
        const seedTender = (tendersData as unknown as Tender[]).find(t => t.id === id);
        return seedTender || null;
      }
      return null;
    }

    return data;
  } catch (err) {
    console.error('[getTenderById] Error:', err);
    if (canUseSeedData()) {
      const seedTender = (tendersData as unknown as Tender[]).find(t => t.id === id);
      return seedTender || null;
    }
    return null;
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
      return getSeedFallback(leadsData as unknown as Lead[], 'getLeads');
    }

    if (!data || data.length === 0) {
      console.log('[getLeads] No data in Supabase, using seed data');
      return getSeedFallback(leadsData as unknown as Lead[], 'getLeads');
    }

    return data;
  } catch (err) {
    console.error('[getLeads] Error:', err);
    return getSeedFallback(leadsData as unknown as Lead[], 'getLeads');
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
      if (canUseSeedData()) {
        const seedLead = (leadsData as unknown as Lead[]).find(l => l.id === id);
        return seedLead || null;
      }
      return null;
    }

    return data;
  } catch (err) {
    console.error('[getLeadById] Error:', err);
    if (canUseSeedData()) {
      const seedLead = (leadsData as unknown as Lead[]).find(l => l.id === id);
      return seedLead || null;
    }
    return null;
  }
}

// ============================================================================
// LEAD NOTES
// ============================================================================

export async function getLeadNotes(leadId: string): Promise<LeadNote[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('lead_notes')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getLeadNotes] Supabase error:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('[getLeadNotes] Error:', err);
    return [];
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
      return getSeedFallback(complianceDocsData as unknown as ComplianceDoc[], 'getComplianceDocs');
    }

    if (!data || data.length === 0) {
      console.log('[getComplianceDocs] No data in Supabase, using seed data');
      return getSeedFallback(complianceDocsData as unknown as ComplianceDoc[], 'getComplianceDocs');
    }

    return data;
  } catch (err) {
    console.error('[getComplianceDocs] Error:', err);
    return getSeedFallback(complianceDocsData as unknown as ComplianceDoc[], 'getComplianceDocs');
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
      return getSeedFallback(jobsData as unknown as Job[], 'getJobs');
    }

    if (!data || data.length === 0) {
      console.log('[getJobs] No data in Supabase, using seed data');
      return getSeedFallback(jobsData as unknown as Job[], 'getJobs');
    }

    return data;
  } catch (err) {
    console.error('[getJobs] Error:', err);
    return getSeedFallback(jobsData as unknown as Job[], 'getJobs');
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
      if (canUseSeedData()) {
        const seedJob = (jobsData as unknown as Job[]).find(j => j.slug === slug);
        return seedJob || null;
      }
      return null;
    }

    return data;
  } catch (err) {
    console.error('[getJobBySlug] Error:', err);
    if (canUseSeedData()) {
      const seedJob = (jobsData as unknown as Job[]).find(j => j.slug === slug);
      return seedJob || null;
    }
    return null;
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
      return getSeedFallback(casesData as unknown as Case[], 'getCases');
    }

    if (!data || data.length === 0) {
      console.log('[getCases] No data in Supabase, using seed data');
      return getSeedFallback(casesData as unknown as Case[], 'getCases');
    }

    return data;
  } catch (err) {
    console.error('[getCases] Error:', err);
    return getSeedFallback(casesData as unknown as Case[], 'getCases');
  }
}

// ============================================================================
// FACILITY TICKETS
// ============================================================================

export async function getFacilityTickets(): Promise<FacilityTicket[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('facility_tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getFacilityTickets] Supabase error:', error);
      return getSeedFallback(facilityTicketsData as unknown as FacilityTicket[], 'getFacilityTickets');
    }

    if (!data || data.length === 0) {
      console.log('[getFacilityTickets] No data in Supabase, using seed data');
      return getSeedFallback(facilityTicketsData as unknown as FacilityTicket[], 'getFacilityTickets');
    }

    return data;
  } catch (err) {
    console.error('[getFacilityTickets] Error:', err);
    return getSeedFallback(facilityTicketsData as unknown as FacilityTicket[], 'getFacilityTickets');
  }
}

export async function getFacilityTicketById(id: string): Promise<FacilityTicket | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('facility_tickets')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      if (canUseSeedData()) {
        const seedTicket = (facilityTicketsData as unknown as FacilityTicket[]).find(t => t.id === id);
        return seedTicket || null;
      }
      return null;
    }

    return data;
  } catch (err) {
    console.error('[getFacilityTicketById] Error:', err);
    if (canUseSeedData()) {
      const seedTicket = (facilityTicketsData as unknown as FacilityTicket[]).find(t => t.id === id);
      return seedTicket || null;
    }
    return null;
  }
}

// ============================================================================
// PARTNERS
// ============================================================================

// Type for partner with nested documents (from seed data)
interface PartnerWithDocuments extends Partner {
  documents: PartnerDocument[];
}

// Seed data has documents nested, so we need to handle that structure
type SeedPartner = Partner & { documents: PartnerDocument[] };

// Helper to extract partner without documents from seed data
function extractPartnerFromSeed(seed: SeedPartner): Partner {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { documents, ...partner } = seed;
  return partner;
}

export async function getPartners(): Promise<Partner[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getPartners] Supabase error:', error);
      if (canUseSeedData()) {
        console.warn('[getPartners] Using seed data fallback (development mode)');
        return (partnersData as unknown as SeedPartner[]).map(extractPartnerFromSeed);
      }
      return [];
    }

    if (!data || data.length === 0) {
      if (canUseSeedData()) {
        console.warn('[getPartners] Using seed data fallback (development mode)');
        return (partnersData as unknown as SeedPartner[]).map(extractPartnerFromSeed);
      }
      return [];
    }

    return data;
  } catch (err) {
    console.error('[getPartners] Error:', err);
    if (canUseSeedData()) {
      console.warn('[getPartners] Using seed data fallback (development mode)');
      return (partnersData as unknown as SeedPartner[]).map(extractPartnerFromSeed);
    }
    return [];
  }
}

export async function getPartnerById(id: string): Promise<Partner | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      if (canUseSeedData()) {
        const seedPartner = (partnersData as unknown as SeedPartner[]).find(p => p.id === id);
        return seedPartner ? extractPartnerFromSeed(seedPartner) : null;
      }
      return null;
    }

    return data;
  } catch (err) {
    console.error('[getPartnerById] Error:', err);
    if (canUseSeedData()) {
      const seedPartner = (partnersData as unknown as SeedPartner[]).find(p => p.id === id);
      return seedPartner ? extractPartnerFromSeed(seedPartner) : null;
    }
    return null;
  }
}

export async function getPartnerDocuments(partnerId: string): Promise<PartnerDocument[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('partner_documents')
      .select('*')
      .eq('partner_id', partnerId)
      .order('doc_type', { ascending: true });

    if (error) {
      console.error('[getPartnerDocuments] Supabase error:', error);
      if (canUseSeedData()) {
        const seedPartner = (partnersData as unknown as SeedPartner[]).find(p => p.id === partnerId);
        return seedPartner?.documents || [];
      }
      return [];
    }

    if (!data || data.length === 0) {
      if (canUseSeedData()) {
        const seedPartner = (partnersData as unknown as SeedPartner[]).find(p => p.id === partnerId);
        return seedPartner?.documents || [];
      }
      return [];
    }

    return data;
  } catch (err) {
    console.error('[getPartnerDocuments] Error:', err);
    if (canUseSeedData()) {
      const seedPartner = (partnersData as unknown as SeedPartner[]).find(p => p.id === partnerId);
      return seedPartner?.documents || [];
    }
    return [];
  }
}

export async function getPartnersWithDocuments(): Promise<PartnerWithDocuments[]> {
  try {
    const supabase = await createClient();

    // First try to get partners from Supabase
    const { data: partnersDb, error: partnersError } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });

    if (partnersError || !partnersDb || partnersDb.length === 0) {
      if (canUseSeedData()) {
        console.warn('[getPartnersWithDocuments] Using seed data fallback (development mode)');
        return partnersData as unknown as PartnerWithDocuments[];
      }
      return [];
    }

    // Get all documents for these partners
    const partnerIds = partnersDb.map((p: Partner) => p.id);
    const { data: docsDb, error: docsError } = await supabase
      .from('partner_documents')
      .select('*')
      .in('partner_id', partnerIds);

    if (docsError) {
      console.error('[getPartnersWithDocuments] Docs error:', docsError);
    }

    // Combine partners with their documents
    const partnersWithDocs: PartnerWithDocuments[] = partnersDb.map((partner: Partner) => ({
      ...partner,
      documents: (docsDb || []).filter((d: PartnerDocument) => d.partner_id === partner.id),
    }));

    return partnersWithDocs;
  } catch (err) {
    console.error('[getPartnersWithDocuments] Error:', err);
    if (canUseSeedData()) {
      console.warn('[getPartnersWithDocuments] Using seed data fallback (development mode)');
      return partnersData as unknown as PartnerWithDocuments[];
    }
    return [];
  }
}

// ============================================================================
// PROFILES (Team Members)
// ============================================================================

export async function getProfiles(): Promise<Profile[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('full_name', { ascending: true });

    if (error) {
      console.error('[getProfiles] Supabase error:', error);
      return getSeedFallback(profilesData as unknown as Profile[], 'getProfiles');
    }

    if (!data || data.length === 0) {
      console.log('[getProfiles] No data in Supabase, using seed data');
      return getSeedFallback(profilesData as unknown as Profile[], 'getProfiles');
    }

    return data;
  } catch (err) {
    console.error('[getProfiles] Error:', err);
    return getSeedFallback(profilesData as unknown as Profile[], 'getProfiles');
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
