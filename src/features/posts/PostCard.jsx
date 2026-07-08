import { Link } from "react-router-dom";
import PostTags from "./tag/PostTags";

export default function PostCard({ post }) {
    return (
        <Link to={`/posts/${post.id}`}>

            <article className="py-8 border-b border-slate-200 cursor-pointer">

                {/* Author */}
                <div className="text-sm text-slate-500 mb-3">
                    User #{post.author_id}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-900 hover:text-slate-700 transition">
                    {post.title}
                </h2>

                {/* Preview */}
                <p className="mt-3 text-slate-600 line-clamp-3 leading-7">
                    {post.content}
                </p>

                <PostTags postId={post.id} />

                {/* Footer */}
                <div className="flex items-center gap-3 mt-4 text-sm text-slate-500">

                    <span>
                        {post.created_at
                            ? new Date(post.created_at).toLocaleDateString(
                                "en-IN",
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }
                            )
                            : "No date"}
                    </span>

                    <span>•</span>

                    <span>
                        ❤️ {post.like_count || 0}
                    </span>

                    <span>•</span>

                    <span>
                        💬 {post.comment_count || 0}
                    </span>

                </div>

            </article>

        </Link>
    );
}