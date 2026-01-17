import { getCurrentUser } from "@/lib/supabase/auth";
import { FALLBACK_USER } from "@/lib/supabase/fallback-user";
import { getDashboardData } from "@/lib/supabase/queries";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const [user, dashboardData] = await Promise.all([
    getCurrentUser(),
    getDashboardData(),
  ]);

  return (
    <DashboardClient
      user={user || FALLBACK_USER}
      tenders={dashboardData.tenders}
      leads={dashboardData.leads}
      complianceDocs={dashboardData.complianceDocs}
    />
  );
}
