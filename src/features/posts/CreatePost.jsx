// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createPostSchema } from "./postSchema";
// import { createPost, generateTitles, generateSummary, generateTags, improveWriting, fixGrammar } from "./postService";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function CreatePost() {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();

//     const [aiTitles, setAiTitles] = useState([]);
//     const [loadingAI, setLoadingAI] = useState(false);

//     const [summaryLoading, setSummaryLoading] = useState(false);

//     const [summary, setSummary] = useState("");

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         watch,
//         formState: { errors },
//     } = useForm({
//         resolver: zodResolver(createPostSchema),
//         defaultValues: {
//             status: "draft",
//         },
//     });

//     const content = watch("content");

//     // ---------------- AI TITLE GENERATION ----------------
//     const handleGenerateTitles = async () => {
//         if (!content || content.length < 20) {
//             toast.error("Write more content for better AI titles");
//             return;
//         }

//         try {
//             setLoadingAI(true);

//             const res = await generateTitles(content);

//             setAiTitles(res.titles || []);

//             toast.success("AI Titles Generated!");
//         } catch (err) {
//             toast.error("Failed to generate titles");
//         } finally {
//             setLoadingAI(false);
//         }
//     };

//     // ---------------- AI SUMMARY GENERATION ----------------
//     const handleGenerateSummary = async () => {
//         const content = watch("content");

//         if (!content || !content.trim()) {
//             toast.error("Please write content first");
//             return;
//         }

//         try {
//             setSummaryLoading(true);

//             const res = await generateSummary(content);

//             console.log("SUMMARY:", res);

//             if (res?.summary) {
//                 setSummary(res.summary);   // ✅ THIS IS THE FIX
//                 toast.success("Summary generated");
//             } else {
//                 toast.error("No summary generated");
//             }

//         } catch (err) {
//             console.error(err);
//             toast.error("Failed to generate summary");
//         } finally {
//             setSummaryLoading(false);
//         }
//     };

//     // ---------------- CREATE POST ----------------
//     const mutation = useMutation({
//         mutationFn: createPost,

//         onSuccess: () => {
//             toast.success("Post created successfully");

//             queryClient.invalidateQueries({
//                 queryKey: ["posts"],
//             });

//             navigate("/");
//         },

//         onError: (err) => {
//             toast.error(err?.message || "Failed to create post");
//         },
//     });

//     const onSubmit = (data) => {
//         mutation.mutate(data);
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Create Post</h1>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//                 {/* TITLE */}
//                 <input
//                     {...register("title")}
//                     placeholder="Title"
//                     className="w-full border p-2 rounded"
//                 />

//                 {errors.title && (
//                     <p className="text-red-500 text-sm">
//                         {errors.title.message}
//                     </p>
//                 )}

//                 {/* AI BUTTON */}
//                 <button
//                     type="button"
//                     onClick={handleGenerateTitles}
//                     disabled={loadingAI}
//                     className="bg-purple-600 text-white px-3 py-2 rounded"
//                 >
//                     {loadingAI ? "Generating..." : "✨ Generate AI Titles"}
//                 </button>

//                 {/* AI SUGGESTIONS */}
//                 {aiTitles.length > 0 && (
//                     <div className="border p-3 rounded bg-slate-50">
//                         <p className="text-sm font-semibold mb-2">
//                             AI Suggestions:
//                         </p>

//                         <div className="flex flex-col gap-2">
//                             {aiTitles.map((t, i) => (
//                                 <button
//                                     type="button"
//                                     key={i}
//                                     onClick={() => setValue("title", t)}
//                                     className="text-left px-2 py-1 hover:bg-slate-200 rounded"
//                                 >
//                                     {t}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* CONTENT */}
//                 <textarea
//                     {...register("content")}
//                     placeholder="Content"
//                     className="w-full border p-2 rounded h-40"
//                 />

//                 {errors.content && (
//                     <p className="text-red-500 text-sm">
//                         {errors.content.message}
//                     </p>
//                 )}

//                 {/* GENERATE SUMMARY */}
//                 <button
//                     type="button"
//                     onClick={handleGenerateSummary}
//                     disabled={summaryLoading}
//                     className="bg-purple-600 text-white px-3 py-2 rounded"
//                 >
//                     {summaryLoading ? "Generating..." : "✨ AI Summary"}
//                 </button>

