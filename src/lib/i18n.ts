export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export function getLocale(locale: string): Locale {
    return locale === "fr" ? "fr" : "en";
}

export function isLocale(locale: string): locale is Locale {
    return locales.includes(locale as Locale);
}

// picks the French value of a CMS field when on the French site, falling back to English if it hasn't been translated yet
export function localize<T>(locale: Locale, en: T, fr: T | null | undefined): T {
    return locale === "fr" && fr ? fr : en;
}
