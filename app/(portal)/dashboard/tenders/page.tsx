import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/auth';
import { TendersClient } from './tenders-client';

export default async function TendersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return <TendersClient user={user} />;
}
