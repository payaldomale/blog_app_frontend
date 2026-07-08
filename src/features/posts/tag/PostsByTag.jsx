import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";
import { GET_POSTS_BY_TAG } from "../../../constants/apiEndpoints";

import PostCard from "../../posts/PostCard";

/* ---------------- API CALL ---------------- */

const getPostsByTag = async (tagId) => {
    const { data } = await api.get(GET_POSTS_BY_TAG(tagId));
    return data;
};

/* ---------------- COMPONENT ---------------- */

export default function PostsByTag() {
    const { tagId } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["posts-by-tag", tagId],
        queryFn: () => getPostsByTag(tagId),
        enabled: !!tagId,
    });

    const posts = data?.data || [];

    if (isLoading) {
        return (
            <div className="p-6">
                Loading posts...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 text-red-500">
                Failed to load posts for this tag.
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                Posts by Tag
            </h1>

            {posts.length === 0 ? (
                <p className="text-gray-500">
                    No posts found for this tag.
                </p>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}