//                 {summary && (
//                     <div className="mt-3 p-3 border rounded bg-slate-50">
//                         <p className="text-sm font-semibold mb-1">AI Summary:</p>
//                         <p className="text-sm text-slate-700">{summary}</p>
//                     </div>
//                 )}

//                 {/* STATUS */}
//                 <select
//                     {...register("status")}
//                     className="w-full border p-2 rounded"
//                 >
//                     <option value="draft">Draft</option>
//                     <option value="published">Published</option>
//                 </select>

//                 {/* SUBMIT */}
//                 <button
//                     type="submit"
//                     disabled={mutation.isPending}
//                     className="bg-black text-white px-4 py-2 rounded"
//                 >
//                     {mutation.isPending ? "Creating..." : "Create Post"}
//                 </button>

//             </form>
//         </div>
//     );
// }

// *********************************************************************************************

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createPostSchema } from "./postSchema";
// import {
//     createPost,
//     generateTitles,
//     generateSummary,
//     generateTags,
//     improveWriting,
//     fixGrammar,
// } from "./postService";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function CreatePost() {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();

//     const [aiTitles, setAiTitles] = useState([]);
//     const [loadingAI, setLoadingAI] = useState(false);

//     const [summary, setSummary] = useState("");
//     const [summaryLoading, setSummaryLoading] = useState(false);

//     const [tags, setTags] = useState([]);
//     const [tagsLoading, setTagsLoading] = useState(false);

//     const [writingLoading, setWritingLoading] = useState(false);

//     const [grammarLoading, setGrammarLoading] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         watch,
//         formState: { errors },
//     } = useForm({
//         resolver: zodResolver(createPostSchema),
//         defaultValues: {
//             status: "draft",
//         },
//     });

//     const content = watch("content");

//     /* ---------------- AI TITLES ---------------- */

//     const handleGenerateTitles = async () => {
//         if (!content || content.length < 20) {
//             toast.error("Write more content for better AI titles");
//             return;
//         }

//         try {
//             setLoadingAI(true);

//             const res = await generateTitles(content);

//             setAiTitles(res.titles || []);

//             toast.success("AI titles generated");

//         } catch {
//             toast.error("Failed to generate titles");
//         } finally {
//             setLoadingAI(false);
//         }
//     };

//     /* ---------------- AI SUMMARY ---------------- */

//     const handleGenerateSummary = async () => {
//         if (!content || !content.trim()) {
//             toast.error("Please write content first");
//             return;
//         }

//         try {
//             setSummaryLoading(true);

//             const res = await generateSummary(content);

//             if (res?.summary) {
//                 setSummary(res.summary);
//                 toast.success("Summary generated");
//             } else {
//                 toast.error("No summary generated");
//             }

//         } catch {
//             toast.error("Failed to generate summary");
//         } finally {
//             setSummaryLoading(false);
//         }
//     };

//     /* ---------------- AI TAGS ---------------- */

//     const handleGenerateTags = async () => {
//         if (!content || content.length < 20) {
//             toast.error("Write more content first");
//             return;
//         }

//         try {
//             setTagsLoading(true);

//             const res = await generateTags(content);

//             setTags(res.tags || []);

//             toast.success("Tags generated");

//         } catch {
//             toast.error("Failed to generate tags");
//         } finally {
//             setTagsLoading(false);
//         }
//     };

//     /* ---------------- IMPROVE WRITING ---------------- */

//     const handleImproveWriting = async () => {
//         if (!content || !content.trim()) {
//             toast.error("Write content first");
//             return;
//         }

//         try {
//             setWritingLoading(true);

//             const res = await improveWriting(content);

//             if (res?.content) {
//                 setValue("content", res.content);
//                 toast.success("Writing improved");
//             }

//         } catch {
//             toast.error("Failed to improve writing");
//         } finally {
//             setWritingLoading(false);
//         }
//     };

//     /* ---------------- GRAMMAR FIX ---------------- */

//     const handleGrammarFix = async () => {
//         if (!content || !content.trim()) {
//             toast.error("Write content first");
//             return;
//         }

//         try {
//             setGrammarLoading(true);

//             const res = await fixGrammar(content);

//             if (res?.content) {
//                 setValue("content", res.content);
//                 toast.success("Grammar fixed");
//             }

//         } catch {
//             toast.error("Failed to fix grammar");
//         } finally {
//             setGrammarLoading(false);
//         }
//     };

//     /* ---------------- CREATE POST ---------------- */

