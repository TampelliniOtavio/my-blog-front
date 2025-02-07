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
            const auth = await getAuth(context.cookies);
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
        async handler(input, context) {
            let headers: HeadersInit = {};
            const auth = await getAuth(context.cookies);
            if (auth) {
                headers = auth.headers();
            }

            const posts = await fetchBackend.get<IPost[]>(
                `/posts?limit=${input.limit}&offset=${input.offset}`,
                {
                    headers,
                },
            );
            if (isApiError(posts)) {
                throw apiErrorToActionError(posts);
            }
            return posts;
        },
    }),
    getAPost: defineAction({
        accept: "json",
        input: z.string(),
        async handler(xid, context) {
            let headers: HeadersInit = {};
            const auth = await getAuth(context.cookies);
            if (auth) {
                headers = auth.headers();
            }
            const post = await fetchBackend.get<IPost>(`/posts/${xid}`, {
                headers,
            });
            if (isApiError(post)) {
                throw apiErrorToActionError(post);
            }
            return post;
        },
    }),
    deletePost: defineAction({
        accept: "json",
        input: z.object({
            xid: z.string(),
            auth: z.string().or(z.undefined()),
        }),
        async handler({ xid, auth }, _context) {
            if (!auth) {
                throw new UnauthenticatedError();
            }

            const del = await fetchBackend.delete<IPost>("/posts/" + xid, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                },
            });

            if (isApiError(del)) {
                throw apiErrorToActionError(del);
            }

            return del;
        },
    }),
    likePost: defineAction({
        accept: "json",
        input: z.object({
            xid: z.string(),
            auth: z.string().or(z.undefined()),
        }),
        async handler({ xid, auth }, _context) {
            if (!auth) {
                throw new UnauthenticatedError();
            }

            const liked = await fetchBackend.post<IPost>(
                "/posts/" + xid + "/like",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                },
            );

            if (isApiError(liked)) {
                throw apiErrorToActionError(liked);
            }

            return liked;
        },
    }),
    dislikePost: defineAction({
        accept: "json",
        input: z.object({
            xid: z.string(),
            auth: z.string().or(z.undefined()),
        }),
        async handler({ xid, auth }, _context) {
            if (!auth) {
                throw new UnauthenticatedError();
            }

            const disliked = await fetchBackend.post<IPost>(
                "/posts/" + xid + "/dislike",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                },
            );

            if (isApiError(disliked)) {
                throw apiErrorToActionError(disliked);
            }

            return disliked;
        },
    }),
};
