import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { getPartnersWithDocuments } from '@/lib/supabase/queries';
import { PartnersClient } from './partners-client';

export default async function PartnersPage() {
  const [user, partners] = await Promise.all([
    getCurrentUser(),
    getPartnersWithDocuments(),
  ]);

  return <PartnersClient user={user || FALLBACK_USER} initialPartners={partners} />;
}
