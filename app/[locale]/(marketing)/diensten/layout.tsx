import type { Metadata } from 'next';
import { SITE_CONFIG, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Diensten',
  description: `De diensten van ${COMPANY.name}: Nieuwbouw, renovatie, erfgoedrenovatie en facility management. Van fundament tot afwerking, met Klasse 6 erkenning voor overheidsopdrachten.`,
  openGraph: {
    title: `Onze Diensten | ${SITE_CONFIG.name}`,
    description: 'Nieuwbouw, renovatie, erfgoedrenovatie en facility management. Ontdek hoe wij uw bouwproject kunnen realiseren.',
    url: `${SITE_CONFIG.url}/diensten`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/diensten`,
  },
};

export default function DienstenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
