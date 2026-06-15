import { useQuery } from "@tanstack/react-query";
import { getPostsByUser } from "../features/posts/postService";
import { useAuth } from "../store/authStore";
import { Link } from "react-router-dom";

export default function MyPosts() {
    const { userId } = useAuth();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["my-posts", userId],
        queryFn: () => getPostsByUser(userId),
        enabled: !!userId,
    });

    // ✅ SAFE NORMALIZATION (fixes "map is not a function")
    const posts =
        Array.isArray(data)
            ? data
            : Array.isArray(data?.posts)
                ? data.posts
                : Array.isArray(data?.data)
                    ? data.data
                    : [];

    if (!userId) {
        return (
            <div className="p-6 text-red-500">
                Please login to view your posts
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-6 text-slate-500">
                Loading your posts...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 text-red-500">
                Failed to load your posts
            </div>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                My Posts
            </h1>

            {posts.length === 0 ? (
                <p className="text-slate-500">
                    You haven’t written any posts yet.
                </p>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            to={`/posts/${post.id}`}
                            className="block p-4 border rounded-xl hover:shadow-md transition bg-white"
                        >
                            <h2 className="font-semibold text-lg">
                                {post.title}
                            </h2>

                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                                {post.content}
                            </p>

                            <div className="text-xs text-slate-400 mt-2">
                                Status: {post.status}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}