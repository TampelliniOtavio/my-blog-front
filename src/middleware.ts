import { sequence } from "astro:middleware";
import { middleware as localeMiddleware } from "astro:i18n";
import type { MiddlewareHandler } from "astro";
import { getAuth } from "./lib/auth";
import { useTranslations } from "./i18n/utils";

const authMiddleware: MiddlewareHandler = (context, next) => {
    if (
        context.url.pathname.includes("/login") &&
        getAuth(context.cookies) !== undefined
    ) {
        const { lang } = useTranslations(context.url);
        return context.redirect("/" + lang);
    }

    return next();
};

export const onRequest = sequence(
    localeMiddleware({
        fallbackType: "redirect",
        prefixDefaultLocale: true,
        redirectToDefaultLocale: true,
    }),
    authMiddleware,
);
