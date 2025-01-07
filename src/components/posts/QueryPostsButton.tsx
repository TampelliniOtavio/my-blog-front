import type { IPost } from "@/lib/posts/types";
import { useState } from "react";
import Post from "./Post";
import { actions } from "astro:actions";
import { Button } from "../ui/button";

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
            <Button className="mt-5" disabled={loading} onClick={appendPosts}>
                search
            </Button>
        </>
    );
}
