import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { getJobs, getJobApplications } from '@/lib/supabase/queries';
import { RecruitmentClient } from './recruitment-client';

export default async function RecruitmentPage() {
  const [user, jobs, applications] = await Promise.all([
    getCurrentUser(),
    getJobs(),
    getJobApplications(),
  ]);

  return (
    <RecruitmentClient
      user={user || FALLBACK_USER}
      jobs={jobs}
      applications={applications}
    />
  );
}
