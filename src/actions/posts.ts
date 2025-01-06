import { getAuth } from "@/lib/auth";
import {
    apiErrorToActionError,
    fetchBackend,
    isApiError,
    UnauthenticatedError,
} from "@/lib/fetch";
import type { IPost } from "@/lib/posts/types";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const posts = {
    addPost: defineAction({
        accept: "form",
        input: z.object({
            post: z.string(),
        }),
        async handler(input, context) {
            const auth = getAuth(context.cookies);
            if (!auth) {
                throw new UnauthenticatedError();
            }

            const insert = await fetchBackend.post<IPost>("/posts", input, {
                headers: {
                    ...auth.headers(),
                },
            });

            if (isApiError(insert)) {
                throw apiErrorToActionError(insert);
            }

            return input;
        },
    }),
    getPosts: defineAction({
        accept: "json",
        input: z.object({
            limit: z.number(),
            offset: z.number(),
        }),
        async handler(input, _context) {
            const posts = await fetchBackend.get<IPost>(
                `/posts?limit=${input.limit}&offset=${input.offset}`,
            );
            if (isApiError(posts)) {
                throw apiErrorToActionError(posts);
            }
            return posts;
        },
    }),
};
