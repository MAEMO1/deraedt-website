import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { getFacilityTickets, getProfiles } from '@/lib/supabase/queries';
import { FacilityClient } from './facility-client';

export default async function FacilityPage() {
  const [user, tickets, profiles] = await Promise.all([
    getCurrentUser(),
    getFacilityTickets(),
    getProfiles(),
  ]);

  return <FacilityClient user={user || FALLBACK_USER} initialTickets={tickets} teamMembers={profiles} />;
}
