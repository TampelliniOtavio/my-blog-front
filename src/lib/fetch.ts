const baseUrl = "http://127.0.0.1:3000/api";

export type ApiError = {
    message: string;
    success: false;
};

export type FetchReturn<T = {}> = ApiError | T;

function baseFetch(url: string, init?: RequestInit): Promise<Response> {
    return fetch(baseUrl + url, init);
}

type RequestInitBackend = Omit<RequestInit, "method" | "body">;

function fetchWithBody(method: "POST" | "PUT" | "PATCH") {
    return <T extends object>(
        url: string,
        body?: T,
        init?: RequestInitBackend,
    ) => {
        const headers = init?.headers ?? {};
        return baseFetch(url, {
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
