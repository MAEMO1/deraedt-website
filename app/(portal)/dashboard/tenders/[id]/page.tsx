import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { getTenderById } from '@/lib/supabase/queries';
import { TenderDetailClient } from './client';

export default async function TenderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [user, tender] = await Promise.all([
    getCurrentUser(),
    getTenderById(id),
  ]);

  if (!tender) {
    redirect('/dashboard/tenders');
  }

  return <TenderDetailClient user={user || FALLBACK_USER} tender={tender} />;
}
