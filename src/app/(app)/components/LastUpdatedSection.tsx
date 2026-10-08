import { formatInTimeZone } from "date-fns-tz";
import { Locale } from "@/lib/i18n";
import { getTranslator } from "@/lib/getTranslator";

export default async function LastUpdatedSection({ updatedAt, locale }: { updatedAt: Date; locale: Locale }) {
    const t = await getTranslator(locale);
    const montrealTz = "America/Toronto";
    const formattedDate = formatInTimeZone(updatedAt, montrealTz, "yyyy-MM-dd");

    return (
        <div className="mt-6 flex justify-center text-cTextOffset">
            <p>
                {t("common.last_updated")} {formattedDate}
            </p>
        </div>
    );
}
