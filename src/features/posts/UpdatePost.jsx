// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import { createPostSchema } from "./postSchema";
// import { getPostById, updatePost } from "./postService";

// export default function UpdatePost() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();

//     // 1. Fetch existing post
//     const { data, isLoading } = useQuery({
//         queryKey: ["post", id],
//         queryFn: () => getPostById(id),
//         enabled: !!id,
//     });

//     const post = data?.post;

//     // 2. Form setup (IMPORTANT: wait for data)
//     const {
//         register,
//         handleSubmit,
//         reset,
//     } = useForm({
//         resolver: zodResolver(createPostSchema),
//         defaultValues: {
//             title: "",
//             content: "",
//             status: "draft",
//         },
//     });

//     // fill form when data arrives
//     React.useEffect(() => {
//         if (post) {
//             reset({
//                 title: post.title,
//                 content: post.content,
//                 status: post.status,
//             });
//         }
//     }, [post, reset]);

//     // 3. Update mutation
//     const mutation = useMutation({
//         mutationFn: updatePost,

//         onSuccess: (res) => {
//             queryClient.invalidateQueries({ queryKey: ["posts"] });
//             queryClient.invalidateQueries({ queryKey: ["post", id] });

//             navigate(`/posts/${id}`);
//         },
//     });

//     const onSubmit = (formData) => {
//         mutation.mutate({
//             id,
//             postData: formData,
//         });
//     };

//     if (isLoading) {
//         return <div className="p-6">Loading...</div>;
//     }

//     return (
//         <div className="max-w-2xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Edit Post</h1>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//                 <input
//                     {...register("title")}
//                     className="w-full border p-2 rounded"
//                     placeholder="Title"
//                 />

//                 <textarea
//                     {...register("content")}
//                     className="w-full border p-2 rounded h-40"
//                     placeholder="Content"
//                 />

//                 <select
//                     {...register("status")}
//                     className="w-full border p-2 rounded"
//                 >
//                     <option value="draft">Draft</option>
//                     <option value="published">Published</option>
//                 </select>

//                 <button
//                     type="submit"
//                     className="bg-black text-white px-4 py-2 rounded"
//                 >
//                     {mutation.isPending ? "Updating..." : "Update Post"}
//                 </button>

//             </form>
//         </div>
//     );
// }

// ************************************************************************************

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { createPostSchema } from "./postSchema";
import {
    getPostById,
    updatePost,
} from "./postService";

import TagSelector from "./tag/TagSelector";

import { getTagsByPost, replaceTags } from "./tag/tagService";

export default function UpdatePost() {

    const { id } = useParams();

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const [selectedTags, setSelectedTags] = useState([]);

    /* ---------------- FETCH POST ---------------- */

    const { data, isLoading } = useQuery({
        queryKey: ["post", id],
        queryFn: () => getPostById(id),
        enabled: !!id,
    });

    const post = data?.post;

    /* ---------------- FETCH TAGS ---------------- */

    const { data: tagData } = useQuery({
        queryKey: ["post-tags", id],
        queryFn: () => getTagsByPost(id),
        enabled: !!id,
    });

    useEffect(() => {

        if (tagData?.data) {

            setSelectedTags(
                tagData.data.map((tag) => tag.id)
            );

        }

    }, [tagData]);

    /* ---------------- FORM ---------------- */

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            title: "",
            content: "",
            status: "draft",
        },
    });

    useEffect(() => {

        if (post) {

            reset({
                title: post.title,
                content: post.content,
                status: post.status,
            });

        }

    }, [post, reset]);

    /* ---------------- UPDATE ---------------- */

    const mutation = useMutation({

        mutationFn: updatePost,

        onSuccess: async () => {

            await replaceTags({
                post_id: id,
                tag_ids: selectedTags,
            });

            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });

            queryClient.invalidateQueries({
                queryKey: ["post", id],
            });

            queryClient.invalidateQueries({
                queryKey: ["post-tags", id],
            });

            navigate(`/posts/${id}`);

        },

    });

    const onSubmit = (formData) => {

        mutation.mutate({
            id,
            postData: formData,
        });

    };

    if (isLoading) {
        return (
            <div className="p-6">
                Loading...
            </div>
        );
    }
    return (
        <div className="max-w-2xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-4">
                Edit Post
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >

                {/* TITLE */}
                <input
                    {...register("title")}
                    className="w-full border p-2 rounded"
                    placeholder="Title"
                />

                {/* CONTENT */}
                <textarea
                    {...register("content")}
                    className="w-full border p-2 rounded h-40"
                    placeholder="Content"
                />

                {/* STATUS */}
                <select
                    {...register("status")}
                    className="w-full border p-2 rounded"
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>

                {/* TAGS (NEW) */}
                <div className="border rounded p-4 bg-slate-50">
                    <p className="font-semibold mb-2">
                        Tags
                    </p>

                    <TagSelector
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    {mutation.isPending
                        ? "Updating..."
                        : "Update Post"}
                </button>

            </form>

        </div>
    );
}