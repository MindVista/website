import { Metadata } from "next";
import { getMessages } from "@/lib/getMessages";
import { getLocale } from "@/lib/i18n";
import { getTranslator } from "@/lib/getTranslator";
import { TranslationProvider } from "@/lib/TranslationProvider";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const t = await getTranslator(getLocale((await params).locale));

    return {
        title: {
            template: "%s – MindVista",
            default: t("meta.default_title"),
        },
        description: t("meta.description"),
    };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params;
    const locale = getLocale(rawLocale);
    const messages = await getMessages(locale);

    return (
        <TranslationProvider messages={messages} locale={locale}>
            {children}
        </TranslationProvider>
    );
}
