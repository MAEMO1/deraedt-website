import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { TendersClient } from './tenders-client';

export default async function TendersPage() {
  const user = await getCurrentUser();
  return <TendersClient user={user || FALLBACK_USER} />;
}
