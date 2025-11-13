import { Media, Sponsor } from "@/payload-types";

interface SponsorLogosProps {
    sponsors: Sponsor["sponsors"];
}

export function SponsorLogos({ sponsors }: SponsorLogosProps) {
    const localLogos = ["/sponsor/caffettiera.png", "/sponsor/aym.webp", "/sponsor/wakewater.webp"];

    return (
        <>
            {sponsors.map((sponsor, i) => (
                <a key={sponsor.id} href={sponsor.url || undefined} target="_blank" rel="noreferrer" className="flex w-full justify-center transition-all duration-200 hover:scale-110">
                    <img src={localLogos[i] || "/404.jpg"} alt={`${sponsor.id} logo`} className="h-auto max-w-48 object-contain" loading="lazy" />
                </a>
            ))}
        </>
    );
}
