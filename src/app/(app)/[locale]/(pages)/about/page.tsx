import TeamSection from "./components/TeamSection";
import Hr from "../../../components/Hr";
import Image from "next/image";
import { Metadata } from "next";
import { getPageFromCMS } from "../../../../../lib/getPageFromCMS";
import { getLocale } from "@/lib/i18n";
import { getTranslator } from "@/lib/getTranslator";

const teams = {
    leadership: [
        { role: "Co-President", name: "Kristie Lam", pronouns: "she/her", image: "/team/kristie.webp" },
        { role: "Co-President", name: "Abbie Carnahan", pronouns: "she/her", image: "/team/abbie.webp" },
        { role: "Senior Advisor", name: "Charlotte Rotstein", pronouns: "she/they", image: "/team/charlotte.webp" },
    ],
    events: [
        { role: "Events Coordinator", name: "Catherine McCourt  ", pronouns: "she/her", image: "/team/catherine.webp" },
        { role: "Events Coordinator", name: "Sandrine Huard", pronouns: "she/her", image: "/team/sandrine.webp" },
    ],
    finance: [
        { role: "Sponsorship Coordinator", name: "Charlotte Godbout Fowler", pronouns: "she/her", image: "/team/charlotte-2.webp" },
        { role: "Sponsorship Coordinator", name: "Julia Rotiroti", pronouns: "she/her", image: "/team/julia.webp" },
        { role: "Finance Coordinator", name: "Christina Huan", pronouns: "she/her", image: "/team/christina.webp" },
    ],
    marketing: [
        { role: "Social Media Coordinator", name: "Amanda Borja", pronouns: "she/her", image: "/team/amanda.webp" },
        { role: "Marketing & Outreach Coordinator", name: "Paige Metcalf", pronouns: "she/her", image: "/team/paige.webp" },
    ],
    website: [
        { role: "Full-Stack Developer", name: "Murad Novruzov", pronouns: "he/him", image: "/team/murad.webp" },
        { role: "Full-Stack Developer", name: "Daniel Zoubarev", pronouns: "he/him", image: "/team/daniel.webp" },
        { role: "Full-Stack Developer", name: "Rhea Talwar", pronouns: "she/her", image: "/team/rhea.webp" },
        { role: "Website Content Coordinator", name: "Julie Burke", pronouns: "she/her", image: "/team/julie.webp" },
    ],
    content: [
        { role: "Newsletter Content Creator", name: "Gianluca Caporicci", pronouns: "he/him", image: "/team/gianluca.webp" },
        { role: "French Coordinator", name: "Alizée Cyr-Comeault", pronouns: "she/her", image: "/team/alizee.webp" },
    ],
    founders: [
        { role: "Founder", name: "Safiia Abdulkadyrova", pronouns: "she/her", image: "/team/safiia-abdulkadyrova.webp" },
        { role: "Founder", name: "Lauren Harrison", pronouns: "she/her", image: "/team/lauren-harrison.webp" },
        { role: "Founder", name: "Hana Jamal", pronouns: "she/her", image: "/team/hana-jamal.webp" },
    ],
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = getLocale((await params).locale);
    const t = await getTranslator(locale);
    return (
        <div className="container mx-auto max-w-7xl px-6 pb-12 pt-20">
            {/* Group Photo */}
            <div className="group relative mb-16 aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300">
                <Image unoptimized priority src="/team/group-photo.webp" alt="MindVista Team" width={1920} height={1280} className="h-full w-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-100" />
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
            <TeamSection title="Leadership & Coordination Team" members={teams.leadership} />
            <TeamSection title="Events Team" members={teams.events} />
            <TeamSection title="Finance Team" members={teams.finance} />
            <TeamSection title="Marketing & Social Media Team" members={teams.marketing} />
            <TeamSection title="Website Team" members={teams.website} />
            <TeamSection title="Newsletter Content Creators" members={teams.content} />
            <TeamSection title="Founders" members={teams.founders} />
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("about");
    return { ...(page && { title: page.title, description: page.seoDescription }) };
}
