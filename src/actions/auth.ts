import {
    apiErrorToActionError,
    DefaultActionError,
    fetchBackend,
    isApiError,
} from "@/lib/fetch";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

interface SignInSuccess {
    message: "User created successfully";
    user: {
        Xid: string;
        Username: string;
        Email: string;
    };
}

export const auth = {
    signinUser: defineAction({
        input: z.object({
            username: z.string(),
            password: z.string(),
            email: z.string().email(),
        }),
        async handler(input, _context) {
            const login = await fetchBackend
                .post<SignInSuccess>("/auth/signin", input)
                .catch(() => {
                    throw DefaultActionError();
                });
            if (isApiError(login)) {
                let defaultMessage = "errors.defaultMessage";

                switch (login.message) {
                    case "Email already exists":
                        defaultMessage = "signin.errors.emailExists";
                        break;
                    case "Username already exists":
                        defaultMessage = "signin.errors.userExists";
                        break;
                }

                login.message = defaultMessage;
                throw apiErrorToActionError(login);
            }

            return login;
        },
        accept: "form",
    }),
};
