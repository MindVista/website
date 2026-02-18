"use client";

import React from "react";
import { useDirectory } from "../DirectoryProvider";
import { Resource } from "@/payload-types";
import { DirectoryItemBox } from "../components/DirectoryItemBox";
import { Locale } from "@/lib/i18n";

interface ResourceDirectoryProps {
    locale: Locale;
}

export default function ResourceDirectoryClient({ locale }: ResourceDirectoryProps) {
    const { filteredItems } = useDirectory();
    const resources = filteredItems as Resource[];

    return (
        <>
            {resources.map((resource) => (
                <DirectoryItemBox key={resource.id} item={resource} type="resources" locale={locale} />
            ))}
        </>
    );
}
