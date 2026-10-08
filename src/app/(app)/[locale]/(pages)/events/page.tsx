import { getLocalizedPageMetadata } from "@/lib/getPageFromCMS";
import { getLocale } from "@/lib/i18n";
import { getTranslator } from "@/lib/getTranslator";
import { Metadata } from "next";
import { EventsProvider } from "./EventsProvider";
import { EventsContent } from "./components/EventsContent";
import Hr from "../../../components/Hr";

type PageProps = {
    params: Promise<{ locale: string }>;
};

export default async function EventsPage({ params }: PageProps) {
    const t = await getTranslator(getLocale((await params).locale));

    return (
        <EventsProvider>
            <div className="mx-auto mb-14 max-w-7xl px-4 py-8 sm:px-12 md:px-16 lg:px-20">
                <header className="mb-12 mt-8 text-center">
                    <h1 className="mb-2 text-4xl font-bold text-cText">{t("events.title")}</h1>
                    <p className="px-8 text-xl tracking-tight text-cTextOffset md:px-12 lg:px-28 xl:px-40">{t("events.intro")}</p>
                </header>

                <Hr className="mx-auto mb-12 max-w-[60vw]" />

                <EventsContent />
            </div>
        </EventsProvider>
    );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return getLocalizedPageMetadata("events", params);
}
