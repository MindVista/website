import { getPageFromCMS } from "@/lib/getPageFromCMS";
import { Metadata } from "next";
import ClubDirectoryClient from "./ClubDirectoryClient";
import { getLocale } from "@/lib/i18n";

export default async function ClubDirectory({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params;
    const locale = getLocale(rawLocale);

    return <ClubDirectoryClient locale={locale} />;
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("directory/clubs");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
