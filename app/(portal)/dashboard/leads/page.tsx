import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { getLeads, getProfiles } from '@/lib/supabase/queries';
import { LeadsClient } from './leads-client';

export default async function LeadsPage() {
  const [user, leads, profiles] = await Promise.all([
    getCurrentUser(),
    getLeads(),
    getProfiles(),
  ]);

  return <LeadsClient user={user || FALLBACK_USER} leads={leads} teamMembers={profiles} />;
}
