import type { AstroCookies } from "astro";
import type { ResponseLogin } from "./auth/fetch";
import { fetchBackend, isApiError } from "./fetch";

export interface IAuth {
    token: string;
    user?: IUser;
}

export interface IUser {
    xid: string;
    id: number;
    name: string;
    username: string;
}

export class Auth {
    constructor(private data: IAuth) {}

    headers(): HeadersInit {
        return {
            Authorization: "Bearer " + this.data.token,
        };
    }

    getToken(): string {
        return this.data.token;
    }

    async getUser(
        fetchUser: boolean = false,
    ): Promise<Readonly<IUser> | undefined> {
        if (!this.data.user) {
            if (!fetchUser) {
                return undefined;
            }

            return await fetchBackend
                .get<IUser>("/auth", {
                    headers: {
                        ...this.headers(),
                    },
                })
                .then((r) => {
                    return isApiError(r) ? undefined : Object.freeze(r);
                });
        }

        return Object.freeze(this.data.user);
    }
}

export async function getAuth(
    cookies: AstroCookies,
    fetchUser: boolean = false,
): Promise<Auth | undefined> {
    const auth = cookies.get("auth");

    if (!auth) {
        return undefined;
    }

    const authObj = new Auth(auth.json());

    await authObj.getUser(fetchUser);

    return authObj;
}

export function setAuth(cookies: AstroCookies, data: ResponseLogin) {
    cookies.set("auth", data);
}

export function deleteAuth(cookies: AstroCookies) {
    cookies.delete("auth");
}
