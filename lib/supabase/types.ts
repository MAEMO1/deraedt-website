export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Enum types
export type UserRole = 'DIRECTIE' | 'SALES' | 'HR' | 'OPERATIONS' | 'ADMIN' | 'VIEWER';
export type LeadType = 'project' | 'facility' | 'partner' | 'procurement' | 'contact';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
export type TenderSource = 'ted' | 'e-procurement' | 'manual';
export type TenderStatus = 'new' | 'analyzing' | 'go' | 'no_go' | 'in_preparation' | 'submitted' | 'won' | 'lost';
export type JobStatus = 'draft' | 'published' | 'closed';
export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'internship';
export type ApplicationStatus = 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
export type ClientType = 'public' | 'private' | 'education' | 'healthcare' | 'industrial';
export type ComplianceDocType = 'iso' | 'vca' | 'co2' | 'insurance' | 'erkenning' | 'policy' | 'other';
export type TicketUrgency = 'low' | 'medium' | 'high' | 'critical';
export type TicketStatus = 'open' | 'in_progress' | 'waiting' | 'resolved';
export type PartnerStatus = 'pending' | 'approved' | 'blocked';
export type PartnerDocType = 'vca' | 'insurance' | 'reference' | 'kvk' | 'other';
export type PartnerDocStatus = 'missing' | 'pending' | 'approved' | 'expired';

export interface Database {
  public: {
    Tables: {
      // User profiles (extends auth.users)
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: UserRole;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
        };
      };

      // Leads from intake forms
      leads: {
        Row: {
          id: string;
          lead_type: LeadType;
          status: LeadStatus;
          organisation: string | null;
          contact_name: string;
          contact_email: string;
          contact_phone: string | null;
          location: string | null;
          budget_band: string | null;
          timing: string | null;
          message: string | null;
          owner_id: string | null;
          next_action_date: string | null;
          source: string;
          attachments: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          lead_type: LeadType;
          contact_name: string;
          contact_email: string;
          status?: LeadStatus;
          organisation?: string | null;
          contact_phone?: string | null;
          location?: string | null;
          budget_band?: string | null;
          timing?: string | null;
          message?: string | null;
          owner_id?: string | null;
          next_action_date?: string | null;
          source?: string;
          attachments?: Json;
        };
        Update: {
          lead_type?: LeadType;
          status?: LeadStatus;
          organisation?: string | null;
          contact_name?: string;
          contact_email?: string;
          contact_phone?: string | null;
          location?: string | null;
          budget_band?: string | null;
          timing?: string | null;
          message?: string | null;
          owner_id?: string | null;
          next_action_date?: string | null;
          source?: string;
          attachments?: Json;
        };
      };

      // Lead notes
      lead_notes: {
        Row: {
          id: string;
          lead_id: string;
          author_id: string | null;
          content: string;
          created_at: string;
        };
        Insert: {
          lead_id: string;
          content: string;
          author_id?: string | null;
        };
        Update: {
          content?: string;
        };
      };

      // Tender opportunities
      tenders: {
        Row: {
          id: string;
          source: TenderSource;
          external_id: string | null;
          external_url: string | null;
          title: string;
          buyer: string;
          buyer_location: string | null;
          cpv_codes: string[];
          estimated_value: number | null;
          currency: string;
          publication_date: string | null;
          deadline_at: string | null;
          status: TenderStatus;
          match_score: number | null;
          decision_date: string | null;
          decision_reason: string | null;
          decision_by: string | null;
          go_no_go_checklist: Json;
          owner_id: string | null;
          attachments: Json;
          tags: string[];
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          buyer: string;
          source?: TenderSource;
          external_id?: string | null;
          external_url?: string | null;
          buyer_location?: string | null;
          cpv_codes?: string[];
          estimated_value?: number | null;
          currency?: string;
          publication_date?: string | null;
          deadline_at?: string | null;
          status?: TenderStatus;
          match_score?: number | null;
          decision_date?: string | null;
          decision_reason?: string | null;
          decision_by?: string | null;
          go_no_go_checklist?: Json;
          owner_id?: string | null;
          attachments?: Json;
          tags?: string[];
          notes?: string | null;
        };
        Update: {
          source?: TenderSource;
          external_id?: string | null;
          external_url?: string | null;
          title?: string;
          buyer?: string;
          buyer_location?: string | null;
          cpv_codes?: string[];
          estimated_value?: number | null;
          currency?: string;
          publication_date?: string | null;
          deadline_at?: string | null;
          status?: TenderStatus;
          match_score?: number | null;
          decision_date?: string | null;
          decision_reason?: string | null;
          decision_by?: string | null;
          go_no_go_checklist?: Json;
          owner_id?: string | null;
          attachments?: Json;
          tags?: string[];
          notes?: string | null;
        };
      };

