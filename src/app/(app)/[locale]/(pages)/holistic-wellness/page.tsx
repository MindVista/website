import { RefreshRouteOnSave } from "../../../components/RefreshRouteOnSave";
import { Fragment } from "react";
import { getPageFromCMS } from "../../../../../lib/getPageFromCMS";
import { getPayloadClient } from "../../../../../payloadClient";
import { Metadata } from "next";
import { WellnessWheel } from "./components/WellnessWheel";
import styles from "./styles.module.css";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Hr from "../../../components/Hr";
import { getLocale } from "../../../../..//lib/i18n";

export default async function HolisticWellnessPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params;
    const locale = getLocale(rawLocale);
    // fetch page content
    const content = await (await getPayloadClient()).findGlobal({ slug: "holistic-wellness" });

    const heroContent = locale === "en" ? content?.heroContent : content?.heroContentFr;

    const wwTopContent = locale === "en" ? content?.wellnessWheelTopContent : content?.wellnessWheelTopContentFr;

    const wwBottomContent = locale === "en" ? content?.wellnessWheelBottomContent : content?.wellnessWheelBottomContentFr;

    return (
        <Fragment>
            <RefreshRouteOnSave />
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    {/* Hero Section */}
                    <section className={`${styles.section} ${styles.heroSection}`}>
                        <div className={`${styles.textContent} text-lg`}>
                            <RichText data={heroContent as SerializedEditorState} />
                        </div>
                    </section>

                    <Hr className="mx-auto -mt-6 max-w-[75%] lg:hidden" />

                    {/* Wellness Wheel Section */}
                    <section className={`${styles.section} ${styles.wheelSection}`}>
                        <div className={`${styles.card} ${styles.wheelCard}`}>
                            <div className={styles.textContent}>
                                <RichText data={wwTopContent as SerializedEditorState} />
                            </div>
                            <div className={styles.wheelContainer}>
                                <WellnessWheel
                                    wellnessDimensions={(content?.wellnessWheelDimensions || []).map((dim) => ({
                                        title: locale === "fr" && dim?.nameFr ? dim.nameFr : dim.name,
                                        description: locale === "fr" && dim?.descriptionFr ? dim.descriptionFr : dim.description,
                                        color: dim.color,
                                    }))}
                                />
                            </div>
                            <div className={styles.textContent}>
                                <RichText data={wwBottomContent as SerializedEditorState} />
                            </div>
                        </div>
                    </section>

                    <Hr className="mx-auto -mt-10 mb-12 max-w-[75%] lg:hidden" />

                    {/* Additional Sections */}
                    <section className={styles.section}>
                        <div className="grid gap-8 md:gap-12 lg:gap-16">
                            {content?.sections?.map((section, index) => (
                                <article key={index} className={styles.card}>
                                    <div className={styles.textContent}>
                                        <RichText data={locale === "fr" ? (section?.contentFr as SerializedEditorState) : (section.content as SerializedEditorState)} />
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </Fragment>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("holistic-wellness");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
