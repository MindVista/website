import MentalWellnessFact from "../components/index/MentalWellnessFact";
import NavBar from "../components/navbar/NavBar";
import NavigationController from "../components/index/NavigationController";
import Birds from "../components/index/Birds";
import Footer from "../components/Footer";
import Hr from "../components/Hr";
import Image from "next/image";
import HomeEventsSection from "../components/index/HomeEventsSection";
import { AnnouncementBar } from "../components/AnnouncementBar";

import lightThemeImage from "../../../../public/landing/shifaaz-shamoon.webp";
import darkThemeImage from "@public/landing/jon-j_mk18.webp";

import { TbStretching2, TbHeartHandshake, TbCirclesRelation, TbApple, TbZzz, TbUserCheck } from "react-icons/tb";
import { HiArrowLongRight } from "react-icons/hi2";
import Link from "next/link";
import InfoSeparator from "../components/index/InfoSeparator";
import { getPayloadClient } from "@/payloadClient";
import { SponsorLogos } from "./(pages)/sponsor/components/SponsorLogos";
import { getLocale } from "@/lib/i18n";
import LocaleLink from "../components/LocaleLink";
import { getTranslator } from "@/lib/getTranslator";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    // fetch data
    const payload = await getPayloadClient();
    const sponsorData = await payload.findGlobal({ slug: "sponsor" });
    const announcementData = await payload.findGlobal({ slug: "announcement-bar" });
    const locale = getLocale((await params).locale);
    const t = await getTranslator(locale);
    return (
        <>
            <div className="max-lg:hidden">
                <AnnouncementBar {...announcementData} />
                <NavigationController hasAnnouncement={announcementData.isEnabled} locale={locale} />
            </div>
            <div className="lg:hidden">
                <NavBar locale={locale} />
            </div>
            <main className="flex min-h-screen flex-col [&_h2]:tracking-tighter [&_p]:tracking-tight">
                {/* TOP SECTION START */}

                {/* TOP SECTION DESKTOP START */}
                <section className="flex-1 overflow-x-hidden max-lg:hidden">
                    <div className="relative mx-auto flex min-h-[100vh] w-screen items-center justify-center">
                        <Birds />

                        {/* "Est. 2023" */}
                        <p className="absolute left-[22vw] top-[20vh] z-10 font-serif text-[2vh] font-semibold text-slate-400 dark:text-slate-100">&copy; Est. 2023</p>

                        {/* Column Image */}
                        <div className="absolute inset-0 left-1/2 w-[25vw] -translate-x-1/2 transform">
                            <Image priority src={lightThemeImage} alt="Waves on the beach." className="h-full w-full object-cover dark:hidden" />
                            <div className="hidden dark:inline">
                                <Image priority src={darkThemeImage} alt="A mountain range with a big blue sky." className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-black/30"></div>
                            </div>
                        </div>

                        {/* "MINDVISTA" */}
                        <div className="z-10 flex flex-row gap-0">
                            <h1 className="-mt-32 font-serif text-[12vw] font-semibold tracking-tight text-[#1D1D1B] dark:text-slate-100">MIND</h1>
                            <h1 className="-mt-32 font-serif text-[12vw] font-semibold tracking-tight text-[#1D1D1B] dark:text-slate-100">VISTA</h1>
                        </div>

                        {/* Quote */}
                        <div className="text-md absolute bottom-[20vh] right-[10vw] z-10 max-w-[20vw] text-[2vh] font-semibold text-[#1D1D1B] dark:text-slate-100">
                            <p>{t("home.quote")}</p>
                            <p className="text-[#1D1D1B]/60 dark:text-slate-400">&mdash; {t("home.gwi")}</p>
                        </div>
                    </div>

                    <InfoSeparator />
                </section>
                {/* TOP SECTION DESKTOP END */}

                {/* TOP SECTION MOBILE START */}
                <section className="pt-[10vh] lg:hidden"></section>
                {/* TOP SECTION MOBILE END */}
                {/* TOP SECTION END */}

                {/* FIRST SECTION */}
                <section className="px-[5vw] pb-12 pt-[10vh] text-center md:px-[7.5vw] lg:px-[10vw]">
                    <h2 className="text-5xl font-bold md:text-6xl">
                        {t("home.one_stop_shop")} <span className="text-cAccent">{t("wellness")}</span> {t("and")} <span className="text-cAccent">{t("engagement")}</span> {t("at McGill")}.
                    </h2>

                    <p className="py-6 text-xl font-medium text-cTextOffset md:px-20 lg:px-28">
                        {t("home.welcome_to")} <span className="font-semibold text-cAccent dark:text-mindvista-50">MindVista</span>, {t("home.initiative")}
                        <span className="hidden md:inline"> {t("home.volunteers")} </span>
                    </p>
                </section>
                {/* END OF FIRST SECTION */}

                <Hr className="mx-[25vw]" />

                {/* MENTAL WELLNESS SECTION */}
                <section className="px-[5vw]">
                    <h2 className="mt-16 text-center text-3xl font-bold md:text-4xl">{t("home.what_wellness")}</h2>
                    <p className="py-3 text-center text-xl font-medium text-cTextOffset md:px-20 lg:px-28">{t("home.wellness_def")}</p>

                    {/* prettier-ignore */}
                    <div className="mb-8 mt-10 grid grid-cols-1 grid-rows-3 gap-4 sm:mx-6 sm:grid-cols-2 sm:grid-rows-3 lg:mx-6 xl:mx-12">
                        <div className="p-4"><MentalWellnessFact icon={TbStretching2} title={t("home.regular_physical_activity")} description={t("home.rpa_description")} /></div>
                        <div className="hidden p-4 sm:grid"><MentalWellnessFact icon={TbHeartHandshake} title={t("home.healthy_relationships")} description={t("home.hr_description")} /></div>
                        <div className="hidden p-4 sm:grid"><MentalWellnessFact icon={TbCirclesRelation} title={t("home.mind_stress_management")} description={t("home.msm_description")} /></div>
                        <div className="hidden p-4 sm:grid"><MentalWellnessFact icon={TbApple} title={t("home.balanced_diet")} description={t("home.bd_description")} /></div>
                        <div className="p-4"><MentalWellnessFact icon={TbZzz} title={t("home.quality_sleep")} description={t("home.qs_description")} /></div>
                        <div className="p-4"><MentalWellnessFact icon={TbUserCheck} title={t("home.professional_support")} description={t("home.ps_description")} /></div>
                    </div>

                    <div className="flex justify-center">
                        <LocaleLink href="/holistic-wellness" className="flex items-center gap-3 rounded-lg border border-cBorder p-3 text-lg font-semibold transition-all duration-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-50 dark:hover:border-blue-500 dark:hover:text-blue-400 dark:hover:shadow-blue-950/50">
                            {t("learn_more")} <HiArrowLongRight />
                        </LocaleLink>
                    </div>
                </section>
                {/* END OF MENTAL WELLNESS SECTION */}

                <Hr className="mx-[25vw] my-16" />

                {/* EVENTS SECTION */}
                <HomeEventsSection />

                {/* SPONSORS SECTION */}
                <section className="mb-16 px-[5vw] md:px-[7.5vw] lg:px-[10vw]">
                    <h2 className="text-center text-3xl font-bold md:text-4xl">{t("home.sponsor_thanks")}</h2>
                    <p className="py-3 text-center text-xl font-medium text-cTextOffset md:px-20 lg:px-28">{t("home.sponsor_grateful")}</p>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 items-center justify-items-center gap-8 md:grid-cols-2 md:gap-0">
                        <SponsorLogos sponsors={sponsorData.sponsors} />
                    </div>
                    <div className="mt-10 flex justify-center">
                        <Link href="/sponsor" className="flex items-center gap-3 rounded-lg border border-cBorder p-3 text-lg font-semibold transition-all duration-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-50 dark:hover:border-blue-500 dark:hover:text-blue-400 dark:hover:shadow-blue-950/50">
                            {t("home.become_sponsor")} <HiArrowLongRight />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer locale={locale} />
        </>
    );
}
