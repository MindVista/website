import TeamSection from "./components/TeamSection";
import Hr from "../../../components/Hr";
import Image from "next/image";
import { Metadata } from "next";
import { getLocalizedPageMetadata } from "../../../../../lib/getPageFromCMS";
import { getLocale } from "@/lib/i18n";
import { getTranslator, TranslationKey } from "@/lib/getTranslator";

// roles are translation keys, resolved with the current locale at render
const teams: Record<string, { role: TranslationKey; name: string; pronouns: string; image: string }[]> = {
    leadership: [
        { role: "role.co_president", name: "Kristie Lam", pronouns: "she/her", image: "/team/kristie.webp" },
        { role: "role.co_president", name: "Abbie Carnahan", pronouns: "she/her", image: "/team/abbie.webp" },
        { role: "role.senior_advisor", name: "Charlotte Rotstein", pronouns: "she/they", image: "/team/charlotte.webp" },
    ],
    events: [
        { role: "role.events_coordinator", name: "Catherine McCourt  ", pronouns: "she/her", image: "/team/catherine.webp" },
        { role: "role.events_coordinator", name: "Sandrine Huard", pronouns: "she/her", image: "/team/sandrine.webp" },
    ],
    finance: [
        { role: "role.sponsorship_coordinator", name: "Charlotte Godbout Fowler", pronouns: "she/her", image: "/team/charlotte-2.webp" },
        { role: "role.sponsorship_coordinator", name: "Julia Rotiroti", pronouns: "she/her", image: "/team/julia.webp" },
        { role: "role.finance_coordinator", name: "Christina Huan", pronouns: "she/her", image: "/team/christina.webp" },
    ],
    marketing: [
        { role: "role.social_media_coordinator", name: "Amanda Borja", pronouns: "she/her", image: "/team/amanda.webp" },
        { role: "role.marketing_coordinator", name: "Paige Metcalf", pronouns: "she/her", image: "/team/paige.webp" },
    ],
    website: [
        { role: "role.developer", name: "Murad Novruzov", pronouns: "he/him", image: "/team/murad.webp" },
        { role: "role.developer", name: "Daniel Zoubarev", pronouns: "he/him", image: "/team/daniel.webp" },
        { role: "role.developer", name: "Rhea Talwar", pronouns: "she/her", image: "/team/rhea.webp" },
        { role: "role.website_content_coordinator", name: "Julie Burke", pronouns: "she/her", image: "/team/julie.webp" },
    ],
    content: [
        { role: "role.newsletter_creator", name: "Gianluca Caporicci", pronouns: "he/him", image: "/team/gianluca.webp" },
        { role: "role.french_coordinator", name: "Alizée Cyr-Comeault", pronouns: "she/her", image: "/team/alizee.webp" },
    ],
    founders: [
        { role: "role.founder", name: "Safiia Abdulkadyrova", pronouns: "she/her", image: "/team/safiia-abdulkadyrova.webp" },
        { role: "role.founder", name: "Lauren Harrison", pronouns: "she/her", image: "/team/lauren-harrison.webp" },
        { role: "role.founder", name: "Hana Jamal", pronouns: "she/her", image: "/team/hana-jamal.webp" },
    ],
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = getLocale((await params).locale);
    const t = await getTranslator(locale);
    const translateRoles = (members: (typeof teams)[string]) => members.map((member) => ({ ...member, role: t(member.role) }));

    return (
        <div className="container mx-auto max-w-7xl px-6 pb-12 pt-20">
            {/* Group Photo */}
            <div className="group relative mb-16 aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300">
                <Image unoptimized priority src="/team/group-photo.webp" alt={t("about.team_photo_alt")} width={1920} height={1280} className="h-full w-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <h3 className="text-xl font-semibold">{t("about.team")}</h3>
                    <p className="text-sm">{t("about.committed")}</p>
                </div>
            </div>

            {/* About Content */}
            <div className="mx-auto mb-16 max-w-4xl space-y-6">
                <h1 className="mb-4 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl dark:from-purple-400 dark:to-blue-300">{t("about.mindvista")}</h1>

                <p className="text-base font-medium leading-relaxed text-cTextOffset">{t("about.established")}</p>

                <p className="text-base font-medium leading-relaxed text-cTextOffset">{t("about.dedicated")}</p>

                <ul className="my-6 list-inside list-disc space-y-1 pl-4 text-base font-semibold text-cText">
                    <li>{t("about.wellnessresources")}</li>
                    <li>{t("about.directory")}</li>
                    <li>{t("about.newsletter")}</li>
                    <li>{t("about.hostevents")}</li>
                    <li>{t("about.giveaways")}</li>
                </ul>

                <p className="text-base font-medium leading-relaxed text-cTextOffset">{t("about.join")}</p>
            </div>

            <Hr className="mb-16" />

            {/* Photos sectioned by Team */}
            <TeamSection title={t("about.team_leadership")} members={translateRoles(teams.leadership)} />
            <TeamSection title={t("about.team_events")} members={translateRoles(teams.events)} />
            <TeamSection title={t("about.team_finance")} members={translateRoles(teams.finance)} />
            <TeamSection title={t("about.team_marketing")} members={translateRoles(teams.marketing)} />
            <TeamSection title={t("about.team_website")} members={translateRoles(teams.website)} isDevTeam />
            <TeamSection title={t("about.team_content")} members={translateRoles(teams.content)} />
            <TeamSection title={t("about.team_founders")} members={translateRoles(teams.founders)} />
        </div>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    return getLocalizedPageMetadata("about", params);
}
