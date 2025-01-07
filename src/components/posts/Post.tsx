import { useTranslations } from "@/i18n/utils";
import type { IPost } from "@/lib/posts/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

type Props = {
    post: IPost;
    url: URL;
};

export default function Post({ post, url }: Props) {
    const { t } = useTranslations(url);

    const createdAt = new Date(post.createdAt);
    return (
        <Card className="rounded-none border-x-transparent">
            <CardHeader>
                <CardTitle>{t("post.title", post.createdBy)}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{post.post}</p>
            </CardContent>
            <CardFooter>
                <div>
                    {createdAt.toLocaleString(undefined, {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </CardFooter>
        </Card>
    );
}
