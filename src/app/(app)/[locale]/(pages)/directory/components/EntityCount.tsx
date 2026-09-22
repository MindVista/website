import { getTranslator, Translator } from "@/lib/getTranslator";
import { Locale } from "@/lib/i18n";
import { getPayloadClient } from "@/payloadClient";

async function getCount(collection: "clubs" | "resources") {
    const payload = await getPayloadClient();
    const result = await payload.count({
        collection,
        where: {
            currentlyActive: {
                equals: true,
            },
        },
    });
    return result.totalDocs;
}

type EntityCountProps = {
    collection: "clubs" | "resources";
    translator: Translator;
};
export default async function EntityCount({ collection, translator }: EntityCountProps) {
    const count = await getCount(collection);
    return (
        <>
            {/* get rid of 's' for nonplural if only 1 entity */}
            {count} {count === 1 ? translator(collection.slice(0, -1)) : translator(collection)}
        </>
    );
}
