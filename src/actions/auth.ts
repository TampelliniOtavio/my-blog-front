import { getAuth, setAuth } from "@/lib/auth";
import { type ResponseLogin } from "@/lib/auth/fetch";
import {
    apiErrorToActionError,
    DefaultActionError,
    fetchBackend,
    isApiError,
    UnauthenticatedError,
} from "@/lib/fetch";
import { isAPropagatingComponent } from "astro/runtime/server/render/astro/factory.js";
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
                let defaultMessage = "api.generic-error-response";

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
    loginUser: defineAction({
        accept: "form",
        input: z.object({
            username: z.string(),
            password: z.string(),
        }),
        async handler(input, context) {
            const login = await fetchBackend
                .post<ResponseLogin>("/auth/login", input)
                .catch(() => {
                    throw DefaultActionError();
                });

            if (isApiError(login)) {
                let errorMessage = "api.generic-error-response";
                if (login.message == "Incorrect Username or Password") {
                    errorMessage = "login.response.incorrect-credentials";
                }

                login.message = errorMessage;
                throw apiErrorToActionError(login);
            }

            setAuth(context.cookies, login);

            return login;
        },
    }),
    myProfile: defineAction({
        async handler(_input, context) {
            const auth = await getAuth(context.cookies);

            if (!auth) {
                throw new UnauthenticatedError();
            }

            const user = await auth.getUser(true);

            if (!user) {
                throw new UnauthenticatedError();
            }

            return user;
        },
    }),
};
