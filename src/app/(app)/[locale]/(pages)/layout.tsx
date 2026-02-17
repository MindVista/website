// CHANGES MADE TO THIS COMPONENT MUST BE MIRRORED IN src/app/not-found.tsx.
// See CONTRIBUTING.md#note-about-not-foundtsx

import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const locales = ["en", "fr"] as const;
type Locale = (typeof locales)[number];

function getLocale(locale: string): Locale {
    return locale === "fr" ? "fr" : "en";
}

export default async function PageLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params;
    const locale = getLocale(rawLocale);

    return (
        <>
            <NavBar />
            <LanguageSwitcher currentLocale={locale} />
            <main className="pt-[10vh]">{children}</main>
            <Footer />
        </>
    );
}
