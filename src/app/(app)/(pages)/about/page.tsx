import { RefreshRouteOnSave } from "@/app/(app)/components/RefreshRouteOnSave";
import { Fragment } from "react";
import { getPayloadClient } from "@/payloadClient";
import { Metadata } from "next";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Image from "next/image";
import Hr from "../../components/Hr";
import TeamSection from "./components/TeamSection";
import styles from "./styles.module.css";

export default async function AboutPage() {
    const payload = await getPayloadClient();
    const content = await payload.findGlobal({
        slug: "about",
    });

    return (
        <Fragment>
            <RefreshRouteOnSave />
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    {/* Hero / Group Photo Section */}
                    <section className={`${styles.section} ${styles.heroSection}`}>
                        <div className={styles.imageWrapper}>
                            <Image src={typeof content?.groupPhoto === "object" && content?.groupPhoto?.url ? content.groupPhoto.url : "/team/group-photo.webp"} alt="MindVista Team" width={1920} height={1280} className={styles.heroImage} />
                        </div>
                        <div className={styles.heroText}>
                            <h1 className={styles.title}>{content?.title}</h1>
                            <p className={styles.subtitle}>Committed to student wellness and engagement.</p>
                        </div>
                    </section>

                    <Hr className={`${styles.hr} mx-auto`} />

                    {/* Introduction and Initiative Details Section */}
                    <section className={styles.section}>
                        <div className={styles.textContent}>
                            <RichText data={content?.introduction as unknown as SerializedEditorState} />
                        </div>
                        <div className={styles.textContent}>
                            <RichText data={content?.initiativeDetails as unknown as SerializedEditorState} />
                        </div>
                    </section>

                    <Hr className={`${styles.hr} mx-auto`} />

                    {/* Team Sections */}
                    <section className={styles.section}>{content?.teams?.map((section: any, index: number) => <TeamSection key={index} title={section.title} members={section.members} />)}</section>
                </div>
            </div>
        </Fragment>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPayloadClient().then((client) => client.findGlobal({ slug: "about" }));
    return {
        ...(page && {
            title: page.title,
            description: typeof page.introduction === "string" ? page.introduction : "About MindVista",
        }),
    };
}
