export interface Database {
  public: {
    Tables: {
      company_profiles: {
        Row: {
          id: string;
          name: string | null;
          rccm: string | null;
          email: string | null;
          phone: string | null;
          logo_url: string | null;
          payment_method: string | null;
          address: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          name?: string | null;
          rccm?: string | null;
          email?: string | null;
          phone?: string | null;
          logo_url?: string | null;
          payment_method?: string | null;
          address?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          rccm?: string | null;
          email?: string | null;
          phone?: string | null;
          logo_url?: string | null;
          payment_method?: string | null;
          address?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
  };
}