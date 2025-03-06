import { getAuth } from "@/lib/auth";
import { apiErrorToActionError, fetchBackend, isApiError } from "@/lib/fetch";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const users = {
    getUser: defineAction({
        input: z.object({
            username: z.string(),
        }),
        async handler({ username }, context) {
            const auth = await getAuth(context.cookies);

            const headers: HeadersInit = auth?.headers() ?? {};

            const user = await fetchBackend.get("/users/" + username, {
                headers: {
                    ...headers,
                },
            });

            if (isApiError(user)) {
                throw apiErrorToActionError(user);
            }

            return user;
        },
    }),
};
