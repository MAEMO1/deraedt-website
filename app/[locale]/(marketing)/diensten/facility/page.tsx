import type { Metadata } from 'next';
import { SITE_CONFIG, COMPANY } from '@/lib/constants';
import { FacilityClient } from './client';

export const metadata: Metadata = {
  title: 'Facility Management',
  description: `${COMPANY.name}: Facility management, raamcontracten en onderhoudswerken. Preventief onderhoud, snelle interventies en structurele aanpassingen voor overheden en bedrijven.`,
  openGraph: {
    title: `Facility Management | ${SITE_CONFIG.name}`,
    description: 'Raamcontracten, preventief onderhoud en interventies. Uw partner voor gebouwbeheer en technisch onderhoud.',
    url: `${SITE_CONFIG.url}/diensten/facility`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/diensten/facility`,
  },
};

export default function FacilityPage() {
  return <FacilityClient />;
}
