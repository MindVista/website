"use client";

import Link, { LinkProps } from "next/link";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

type Props = LinkProps & {
    children: ReactNode;
    className?: string;
};

export default function LocaleLink({ href, children, className, ...props }: Props) {
    const params = useParams();
    const locale = params.locale as string;

    const localizedHref = typeof href === "string" ? `/${locale}${href === "/" ? "" : href}` : href;

    return (
        <Link href={localizedHref} className={className} {...props}>
            {children}
        </Link>
    );
}
