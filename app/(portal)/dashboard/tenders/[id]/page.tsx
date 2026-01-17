import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { TenderDetailClient } from './client';

// Import seed data for demo
import tendersData from '@/scripts/seed/tenders.json';

interface Tender {
  id: string;
  source: string;
  external_id?: string;
  external_url?: string;
  title: string;
  buyer: string;
  buyer_location?: string;
  cpv_codes?: string[];
  estimated_value?: number;
  deadline_at: string;
  publication_date?: string;
  status: string;
  match_score?: number;
  tags?: string[];
  description?: string;
}

const tenders: Tender[] = tendersData as Tender[];

export default async function TenderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  // Find tender by id
  const tender = tenders.find((t) => t.id === id);

  if (!tender) {
    redirect('/dashboard/tenders');
  }

  return <TenderDetailClient user={user || FALLBACK_USER} tender={tender} />;
}
