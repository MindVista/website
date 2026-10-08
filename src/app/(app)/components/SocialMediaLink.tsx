import Link from "next/link";
import type { IconType } from "react-icons";
import { Locale } from "@/lib/i18n";

interface SocialMediaLinkProps {
    href: string;
    icon: IconType;
    label: string;
    locale: Locale;
    className?: string;
    size?: string;
}

export function SocialMediaLink({ href, icon: Icon, label, locale, className = "", size = "1.5rem" }: SocialMediaLinkProps) {
    return (
        <Link href={href} target="_blank" rel="noopener noreferrer" className={`${className} hover:text-primary-600 transition-colors`} aria-label={locale === "fr" ? `Visitez notre page ${label}.` : `Visit our ${label} page.`}>
            <Icon style={{ height: `${size}`, width: `${size}` }} title={label} />
        </Link>
    );
}
