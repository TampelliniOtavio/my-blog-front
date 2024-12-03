import { ui, defaultLang, type LanguageKeys, type TranslationKeys } from "./ui";

function getLangFromUrl(url: URL): LanguageKeys {
    const [, lang] = url.pathname.split("/");
    if (lang in ui) return lang as LanguageKeys;
    return defaultLang;
}

function translate(lang: keyof typeof ui) {
    return function t(key: TranslationKeys) {
        return ui[lang][key] || ui[defaultLang][key];
    };
}

export function useTranslations(url: URL): {
    t: (key: TranslationKeys) => string;
    lang: LanguageKeys;
} {
    const lang = getLangFromUrl(url);
    return {
        t: translate(lang),
        lang,
    };
}
