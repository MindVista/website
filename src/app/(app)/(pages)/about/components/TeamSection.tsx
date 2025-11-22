import Image from "next/image";
import { Media } from "@/payload-types";

interface TeamMember {
    id?: string | null;
    role: string;
    name: string;
    pronouns?: string;
    image?: Media | number; // use Payload's Media type
}

interface Props {
    title: string;
    members: TeamMember[];
}

export default function TeamSection({ title, members }: Props) {
    const isDevTeam = title === "Website Team";

    return (
        <section className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-cText">{title}</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {members.map((member) => {
                    let imageUrl = "/team/avatarPlaceholder.png";
                    let imageAlt = member.name;

                    if (member.image) {
                        if (typeof member.image === "number") {
                            imageUrl = "/team/avatarPlaceholder.png";
                        } else {
                            imageUrl = member.image?.url || "/team/avatarPlaceholder.png";
                            imageAlt = member.image.alt || member.name;
                        }
                    }

                    return (
                        <div key={member.id || member.name} className={`flex w-full flex-col items-center rounded-xl bg-cBackgroundOffset p-6 text-center shadow-lg sm:w-[calc(50%-1rem)] ${isDevTeam ? "lg:w-[calc(33.333%-1rem)]" : "lg:w-[calc(33.333%-1.34rem)]"} dark:bg-mindvista-950`}>
                            <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                                <Image src={imageUrl} alt={imageAlt} width={500} height={500} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-row items-center justify-center">
                                <h3 className="text-xl font-semibold text-cText">{member.name}</h3>
                                {member.pronouns && <span className="ml-1 text-sm italic text-cTextOffset">({member.pronouns})</span>}
                            </div>
                            <p className="font-medium text-cTextOffset">{member.role}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
