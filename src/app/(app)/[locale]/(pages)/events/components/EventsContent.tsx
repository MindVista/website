"use client";

import Hr from "../../../../components/Hr";
import { useEvents } from "../EventsProvider";
import { EventsList } from "./EventsList";
import { useTranslations } from "@/lib/TranslationProvider";

export function EventsContent() {
    const { ongoingEvents, isLoading } = useEvents();
    const t = useTranslations();
    const hasOngoingEvents = !isLoading && ongoingEvents && ongoingEvents.length > 0;

    return (
        <div className="space-y-16">
            {/* Ongoing Events Section - only rendered if there are ongoing events */}
            {hasOngoingEvents && (
                <section>
                    <h2 className="mb-8 text-center text-2xl font-bold text-cText">{t("events.ongoing_events")}</h2>
                    <EventsList type="ongoing" className="mx-auto max-w-3xl" variant="featured" />
                </section>
            )}

            {/* Upcoming Events Section */}
            <section>
                <h2 className="mb-8 text-center text-2xl font-bold text-cText">{t("events.upcoming_events")}</h2>
                <EventsList type="upcoming" className="mx-auto max-w-3xl" />
            </section>

            <Hr className="mx-auto lg:max-w-[60vw]" />

            {/* Past Events Section */}
            <section>
                <h2 className="mb-8 text-2xl font-bold text-cText">{t("events.past_events")}</h2>
                <EventsList type="past" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" />
            </section>
        </div>
    );
}
