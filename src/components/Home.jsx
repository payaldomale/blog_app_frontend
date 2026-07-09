import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "../features/posts/postService";
import { Link, useSearchParams } from "react-router-dom";
import LikeButton from "../features/posts/likes/LikeButton";
import PostTags from "../features/posts/tag/PostTags";

export default function Home() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    const { data, isLoading, isError } = useQuery({
        queryKey: ["posts", searchQuery],
        queryFn: () => searchPosts(searchQuery),
        enabled: true,
    });

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-10 text-slate-500">
                Loading stories...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-10 text-red-500">
                Failed to load stories
            </div>
        );
    }

    const rawPosts = data?.data || [];

    const posts = rawPosts.map((post) => ({
        ...post,
        isLiked: post.liked_by_me ?? false,
    }));

    const getExcerpt = (text) => {
        if (!text) return "";
        return text.length > 180
            ? text.slice(0, 180).trim() + "..."
            : text;
    };

    return (
        <div className="bg-white min-h-screen">

            <div className="max-w-3xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-bold text-slate-900">
                    {searchQuery ? `Search results for "${searchQuery}"` : "Latest Stories"}
                </h1>
                <p className="text-slate-500 mt-2">
                    Read insights, ideas, and stories from writers
                </p>
            </div>

            <div className="max-w-3xl mx-auto px-6 pb-10">

                {posts.length === 0 ? (
                    <p className="text-slate-500">
                        No stories found
                    </p>
                ) : (
                    <div className="divide-y divide-slate-200">

                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="py-6 px-3 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                            >
                                <Link to={`/posts/${post.id}`}>

                                    <h2 className="text-2xl font-semibold text-slate-900">
                                        {post.title}
                                    </h2>

                                    <p className="mt-2 text-slate-600">
                                        {getExcerpt(post.content)}
                                    </p>

                                    <PostTags postId={post.id} />

                                    <div className="mt-3 text-sm text-slate-500 flex items-center gap-2">
                                        <span>by {post.username || `User #${post.author_id}`}</span>
                                        <span>•</span>
                                        <span>
                                            {post.published_at
                                                ? new Date(post.published_at).toLocaleDateString("en-IN", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                                : "No date"}
                                        </span>
                                    </div>
                                </Link>

                                <div className="mt-4 flex items-center gap-6 text-sm text-slate-600">
                                    <LikeButton post={post} />

                                    <span className="flex items-center gap-2">
                                        <span className="text-indigo-500">💬</span>
                                        <span>{post.comment_count ?? 0}</span>
                                    </span>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}
