export const locales = ['nl', 'fr', 'en'] as const;
export const defaultLocale = 'nl' as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  nl: 'Nederlands',
  fr: 'Français',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  nl: '🇧🇪',
  fr: '🇫🇷',
  en: '🇬🇧',
};

// Map locale to HTML lang attribute
export const localeToHtmlLang: Record<Locale, string> = {
  nl: 'nl-BE',
  fr: 'fr-BE',
  en: 'en',
};