      // Job postings
      jobs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          department: string;
          employment_type: EmploymentType;
          location: string;
          description: string;
          requirements: string[];
          benefits: string[];
          salary_min: number | null;
          salary_max: number | null;
          salary_currency: string;
          status: JobStatus;
          published_at: string | null;
          expires_at: string | null;
          vdab_sync_status: string;
          vdab_external_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          department: string;
          location: string;
          description: string;
          employment_type?: EmploymentType;
          requirements?: string[];
          benefits?: string[];
          salary_min?: number | null;
          salary_max?: number | null;
          salary_currency?: string;
          status?: JobStatus;
          published_at?: string | null;
          expires_at?: string | null;
        };
        Update: {
          title?: string;
          slug?: string;
          department?: string;
          employment_type?: EmploymentType;
          location?: string;
          description?: string;
          requirements?: string[];
          benefits?: string[];
          salary_min?: number | null;
          salary_max?: number | null;
          salary_currency?: string;
          status?: JobStatus;
          published_at?: string | null;
          expires_at?: string | null;
          vdab_sync_status?: string;
          vdab_external_id?: string | null;
        };
      };

      // Job applications
      job_applications: {
        Row: {
          id: string;
          job_id: string;
          full_name: string;
          email: string;
          phone: string | null;
          cv_url: string | null;
          cover_letter: string | null;
          status: ApplicationStatus;
          reviewer_id: string | null;
          notes: string | null;
          tags: string[];
          gdpr_consent: boolean;
          retention_until: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          job_id: string;
          full_name: string;
          email: string;
          gdpr_consent: boolean;
          phone?: string | null;
          cv_url?: string | null;
          cover_letter?: string | null;
          status?: ApplicationStatus;
          tags?: string[];
          retention_until?: string | null;
        };
        Update: {
          status?: ApplicationStatus;
          reviewer_id?: string | null;
          notes?: string | null;
          tags?: string[];
          retention_until?: string | null;
        };
      };

      // Case studies / referenties
      cases: {
        Row: {
          id: string;
          title: string;
          slug: string;
          client_name: string;
          client_type: ClientType | null;
          location: string;
          year: number;
          scope: string;
          services: string[];
          summary: string;
          description: string | null;
          challenge: string | null;
          solution: string | null;
          results: string | null;
          kpis: Json;
          featured_image: string | null;
          images: string[];
          is_published: boolean;
          is_featured: boolean;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          client_name: string;
          location: string;
          year: number;
          scope: string;
          summary: string;
          client_type?: ClientType | null;
          services?: string[];
          description?: string | null;
          challenge?: string | null;
          solution?: string | null;
          results?: string | null;
          kpis?: Json;
          featured_image?: string | null;
          images?: string[];
          is_published?: boolean;
          is_featured?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
        };
        Update: {
          title?: string;
          slug?: string;
          client_name?: string;
          client_type?: ClientType | null;
          location?: string;
          year?: number;
          scope?: string;
          services?: string[];
          summary?: string;
          description?: string | null;
          challenge?: string | null;
          solution?: string | null;
          results?: string | null;
          kpis?: Json;
          featured_image?: string | null;
          images?: string[];
          is_published?: boolean;
          is_featured?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
        };
      };

      // Compliance documents (certificates, policies)
      compliance_docs: {
        Row: {
          id: string;
          doc_type: ComplianceDocType;
          name: string;
          issuer: string | null;
          reference_number: string | null;
          scope: string | null;
          valid_from: string;
          valid_to: string;
          file_url: string | null;
          is_public: boolean;
          include_in_tender_pack: boolean;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          doc_type: ComplianceDocType;
          name: string;
          valid_from: string;
          valid_to: string;
          issuer?: string | null;
          reference_number?: string | null;
          scope?: string | null;
          file_url?: string | null;
          is_public?: boolean;
          include_in_tender_pack?: boolean;
          notes?: string | null;
        };
        Update: {
          doc_type?: ComplianceDocType;
          name?: string;
          issuer?: string | null;
          reference_number?: string | null;
          scope?: string | null;
          valid_from?: string;
          valid_to?: string;
          file_url?: string | null;
          is_public?: boolean;
          include_in_tender_pack?: boolean;
          notes?: string | null;
        };
      };

      // Partners for prequalification
      partners: {
        Row: {
          id: string;
          company_name: string;
          contact_name: string;
          contact_email: string;
          contact_phone: string | null;
          address: string | null;
          specialty: string;
          status: PartnerStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          company_name: string;
          contact_name: string;
          contact_email: string;
          specialty: string;
          contact_phone?: string | null;
          address?: string | null;
          status?: PartnerStatus;
          notes?: string | null;
        };
        Update: {
          company_name?: string;
          contact_name?: string;
          contact_email?: string;
          contact_phone?: string | null;
          address?: string | null;
          specialty?: string;
          status?: PartnerStatus;
          notes?: string | null;
        };
      };

      // Partner documents for compliance tracking
      partner_documents: {
        Row: {
          id: string;
          partner_id: string;
          doc_type: PartnerDocType;
          name: string;
          file_url: string | null;
          valid_from: string | null;
          valid_to: string | null;
          status: PartnerDocStatus;
          uploaded_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          partner_id: string;
          doc_type: PartnerDocType;
          name: string;
          file_url?: string | null;
          valid_from?: string | null;
          valid_to?: string | null;
          status?: PartnerDocStatus;
          uploaded_at?: string | null;
        };
        Update: {
          partner_id?: string;
          doc_type?: PartnerDocType;
          name?: string;
          file_url?: string | null;
          valid_from?: string | null;
          valid_to?: string | null;
          status?: PartnerDocStatus;
          uploaded_at?: string | null;
        };
      };

      // Facility tickets for intervention tracking
      facility_tickets: {
        Row: {
          id: string;
          reference: string;
          title: string;
          description: string;
          location: string;
          urgency: TicketUrgency;
          status: TicketStatus;
          sla_due_at: string;
          assigned_to: string | null;
          reporter_name: string;
          reporter_email: string;
          reporter_phone: string | null;
          photos: string[];
          notes: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description: string;
          location: string;
          sla_due_at: string;
          reporter_name: string;
          reporter_email: string;
          reference?: string;
          urgency?: TicketUrgency;
          status?: TicketStatus;
          assigned_to?: string | null;
          reporter_phone?: string | null;
          photos?: string[];
          notes?: string[];
        };
        Update: {
          reference?: string;
          title?: string;
          description?: string;
          location?: string;
          urgency?: TicketUrgency;
          status?: TicketStatus;
          sla_due_at?: string;
          assigned_to?: string | null;
          reporter_name?: string;
          reporter_email?: string;
          reporter_phone?: string | null;
          photos?: string[];
          notes?: string[];
        };
      };

      // Audit logs for tracking events
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          user_email: string | null;
          user_role: string | null;
          action: 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED' | 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'DOWNLOAD' | 'EXPORT' | 'STATUS_CHANGE' | 'ASSIGNMENT';
          entity_type: string | null;
          entity_id: string | null;
          entity_name: string | null;
          metadata: Json;
          changes: Json | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          user_id?: string | null;
          user_email?: string | null;
          user_role?: string | null;
          action: 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED' | 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'DOWNLOAD' | 'EXPORT' | 'STATUS_CHANGE' | 'ASSIGNMENT';
          entity_type?: string | null;
          entity_id?: string | null;
          entity_name?: string | null;
          metadata?: Json;
          changes?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
        };
        Update: {
          user_id?: string | null;
          user_email?: string | null;
          user_role?: string | null;
          action?: 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED' | 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'DOWNLOAD' | 'EXPORT' | 'STATUS_CHANGE' | 'ASSIGNMENT';
          entity_type?: string | null;
          entity_id?: string | null;
          entity_name?: string | null;
          metadata?: Json;
          changes?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
        };
      };

      // Media assets for uploaded files
      media_assets: {
        Row: {
          id: string;
          filename: string;
          original_filename: string;
          mime_type: string;
          size_bytes: number;
          storage_bucket: string;
          storage_path: string;
          public_url: string | null;
          width: number | null;
          height: number | null;
          alt_text: string | null;
          caption: string | null;
          metadata: Json;
          uploaded_by: string | null;
          entity_type: string | null;
          entity_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          filename: string;
          original_filename: string;
          mime_type: string;
          size_bytes: number;
          storage_path: string;
          storage_bucket?: string;
          public_url?: string | null;
          width?: number | null;
          height?: number | null;
          alt_text?: string | null;
          caption?: string | null;
          metadata?: Json;
          uploaded_by?: string | null;
          entity_type?: string | null;
          entity_id?: string | null;
        };
        Update: {
          filename?: string;
          original_filename?: string;
          mime_type?: string;
          size_bytes?: number;
          storage_bucket?: string;
          storage_path?: string;
          public_url?: string | null;
          width?: number | null;
          height?: number | null;
          alt_text?: string | null;
          caption?: string | null;
          metadata?: Json;
          uploaded_by?: string | null;
          entity_type?: string | null;
          entity_id?: string | null;
        };
      };

      // Legacy tables (from original schema)
      clients: {
        Row: {
          id: string;
          email: string;
          company_name: string;
          contact_person: string | null;
          created_at: string;
        };
        Insert: {
          email: string;
          company_name: string;
          contact_person?: string | null;
        };
        Update: {
          email?: string;
          company_name?: string;
          contact_person?: string | null;
        };
      };
      portal_projects: {
        Row: {
          id: string;
          client_id: string;
          name: string;
          status: "planning" | "actief" | "afgerond";
          progress: number;
          start_date: string | null;
          expected_end_date: string | null;
          created_at: string;
        };
        Insert: {
          client_id: string;
          name: string;
          status?: "planning" | "actief" | "afgerond";
          progress?: number;
          start_date?: string | null;
          expected_end_date?: string | null;
        };
        Update: {
          client_id?: string;
          name?: string;
          status?: "planning" | "actief" | "afgerond";
          progress?: number;
          start_date?: string | null;
          expected_end_date?: string | null;
        };
      };
      documents: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          category: "attest" | "factuur" | "vorderingsstaat" | "plan" | "overig";
          file_path: string;
          uploaded_at: string;
          downloaded_at: string | null;
        };
        Insert: {
          project_id: string;
          name: string;
          category: "attest" | "factuur" | "vorderingsstaat" | "plan" | "overig";
          file_path: string;
          downloaded_at?: string | null;
        };
        Update: {
          project_id?: string;
          name?: string;
          category?: "attest" | "factuur" | "vorderingsstaat" | "plan" | "overig";
          file_path?: string;
          downloaded_at?: string | null;
        };
      };
    };
    Views: {
      compliance_expiry_radar: {
        Row: {
          id: string;
          doc_type: ComplianceDocType;
          name: string;
          valid_to: string;
          expiry_status: 'critical' | 'warning' | 'upcoming' | 'ok';
          days_until_expiry: number;
        };
      };
    };
  };
}

// Helper types for easier usage
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Lead = Database['public']['Tables']['leads']['Row'];
export type LeadNote = Database['public']['Tables']['lead_notes']['Row'];
export type Tender = Database['public']['Tables']['tenders']['Row'];
export type Job = Database['public']['Tables']['jobs']['Row'];
export type JobApplication = Database['public']['Tables']['job_applications']['Row'];
export type Case = Database['public']['Tables']['cases']['Row'];
export type ComplianceDoc = Database['public']['Tables']['compliance_docs']['Row'];
export type MediaAsset = Database['public']['Tables']['media_assets']['Row'];
export type FacilityTicket = Database['public']['Tables']['facility_tickets']['Row'];
export type Partner = Database['public']['Tables']['partners']['Row'];
export type PartnerDocument = Database['public']['Tables']['partner_documents']['Row'];
