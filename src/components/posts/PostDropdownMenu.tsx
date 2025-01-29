import type { IPost } from "@/lib/posts/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { actions } from "astro:actions";
import { getAuthAtom } from "@/nanostores/auth";
import { navigate } from "astro:transitions/client";
import type { TranslationKeys } from "@/i18n/ui";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "@/i18n/utils";
import { useEffect, useState } from "react";
import {
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronLeft } from "lucide-react";

type Props = {
    post: IPost;
    canDeletePost?: boolean;
};

export default function PostDropdownMenu({ post }: Props) {
    const auth = getAuthAtom();
    const baseUrl = window.location.origin;
    const { t } = useTranslations(new window.URL(window.location.href));
    const [, language] = window.location.pathname.split("/");
    const [canDeletePost, setCanDeletePost] = useState(false);

    function deletePost() {
        actions.posts
            .deletePost({ xid: post.xid, auth: auth?.getToken() })
            .then(({ error }) => {
                if (error) {
                    toast({
                        title: "Oops",
                        description: t(error.message as TranslationKeys),
                    });
                    return;
                }

                navigate(window.location.pathname);
            })
            .catch(() =>
                toast({
                    title: "Oops",
                    description: t("api.generic-error-response"),
                    variant: "destructive",
                }),
            );
    }

    useEffect(() => {
        auth?.getUser().then((u) => {
            setCanDeletePost(u?.username === post.createdBy);
        });
    }, [post.createdBy, auth]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="flex justify-between items-center">
                        {t("post.dropdown.share")}
                        <ChevronLeft className="inline" size={20} />
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem
                                onClick={() =>
                                    window.navigator.clipboard.writeText(
                                        `${baseUrl}/${language}/posts/${post.xid}`,
                                    )
                                }
                            >
                                {t("post.dropdown.share.copy")}
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                {canDeletePost && (
                    <DropdownMenuItem onClick={deletePost}>
                        {t("post.dropdown.delete")}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
