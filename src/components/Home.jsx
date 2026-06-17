import { useQuery } from "@tanstack/react-query";
import { getPublishedPosts } from "../features/posts/postService";
import { Link } from "react-router-dom";
import LikeButton from "../features/posts/likes/LikeButton";

export default function Home() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["published-posts"],
        queryFn: getPublishedPosts,
    });

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-10 text-slate-500">
                Loading published stories...
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
                <h1 className="text-4xl font-bold text-slate-900">
                    Latest Stories
                </h1>
                <p className="text-slate-500 mt-2">
                    Read insights, ideas, and stories from writers
                </p>
            </div>

            <div className="max-w-3xl mx-auto px-6 pb-10">

                {posts.length === 0 ? (
                    <p className="text-slate-500">
                        No published stories yet
                    </p>
                ) : (
                    <div className="divide-y divide-slate-200">

                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="
                                    block py-6 px-3
                                    rounded-lg
                                    hover:bg-slate-50
                                    transition-all duration-200
                                    group
                                    cursor-pointer
                                "
                            >
                                {/* CLICKABLE AREA (except like button) */}
                                <Link to={`/posts/${post.id}`}>

                                    <h2 className="text-2xl font-semibold text-slate-900 group-hover:text-black leading-snug">
                                        {post.title}
                                    </h2>

                                    <p className="mt-2 text-slate-600 leading-relaxed">
                                        {getExcerpt(post.content)}
                                    </p>

                                    <div className="mt-3 text-sm text-slate-500 flex items-center gap-2">
                                        <span>by User #{post.author_id}</span>
                                        <span>•</span>
                                        <span>
                                            {post.published_at
                                                ? new Date(post.published_at).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    }
                                                )
                                                : "No date"}
                                        </span>
                                    </div>
                                </Link>

                                {/* STATS AREA (NOT inside Link now) */}
                                <div className="mt-4 flex items-center gap-6 text-sm text-slate-600">

                                    {/* LIKE BUTTON (safe click now) */}
                                    <LikeButton post={post} />

                                    {/* COMMENTS */}
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