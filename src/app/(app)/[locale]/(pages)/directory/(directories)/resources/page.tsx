import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { Metadata } from "next";
import ResourceDirectoryClient from "./ResourceDirectoryClient";
import { getLocale } from "@/lib/i18n";

export default async function ResourceDirectory({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params;
    const locale = getLocale(rawLocale);
    return <ResourceDirectoryClient locale={locale} />;
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("directory/resources");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
