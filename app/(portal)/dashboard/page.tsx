import { getCurrentUser } from "@/lib/supabase/auth";
import { FALLBACK_USER } from "@/lib/supabase/fallback-user";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return <DashboardClient user={user || FALLBACK_USER} />;
}
