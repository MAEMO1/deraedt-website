import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { FacilityClient } from './facility-client';

export default async function FacilityPage() {
  const user = await getCurrentUser();
  return <FacilityClient user={user || FALLBACK_USER} />;
}
