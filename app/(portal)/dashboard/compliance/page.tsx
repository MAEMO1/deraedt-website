import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { getComplianceDocs } from '@/lib/supabase/queries';
import { ComplianceClient } from './compliance-client';

export default async function CompliancePage() {
  const [user, complianceDocs] = await Promise.all([
    getCurrentUser(),
    getComplianceDocs(),
  ]);

  return <ComplianceClient user={user || FALLBACK_USER} complianceDocs={complianceDocs} />;
}
