import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
    "en", // English
    "ar", // Arabic
    "bn", // Bengali
    "fa", // Persian
    "fr", // French
    "id", // Indonesian
    "it", // Italian
    "nl", // Dutch
    "pt", // Portuguese
    "ru", // Russian
    "sq", // Albanian
    "th", // Thai
    "tr", // Turkish
    "ur", // Urdu
    "zh", // Chinese (Simplified)
    "ms", // Malay
    "es", // Spanish
    "sw", // Swahili
  ],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
