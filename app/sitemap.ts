import { MetadataRoute } from 'next';
import { SITE_CONFIG, FEATURED_PROJECTS } from '@/lib/constants';
import { locales, defaultLocale } from '@/i18n/config';

// Helper to generate URL with locale prefix
function getLocalizedUrl(path: string, locale: string): string {
  const baseUrl = SITE_CONFIG.url;
  // Default locale (nl) has no prefix
  if (locale === defaultLocale) {
    return `${baseUrl}${path}`;
  }
  return `${baseUrl}/${locale}${path}`;
}

// Generate alternates for a given path
function getAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    const hreflang = locale === 'nl' ? 'nl-BE' : locale;
    alternates[hreflang] = getLocalizedUrl(path, locale);
  }
  // x-default points to the default locale
  alternates['x-default'] = getLocalizedUrl(path, defaultLocale);
  return alternates;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages with their priorities and change frequencies
  const staticPages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/over-ons', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/diensten', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/diensten/bouwwerken', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/diensten/dakwerken', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/diensten/erfgoed', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/diensten/facility', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/projecten', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/procurement', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/procurement/documentatie', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/duurzaamheid', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/werken-bij', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
    { path: '/projectplanner', priority: 0.9, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // Generate entries for all locales
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const page of staticPages) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: getLocalizedUrl(page.path, locale),
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: getAlternates(page.path),
        },
      });
    }
  }

  // Project detail pages for each locale
  for (const project of FEATURED_PROJECTS) {
    const path = `/projecten/${project.slug}`;
    for (const locale of locales) {
      sitemapEntries.push({
        url: getLocalizedUrl(path, locale),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: getAlternates(path),
        },
      });
    }
  }

  return sitemapEntries;
}
