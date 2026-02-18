import Link from "next/link";
import LocaleLink from "./LocaleLink";

interface EmergencyButtonProps {
    className?: string;
}

export default function EmergencyButton(props: EmergencyButtonProps) {
    return (
        <LocaleLink href="/crisis" className={`${props.className} w-fit cursor-pointer rounded-lg border-2 border-solid border-cText bg-cRed p-2 font-bold text-cSoftWhite hover:opacity-90`} role="button">
            EMERGENCY
        </LocaleLink>
    );
}
