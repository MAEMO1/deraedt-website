import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { getCases } from '@/lib/supabase/queries';
import { CasesClient } from './cases-client';

export default async function CasesPage() {
  const [user, cases] = await Promise.all([
    getCurrentUser(),
    getCases(),
  ]);

  return <CasesClient user={user || FALLBACK_USER} cases={cases} />;
}
