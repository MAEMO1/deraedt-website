import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { LeadsClient } from './leads-client';

export default async function LeadsPage() {
  const user = await getCurrentUser();
  return <LeadsClient user={user || FALLBACK_USER} />;
}
