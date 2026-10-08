import { RefreshRouteOnSave } from "@/app/(app)/components/RefreshRouteOnSave";
import { Fragment } from "react";
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/payloadClient";
import { Resource } from "@/payload-types";
import { FiMapPin, FiGlobe, FiPhone, FiUser, FiShield } from "react-icons/fi";
import TagsSection from "../../components/TagsSection";
import ContactSection from "../../components/ContactSection";
import PostHeader from "../../components/PostHeader";
import LastUpdatedSection from "../../../../../../components/LastUpdatedSection";
import { FaImage } from "react-icons/fa";
import ImageModal from "@/app/(app)/components/ImageModal";
import { getLocale, localize } from "@/lib/i18n";
import { getTranslator } from "@/lib/getTranslator";

interface Props {
    params: Promise<{
        locale: string;
        resource: string;
    }>;
    searchParams: Promise<{
        [key: string]: string | string[];
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { resource: slug, locale: rawLocale } = await params;
    const locale = getLocale(rawLocale);
    const resource = await getResource(slug);
    if (!resource) return { title: (await getTranslator(locale))("meta.not_found") };

    return {
        title: localize(locale, resource.title, resource.titleFr),
        description: localize(locale, resource.description, resource.descriptionFr),
    };
}

async function getResource(slug: string): Promise<Resource | null> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
        collection: "resources",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    });
    return docs[0] || null;
}

