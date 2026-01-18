import { notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/auth';
import { FALLBACK_USER } from '@/lib/supabase/fallback-user';
import { getLeadById, getLeadNotes, getProfiles } from '@/lib/supabase/queries';
import { LeadDetailClient } from './client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params;

  const [user, lead, notes, profiles] = await Promise.all([
    getCurrentUser(),
    getLeadById(id),
    getLeadNotes(id),
    getProfiles(),
  ]);

  if (!lead) {
    notFound();
  }

  return (
    <LeadDetailClient
      user={user || FALLBACK_USER}
      lead={lead}
      notes={notes}
      teamMembers={profiles}
    />
  );
}
