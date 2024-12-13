import { ActionError, type ActionErrorCode } from "astro:actions";

const baseUrl = "http://127.0.0.1:3000/api";

export type ApiError = {
    message: string;
    success: false;
    status: number;
};

export type FetchReturn<T = {}> = ApiError | T;

async function baseFetch<T = any>(
    url: string,
    init?: RequestInit,
): Promise<FetchReturn<T>> {
    return fetch(baseUrl + url, init).then((d) => d.json());
}

type RequestInitBackend = Omit<RequestInit, "method" | "body">;

function fetchWithBody(method: "POST" | "PUT" | "PATCH") {
    return <T extends object>(
        url: string,
        body?: object,
        init?: RequestInitBackend,
    ) => {
        const headers = init?.headers ?? {};
        return baseFetch<T>(url, {
            ...init,
            method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        });
    };
}

function fetchWithoutBody(method: "GET" | "DELETE") {
    return (url: string, init?: RequestInitBackend) => {
        return baseFetch(url, {
            ...init,
            method,
        });
    };
}

export const fetchBackend = {
    get: fetchWithoutBody("GET"),
    post: fetchWithBody("POST"),
    put: fetchWithBody("PUT"),
    delete: fetchWithoutBody("DELETE"),
};

export function isApiError(data: FetchReturn): data is ApiError {
    return "message" in data && "success" in data && !data.success;
}

function statusToActionCode(status: number): ActionErrorCode {
    switch (status) {
        case 400:
            return "BAD_REQUEST";
        case 401:
            return "UNAUTHORIZED";
        case 404:
            return "NOT_FOUND";
        case 409:
            return "CONFLICT";
        case 412:
            return "PRECONDITION_FAILED";
        case 413:
            return "PAYLOAD_TOO_LARGE";
        case 429:
            return "TOO_MANY_REQUESTS";
        case 504:
            return "TIMEOUT";
        case 500:
        default:
            return "INTERNAL_SERVER_ERROR";
    }
}

export function apiErrorToActionError(data: ApiError): ActionError {
    return new ActionError({
        code: statusToActionCode(data.status),
        message: data.message,
    });
}

export const DefaultActionError = () =>
    new ActionError({ code: "INTERNAL_SERVER_ERROR" });