//     const mutation = useMutation({
//         mutationFn: createPost,

//         onSuccess: () => {
//             toast.success("Post created successfully");

//             queryClient.invalidateQueries({
//                 queryKey: ["posts"],
//             });

//             navigate("/");
//         },

//         onError: (err) => {
//             toast.error(err?.message || "Failed to create post");
//         },
//     });

//     const onSubmit = (data) => {
//         mutation.mutate(data);
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-6">

//             <h1 className="text-2xl font-bold mb-6">
//                 Create Post
//             </h1>

//             <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="space-y-5"
//             >

//                 {/* TITLE */}

//                 <input
//                     {...register("title")}
//                     placeholder="Title"
//                     className="w-full border rounded p-3"
//                 />

//                 {errors.title && (
//                     <p className="text-red-500 text-sm">
//                         {errors.title.message}
//                     </p>
//                 )}

//                 {/* AI TITLE */}

//                 <button
//                     type="button"
//                     onClick={handleGenerateTitles}
//                     disabled={loadingAI}
//                     className="bg-purple-500 text-white px-4 py-2 rounded"
//                 >
//                     {loadingAI
//                         ? "Generating..."
//                         : "✨ Generate AI Titles"}
//                 </button>

//                 {aiTitles.length > 0 && (
//                     <div className="border rounded p-3 bg-slate-50">

//                         <p className="font-semibold mb-2">
//                             Suggested Titles
//                         </p>

//                         <div className="flex flex-col gap-2">

//                             {aiTitles.map((title, index) => (

//                                 <button
//                                     key={index}
//                                     type="button"
//                                     onClick={() =>
//                                         setValue("title", title)
//                                     }
//                                     className="text-left hover:bg-slate-200 rounded px-2 py-1"
//                                 >
//                                     {title}
//                                 </button>

//                             ))}

//                         </div>

//                     </div>
//                 )}

//                 {/* CONTENT */}

//                 <textarea
//                     {...register("content")}
//                     placeholder="Write your blog..."
//                     className="w-full border rounded p-3 h-56"
//                 />

//                 {errors.content && (
//                     <p className="text-red-500 text-sm">
//                         {errors.content.message}
//                     </p>
//                 )}

//                 {/* AI TOOLS */}

//                 <div className="flex flex-wrap gap-3">

//                     <button
//                         type="button"
//                         onClick={handleGenerateSummary}
//                         disabled={summaryLoading}
//                         className="bg-purple-500 text-white px-3 py-2 rounded"
//                     >
//                         {summaryLoading
//                             ? "Generating..."
//                             : "📄 Summary"}
//                     </button>

//                     <button
//                         type="button"
//                         onClick={handleGenerateTags}
//                         disabled={tagsLoading}
//                         className="bg-indigo-500 text-white px-3 py-2 rounded"
//                     >
//                         {tagsLoading
//                             ? "Generating..."
//                             : "🏷 Tags"}
//                     </button>

//                     <button
//                         type="button"
//                         onClick={handleImproveWriting}
//                         disabled={writingLoading}
//                         className="bg-emerald-500 text-white px-3 py-2 rounded"
//                     >
//                         {writingLoading
//                             ? "Improving..."
//                             : "✨ Improve"}
//                     </button>

//                     <button
//                         type="button"
//                         onClick={handleGrammarFix}
//                         disabled={grammarLoading}
//                         className="bg-orange-400 text-white px-3 py-2 rounded"
//                     >
//                         {grammarLoading
//                             ? "Fixing..."
//                             : "📝 Grammar"}
//                     </button>

//                 </div>

//                 {/* SUMMARY */}

//                 {summary && (
//                     <div className="border rounded bg-slate-50 p-4">

//                         <p className="font-semibold mb-2">
//                             AI Summary
//                         </p>

//                         <p className="text-slate-700">
//                             {summary}
//                         </p>

//                     </div>
//                 )}

//                 {/* TAGS */}

//                 {tags.length > 0 && (
//                     <div className="border rounded bg-slate-50 p-4">

//                         <p className="font-semibold mb-3">
//                             Suggested Tags
//                         </p>

//                         <div className="flex flex-wrap gap-2">

//                             {tags.map((tag) => (
//                                 <span
//                                     key={tag}
//                                     className="bg-indigo-100 text-indigo-500 px-3 py-1 rounded-full text-sm"
//                                 >
//                                     {tag}
//                                 </span>
//                             ))}

