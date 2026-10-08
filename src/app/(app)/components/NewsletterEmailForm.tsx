"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { addListMember } from "@/lib/addMailchimpSubscriber";
import confetti from "canvas-confetti";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useLocale, useTranslations } from "@/lib/TranslationProvider";

const getSchema = (invalidEmailMessage: string) =>
    z.object({
        email: z.string().email(invalidEmailMessage).trim(),
    });

type FormFields = z.infer<ReturnType<typeof getSchema>>;

export default function NewsletterEmailForm() {
    const t = useTranslations();
    const locale = useLocale();
    const schema = getSchema(t("newsletter.invalid_email"));
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        mode: "onSubmit",
    });

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const onSubmit = async (data: FormFields) => {
        setError(null);

        try {
            await addListMember(data.email);
            setIsSubscribed(true);
            console.log("Someone successfully subscribed to the newsletter via the footer form!");

            if (!audioRef.current) {
                audioRef.current = new Audio("/confirmation-sfx.mp3");
            }
            audioRef.current.play();

            confetti({
                particleCount: 200,
                spread: 359,
                gravity: 0.5,
                disableForReducedMotion: true,
            });
        } catch (error) {
            console.error("NEWSLETTER FORM FAILED TO SUBSCRIBE:", error);
            setError(t("newsletter.error"));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center">
            <div className="w-full">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr,auto]">
                    <input type="text" {...register("email")} placeholder={t("newsletter.placeholder")} className={`w-full rounded-lg border border-cBorder bg-cBackgroundOffset px-4 py-3 text-base text-cText transition-all duration-200 focus:border-cAccent focus:outline-none focus:ring-2 focus:ring-[color:rgb(var(--accent)/0.2)] md:text-lg ${isSubmitting ? "cursor-wait" : ""}`} disabled={isSubscribed || isSubmitting} />
                    <button type="submit" className={`w-full rounded-lg px-4 py-2 text-base font-semibold text-white transition-all duration-200 md:text-lg ${isSubscribed ? "cursor-not-allowed bg-cAccent opacity-100" : isSubmitting ? "cursor-wait bg-cAccent" : "bg-gradient-to-r from-cAccent to-cLightBlue hover:opacity-90"}`} disabled={isSubscribed || isSubmitting}>
                        {isSubscribed ? t("newsletter.subscribed") : isSubmitting ? t("newsletter.subscribing") : t("newsletter.subscribe")}
                    </button>
                </div>

                <div className="mt-3">
                    {errors.email && (
                        <p className="text-sm font-semibold text-cRed dark:text-red-400" role="alert">
                            {errors.email.message}
                        </p>
                    )}
                    {error && (
                        <Link href={`/${locale}/contact`} className="text-sm font-semibold text-cRed dark:text-red-400" role="alert">
                            {error}
                        </Link>
                    )}
                </div>
            </div>
        </form>
    );
}
