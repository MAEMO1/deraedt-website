import type { Metadata } from 'next';
import { SITE_CONFIG, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Duurzaamheid & CO₂-Reductie',
  description: `${COMPANY.name} is CO₂-Prestatieladder niveau 3 gecertificeerd. Ontdek onze duurzaamheidsstrategie, CO₂-reductiedoelen en hoe wij bijdragen aan een groenere bouwsector.`,
  openGraph: {
    title: `Duurzaamheid & CO₂ | ${SITE_CONFIG.name}`,
    description: 'CO₂-Prestatieladder niveau 3 gecertificeerd. Onze bijdrage aan duurzaam en klimaatvriendelijk bouwen.',
    url: `${SITE_CONFIG.url}/duurzaamheid`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/duurzaamheid`,
  },
  keywords: [
    'duurzaam bouwen',
    'CO2-Prestatieladder',
    'klimaatneutraal',
    'ESG',
    'groene bouwsector',
    'milieubewust',
  ],
};

export default function DuurzaamheidLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
