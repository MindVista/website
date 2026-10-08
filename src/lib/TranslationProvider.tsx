"use client";

import { createContext, useContext, useEffect } from "react";
import { Locale } from "./i18n";

const TranslationContext = createContext<{ messages: Record<string, string>; locale: Locale }>({ messages: {}, locale: "en" });

export function TranslationProvider({ messages, locale, children }: { messages: Record<string, string>; locale: Locale; children: React.ReactNode }) {
    // the root layout has no access to the locale, so keep <html lang> in sync from here
    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    return <TranslationContext.Provider value={{ messages, locale }}>{children}</TranslationContext.Provider>;
}

export function useTranslations() {
    const { messages } = useContext(TranslationContext);

    function t(key: string): string {
        return messages[key] ?? key;
    }

    return t;
}

export function useLocale(): Locale {
    return useContext(TranslationContext).locale;
}
