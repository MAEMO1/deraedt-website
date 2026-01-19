import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PartnerIntakeClient } from './client';

interface PageProps {
  params: Promise<{ token: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'partnerIntake' });

  return {
    title: `${t('header.title')} | De Raedt`,
    description: t('header.subtitle'),
    robots: 'noindex, nofollow',
  };
}

export default async function PartnerIntakePage({ params }: PageProps) {
  const { token, locale } = await params;
  setRequestLocale(locale);

  return <PartnerIntakeClient token={token} />;
}
