import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { getFacilityTickets } from '@/lib/supabase/queries';
import { FacilityClient } from './facility-client';

export default async function FacilityPage() {
  const [user, tickets] = await Promise.all([
    getCurrentUser(),
    getFacilityTickets(),
  ]);

  return <FacilityClient user={user || FALLBACK_USER} initialTickets={tickets} />;
}
