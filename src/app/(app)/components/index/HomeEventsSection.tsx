"use client";

import { Event } from "@/payload-types";
import { fetchEvents } from "../../[locale]/(pages)/events/actions";
import { useEffect, useState } from "react";
import { EventCard } from "../../[locale]/(pages)/events/components/EventCard";
import { EventCardSkeleton } from "../../[locale]/(pages)/events/components/EventCardSkeleton";
import LocaleLink from "../LocaleLink";
import { useTranslations } from "@/lib/TranslationProvider";
import { HiArrowLongRight } from "react-icons/hi2";
import Hr from "../Hr";

export default function HomeEventsSection() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const t = useTranslations();
    const [eventType, setEventType] = useState<"ongoing" | "upcoming">("upcoming");

    useEffect(() => {
        // first try to fetch ongoing events
        fetchEvents("ongoing")
            .then((ongoingEvents) => {
                if (ongoingEvents && ongoingEvents.length > 0) {
                    // if there are ongoing events, use them
                    setEvents(ongoingEvents);
                    setEventType("ongoing");
                } else {
                    // if no ongoing events, try to fetch upcoming events
                    return fetchEvents("upcoming").then((upcomingEvents) => {
                        if (upcomingEvents && upcomingEvents.length > 0) {
                            setEvents(upcomingEvents);
                            setEventType("upcoming");
                        }
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []); // only fetch on mount

    if (!events.length && !isLoading) {
        return null; // don't show the section if no events are available
    }

    const variant = eventType === "ongoing" ? "featured" : "default";

    return (
        <>
            <section className="px-[5vw] md:px-[7.5vw] lg:px-[10vw]">
                <h2 className="text-center text-3xl font-bold md:text-4xl">{eventType === "ongoing" ? t("events.ongoing_events") : t("events.upcoming_events")}</h2>
                <p className="mb-8 mt-3 text-center text-xl font-medium text-cTextOffset md:px-20 lg:px-28">{eventType === "ongoing" ? t("events.ongoing_intro") : t("events.intro")}</p>
                <div className="mx-auto max-w-4xl">
                    <div className="flex flex-col gap-6 px-6">
                        {isLoading ? (
                            <>
                                <EventCardSkeleton variant="default" /> <EventCardSkeleton variant="default" />
                            </>
                        ) : (
                            events.map((event) => <EventCard key={event.id} event={event} variant={variant} />)
                        )}
                    </div>
                </div>
                <div className="mt-10 flex justify-center">
                    <LocaleLink href="/events" className="flex items-center gap-3 rounded-lg border border-cBorder p-3 text-lg font-semibold transition-all duration-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-50 dark:hover:border-blue-500 dark:hover:text-blue-400 dark:hover:shadow-blue-950/50">
                        {t("events.view_all")} <HiArrowLongRight />
                    </LocaleLink>
                </div>
            </section>

            <Hr className="mx-[25vw] my-16" />
        </>
    );
}
