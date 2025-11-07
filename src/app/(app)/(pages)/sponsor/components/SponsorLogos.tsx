import { Media, Sponsor } from "@/payload-types";

interface SponsorLogosProps {
    sponsors: Sponsor["sponsors"];
}

export function SponsorLogos({ sponsors }: SponsorLogosProps) {
    return (
        <>
            {sponsors.map((sponsor) => {
                const logo = sponsor.logo as Media;
                return (
                    <a key={sponsor.id} href={sponsor.url || undefined} target="_blank" rel="noreferrer" className="w-full transition-all duration-200 hover:scale-110">
                        <img src={logo?.url || "/404.jpg"} alt={logo?.alt || "Sponsor logo"} className="mx-auto h-auto max-w-48 object-contain" loading="lazy" />
                    </a>
                );
            })}
        </>
    );
}
