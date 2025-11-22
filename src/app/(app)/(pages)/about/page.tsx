import TeamSection from "./components/TeamSection";
import Hr from "../../components/Hr";
import Image from "next/image";
import { Metadata } from "next";
import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { getPayloadClient } from "@/payloadClient";

export default async function AboutPage() {
    const data = await (await getPayloadClient()).findGlobal({ slug: "volunteer" });
    const teamData = await (await getPayloadClient()).findGlobal({ slug: "about" });
    const groupPicUrl = teamData.groupPicture && typeof teamData.groupPicture !== "number" ? teamData.groupPicture.url || "/team/avatarPlaceholder.png" : "/team/avatarPlaceholder.png";

    const groupPicAlt = teamData.groupPicture && typeof teamData.groupPicture !== "number" ? teamData.groupPicture.alt || "Mindvista Team" : "Mindvista Team";

    return (
        <div className="container mx-auto max-w-7xl px-6 pb-12 pt-20">
            {/* Group Photo */}
            <div className="group relative mb-16 aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300">
                <Image src={groupPicUrl} alt={groupPicAlt} width={1920} height={1280} className="h-full w-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <h3 className="text-xl font-semibold">MindVista Team 2025-2026</h3>
                    <p className="text-sm">Committed to student wellness and engagement.</p>
                </div>
            </div>

            {/* About Content */}
            <div className="mx-auto mb-16 max-w-4xl space-y-6">
                <h1 className="mb-4 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl dark:from-purple-400 dark:to-blue-300">About MindVista&apos;s Initiative</h1>

                <p className="text-base font-medium leading-relaxed text-cTextOffset">Established in 2023, MindVista emerged from the collaborative as part of the Integrated Management Student Fellowship (IMSF) at McGill University. Rooted in a commitment to enhancing mental wellness, our group functions as a student, volunteer-run initiative that envisions a holistic approach to fostering well-being for every McGill student.</p>

                <p className="text-base font-medium leading-relaxed text-cTextOffset">Dedicated to creating a positive impact on campus mental health, MindVista provides a range of initiatives, including:</p>

                <ul className="my-6 list-inside list-disc space-y-1 pl-4 text-base font-semibold text-cText">
                    <li>Comprehensive Mental Wellness Resources</li>
                    <li>Club Directory for Increased Engagement</li>
                    <li>Weekly Wellness Newsletter</li>
                    <li>Host Wellness Events</li>
                    <li>Wellness Challenges and Giveaways with Epic Rewards</li>
                </ul>

                <p className="text-base font-medium leading-relaxed text-cTextOffset">Join MindVista on our mission to cultivate a campus culture that prioritizes mental wellness and fosters a sense of community among McGill students. Together, let&apos;s embark on a journey towards a healthier and more connected student experience.</p>
            </div>

            <Hr className="mb-16" />

            {/* Photos sectioned by Team */}
            {teamData.teams.map((team) => {
                return <TeamSection key={team.teamName} title={team.teamName} members={team.members} />;
            })}
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("about");
    return { ...(page && { title: page.title, description: page.seoDescription }) };
}
