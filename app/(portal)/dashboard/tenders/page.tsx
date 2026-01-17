import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { getTenders } from '@/lib/supabase/queries';
import { TendersClient } from './tenders-client';

export default async function TendersPage() {
  const [user, tenders] = await Promise.all([
    getCurrentUser(),
    getTenders(),
  ]);

  return <TendersClient user={user || FALLBACK_USER} tenders={tenders} />;
}
