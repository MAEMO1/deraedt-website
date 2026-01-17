import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { getLeads } from '@/lib/supabase/queries';
import { LeadsClient } from './leads-client';

export default async function LeadsPage() {
  const [user, leads] = await Promise.all([
    getCurrentUser(),
    getLeads(),
  ]);

  return <LeadsClient user={user || FALLBACK_USER} leads={leads} />;
}
