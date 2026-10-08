import { formatInTimeZone } from "date-fns-tz";
import { fr } from "date-fns/locale";
import { Locale } from "@/lib/i18n";

interface EventDateProps {
    startDate: string | Date;
    endDate: string | Date;
    locale: Locale;
    className?: string;
    compact?: boolean;
}

export function EventDate({ startDate, endDate, locale, className = "", compact = false }: EventDateProps) {
    // convert dates to mtl timezone (America/Toronto)
    const montrealTz = "America/Toronto";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const isFr = locale === "fr";

    // check if dates are on the same day in Montreal timezone
    const isSameDay = formatInTimeZone(start, montrealTz, "yyyy-MM-dd") === formatInTimeZone(end, montrealTz, "yyyy-MM-dd");

    // format dates based on compact prop and locale (e.g. "Oct 4, 2026 | 3:00 PM" vs "4 oct. 2026 | 15 h 00")
    const dateFormat = isFr ? (compact ? "d MMM" : "d MMM yyyy") : compact ? "MMM d" : "MMM d, yyyy";
    const timeFormat = isFr ? "H 'h' mm" : "h:mm a";
    const format = (date: Date, pattern: string) => formatInTimeZone(date, montrealTz, pattern, isFr ? { locale: fr } : undefined);

    return (
        <p className={className}>
            {format(start, dateFormat)} | {format(start, timeFormat)}
            {" - "}
            {isSameDay ? format(end, timeFormat) : `${format(end, dateFormat)} | ${format(end, timeFormat)}`}
        </p>
    );
}
