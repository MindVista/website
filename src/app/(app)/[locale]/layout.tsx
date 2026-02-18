import { getMessages } from "@/lib/getMessages";
import { getLocale } from "@/lib/i18n";
import { TranslationProvider } from "@/lib/TranslationProvider";

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params;
    const locale = getLocale(rawLocale);
    const messages = await getMessages(locale);

    return <TranslationProvider messages={messages}>{children}</TranslationProvider>;
}
