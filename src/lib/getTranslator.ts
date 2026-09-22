import { getMessages } from "./getMessages";
import { Locale } from "./i18n";

type Messages = typeof import("../../messages/en.json");

export type Translator = Awaited<ReturnType<typeof getTranslator>>;

export async function getTranslator(locale: Locale) {
    const messages: Messages = await getMessages(locale);

    return function t(key: keyof Messages): string {
        return messages[key] ?? key;
    };
}
