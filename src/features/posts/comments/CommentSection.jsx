import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
    getCommentsByPost,
    createComment,
    updateComment,
    deleteComment,
} from "./commentService";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

import { handleApiError } from "../../../utils/handleApiError";
import { useState } from "react";

export default function CommentSection({ postId }) {
    const queryClient = useQueryClient();

    const [editingComment, setEditingComment] = useState(null);

    // FETCH COMMENTS
    const { data, isLoading } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => getCommentsByPost(postId),
        enabled: !!postId,
    });

    const comments = data?.data || [];

    // CREATE COMMENT
    const createMutation = useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            toast.success("Comment added");

            queryClient.invalidateQueries({
                queryKey: ["comments", postId],
            });

            queryClient.invalidateQueries({
                queryKey: ["post", postId],
            });
        },
        onError: handleApiError,
    });

    // UPDATE COMMENT
    const updateMutation = useMutation({
        mutationFn: updateComment,
        onSuccess: () => {
            toast.success("Comment updated");
            setEditingComment(null);

            queryClient.invalidateQueries({
                queryKey: ["comments", postId],
            });
        },
        onError: handleApiError,
    });

    // DELETE COMMENT
    const deleteMutation = useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            toast.success("Comment deleted");

            queryClient.invalidateQueries({
                queryKey: ["comments", postId],
            });

            queryClient.invalidateQueries({
                queryKey: ["post", postId],
            });
        },
        onError: handleApiError,
    });

    return (
        <div className="mt-12 border-t pt-8">

            <h2 className="text-2xl font-semibold mb-6">
                Comments ({comments.length})
            </h2>

            {/* FORM */}
            <CommentForm
                isLoading={
                    createMutation.isPending ||
                    updateMutation.isPending
                }
                editingComment={editingComment}
                onCancelEdit={() =>
                    setEditingComment(null)
                }
                onSubmit={(content) => {
                    if (editingComment) {
                        updateMutation.mutate({
                            id: editingComment.id,
                            content,
                        });
                    } else {
                        createMutation.mutate({
                            post_id: postId,
                            content,
                        });
                    }
                }}
            />

            {/* LIST */}
            {isLoading ? (
                <p className="text-slate-500">
                    Loading comments...
                </p>
            ) : comments.length === 0 ? (
                <p className="text-slate-500">
                    No comments yet.
                </p>
            ) : (
                comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        onEdit={() =>
                            setEditingComment(comment)
                        }
                        onDelete={() =>
                            deleteMutation.mutate(
                                comment.id
                            )
                        }
                    />
                ))
            )}
        </div>
    );
}