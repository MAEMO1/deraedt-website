import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AnalyticsClient } from './analytics-client';

export default async function AnalyticsPage() {
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

  return <AnalyticsClient user={profile} />;
}
