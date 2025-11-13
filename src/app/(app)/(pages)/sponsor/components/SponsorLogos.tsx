import { Sponsor } from "@/payload-types";

interface SponsorLogosProps {
    sponsors: Sponsor["sponsors"]; // still here but unused
}

export function SponsorLogos() {
    const localLogos = [
        { src: "/sponsor/caffettiera.png", url: "https://www.caffettiera.ca" },
        { src: "/sponsor/aym.webp", url: "https://www.ashtangamontreal.com" },
        { src: "/sponsor/wakewater.webp", url: "https://wakewater.ca" },
    ];

    return (
        <div className="mx-auto flex items-center justify-center gap-16">
            {localLogos.map((logo, i) => (
                <a key={i} href={logo.url} target="_blank" rel="noreferrer" className="transition-all duration-200 hover:scale-110">
                    <img src={logo.src} alt={`Sponsor ${i + 1} logo`} className="h-auto max-w-48 object-contain" loading="lazy" />
                </a>
            ))}
        </div>
    );
}
