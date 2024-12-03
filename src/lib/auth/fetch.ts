import { fetchBackend, type FetchReturn } from "../fetch";

export interface ResponseLogin {
    token: string;
}

export interface BodyLogin {
    username: string;
    password: string;
}

export async function sendLogin(
    data: BodyLogin,
): Promise<FetchReturn<ResponseLogin>> {
    return fetchBackend.post("/auth/login", data).then((r) => r.json());
}
