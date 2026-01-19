import type { Metadata } from 'next';
import { SITE_CONFIG, COMPANY, STATS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Werken Bij',
  description: `Werk mee aan bijzondere bouwprojecten bij ${COMPANY.name}. Bekijk onze vacatures en word onderdeel van een team van ${STATS.employeesExact}+ vakmannen met ${STATS.yearsExperience} jaar ervaring.`,
  openGraph: {
    title: `Werken Bij | ${SITE_CONFIG.name}`,
    description: 'Ontdek onze vacatures: werfleider, metselaar, projectleider en meer. Bouw mee aan de mooiste projecten in België.',
    url: `${SITE_CONFIG.url}/werken-bij`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/werken-bij`,
  },
  keywords: [
    'vacatures',
    'jobs',
    'bouwsector',
    'werfleider',
    'metselaar',
    'projectleider',
    'dakwerker',
    'werken in de bouw',
  ],
};

export default function WerkenBijLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
