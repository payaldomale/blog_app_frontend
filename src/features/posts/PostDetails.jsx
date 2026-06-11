import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "./postService";

export default function PostDetails() {
    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () => getPostById(id),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-10 text-slate-500">
                Loading post...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-10 text-red-500">
                Failed to load post
            </div>
        );
    }

    const post = data?.post;

    return (
        <div className="bg-white">

            <div className="max-w-3xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                    {post?.title}
                </h1>

                <div className="mt-4 text-sm text-slate-500">
                    By User #{post?.author_id} •{" "}
                    {post?.created_at
                        ? new Date(post.created_at).toLocaleDateString("en-IN")
                        : "No date"}
                </div>

                <div className="my-6 border-t border-slate-200"></div>

                <article className="text-lg leading-8 text-slate-700 whitespace-pre-wrap">
                    {post?.content}
                </article>

            </div>

        </div>
    );
}