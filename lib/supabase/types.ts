export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          email: string;
          company_name: string;
          contact_person: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          company_name: string;
          contact_person?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          company_name?: string;
          contact_person?: string | null;
          created_at?: string;
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
          id?: string;
          client_id: string;
          name: string;
          status?: "planning" | "actief" | "afgerond";
          progress?: number;
          start_date?: string | null;
          expected_end_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          name?: string;
          status?: "planning" | "actief" | "afgerond";
          progress?: number;
          start_date?: string | null;
          expected_end_date?: string | null;
          created_at?: string;
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
          id?: string;
          project_id: string;
          name: string;
          category: "attest" | "factuur" | "vorderingsstaat" | "plan" | "overig";
          file_path: string;
          uploaded_at?: string;
          downloaded_at?: string | null;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          category?: "attest" | "factuur" | "vorderingsstaat" | "plan" | "overig";
          file_path?: string;
          uploaded_at?: string;
          downloaded_at?: string | null;
        };
      };
    };
  };
}
