"use client";

import { createContext, useContext } from "react";

const TranslationContext = createContext<Record<string, string>>({});

export function TranslationProvider({ messages, children }: { messages: Record<string, string>; children: React.ReactNode }) {
    return <TranslationContext.Provider value={messages}>{children}</TranslationContext.Provider>;
}

export function useTranslations() {
    const messages = useContext(TranslationContext);

    function t(key: string): string {
        return messages[key] ?? key;
    }

    return t;
}
