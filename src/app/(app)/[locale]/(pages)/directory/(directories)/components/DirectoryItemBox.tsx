import React from "react";
import { Club, Resource } from "../../../../../../../payload-types";
import LocaleLink from "../../../../../components/LocaleLink";
import { Locale } from "../../../../../../../lib/i18n";

interface DirectoryItemBoxProps {
    item: Club | Resource;
    type: "clubs" | "resources";
    locale: Locale;
}

export function DirectoryItemBox({ item, type, locale }: DirectoryItemBoxProps) {
    const description = locale == "fr" ? item.descriptionFr : item.description;
    const title = locale == "fr" ? item.titleFr : item.title;

    return (
        <LocaleLink href={`/directory/${type}/${item.slug}`} key={item.id} prefetch={true} className="group block rounded-lg border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 dark:hover:border-blue-800 dark:hover:shadow-blue-950/50">
            <h2 className="mb-4 text-xl font-semibold text-cText group-hover:text-blue-600 dark:group-hover:text-blue-400">{title}</h2>
            <p className="mb-4 line-clamp-3 text-cTextOffset">{description}</p>
            {item.tags && item.tags.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-2">
                    {item.tags.map((tag: { id: string | number; name?: string } | number) => (
                        <span key={typeof tag === "number" ? tag : tag.id} className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                            {typeof tag === "number" ? tag : tag.name}
                        </span>
                    ))}
                </div>
            )}
        </LocaleLink>
    );
}
