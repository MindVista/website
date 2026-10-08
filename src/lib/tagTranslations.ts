import { Locale } from "./i18n";

// French translations for club/resource tags and tag categories, keyed by their English name in the CMS.
// Tags are not translated in the backend, so any tag missing here falls back to its English name.
const TAG_TRANSLATIONS_FR: Record<string, string> = {
    // club tag categories
    Arts: "Arts",
    Athletics: "Sports",
    Career: "Carrière",
    "Community Support": "Soutien communautaire",
    Culture: "Culture",
    "Faculty Specific": "Par faculté",

    // club tags
    "Fine Art": "Beaux-arts",
    Performance: "Arts de la scène",
    Dance: "Danse",
    Consulting: "Services-conseils",
    Entrepreneurship: "Entrepreneuriat",
    Finance: "Finance",
    Healthcare: "Soins de santé",
    Marketing: "Marketing",
    Networking: "Réseautage",
    Politics: "Politique",
    "Professional Development": "Développement professionnel",
    "Real Estate": "Immobilier",
    Technology: "Technologie",
    "Community Outreach": "Engagement communautaire",
    Service: "Service communautaire",
    "Social Activism": "Militantisme social",
    Sustainability: "Développement durable",
    "Leisure & Hobbies": "Loisirs et passe-temps",
    "Publication & Writing": "Publication et écriture",
    "Religion & Cultural": "Religion et culture",
    Spiritual: "Spiritualité",
    "Student Society": "Association étudiante",
    Dentistry: "Médecine dentaire",
    Education: "Éducation",
    Engineering: "Génie",
    Law: "Droit",
    Management: "Gestion",
    Medicine: "Médecine",
    Music: "Musique",
    Nursing: "Sciences infirmières",
    "Physical Therapy": "Physiothérapie",
    Science: "Sciences",
    "Social Work": "Travail social",

    // resource tag categories
    "BIPOC Services": "Services PANDC",
    Directory: "Répertoire",
    "Help Lines": "Lignes d’écoute",
    "Indigenous Health": "Santé autochtone",
    "LGBTQ+ Services": "Services LGBTQ+",
    "Medical Services": "Services médicaux",
    "Mental Health Services": "Services de santé mentale",
    "Substance Use": "Consommation de substances",
    "Support and Community Services": "Services de soutien et communautaires",
    "Violence Services": "Services liés à la violence",

    // resource tags
    "Abortion Services": "Services d’avortement",
    "Contraception Services": "Services de contraception",
    "Dental Clinic": "Clinique dentaire",
    Lab: "Laboratoire",
    "Medical Clinic": "Clinique médicale",
    "Menstrual Health": "Santé menstruelle",
    Physiotherapy: "Physiothérapie",
    "STI Testing": "Dépistage des ITSS",
    Counselling: "Counseling",
    "Crisis Support": "Soutien en situation de crise",
    "Disordered Eating": "Troubles alimentaires",
    "Mental Wellness": "Bien-être mental",
    Psychological: "Services psychologiques",
    "Support Group": "Groupe de soutien",
    Accessibility: "Accessibilité",
    "Legal Service": "Services juridiques",
    "Safety Service": "Services de sécurité",
    "Domestic Violence": "Violence conjugale",
    "Sexual Assault Services": "Services en matière d’agression sexuelle",

    // virtual "Location" filter added in DirectoryProvider
    Location: "Emplacement",
    "On Campus": "Sur le campus",
};

export function translateTag(name: string, locale: Locale): string {
    return locale === "fr" ? (TAG_TRANSLATIONS_FR[name] ?? name) : name;
}
