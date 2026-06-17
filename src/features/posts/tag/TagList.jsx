import { Link } from "react-router-dom";

export default function TagList({ tags = [] }) {
    if (!tags.length) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
                <Link
                    key={tag.id}
                    to={`/tag/${tag.id}`}
                    className="
                        px-3 py-1 text-xs
                        rounded-full
                        bg-slate-100
                        hover:bg-slate-200
                        transition
                    "
                >
                    #{tag.name}
                </Link>
            ))}
        </div>
    );
}