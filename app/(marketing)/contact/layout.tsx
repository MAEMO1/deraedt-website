import type { Metadata } from 'next';
import { SITE_CONFIG, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Neem contact op met ${COMPANY.name} in ${COMPANY.address.city}. Bel ${COMPANY.contact.phone} of mail naar ${COMPANY.contact.email} voor een vrijblijvende offerte of meer informatie.`,
  openGraph: {
    title: `Contact | ${SITE_CONFIG.name}`,
    description: 'Neem contact met ons op voor uw bouwproject. Wij staan klaar om uw vragen te beantwoorden.',
    url: `${SITE_CONFIG.url}/contact`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
