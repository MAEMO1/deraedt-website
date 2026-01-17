import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { RecruitmentClient } from './recruitment-client';

export default async function RecruitmentPage() {
  const user = await getCurrentUser();
  return <RecruitmentClient user={user || FALLBACK_USER} />;
}
