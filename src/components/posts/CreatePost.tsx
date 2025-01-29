import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useTranslations } from "@/i18n/utils";
import { useState, type FormEventHandler } from "react";
import { isApiError } from "@/lib/fetch";
import type { TranslationKeys } from "@/i18n/ui";
import { getAuthAtom } from "@/nanostores/auth";

type Props = {
    url: URL;
};

export default function CreatePost({ url }: Props) {
    const { t } = useTranslations(url);
    const [err, setErr] = useState<TranslationKeys>();
    const [loading, setLoading] = useState(false);

    const auth = getAuthAtom();

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;

        const formData = new FormData(target);
        target.reset();

        setLoading(true);
        fetch("/api/posts", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: "Bearer " + auth?.getToken(),
            },
        })
            .then((r) => r.json())
            .then((data) =>
                isApiError(data)
                    ? setErr(data.message as TranslationKeys)
                    : window.location.reload(),
            )
            .catch(() => {
                setErr("api.generic-error-response");
            })
            .finally(() => setLoading(false));
    };

    return (
        <form
            method="post"
            onSubmit={auth ? onSubmit : undefined}
            className="grid w-full gap-2"
        >
            <Textarea
                id="textarea-create-post"
                name="post"
                className="resize-none"
                rows={3}
                maxLength={255}
                required={Boolean(auth)}
                disabled={!auth}
            />
            <Button
                type="submit"
                className={loading || !auth ? "disabled" : undefined}
                disabled={loading || !auth}
            >
                {t("createPost.button")}
            </Button>
            {!auth && (
                <span className="text-gray-400">
                    {t("createPost.not-logged-in")}
                </span>
            )}
            {err && <span className="text-red-400">{t(err)}</span>}
        </form>
    );
}
