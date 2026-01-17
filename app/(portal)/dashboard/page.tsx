import { getCurrentUser } from "@/lib/supabase/auth";
import { DashboardClient } from "./dashboard-client";
import type { Profile } from "@/lib/supabase/types";

// Fallback user when profile doesn't exist yet
const FALLBACK_USER: Profile = {
  id: "fallback",
  email: "admin@deraedt.be",
  full_name: "Admin User",
  role: "DIRECTIE",
  avatar_url: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  // Use fallback if profile fetch fails (middleware already validated auth)
  // This prevents redirect loops when auth exists but profile doesn't
  return <DashboardClient user={user || FALLBACK_USER} />;
}
