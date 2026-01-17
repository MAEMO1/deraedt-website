import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { getAnalyticsData } from '@/lib/supabase/queries';
import { AnalyticsClient } from './analytics-client';

export default async function AnalyticsPage() {
  const [user, analyticsData] = await Promise.all([
    getCurrentUser(),
    getAnalyticsData(),
  ]);

  return (
    <AnalyticsClient
      user={user || FALLBACK_USER}
      tenders={analyticsData.tenders}
      leads={analyticsData.leads}
      jobs={analyticsData.jobs}
      applications={analyticsData.applications}
    />
  );
}
