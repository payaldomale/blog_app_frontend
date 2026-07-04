import { useQuery } from "@tanstack/react-query";
import { getTagsByPost } from "./tagService";

export default function PostTags({ postId }) {
    const { data } = useQuery({
        queryKey: ["post-tags", postId],
        queryFn: () => getTagsByPost(postId),
        enabled: !!postId,
    });

    const tags = data?.data || [];

    if (!tags.length) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
                <span
                    key={tag.id}
                    className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full"
                >
                    #{tag.name}
                </span>
            ))}
        </div>
    );
}