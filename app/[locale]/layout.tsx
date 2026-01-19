import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from '@/i18n/config';
import { SITE_CONFIG } from '@/lib/constants';
import { LangSetter } from '@/components/shared/lang-setter';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Map locale to HTML lang attribute
const localeToHtmlLang: Record<Locale, string> = {
  nl: 'nl-BE',
  fr: 'fr',
  en: 'en',
};

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Generate metadata with alternates (hreflang)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = SITE_CONFIG.url;

  // Generate alternates for hreflang
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    const hreflang = loc === 'nl' ? 'nl-BE' : loc;
    // For default locale, no prefix; for others, add prefix
    languages[hreflang] = loc === defaultLocale ? baseUrl : `${baseUrl}/${loc}`;
  }
  languages['x-default'] = baseUrl;

  return {
    alternates: {
      canonical: locale === defaultLocale ? baseUrl : `${baseUrl}/${locale}`,
      languages,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  // Get the HTML lang attribute
  const htmlLang = localeToHtmlLang[locale as Locale] || 'nl-BE';

  return (
    <NextIntlClientProvider messages={messages}>
      <LangSetter lang={htmlLang} />
      {children}
    </NextIntlClientProvider>
  );
}
