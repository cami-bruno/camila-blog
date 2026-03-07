interface LanguageBadgeProps {
  language: "es" | "en";
}

export function LanguageBadge({ language }: LanguageBadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold tracking-wide ${
        language === "es"
          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
      }`}
      aria-label={language === "es" ? "Spanish" : "English"}
    >
      {language === "es" ? "ES" : "EN"}
    </span>
  );
}
