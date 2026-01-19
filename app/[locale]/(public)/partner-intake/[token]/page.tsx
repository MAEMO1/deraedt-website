import { Metadata } from 'next';
import { PartnerIntakeClient } from './client';

export const metadata: Metadata = {
  title: 'Partner Document Upload | De Raedt',
  description: 'Upload uw prequalificatie documenten',
  robots: 'noindex, nofollow',
};

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function PartnerIntakePage({ params }: PageProps) {
  const { token } = await params;

  return <PartnerIntakeClient token={token} />;
}
