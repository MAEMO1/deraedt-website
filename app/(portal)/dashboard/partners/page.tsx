import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { PartnersClient } from './partners-client';

export default async function PartnersPage() {
  const user = await getCurrentUser();
  return <PartnersClient user={user || FALLBACK_USER} />;
}
