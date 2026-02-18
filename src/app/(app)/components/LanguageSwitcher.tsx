"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
    const pathname = usePathname();
    const router = useRouter();

    function switchLocale(newLocale: Locale) {
        const segments = pathname.split("/");
        segments[1] = newLocale;
        router.push(segments.join("/"));

        document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    }

    return <button onClick={() => switchLocale(currentLocale === "en" ? "fr" : "en")}>{currentLocale === "en" ? "FR" : "EN"}</button>;
}
