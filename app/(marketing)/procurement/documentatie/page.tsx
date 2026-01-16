import type { Metadata } from 'next';
import { SITE_CONFIG, COMPANY } from '@/lib/constants';
import { DocumentatieClient } from './client';

export const metadata: Metadata = {
  title: 'Tender Pack Aanvragen',
  description: `Vraag het ${COMPANY.name} tender pack aan met alle certificaten en referenties voor uw aanbesteding, preselectie of raamcontract.`,
  openGraph: {
    title: `Tender Pack Aanvragen | ${SITE_CONFIG.name}`,
    description: 'Download onze certificaten en referenties voor aanbestedingen. ISO 9001, VCA**, CO₂-Prestatieladder en meer.',
    url: `${SITE_CONFIG.url}/procurement/documentatie`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/procurement/documentatie`,
  },
};

export default function DocumentatiePage() {
  return <DocumentatieClient />;
}
