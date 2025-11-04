import type { GlobalConfig } from "payload";
import { canEditContent, denyAccessField } from "@lib/access";
import { revalidatePath } from "next/cache";

export const AboutPage: GlobalConfig = {
    slug: "about",
    admin: {
        group: "Static Content",
        preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL}/about`,
        livePreview: {
            url: `${process.env.NEXT_PUBLIC_SERVER_URL}/about`,
        },
    },
    versions: {
        max: 25,
        drafts: true,
    },
    hooks: {
        afterChange: [
            () => {
                revalidatePath("/about");
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
            name: "teamMembers",
            label: "Team Members",
            type: "array",
            required: true,
            access: {
                create: canEditContent,
                update: canEditContent,
            },
            fields: [
                {
                    name: "name",
                    type: "text",
                    required: true,
                },
                {
                    name: "role",
                    type: "text",
                    required: true,
                },
                {
                    name: "team",
                    type: "text",
                    required: true,
                },
                {
                    name: "pronouns",
                    type: "text",
                    required: true,
                },
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
    ],
};
