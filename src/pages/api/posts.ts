import type { TranslationKeys } from "@/i18n/ui";
import { fetchBackend, isApiError } from "@/lib/fetch";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();

    const post = data.get("post");

    if (!post) {
        return new Response(
            JSON.stringify({
                code: 400,
                message: "createPost.error.post-not-valid",
            }),
            { status: 400 },
        );
    }

    const created = await fetchBackend.post(
        "/posts",
        { post },
        {
            headers: {
                Authorization: request.headers.get("Authorization") ?? "",
            },
        },
    );

    if (isApiError(created)) {
        let errorMessage: TranslationKeys = "api.generic-error-response";
        if (created.message == "Not Authorized") {
            errorMessage = "auth.not-authenticated";
        }

        return new Response(
            JSON.stringify({
                ...created,
                message: errorMessage,
            }),
            {
                status: created.status,
            },
        );
    }

    return new Response(JSON.stringify(created));
};
