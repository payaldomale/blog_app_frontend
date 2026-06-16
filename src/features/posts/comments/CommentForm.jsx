import { useEffect, useState } from "react";

export default function CommentForm({
    onSubmit,
    isLoading,
    editingComment,
    onCancelEdit,
}) {
    const [content, setContent] = useState("");

    useEffect(() => {
        if (editingComment?.content) {
            setContent(editingComment.content);
        } else {
            setContent("");
        }
    }, [editingComment]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        onSubmit(content);

        if (!editingComment) {
            setContent("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">

            <textarea
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)
                }
                rows={4}
                placeholder={
                    editingComment
                        ? "Edit your comment..."
                        : "Write a comment..."
                }
                className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-slate-500"
            />

            <div className="flex items-center gap-3 mt-3">

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm"
                >
                    {isLoading
                        ? editingComment
                            ? "Updating..."
                            : "Posting..."
                        : editingComment
                            ? "Update Comment"
                            : "Post Comment"}
                </button>

                {editingComment && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="text-sm text-slate-600 hover:text-black"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}