import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost, getLikesByPost } from "./likeService";
import { useAuth } from "../../../store/authStore";
import toast from "react-hot-toast";

export default function LikeButton({ postId }) {
    const { userId } = useAuth();
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["likes", postId],
        queryFn: () => getLikesByPost(postId),
        enabled: !!postId,
    });

    const likes = data?.data || [];

    const isLiked = likes.some(
        (l) => Number(l.user_id) === Number(userId)
    );

    // LIKE (OPTIMISTIC)
    const likeMutation = useMutation({
        mutationFn: () => likePost(postId),

        onMutate: async () => {
            await queryClient.cancelQueries(["likes", postId]);

            const prev = queryClient.getQueryData(["likes", postId]);

            queryClient.setQueryData(["likes", postId], (old) => {
                const current = old?.data || [];
                return {
                    ...old,
                    data: [
                        ...current,
                        { user_id: userId },
                    ],
                };
            });

            return { prev };
        },

        onError: (err, _, context) => {
            queryClient.setQueryData(["likes", postId], context.prev);
        },

        onSuccess: () => {
            queryClient.invalidateQueries(["post", postId]);
            queryClient.invalidateQueries(["published-posts"]);
        },
    });

    // UNLIKE (OPTIMISTIC)
    const unlikeMutation = useMutation({
        mutationFn: () => unlikePost(postId),

        onMutate: async () => {
            await queryClient.cancelQueries(["likes", postId]);

            const prev = queryClient.getQueryData(["likes", postId]);

            queryClient.setQueryData(["likes", postId], (old) => {
                const current = old?.data || [];
                return {
                    ...old,
                    data: current.filter(
                        (l) => Number(l.user_id) !== Number(userId)
                    ),
                };
            });

            return { prev };
        },

        onError: (err, _, context) => {
            queryClient.setQueryData(["likes", postId], context.prev);
        },

        onSuccess: () => {
            queryClient.invalidateQueries(["post", postId]);
            queryClient.invalidateQueries(["published-posts"]);
        },
    });

    const handleClick = () => {
        if (isLiked) {
            unlikeMutation.mutate();
            toast.success("Unliked");
        } else {
            likeMutation.mutate();
            toast.success("Liked");
        }
    };

    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-2 text-slate-600 hover:text-red-500 transition"
        >
            <span className="text-lg">
                {isLiked ? "❤️" : "🤍"}
            </span>

            <span>{likes.length}</span>
        </button>
    );
}