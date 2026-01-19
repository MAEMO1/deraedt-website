import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SITE_CONFIG, COMPANY } from '@/lib/constants';
import { DocumentatieClient } from './client';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'procurement.documentatie' });

  return {
    title: t('title'),
    description: `${t('description')} ${COMPANY.name}.`,
    openGraph: {
      title: `${t('title')} | ${SITE_CONFIG.name}`,
      description: t('description'),
      url: `${SITE_CONFIG.url}/procurement/documentatie`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/procurement/documentatie`,
    },
  };
}

export default async function DocumentatiePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DocumentatieClient />;
}
