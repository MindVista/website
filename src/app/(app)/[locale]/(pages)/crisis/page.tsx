import { Metadata } from "next";
// import Hr from "../../components/Hr";
import { getPageFromCMS } from "../../../../../lib/getPageFromCMS";
import Link from "next/link";
import { getLocale } from "@/lib/i18n";
import { getTranslator } from "@/lib/getTranslator";

interface CrisisPageProps {
    params: { locale: string };
}

export default async function CrisisPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = getLocale((await params).locale);
    const t = await getTranslator(locale);
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            {/* Emergency Number Section */}
            <div className="mb-16 text-center">
                <p className="mb-0 text-2xl font-medium text-[var(--text)]">{t("crisis.dial")}</p>

                <h1 className="mb-1 animate-emergency-pulse bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-9xl font-bold leading-none text-transparent dark:from-red-500 dark:to-rose-400">911</h1>

                <p className="text-2xl font-medium text-[var(--text)]">
                    {t("crisis.youorother")} <span className="text-red-600 dark:text-red-500">{t("crisis.imm_danger")}</span>.
                </p>
            </div>

            {/* Crisis Resources Grid */}
            <div className="mb-8 grid gap-8 md:grid-cols-2">
                {/* 24/7 Support by Talk Suicide Canada */}
                <div className="rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)] dark:hover:border-blue-800 dark:hover:shadow-blue-950/50">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">{t("crisis.24-7")}</h2>
                    <p className="mb-4 text-[var(--text-offset)]">{t("crisis.talk")}</p>
                    <div className="mb-2 text-xl font-bold text-[var(--text)]">1-833-456-4566</div>
                    <p className="text-sm text-[var(--text-offset)]">{t("crisis.talk_suicide")}</p>
                    <Link href="https://talksuicide.ca/" target="_blank" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                        {t("crisis.learn_more")}
                    </Link>
                </div>

                {/* Student Support (GuardMe) */}
                <div className="rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)] dark:hover:border-blue-800 dark:hover:shadow-blue-950/50">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">{t("crisis.student_support")}</h2>
                    <p className="mb-4 text-[var(--text-offset)]">{t("crisis.student_support_desc")}</p>
                    <div className="space-y-2 text-[var(--text)]">
                        <div>
                            <strong>{t("crisis.NA")}</strong> 1-844-451-9700
                        </div>
                        <div>
                            <strong>{t("crisis.international")}</strong> +1-416-380-6578
                        </div>
                    </div>
                    <Link href="https://gmssp.org/" target="_blank" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                        {t("crisis.access")}
                    </Link>
                </div>

                {/* SSMU Students' Nightline */}
                <div className="rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)] dark:hover:border-blue-800 dark:hover:shadow-blue-950/50">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">{t("crisis.ssmu_nightline")}</h2>
                    <p className="mb-4 text-[var(--text-offset)]">{t("crisis.ssmu_nightline_desc")}</p>
                    <div className="mb-2 text-xl font-bold text-[var(--text)]">514-398-6246</div>
                    <p className="text-sm text-[var(--text-offset)]">{t("crisis.ssmu_hours")}</p>
                    <Link href="https://nightline.ssmu.ca/" target="_blank" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                        {t("crisis.ssmu_info")}
                    </Link>
                </div>

                {/* McGill's Peer Support Center */}
                <div className="rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)] dark:hover:border-blue-800 dark:hover:shadow-blue-950/50">
                    <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">{t("crisis.peer_support")}</h2>
                    <p className="mb-4 text-[var(--text-offset)]">{t("crisis.peer_support_desc")}</p>
                    <ul className="mb-4 list-inside list-disc text-[var(--text-offset)]">
                        <li>{t("crisis.peer_drop-in")}</li>
                        <li>{t("crisis.peer_booking")}</li>
                        <li>{t("crisis.peer_resource_nav")}</li>
                    </ul>
                    <Link href="https://psc.ssmu.ca/" target="_blank" className="mt-2 inline-block text-[var(--accent)] hover:opacity-80">
                        {t("crisis.peer_go_book")}
                    </Link>
                </div>
            </div>

            {/* <Hr className="mt-12" /> */}

            {/* Additional Resources */}
            {/* <div className="my-12 rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(15,23,42,0.2)]"> */}
            {/* <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">Additional Resources</h2> */}
            {/* <p className="mb-4 text-[var(--text-offset)]">If you&apos;re here to help you find the right resources.</p> */}
            {/* <button className="rounded px-4 py-2 font-bold text-white [background:var(--color-gradient)] hover:opacity-90"> Find Support </button> */}
            {/* TODO: initalize button to redirect...somewhere */}
            {/* </div> */}
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("crisis");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
