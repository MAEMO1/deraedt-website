import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/auth';
import { LeadsClient } from './leads-client';

export default async function LeadsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return <LeadsClient user={user} />;
}
