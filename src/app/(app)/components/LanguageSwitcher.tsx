"use client";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ currentLocale }: { currentLocale: "en" | "fr" }) {
    const pathname = usePathname();
    const locales: ("en" | "fr")[] = ["en", "fr"];

    function switchLocale(newLocale: "en" | "fr") {
        const segments = pathname.split("/");
        segments[1] = newLocale;
        return segments.join("/");
    }

    return (
        <div className="flex gap-2">
            {locales.map((loc) => (
                <a key={loc} href={switchLocale(loc)} className={loc === currentLocale ? "font-bold" : ""}>
                    {loc.toUpperCase()}
                </a>
            ))}
        </div>
    );
}
