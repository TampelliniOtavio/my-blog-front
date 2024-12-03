import { sequence } from "astro:middleware";
import { middleware as localeMiddleware } from "astro:i18n";

export const onRequest = sequence(
    localeMiddleware({
        fallbackType: "redirect",
        prefixDefaultLocale: true,
        redirectToDefaultLocale: true,
    }),
);