//                         </div>

//                     </div>
//                 )}

//                 {/* STATUS */}

//                 <select
//                     {...register("status")}
//                     className="w-full border rounded p-3"
//                 >
//                     <option value="draft">
//                         Draft
//                     </option>

//                     <option value="published">
//                         Published
//                     </option>
//                 </select>

//                 {/* SUBMIT */}

//                 <button
//                     type="submit"
//                     disabled={mutation.isPending}
//                     className="bg-black text-white px-5 py-3 rounded"
//                 >
//                     {mutation.isPending
//                         ? "Creating..."
//                         : "Create Post"}
//                 </button>

//             </form>

//         </div>
//     );
// }

// *********************************************************************************************

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "./postSchema";
import { createPost, generateTitles, generateSummary, generateTags, improveWriting, fixGrammar, } from "./postService";
import { createTag, replaceTags } from "./tag/tagService";
import TagSelector from "./tag/TagSelector";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreatePost() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [selectedTags, setSelectedTags] = useState([]);

    const [aiTitles, setAiTitles] = useState([]);
    const [loadingAI, setLoadingAI] = useState(false);

    const [summary, setSummary] = useState("");
    const [summaryLoading, setSummaryLoading] = useState(false);

    const [tags, setTags] = useState([]);
    const [tagsLoading, setTagsLoading] = useState(false);

    const [writingLoading, setWritingLoading] = useState(false);

    const [grammarLoading, setGrammarLoading] = useState(false);

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

    /* ---------------- AI TITLES ---------------- */

    const handleGenerateTitles = async () => {

        if (!content || content.length < 20) {
            toast.error("Write more content for better AI titles");
            return;
        }

        try {

            setLoadingAI(true);

            const res = await generateTitles(content);

            setAiTitles(res.titles || []);

            toast.success("AI titles generated");

        } catch {

            toast.error("Failed to generate titles");

        } finally {

            setLoadingAI(false);

        }
    };

    /* ---------------- AI SUMMARY ---------------- */

    const handleGenerateSummary = async () => {

        if (!content || !content.trim()) {
            toast.error("Please write content first");
            return;
        }

        try {

            setSummaryLoading(true);

            const res = await generateSummary(content);

            if (res?.summary) {
                setSummary(res.summary);
                toast.success("Summary generated");
            } else {
                toast.error("No summary generated");
            }

        } catch {

            toast.error("Failed to generate summary");

        } finally {

            setSummaryLoading(false);

        }
    };

    /* ---------------- AI TAGS ---------------- */

    const handleGenerateTags = async () => {

        if (!content || content.length < 20) {
            toast.error("Write more content first");
            return;
        }

        try {

            setTagsLoading(true);

            const res = await generateTags(content);

            const aiTags = res.tags || [];

            setTags(aiTags);

            const ids = [];

            for (const name of aiTags) {

                try {

                    const cleanedName = name?.trim();

                    if (!cleanedName || cleanedName.length < 2) continue;

                    const created = await createTag(cleanedName);

                    // const created = await createTag(name);

                    if (created?.data?.id) {
                        ids.push(created.data.id);
                    }

                } catch (err) {

                    // console.log(err);
                    console.log("Tag creation failed for:", name, err?.response?.data);

                }

            }

            setSelectedTags(ids);

            toast.success("Tags generated");

        } catch {

            toast.error("Failed to generate tags");

        } finally {

            setTagsLoading(false);

        }
    };

    /* ---------------- IMPROVE WRITING ---------------- */

    const handleImproveWriting = async () => {

        if (!content || !content.trim()) {
            toast.error("Write content first");
            return;
        }

        try {

            setWritingLoading(true);

            const res = await improveWriting(content);

            if (res?.content) {
                setValue("content", res.content);
                toast.success("Writing improved");
            }

        } catch {

            toast.error("Failed to improve writing");

        } finally {

            setWritingLoading(false);

        }
    };

    /* ---------------- GRAMMAR FIX ---------------- */

    const handleGrammarFix = async () => {

        if (!content || !content.trim()) {
            toast.error("Write content first");
            return;
        }

        try {

            setGrammarLoading(true);

            const res = await fixGrammar(content);

            if (res?.content) {
                setValue("content", res.content);
                toast.success("Grammar fixed");
            }

        } catch {

            toast.error("Failed to fix grammar");

        } finally {

            setGrammarLoading(false);

        }
    };

    /* ---------------- CREATE POST ---------------- */

    const mutation = useMutation({

        mutationFn: createPost,

        onSuccess: async (res) => {

            // const postId = res.post.id;
            const postId = res.data.id;

            if (selectedTags.length) {

                await replaceTags({
                    post_id: postId,
                    tag_ids: selectedTags,
                });

            }

            toast.success("Post created successfully");

            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });

            navigate("/");
        },

        onError: (err) => {

            toast.error(
                err?.message || "Failed to create post"
            );

        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                Create Post
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >

                {/* TITLE */}

                <input
                    {...register("title")}
                    placeholder="Title"
                    className="w-full border rounded p-3"
                />

                {errors.title && (
                    <p className="text-red-500 text-sm">
                        {errors.title.message}
                    </p>
                )}

                {/* AI TITLE */}

                <button
                    type="button"
                    onClick={handleGenerateTitles}
                    disabled={loadingAI}
                    className="bg-purple-500 text-white px-4 py-2 rounded"
                >
                    {loadingAI
                        ? "Generating..."
                        : "✨ Generate AI Titles"}
                </button>

                {aiTitles.length > 0 && (

                    <div className="border rounded p-3 bg-slate-50">

                        <p className="font-semibold mb-2">
                            Suggested Titles
                        </p>

                        <div className="flex flex-col gap-2">

                            {aiTitles.map((title, index) => (

                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setValue("title", title)}
                                    className="text-left hover:bg-slate-200 rounded px-2 py-1"
                                >
                                    {title}
                                </button>

                            ))}

                        </div>

                    </div>

                )}

                {/* CONTENT */}

                <textarea
                    {...register("content")}
                    placeholder="Write your blog..."
                    className="w-full border rounded p-3 h-56"
                />

                {errors.content && (
                    <p className="text-red-500 text-sm">
                        {errors.content.message}
                    </p>
                )}

                {/* AI TOOLS */}

                <div className="flex flex-wrap gap-3">

                    <button
                        type="button"
                        onClick={handleGenerateSummary}
                        disabled={summaryLoading}
                        className="bg-purple-500 text-white px-3 py-2 rounded"
                    >
                        {summaryLoading
                            ? "Generating..."
                            : "📄 Summary"}
                    </button>

                    <button
                        type="button"
                        onClick={handleGenerateTags}
                        disabled={tagsLoading}
                        className="bg-indigo-500 text-white px-3 py-2 rounded"
                    >
                        {tagsLoading
                            ? "Generating..."
                            : "🏷 Tags"}
                    </button>

                    <button
                        type="button"
                        onClick={handleImproveWriting}
                        disabled={writingLoading}
                        className="bg-emerald-500 text-white px-3 py-2 rounded"
                    >
                        {writingLoading
                            ? "Improving..."
                            : "✨ Improve"}
                    </button>

                    <button
                        type="button"
                        onClick={handleGrammarFix}
                        disabled={grammarLoading}
                        className="bg-orange-400 text-white px-3 py-2 rounded"
                    >
                        {grammarLoading
                            ? "Fixing..."
                            : "📝 Grammar"}
                    </button>

                </div>

                {/* SUMMARY */}

                {summary && (

                    <div className="border rounded bg-slate-50 p-4">

                        <p className="font-semibold mb-2">
                            AI Summary
                        </p>

                        <p className="text-slate-700">
                            {summary}
                        </p>

                    </div>

                )}

                {/* AI TAGS */}

                {tags.length > 0 && (

                    <div className="border rounded bg-slate-50 p-4">

                        <p className="font-semibold mb-3">
                            Suggested Tags
                        </p>

                        <div className="flex flex-wrap gap-2">

                            {tags.map((tag) => (

                                <span
                                    key={tag}
                                    className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm"
                                >
                                    #{tag}
                                </span>

                            ))}

                        </div>

                    </div>

                )}

                {/* MANUAL TAG SELECTOR */}

                <TagSelector
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />

                {/* STATUS */}

                <select
                    {...register("status")}
                    className="w-full border rounded p-3"
                >
                    <option value="draft">
                        Draft
                    </option>

                    <option value="published">
                        Published
                    </option>
                </select>

                {/* SUBMIT */}

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-black text-white px-5 py-3 rounded"
                >
                    {mutation.isPending
                        ? "Creating..."
                        : "Create Post"}
                </button>

            </form>

        </div>
    );

}
