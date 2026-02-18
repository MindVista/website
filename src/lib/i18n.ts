export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export function getLocale(locale: string): Locale {
    return locale === "fr" ? "fr" : "en";
}

export function isLocale(locale: string): locale is Locale {
    return locales.includes(locale as Locale);
}
