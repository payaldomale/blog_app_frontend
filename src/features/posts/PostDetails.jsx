import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostById, deletePost } from "./postService";
import { useAuth } from "../../store/authStore";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { handleApiError } from "../../utils/handleApiError";
import toast from "react-hot-toast";

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // ✅ Get userId from Zustand
    const { userId } = useAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () => getPostById(id),
        enabled: !!id,
    });

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

        onError: (error) => {
            handleApiError(error);
        },
    });

    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) return;

        deleteMutation.mutate();
    };

    if (isLoading) {
        return (
            <div className="p-6 text-slate-500">
                Loading post...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 text-red-500">
                Failed to load post
            </div>
        );
    }

    const post = data?.post;

    // ✅ Ownership check
    const isAuthor =
        Number(post?.author_id) === Number(userId);

    // console.log("userId:", userId);
    // console.log("author_id:", post?.author_id);
    // console.log("isAuthor:", isAuthor);

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-3xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold text-slate-900">
                    {post?.title}
                </h1>

                <div className="flex gap-3 mt-4 text-sm text-slate-500">
                    <span>User #{post?.author_id}</span>

                    <span>•</span>

                    <span>
                        {post?.created_at
                            ? new Date(
                                post.created_at
                            ).toLocaleDateString("en-IN")
                            : "No date"}
                    </span>

                    <span>•</span>

                    <span className="capitalize">
                        {post?.status}
                    </span>
                </div>

                {/* ✅ Only author sees these buttons */}
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
                            {deleteMutation.isPending
                                ? "Deleting..."
                                : "Delete"}
                        </button>

                    </div>
                )}

                <div className="mt-6 text-sm text-slate-600">
                    ❤️ {post?.like_count ?? 0}
                    {" • "}
                    💬 {post?.comment_count ?? 0}
                </div>

                <div className="my-8 border-t" />

                <article className="whitespace-pre-wrap leading-8 text-slate-700">
                    {post?.content}
                </article>

            </div>
        </div>
    );
}