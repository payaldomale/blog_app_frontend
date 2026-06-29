import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "./postSchema";
import { createPost, generateTitles, generateSummary } from "./postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreatePost() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [aiTitles, setAiTitles] = useState([]);
    const [loadingAI, setLoadingAI] = useState(false);

    const [summaryLoading, setSummaryLoading] = useState(false);

    const [summary, setSummary] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            status: "draft",
        },
    });

    const content = watch("content");

    // ---------------- AI TITLE GENERATION ----------------
    const handleGenerateTitles = async () => {
        if (!content || content.length < 20) {
            toast.error("Write more content for better AI titles");
            return;
        }

        try {
            setLoadingAI(true);

            const res = await generateTitles(content);

            setAiTitles(res.titles || []);

            toast.success("AI Titles Generated!");
        } catch (err) {
            toast.error("Failed to generate titles");
        } finally {
            setLoadingAI(false);
        }
    };

    // ---------------- AI SUMMARY GENERATION ----------------
    const handleGenerateSummary = async () => {
        const content = watch("content");

        if (!content || !content.trim()) {
            toast.error("Please write content first");
            return;
        }

        try {
            setSummaryLoading(true);

            const res = await generateSummary(content);

            console.log("SUMMARY:", res);

            if (res?.summary) {
                setSummary(res.summary);   // ✅ THIS IS THE FIX
                toast.success("Summary generated");
            } else {
                toast.error("No summary generated");
            }

        } catch (err) {
            console.error(err);
            toast.error("Failed to generate summary");
        } finally {
            setSummaryLoading(false);
        }
    };

    // ---------------- CREATE POST ----------------
    const mutation = useMutation({
        mutationFn: createPost,

        onSuccess: () => {
            toast.success("Post created successfully");

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
        mutation.mutate(data);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Create Post</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* TITLE */}
                <input
                    {...register("title")}
                    placeholder="Title"
                    className="w-full border p-2 rounded"
                />

                {errors.title && (
                    <p className="text-red-500 text-sm">
                        {errors.title.message}
                    </p>
                )}

                {/* AI BUTTON */}
                <button
                    type="button"
                    onClick={handleGenerateTitles}
                    disabled={loadingAI}
                    className="bg-purple-600 text-white px-3 py-2 rounded"
                >
                    {loadingAI ? "Generating..." : "✨ Generate AI Titles"}
                </button>

                {/* AI SUGGESTIONS */}
                {aiTitles.length > 0 && (
                    <div className="border p-3 rounded bg-slate-50">
                        <p className="text-sm font-semibold mb-2">
                            AI Suggestions:
                        </p>

                        <div className="flex flex-col gap-2">
                            {aiTitles.map((t, i) => (
                                <button
                                    type="button"
                                    key={i}
                                    onClick={() => setValue("title", t)}
                                    className="text-left px-2 py-1 hover:bg-slate-200 rounded"
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* CONTENT */}
                <textarea
                    {...register("content")}
                    placeholder="Content"
                    className="w-full border p-2 rounded h-40"
                />

                {errors.content && (
                    <p className="text-red-500 text-sm">
                        {errors.content.message}
                    </p>
                )}

                {/* GENERATE SUMMARY */}
                <button
                    type="button"
                    onClick={handleGenerateSummary}
                    disabled={summaryLoading}
                    className="bg-purple-600 text-white px-3 py-2 rounded"
                >
                    {summaryLoading ? "Generating..." : "✨ AI Summary"}
                </button>

                {summary && (
                    <div className="mt-3 p-3 border rounded bg-slate-50">
                        <p className="text-sm font-semibold mb-1">AI Summary:</p>
                        <p className="text-sm text-slate-700">{summary}</p>
                    </div>
                )}

                {/* STATUS */}
                <select
                    {...register("status")}
                    className="w-full border p-2 rounded"
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    {mutation.isPending ? "Creating..." : "Create Post"}
                </button>

            </form>
        </div>
    );
}
