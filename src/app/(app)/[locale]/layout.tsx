const locales = ["en", "fr"] as const;
type Locale = (typeof locales)[number];

function getLocale(locale: string): Locale {
    return locale === "fr" ? "fr" : "en";
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params;
    const locale = getLocale(rawLocale);

    return children;
}
