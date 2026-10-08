import { RefreshRouteOnSave } from "../../../components/RefreshRouteOnSave";
import { Fragment } from "react";
import { Metadata } from "next";
import ContactForm from "../contact/components/ContactForm/ContactForm";
import { getLocalizedPageMetadata } from "../../../../../lib/getPageFromCMS";
import Hr from "../../../components/Hr";
import { getPayloadClient } from "../../../../../payloadClient";
import { SponsorLogos } from "./components/SponsorLogos";
import { getLocale, localize } from "@/lib/i18n";
import { getTranslator } from "@/lib/getTranslator";

type PageProps = {
    params: Promise<{ locale: string }>;
};

export default async function SponsorPage({ params }: PageProps) {
    // fetch sponsor pg content
    const data = await (await getPayloadClient()).findGlobal({ slug: "sponsor" });
    const locale = getLocale((await params).locale);
    const t = await getTranslator(locale);
    return (
        <Fragment>
            <RefreshRouteOnSave />
            <div className="container mx-auto flex flex-col justify-between gap-[10vw] px-6 py-12 sm:px-4 lg:flex-row">
                <section>
                    {/* Header Section */}
                    <div className="mb-20 text-center">
                        <h1 className="mb-4 text-4xl font-bold tracking-tighter text-black md:text-5xl dark:text-white">{t("sponsor.our_sponsors")}</h1>
                        <p className="mx-auto max-w-2xl text-xl font-medium leading-tight text-black dark:text-white">{localize(locale, data.ourSponsorsSection, data.ourSponsorsSectionFr)}</p>
                        <p className="mx-auto mt-6 max-w-2xl rounded-xl border border-cBorder bg-mindvista-700 px-2 py-4 text-xl font-medium leading-tight tracking-tight text-cSoftWhite shadow-md dark:text-white">{localize(locale, data.callout, data.calloutFr)}</p>
                    </div>

                    {/* Sponsor Logos */}
                    <div className="grid grid-cols-1 items-center justify-items-center gap-8 md:grid-cols-2 md:gap-0">
                        <SponsorLogos sponsors={data.sponsors} locale={locale} />
                    </div>
                </section>

                <Hr className="lg:hidden" />

                {/* CONTACT SECTION */}
                <section>
                    {/* Header Section */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold tracking-tighter text-black md:text-5xl dark:text-white">{t("sponsor.sponsor_us")}</h1>
                        <p className="mx-auto max-w-2xl text-xl font-medium leading-tight tracking-tight text-black dark:text-white">{localize(locale, data.sponsorUsSection, data.sponsorUsSectionFr)}</p>
                    </div>

                    {/* Contact Form Section */}
                    <div className="mx-auto">
                        <ContactForm locale={locale} />
                    </div>
                </section>
            </div>
        </Fragment>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    return getLocalizedPageMetadata("sponsor", params);
}
