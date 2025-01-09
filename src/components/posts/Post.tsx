import { useTranslations } from "@/i18n/utils";
import type { IPost } from "@/lib/posts/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import PostLink from "./PostLink";

type Props = {
    post: IPost;
    url: URL;
    withLink?: boolean;
};

export default function Post({ post, url, withLink = false }: Props) {
    const { t, lang } = useTranslations(url);

    const createdAt = new Date(post.createdAt);

    return (
        <Card className="rounded-none border-x-transparent">
            <CardHeader>
                <CardTitle>{t("post.title", post.createdBy)}</CardTitle>
            </CardHeader>
            <PostLink url={url} post={post} hasLink={withLink}>
                <CardContent>
                    <p>{post.post}</p>
                </CardContent>
            </PostLink>
            <CardFooter>
                <PostLink url={url} post={post} hasLink={withLink}>
                    <div>
                        {createdAt.toLocaleString(undefined, {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </PostLink>
            </CardFooter>
        </Card>
    );
}
