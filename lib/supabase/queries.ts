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
  FacilityTicket,
  Partner,
  PartnerDocument,
} from './types';

// Import seed data as fallback
import tendersData from '@/scripts/seed/tenders.json';
import leadsData from '@/scripts/seed/leads.json';
import jobsData from '@/scripts/seed/jobs.json';
import complianceDocsData from '@/scripts/seed/compliance_docs.json';
import casesData from '@/scripts/seed/cases.json';
import facilityTicketsData from '@/scripts/seed/facility_tickets.json';
import partnersData from '@/scripts/seed/partners.json';

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
      return facilityTicketsData as unknown as FacilityTicket[];
    }

    if (!data || data.length === 0) {
      console.log('[getFacilityTickets] No data in Supabase, using seed data');
      return facilityTicketsData as unknown as FacilityTicket[];
    }

    return data;
  } catch (err) {
    console.error('[getFacilityTickets] Error:', err);
    return facilityTicketsData as unknown as FacilityTicket[];
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
      const seedTicket = (facilityTicketsData as unknown as FacilityTicket[]).find(t => t.id === id);
      return seedTicket || null;
    }

    return data;
  } catch (err) {
    console.error('[getFacilityTicketById] Error:', err);
    const seedTicket = (facilityTicketsData as unknown as FacilityTicket[]).find(t => t.id === id);
    return seedTicket || null;
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
      return (partnersData as unknown as SeedPartner[]).map(extractPartnerFromSeed);
    }

    if (!data || data.length === 0) {
      console.log('[getPartners] No data in Supabase, using seed data');
      return (partnersData as unknown as SeedPartner[]).map(extractPartnerFromSeed);
    }

    return data;
  } catch (err) {
    console.error('[getPartners] Error:', err);
    return (partnersData as unknown as SeedPartner[]).map(extractPartnerFromSeed);
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
      const seedPartner = (partnersData as unknown as SeedPartner[]).find(p => p.id === id);
      return seedPartner ? extractPartnerFromSeed(seedPartner) : null;
    }

    return data;
  } catch (err) {
    console.error('[getPartnerById] Error:', err);
    const seedPartner = (partnersData as unknown as SeedPartner[]).find(p => p.id === id);
    return seedPartner ? extractPartnerFromSeed(seedPartner) : null;
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
      const seedPartner = (partnersData as unknown as SeedPartner[]).find(p => p.id === partnerId);
      return seedPartner?.documents || [];
    }

    if (!data || data.length === 0) {
      const seedPartner = (partnersData as unknown as SeedPartner[]).find(p => p.id === partnerId);
      return seedPartner?.documents || [];
    }

    return data;
  } catch (err) {
    console.error('[getPartnerDocuments] Error:', err);
    const seedPartner = (partnersData as unknown as SeedPartner[]).find(p => p.id === partnerId);
    return seedPartner?.documents || [];
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
      console.log('[getPartnersWithDocuments] Using seed data');
      return partnersData as unknown as PartnerWithDocuments[];
    }

    // Get all documents for these partners
    const partnerIds = partnersDb.map(p => p.id);
    const { data: docsDb, error: docsError } = await supabase
      .from('partner_documents')
      .select('*')
      .in('partner_id', partnerIds);

    if (docsError) {
      console.error('[getPartnersWithDocuments] Docs error:', docsError);
    }

    // Combine partners with their documents
    const partnersWithDocs: PartnerWithDocuments[] = partnersDb.map(partner => ({
      ...partner,
      documents: (docsDb || []).filter(d => d.partner_id === partner.id),
    }));

    return partnersWithDocs;
  } catch (err) {
    console.error('[getPartnersWithDocuments] Error:', err);
    return partnersData as unknown as PartnerWithDocuments[];
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
