import { getPayloadClient } from "@/payloadClient";
import { Page } from "@/payload-types";
import { Metadata } from "next";
import { getLocale, localize } from "./i18n";

export async function getPageFromCMS(slug: string): Promise<Page | null> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
        collection: "pages",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    });
    return docs[0] || null;
}

export function generatePageMetadata(page: Page | null, defaultTitle: string): Metadata {
    return {
        ...(page
            ? {
                  title: page.title,
                  description: page.seoDescription,
              }
            : {
                  title: defaultTitle,
              }),
    };
}

// metadata for a static page, using the French title/description from the CMS when on the French site
export async function getLocalizedPageMetadata(slug: string, params: Promise<{ locale: string }>): Promise<Metadata> {
    const locale = getLocale((await params).locale);
    const page = await getPageFromCMS(slug);
    if (!page) return {};

    return {
        title: localize(locale, page.title, page.titleFr),
        description: localize(locale, page.seoDescription, page.seoDescriptionFr),
    };
}
