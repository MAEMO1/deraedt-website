import type { Metadata } from 'next';
import { SITE_CONFIG, COMPANY, STATS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Over Ons',
  description: `Ontdek de geschiedenis van ${COMPANY.name}: Al ${STATS.yearsExperience} jaar een familiebedrijf gespecialiseerd in nieuwbouw, renovatie en erfgoedrenovatie. Klasse 6 erkend aannemer met ${STATS.employeesExact}+ vakmannen.`,
  openGraph: {
    title: `Over Ons | ${SITE_CONFIG.name}`,
    description: `Al ${STATS.yearsExperience} jaar uw betrouwbare partner in de bouw. Ontdek onze geschiedenis, waarden en het team achter De Raedt.`,
    url: `${SITE_CONFIG.url}/over-ons`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/over-ons`,
  },
};

export default function OverOnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
