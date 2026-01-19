import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SITE_CONFIG, COMPANY } from '@/lib/constants';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'procurement' });

  return {
    title: t('title'),
    description: `${COMPANY.name}: ${t('subtitle')}. ${t('description')}`,
    openGraph: {
      title: `${t('title')} | ${SITE_CONFIG.name}`,
      description: t('description'),
      url: `${SITE_CONFIG.url}/procurement`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/procurement`,
    },
  };
}

export default async function ProcurementLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return children;
}
