import { useQuery } from "@tanstack/react-query";
import { getPublishedPosts } from "../features/posts/postService";
import { Link } from "react-router-dom";

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

    const posts = data?.data || [];

    const getExcerpt = (text) => {
        if (!text) return "";
        return text.length > 180
            ? text.slice(0, 180).trim() + "..."
            : text;
    };

    return (
        <div className="bg-white min-h-screen">

            {/* Header */}
            <div className="max-w-3xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-bold text-slate-900">
                    Latest Stories
                </h1>
                <p className="text-slate-500 mt-2">
                    Read insights, ideas, and stories from writers
                </p>
            </div>

            {/* Feed */}
            <div className="max-w-3xl mx-auto px-6 pb-10">

                {posts.length === 0 ? (
                    <p className="text-slate-500">
                        No published stories yet
                    </p>
                ) : (
                    <div className="divide-y divide-slate-200">

                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                to={`/posts/${post.id}`}
                                className="
                                    block py-6 px-3
                                    rounded-lg
                                    hover:bg-slate-50
                                    transition-all duration-200
                                    group
                                "
                            >

                                {/* Title */}
                                <h2 className="text-2xl font-semibold text-slate-900 group-hover:text-black leading-snug">
                                    {post.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="mt-2 text-slate-600 leading-relaxed">
                                    {getExcerpt(post.content)}
                                </p>

                                {/* Meta */}
                                <div className="mt-3 text-sm text-slate-500 flex items-center gap-2">
                                    <span>
                                        by User #{post.author_id}
                                    </span>

                                    <span>•</span>

                                    <span>
                                        {post.published_at
                                            ? new Date(
                                                post.published_at
                                            ).toLocaleDateString(
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

                                {/* Stats */}
                                <div className="mt-4 flex items-center gap-6 text-sm text-slate-600">

                                    {/* Likes */}
                                    <span className="flex items-center gap-2">
                                        <span className="text-pink-500">
                                            ❤️
                                        </span>
                                        <span>
                                            {post.like_count ?? 0}
                                        </span>
                                    </span>

                                    {/* Comments */}
                                    <span className="flex items-center gap-2">
                                        <span className="text-indigo-500">
                                            💬
                                        </span>
                                        <span>
                                            {post.comment_count ?? 0}
                                        </span>
                                    </span>

                                </div>

                            </Link>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}