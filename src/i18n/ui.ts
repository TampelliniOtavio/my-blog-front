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
    "login.response.incorrect-credentials": "Usuário ou senha incorreta",
    "api.generic-error-response": "Algo deu errado",
    "auth.authenticated": "Você está logado",
    "auth.not-authenticated": "Você Não está logado",
    "auth.unauthorized": "Não Autorizado",
    "signin.title": "Cadastro",
    "signin.description": "Cadastre-se para acessar mais funcionalidades",
    "signin.email.label": "Email",
    "signin.card.title": "Cadastre sua conta",
    "signin.submitButton": "Cadastrar",
    "signin.errors.emailExists": "Já Existe um email cadastrado",
    "signin.errors.userExists": "Já Existe um usuário cadastrado",
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
        "login.response.incorrect-credentials":
            "Incorrect username or password",
        "api.generic-error-response": "Algo deu errado",
        "auth.authenticated": "You are logged in",
        "auth.not-authenticated": "You are not logged in",
        "auth.unauthorized": "Unauthorized",
        "signin.title": "Sign in",
        "signin.description": "Sign in to access more functionalities",
        "signin.submitButton": "Create",
        "signin.card.title": "Create your account",
        "signin.errors.emailExists": "Email already exists",
        "signin.errors.userExists": "Username already exists",
    },
} as const;
