export const languages = {
    en: "English",
    ["pt-br"]: "Português Brasileiro",
};

export type LanguageKeys = keyof typeof languages;

export const defaultLang: LanguageKeys = "pt-br";

const defaultTranslation = {
    "login.title": "Entre na sua conta",
    "login.description": "Insira seu usuário e senha para entrar na sua conta",
    "login.username.label": "Usuário",
    "login.password.label": "Senha",
    "login.submit-button": "Entrar",
};

export type TranslationKeys = keyof typeof defaultTranslation;

export const ui: Record<LanguageKeys, Record<TranslationKeys, string>> = {
    "pt-br": defaultTranslation,
    en: {
        ...defaultTranslation,
        "login.title": "Log into your account",
        "login.description":
            "Insert your username and password to log into your account",
        "login.username.label": "Username",
        "login.password.label": "Password",
        "login.submit-button": "Login",
    },
} as const;
