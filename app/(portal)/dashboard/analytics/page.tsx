import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { AnalyticsClient } from './analytics-client';

export default async function AnalyticsPage() {
  const user = await getCurrentUser();
  return <AnalyticsClient user={user || FALLBACK_USER} />;
}
