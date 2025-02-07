export const languages = {
    en: "English",
    ["en-us"]: "English - United States",
    pt: "Português",
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
    "login.cancel-button": "Cancelar",
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
    "signin.cancelButton": "Cancelar",
    "signin.errors.emailExists": "Já Existe um email cadastrado",
    "signin.errors.userExists": "Já Existe um usuário cadastrado",
    "post.title": "@$0",
    "post.like": "Curtir",
    "post.dislike": "Remover Curtida",
    "post.dropdown.share": "Compartilhar",
    "post.dropdown.share.copy": "Copiar para área de transferência",
    "post.dropdown.delete": "Remover",
    "createPost.button": "Postar",
    "createPost.not-logged-in": "Não está logado",
    "createPost.error.post-not-valid": "Campo Inválido",
    "navbar.home": "Início",
    "navbar.account": "Conta",
    "navbar.login": "Entrar",
    "navbar.signin": "Cadastrar",
    "navbar.logout": "Sair",
};

export type TranslationKeys = keyof typeof defaultTranslation;

const englishTranslation: Record<TranslationKeys, string> = {
    ...defaultTranslation,
    "login.title": "Log into your account",
    "login.description":
        "Insert your username and password to log into your account",
    "login.username.label": "Username",
    "login.password.label": "Password",
    "login.submit-button": "Login",
    "login.cancel-button": "Cancel",
    "login.response.incorrect-credentials": "Incorrect username or password",
    "api.generic-error-response": "Algo deu errado",
    "auth.authenticated": "You are logged in",
    "auth.not-authenticated": "You are not logged in",
    "auth.unauthorized": "Unauthorized",
    "signin.title": "Sign in",
    "signin.description": "Sign in to access more functionalities",
    "signin.submitButton": "Create",
    "signin.cancelButton": "Cancel",
    "signin.card.title": "Create your account",
    "signin.errors.emailExists": "Email already exists",
    "signin.errors.userExists": "Username already exists",
    "post.like": "Like",
    "post.dislike": "Dislike",
    "post.dropdown.share": "Share",
    "post.dropdown.share.copy": "Copy to Clipboard",
    "post.dropdown.delete": "Delete",
    "createPost.button": "Post",
    "createPost.not-logged-in": "Not Logged In",
    "createPost.error.post-not-valid": "Invalid Field",
    "navbar.home": "Home",
    "navbar.account": "Account",
    "navbar.login": "Log In",
    "navbar.signin": "Sign In",
    "navbar.logout": "Log Out",
};

export const ui: Record<LanguageKeys, Record<TranslationKeys, string>> = {
    pt: defaultTranslation,
    "pt-br": defaultTranslation,
    en: englishTranslation,
    "en-us": englishTranslation,
} as const;
