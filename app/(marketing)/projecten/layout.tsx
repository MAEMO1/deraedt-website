import type { Metadata } from 'next';
import { SITE_CONFIG, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Projecten',
  description: `Bekijk onze gerealiseerde projecten van ${COMPANY.name}. Van erfgoedrenovatie tot nieuwbouw, van Koning Boudewijnstadion tot historische stadhuizen.`,
  openGraph: {
    title: `Onze Projecten | ${SITE_CONFIG.name}`,
    description: 'Ontdek onze referentieprojecten: erfgoedrenovatie, nieuwbouw en infrastructuurwerken voor overheid en particulieren.',
    url: `${SITE_CONFIG.url}/projecten`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/projecten`,
  },
};

export default function ProjectenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
