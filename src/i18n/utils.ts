import { ui, defaultLang, type LanguageKeys, type TranslationKeys } from "./ui";

function getLangFromUrl(url: URL): LanguageKeys {
    const [, lang] = url.pathname.split("/");
    if (lang in ui) return lang as LanguageKeys;
    return defaultLang;
}

function translate(lang: keyof typeof ui) {
    return function t(key: TranslationKeys, ...replaces: string[]) {
        const translated = ui[lang][key] || ui[defaultLang][key];
        if (replaces.length === 0) {
            return translated;
        }

        return replaces.reduce(
            (prev, curr, index) => prev.replace(`$${index}`, curr),
            translated,
        );
    };
}

export function useTranslations(url: URL): {
    t: (key: TranslationKeys, ...replaces: string[]) => string;
    lang: LanguageKeys;
} {
    const lang = getLangFromUrl(url);
    return {
        t: translate(lang),
        lang,
    };
}

export type IUseTranslations = ReturnType<typeof useTranslations>;
