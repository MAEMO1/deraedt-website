import type { Metadata } from 'next';
import { SITE_CONFIG, COMPANY, STATS } from '@/lib/constants';
import { BouwRenovatieClient } from './client';

export const metadata: Metadata = {
  title: 'Bouw & Renovatie',
  description: `${COMPANY.name}: nieuwbouw, renovatie en erfgoedrenovatie. Klasse 6 erkend aannemer met ${STATS.yearsExperience} jaar ervaring. Van fundament tot sleutel-op-de-deur projecten.`,
  openGraph: {
    title: `Bouw & Renovatie | ${SITE_CONFIG.name}`,
    description: 'Nieuwbouw, renovatie en erfgoedrenovatie door een Klasse 6 erkend aannemer met specialisatie in monumentenzorg.',
    url: `${SITE_CONFIG.url}/diensten/bouw-renovatie`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/diensten/bouw-renovatie`,
  },
};

export default function BouwRenovatiePage() {
  return <BouwRenovatieClient />;
}
