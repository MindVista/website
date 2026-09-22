import { getLocale, Locale } from "./i18n";

export async function getMessages(locale: Locale) {
    // normalize in case an undefined/unsupported locale slips through (falls back to "en")
    return (await import(`../../messages/${getLocale(locale)}.json`)).default;
}
