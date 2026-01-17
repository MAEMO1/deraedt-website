import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { ComplianceClient } from './compliance-client';

export default async function CompliancePage() {
  const user = await getCurrentUser();
  return <ComplianceClient user={user || FALLBACK_USER} />;
}
