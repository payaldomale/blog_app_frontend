import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../features/posts/postService";
import PostCard from "../features/posts/PostCard";

export default function Home() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["posts"],
        queryFn: getAllPosts,
    });

    if (isLoading) {
        return (
            <div className="text-center mt-10 text-slate-500">
                Loading posts...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center mt-10 text-red-500">
                Failed to load posts
            </div>
        );
    }

    // Backend response safe handling
    // console.log("API RESPONSE:", data);
    const posts = data?.posts || [];

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold text-slate-900">
                    Latest Stories
                </h1>
                <p className="text-slate-500 mt-2">
                    Discover thoughts, ideas and stories from writers
                </p>
            </div>

            {/* Posts */}
            <div className="max-w-4xl mx-auto px-4 space-y-6">

                {posts.length === 0 ? (
                    <p className="text-center text-slate-500">
                        No posts found
                    </p>
                ) : (
                    posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                )}

            </div>
        </div>
    );
}