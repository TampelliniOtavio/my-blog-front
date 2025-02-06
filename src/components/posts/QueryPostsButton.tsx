import type { IPost } from "@/lib/posts/types";
import { useState } from "react";
import Post from "./Post";
import { actions } from "astro:actions";
import { Button } from "../ui/button";
import { LoaderIcon, RotateCw } from "lucide-react";

type Props = {
    limit: number;
    url: URL;
};

export default function QueryPostsButton({ url, limit }: Props) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [offset, setOffset] = useState(limit);
    function appendPosts() {
        setLoading(true);
        setTimeout(() => {
            actions.posts
                .getPosts({
                    limit,
                    offset,
                })
                .then(({ data, error }) => {
                    if (error || data.length === 0) {
                        return;
                    }

                    setPosts((post) => post.concat(data));
                    setOffset((o) => o + data.length);
                })
                .catch(() => null)
                .finally(() => setLoading(false));
        }, 500);
    }

    return (
        <>
            {posts.map((post) => (
                <Post post={post} url={url} key={post.xid} />
            ))}
            <div className="w-full flex place-content-center mt-5">
                {loading && (
                    <LoaderIcon
                        size={48}
                        className="animate-spin"
                        color={"gray"}
                    />
                )}
                {!loading && <RotateCw size={48} onClick={appendPosts} />}
            </div>
        </>
    );
}
