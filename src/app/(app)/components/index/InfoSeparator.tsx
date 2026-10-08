"use client";

import { useTranslations } from "@/lib/TranslationProvider";
import { useState, useEffect } from "react";
import { LuBadgeInfo } from "react-icons/lu";

// message keys, resolved with the current locale at render
const infoBarMessages = ["home.info_values", "home.info_mission", "home.info_vision", "home.info_commitment"];

// generates a new info message on every page refresh
export default function InfoSeparator() {
    const t = useTranslations();
    const [randomMessage, setRandomMessage] = useState("");

    useEffect(() => {
        const newMessage = infoBarMessages[Math.floor(Math.random() * infoBarMessages.length)];
        setRandomMessage(newMessage);
    }, []);

    return (
        <section className="flex min-h-[8vh] flex-row items-center justify-center gap-2 bg-mindvista-700 text-center text-lg font-bold text-white">
            <LuBadgeInfo /> {randomMessage && t(randomMessage)}
        </section>
    );
}
