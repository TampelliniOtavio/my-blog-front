import type { AstroCookies } from "astro";
import type { ResponseLogin } from "./auth/fetch";

interface IAuth {
    token: string;
}

export class Auth {
    constructor(private readonly data: IAuth) {}

    headers(): HeadersInit {
        return {
            Authorization: "Bearer " + this.data.token,
        };
    }
}

export function getAuth(cookies: AstroCookies): Auth | undefined {
    const auth = cookies.get("auth");

    if (!auth) {
        return undefined;
    }

    return new Auth(auth.json());
}

export function setAuth(cookies: AstroCookies, data: ResponseLogin) {
    cookies.set("auth", data);
}
