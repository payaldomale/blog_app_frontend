import { useAuth } from "../../../store/authStore";

export default function CommentItem({
    comment,
    onEdit,
    onDelete,
}) {
    const { userId } = useAuth();

    const isAuthor =
        Number(comment.author_id) === Number(userId);

    return (
        <div className="border-b py-4">

            {/* HEADER */}
            <div className="flex justify-between">

                <div>
                    <p className="font-medium">
                        User #{comment.author_id}
                    </p>

                    <p className="text-xs text-slate-500">
                        {new Date(
                            comment.created_at
                        ).toLocaleDateString("en-IN")}
                    </p>
                </div>

                {isAuthor && (
                    <span className="text-xs text-green-600">
                        You
                    </span>
                )}
            </div>

            {/* CONTENT */}
            <p className="mt-2 text-slate-700">
                {comment.content}
            </p>

            {/* ACTIONS */}
            {isAuthor && (
                <div className="flex gap-4 mt-2 text-xs text-slate-500">
                    <button
                        onClick={onEdit}
                        className="hover:text-black"
                    >
                        Edit
                    </button>

                    <button
                        onClick={onDelete}
                        className="hover:text-red-600"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}