import { getLocalizedPageMetadata } from "@/lib/getPageFromCMS";
import { Metadata } from "next";
import ResourceDirectoryClient from "./ResourceDirectoryClient";
import { getLocale } from "@/lib/i18n";

export default async function ResourceDirectory({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params;
    const locale = getLocale(rawLocale);
    return <ResourceDirectoryClient locale={locale} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    return getLocalizedPageMetadata("directory/resources", params);
}
