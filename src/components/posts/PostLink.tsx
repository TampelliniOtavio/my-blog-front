import { useTranslations } from "@/i18n/utils";
import type { IPost } from "@/lib/posts/types";
import { type PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    post: IPost;
    url: URL;
    hasLink: boolean;
}>;

export default function PostLink({
    post: { xid },
    children,
    url,
    hasLink,
}: Props) {
    const { lang } = useTranslations(url);
    return hasLink ? (
        <a href={"/" + lang + "/posts/" + xid}>{children}</a>
    ) : (
        children
    );
}
