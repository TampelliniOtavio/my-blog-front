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
import PostDropdownMenu from "./PostDropdownMenu";
import { getAuthAtom } from "@/nanostores/auth";
import { useCallback, useRef, useState } from "react";
import { HeartIcon } from "lucide-react";
import { actions } from "astro:actions";
import { useToast } from "@/hooks/use-toast";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

type Props = {
    post: IPost;
    url: URL;
    withLink?: boolean;
};

export default function Post({ post, url, withLink = false }: Props) {
    const { toast } = useToast();
    const { t, lang } = useTranslations(url);
    const loadingRef = useRef(false);
    const [isLiked, setIsLiked] = useState(post.isLikedByUser);
    const [likeCount, setLikeCount] = useState(post.likeCount);

    const auth = getAuthAtom();
    const isAuthenticated = auth !== undefined;

    const createdAt = new Date(post.createdAt);

    const alternateLike = useCallback(() => {
        if (loadingRef.current || !isAuthenticated) {
            return;
        }
        loadingRef.current = true;

        const method = isLiked
            ? actions.posts.dislikePost
            : actions.posts.likePost;

        method({ xid: post.xid, auth: auth.getToken() })
            .then(({ data, error }) => {
                if (error) {
                    toast({
                        title: error.message,
                        variant: "destructive",
                    });
                    return;
                }
                setLikeCount(data.likeCount);
                setIsLiked(data.isLikedByUser);
            })
            .catch(() =>
                toast({
                    title: t("api.generic-error-response"),
                    variant: "destructive",
                }),
            );
        loadingRef.current = false;
    }, [isLiked, setLikeCount, isAuthenticated]);

    return (
        <Card className="rounded-none border-x-transparent">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>{t("post.title", post.createdBy)}</CardTitle>
                <PostDropdownMenu post={post} canDeletePost />
            </CardHeader>
            <PostLink url={url} post={post} hasLink={withLink}>
                <CardContent>
                    <p>{post.post}</p>
                </CardContent>
            </PostLink>
            <CardFooter className="flex flex-col align-start items-start md:flex-row md:justify-between">
                <div>
                    <TooltipProvider
                        delayDuration={1000}
                        disableHoverableContent
                    >
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className="cursor-pointer select-none flex items-center"
                                    onClick={alternateLike}
                                >
                                    <HeartIcon
                                        fill={isLiked ? "red" : "transparent"}
                                        color={isLiked ? "red" : undefined}
                                        className="inline duration-150 transition-colors"
                                    />
                                    {likeCount}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                    {t(isLiked ? "post.dislike" : "post.like")}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
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