export default async function ResourcePage({ params }: Props) {
    const { locale: rawLocale, resource: slug } = await params;
    const locale = getLocale(rawLocale);
    const resource = await getResource(slug);
    if (!resource) return notFound();
    const t = await getTranslator(locale);

    const tags = resource.tags?.map((tag: number | { id: string | number; name?: string }) => (typeof tag === "number" ? { id: tag, name: tag.toString() } : tag)) ?? [];

    const hasLocation = resource.location || resource.channelOnline || resource.channelTelephone || resource.channelInPerson || resource.onCampus;
    const hasInsurance = resource.insuranceDetails || (resource.insuranceProviders && resource.insuranceProviders.length > 0);

    const title = localize(locale, resource.title, resource.titleFr);
    const description = localize(locale, resource.description, resource.descriptionFr);
    const location = localize(locale, resource.location, resource.locationFr);
    const insuranceDetails = localize(locale, resource.insuranceDetails, resource.insuranceDetailFr);
    const graphicTitle = localize(locale, resource.graphicTitle, resource.graphicTitleFr);

    return (
        <Fragment>
            <RefreshRouteOnSave />
            <PostHeader
                title={title}
                description={description}
                status={{
                    isActive: resource.currentlyActive || false,
                    label: resource.currentlyActive ? t("status.active") : t("status.inactive"),
                }}
            />

            <div className="grid auto-rows-fr grid-cols-1 gap-6 md:auto-cols-fr md:grid-flow-col">
                {/* Contact Information */}
                {(resource.website || resource.email || resource.phoneNumber || resource.newsletter) && (
                    <div className="h-full md:col-span-1">
                        <ContactSection
                            contactInfo={{
                                website: resource.website || undefined,
                                email: resource.email || undefined,
                                phoneNumber: resource.phoneNumber || undefined,
                                newsletter: resource.newsletter || undefined,
                            }}
                            translator={t}
                        />
                    </div>
                )}

                {/* Location Information */}
                {hasLocation && (
                    <div className={`h-full ${!resource.website && !resource.email && !resource.phoneNumber ? "md:col-span-2" : "md:col-span-1"}`}>
                        <div className="flex h-full flex-col rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all hover:shadow-md md:p-8">
                            <div className="space-y-6">
                                {location && (
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <FiMapPin className="h-5 w-5 text-cTextOffset" />
                                            <span className="font-medium text-cText">{t("directory.location")}</span>
                                        </div>
                                        <span className="block break-words text-cTextOffset">{location}</span>
                                    </div>
                                )}
                                {(resource.channelInPerson || resource.channelOnline || resource.channelTelephone) && (
                                    <div>
                                        <div className="mb-3 flex items-center gap-2">
                                            <FiGlobe className="h-5 w-5 text-cTextOffset" />
                                            <span className="font-medium text-cText">{t("directory.channels")}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {resource.channelOnline && <span className="inline-flex items-center rounded-full bg-cBackgroundOffsetAccent px-3 py-1 text-sm text-cAccent">{t("directory.online")}</span>}
                                            {resource.channelTelephone && (
                                                <span className="inline-flex items-center rounded-full bg-cBackgroundOffsetAccent px-3 py-1 text-sm text-cAccent">
                                                    <FiPhone className="mr-1 h-4 w-4" />
                                                    {t("directory.telephone")}
                                                </span>
                                            )}
                                            {resource.channelInPerson && (
                                                <span className="inline-flex items-center rounded-full bg-cBackgroundOffsetAccent px-3 py-1 text-sm text-cAccent">
                                                    <FiUser className="mr-1 h-4 w-4" />
                                                    {t("directory.in_person")}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {resource.onCampus && (
                                    <div className="">
                                        <span className="inline-flex items-center rounded-full bg-cBackgroundOffsetAccent px-3 py-1 text-sm text-cAccent">{t("directory.on_campus")}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Insurance Information */}
                {hasInsurance && (
                    <div className={`h-full ${!resource.website && !resource.email && !resource.phoneNumber && !hasLocation ? "md:col-span-2" : "md:col-span-1"}`}>
                        <div className="flex h-full flex-col rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all hover:shadow-md md:p-8">
                            {insuranceDetails && (
                                <div className="mb-8">
                                    <div className="mb-3 flex items-center gap-2">
                                        <FiShield className="h-5 w-5 text-cTextOffset" />
                                        <h2 className="text-xl font-semibold text-cText">{t("directory.insurance_info")}</h2>
                                    </div>
                                    <p className="break-words text-base leading-relaxed text-cTextOffset">{insuranceDetails}</p>
                                </div>
                            )}
                            {resource.insuranceProviders && resource.insuranceProviders.length > 0 && (
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-cText">{t("directory.insurance_providers")}</h2>
                                    <div className="space-y-4">
                                        {resource.insuranceProviders.map((provider: { id?: string | null; insuranceProvider: Array<{ id?: string | null; name: string; nameFr?: string | null; description?: string | null; descriptionFr?: string | null }> }, index: number) => (
                                            <div key={provider.id || index} className="border-cBorder/20 hover:border-cBorder/40 rounded-xl border bg-cBackground p-4 transition-colors dark:bg-cBackgroundOffset">
                                                {provider.insuranceProvider.map((p, i: number) => {
                                                    const providerDescription = localize(locale, p.description, p.descriptionFr);

                                                    return (
                                                        <div key={p.id || i} className="mb-3 last:mb-0">
                                                            <h3 className="mb-1 font-medium text-cText">{localize(locale, p.name, p.nameFr)}</h3>
                                                            {providerDescription && <p className="break-words text-sm leading-relaxed text-cTextOffset">{providerDescription}</p>}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Resource Graphic */}
            {graphicTitle && typeof resource.graphic === "object" && resource.graphic?.url && (
                <div className="mt-6 flex h-full flex-col rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all hover:shadow-md md:p-8">
                    <div className="flex flex-row items-center gap-2">
                        <FaImage />
                        <h2 className="text-xl font-semibold text-cText">{graphicTitle}</h2>
                    </div>
                    <ImageModal className="my-8 md:mt-14" url={resource.graphic.url} altText={localize(locale, resource.graphic.alt, resource.graphic.altFr)} width={resource.graphic.width || 1000} height={resource.graphic.height || 1000} />
                </div>
            )}

            {/* Tags */}
            {tags.length > 0 && <TagsSection tags={tags} locale={locale} />}

            {/* Last Updated */}
            <LastUpdatedSection updatedAt={new Date(resource.updatedAt)} locale={locale} />
        </Fragment>
    );
}
