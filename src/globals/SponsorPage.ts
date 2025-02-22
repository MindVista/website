import type { GlobalConfig } from "payload";
import { canEditContent, canEditFrenchContent, denyAccessField } from "@lib/access";
import { revalidatePath } from "next/cache";

export const SponsorPage: GlobalConfig = {
    slug: "sponsor",
    admin: {
        group: "Static Content",
        preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL}/sponsor`,
        livePreview: {
            url: `${process.env.NEXT_PUBLIC_SERVER_URL}/sponsor`,
        },
    },
    versions: {
        max: 25,
        drafts: true,
    },
    hooks: {
        // revalidate page on "save"
        afterChange: [
            () => {
                revalidatePath("/sponsor");
            },
        ],
    },
    fields: [
        {
            name: "page",
            required: true,
            type: "relationship",
            relationTo: "pages",
            access: {
                update: denyAccessField,
            },
        },
        {
            name: "ourSponsorsSection",
            label: "Our Sponsors Section - En",
            required: true,
            type: "textarea",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "ourSponsorsSectionFr",
            label: "Our Sponsors Section - Fr",
            required: false,
            type: "textarea",
            access: {
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "callout",
            label: "Callout - En",
            required: true,
            type: "text",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "calloutFr",
            label: "Callout - Fr",
            required: false,
            type: "text",
            access: {
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "sponsorUsSection",
            label: "Sponsor Us Section - En",
            required: true,
            type: "textarea",
            access: {
                update: canEditContent,
            },
        },
        {
            name: "sponsorUsSectionFr",
            label: "Sponsor Us Section - Fr",
            required: false,
            type: "textarea",
            access: {
                read: canEditFrenchContent,
                update: canEditFrenchContent,
            },
        },
        {
            name: "sponsors",
            type: "array",
            label: "Sponsor Logos",
            required: true,
            access: {
                create: canEditContent,
            },
            fields: [
                {
                    name: "url",
                    label: "Sponsor's Website",
                    type: "text",
                    required: false,
                    access: {
                        update: canEditContent,
                    },
                },
                {
                    name: "logo",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                    access: {
                        update: canEditContent,
                    },
                },
            ],
        },
    ],
};
