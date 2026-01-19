import type { Metadata } from 'next';
import { SITE_CONFIG, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Voor Overheden - Procurement Hub',
  description: `${COMPANY.name}: Klasse 6 erkend aannemer voor overheidsopdrachten. ISO 9001, VCA** en CO₂-Prestatieladder niveau 3 gecertificeerd. Download ons tender pack voor aanbestedingen.`,
  openGraph: {
    title: `Procurement Hub | ${SITE_CONFIG.name}`,
    description: 'Klasse 6 erkend aannemer met triple certificering. Download certificaten en referenties voor uw aanbesteding.',
    url: `${SITE_CONFIG.url}/procurement`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/procurement`,
  },
  keywords: [
    'overheidsopdrachten',
    'aanbesteding',
    'tender',
    'klasse 6',
    'erkend aannemer',
    'raamcontract',
    'publieke werken',
    'certificaten',
  ],
};

export default function ProcurementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
