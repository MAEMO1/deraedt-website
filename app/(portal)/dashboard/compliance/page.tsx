import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ComplianceClient } from './compliance-client';

export default async function CompliancePage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    redirect('/login');
  }

  return <ComplianceClient user={profile} />;
}
