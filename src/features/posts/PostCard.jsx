export default function PostCard({ post }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">

            <h2 className="text-xl font-semibold text-slate-900">
                {post.title}
            </h2>

            <p className="text-slate-600 mt-2 line-clamp-2">
                {post.content}
            </p>

            <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
                <span>
                    by User #{post.author_id}
                </span>

                <span>
                    {post.created_at
                        ? new Date(post.created_at).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })
                        : "No date"}
                </span>
            </div>
        </div>
    );
}