import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostById, deletePost } from "./postService";
import { useAuth } from "../../store/authStore";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { handleApiError } from "../../utils/handleApiError";
import toast from "react-hot-toast";
import LikeButton from "./likes/LikeButton";
import CommentSection from "./comments/CommentSection";

// TAGS
import TagList from "./tag/TagList";
import { getTagsByPost } from "./tag/tagService";

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [showComments, setShowComments] = useState(false);

    const { userId } = useAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () => getPostById(id),
        enabled: !!id,
    });

    // TAGS FETCH
    const { data: tagData, isError: tagError } = useQuery({
        queryKey: ["post-tags", id],
        queryFn: () => getTagsByPost(id),
        enabled: !!id,
    });

    // const tags = tagData?.data ?? [];

    const tags = tagData?.data ?? [];

    const deleteMutation = useMutation({
        mutationFn: () => deletePost(id),

        onSuccess: () => {
            toast.success("Post deleted successfully");

            queryClient.setQueryData(["published-posts"], (oldData) => {
                if (!oldData) return oldData;

                const posts = oldData.data || oldData;

                const filtered = posts.filter(
                    (post) => post.id !== Number(id)
                );

                if (oldData.data) {
                    return {
                        ...oldData,
                        data: filtered,
                    };
                }

                return filtered;
            });

            queryClient.removeQueries({
                queryKey: ["post", id],
            });

            navigate("/");
        },

        onError: handleApiError,
    });

    const handleDelete = () => {
        if (!window.confirm("Are you sure you want to delete this post?"))
            return;

        deleteMutation.mutate();
    };

    if (isLoading)
        return <div className="p-6 text-slate-500">Loading post...</div>;

    if (isError)
        return <div className="p-6 text-red-500">Failed to load post</div>;

    const post = data?.post;
    const isAuthor = Number(post?.author_id) === Number(userId);

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-3xl mx-auto px-6 py-10">

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-slate-900">
                    {post?.title}
                </h1>

                {/* META */}
                <div className="flex gap-3 mt-4 text-sm text-slate-500">
                    <span>User #{post?.author_id}</span>
                    <span>•</span>
                    <span>
                        {post?.created_at
                            ? new Date(post.created_at).toLocaleDateString("en-IN")
                            : "No date"}
                    </span>
                    <span>•</span>
                    <span className="capitalize">{post?.status}</span>
                </div>

                {/* TAGS */}
                <TagList tags={tags} />

                {tagError && (
                    <p className="text-xs text-red-400 mt-2">
                        Failed to load tags
                    </p>
                )}

                {/* ACTIONS */}
                {isAuthor && (
                    <div className="mt-6 flex gap-6 border-t pt-4">
                        <Link
                            to={`/posts/edit/${post.id}`}
                            className="flex items-center gap-2 text-sm hover:text-blue-600"
                        >
                            <FaRegEdit size={16} />
                            Edit
                        </Link>

                        <button
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                            className="flex items-center gap-2 text-sm hover:text-red-600 disabled:opacity-50"
                        >
                            <FaTrash size={16} />
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                )}

                {/* LIKE + COMMENT */}
                <div className="mt-6 flex items-center gap-6 text-sm text-slate-600">
                    <LikeButton post={post} />

                    <button
                        onClick={() => setShowComments((p) => !p)}
                        className="hover:text-blue-600"
                    >
                        💬 {post?.comment_count ?? 0}
                    </button>
                </div>

                <div className="my-8 border-t" />

                {/* CONTENT */}
                <article className="whitespace-pre-wrap leading-8 text-slate-700">
                    {post?.content}
                </article>

                {/* COMMENTS */}
                {showComments && <CommentSection postId={post.id} />}
            </div>
        </div>
    );
}