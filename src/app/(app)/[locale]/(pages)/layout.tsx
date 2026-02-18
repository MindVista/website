// CHANGES MADE TO THIS COMPONENT MUST BE MIRRORED IN src/app/not-found.tsx.
// See CONTRIBUTING.md#note-about-not-foundtsx

import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { getLocale } from "../../../../lib/i18n";

export default async function PageLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params;
    const locale = getLocale(rawLocale);
    return (
        <>
            <NavBar locale={locale} />
            <LanguageSwitcher currentLocale={locale} />
            <main className="pt-[10vh]">{children}</main>
            <Footer />
        </>
    );
}
