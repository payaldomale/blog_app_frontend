import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "./postSchema";
import { createPost } from "./postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreatePost() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            status: "draft",
        },
    });

    const mutation = useMutation({
        mutationFn: createPost,

        onSuccess: () => {
            toast.success("Post created successfully");

            // ✅ React Query v5 correct syntax
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });

            navigate("/");
        },

        onError: (err) => {
            toast.error(err?.message || "Failed to create post");
        },
    });

    const onSubmit = (data) => {
        mutation.mutate({
            title: data.title,
            content: data.content,
            status: data.status,
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Create Post</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Title */}
                <div>
                    <input
                        {...register("title")}
                        placeholder="Title"
                        className="w-full border p-2 rounded"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div>
                    <textarea
                        {...register("content")}
                        placeholder="Content"
                        className="w-full border p-2 rounded h-40"
                    />
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.content.message}
                        </p>
                    )}
                </div>

                {/* Status */}
                <select
                    {...register("status")}
                    className="w-full border p-2 rounded"
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {mutation.isPending ? "Creating..." : "Create Post"}
                </button>
            </form>
        </div>
    );
}