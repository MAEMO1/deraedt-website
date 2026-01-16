import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { FacilityClient } from './facility-client';

export default async function FacilityPage() {
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

  return <FacilityClient user={profile} />;
}
