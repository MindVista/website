import { RefreshRouteOnSave } from "@/app/(app)/components/RefreshRouteOnSave";
import { Fragment } from "react";
import { getLocalizedPageMetadata } from "@/lib/getPageFromCMS";
import { getPayloadClient } from "@/payloadClient";
import { Metadata } from "next";
import Hr from "../../../components/Hr";
import { VolunteerCard } from "./components/VolunteerCard";
import { getLocale, localize } from "@/lib/i18n";
import { getTranslator } from "@/lib/getTranslator";

export default async function VolunteerPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = getLocale((await params).locale);
    const t = await getTranslator(locale);

    // fetch page content
    const content = await (await getPayloadClient()).findGlobal({ slug: "volunteer" });

    return (
        <Fragment>
            <RefreshRouteOnSave />
            <div className="mx-auto mb-14 max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12">
                <header className="mb-10 mt-6 text-center sm:mb-12 sm:mt-8">
                    <h1 className="mb-3 text-3xl font-bold text-cText sm:text-4xl md:text-5xl">{localize(locale, content.title, content.titleFr)}</h1>
                    <p className="mx-auto max-w-3xl text-lg tracking-tight text-cTextOffset sm:text-xl">{localize(locale, content.description, content.descriptionFr)}</p>
                </header>

                <Hr className="mx-auto mb-12 max-w-[60vw]" />

                <div className="flex flex-col space-y-10 sm:space-y-12">
                    {content.positions?.map((position) => <VolunteerCard key={position.id || ""} position={position} locale={locale} t={t} />)}
                    {(!content.positions || content.positions.length === 0) && <p className="text-center text-lg text-cTextOffset sm:text-xl">{t("volunteer.none")}</p>}
                </div>
            </div>
        </Fragment>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    return getLocalizedPageMetadata("volunteer", params);
}
