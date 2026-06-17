import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    likePost,
    unlikePost,
    getLikeStatus
} from "./likeService";

import { useAuth } from "../../../store/authStore";
import toast from "react-hot-toast";

export default function LikeButton({ post }) {

    const queryClient = useQueryClient();

    const { loggedIn } = useAuth();

    const {
        data: likeData
    } = useQuery({
        queryKey: ["like-status", post.id],

        queryFn: () =>
            getLikeStatus(post.id),

        enabled: loggedIn
    });

    const liked =
        likeData?.liked || false;

    const likeMutation = useMutation({

        mutationFn: () =>
            likePost(post.id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["published-posts"]
            });

            queryClient.invalidateQueries({
                queryKey: ["post", String(post.id)]
            });

            queryClient.invalidateQueries({
                queryKey: ["like-status", post.id]
            });
        },

        onError: (err) => {
            toast.error(
                err?.response?.data?.message ||
                "Error"
            );
        }
    });

    const unlikeMutation = useMutation({

        mutationFn: () =>
            unlikePost(post.id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["published-posts"]
            });

            queryClient.invalidateQueries({
                queryKey: ["post", String(post.id)]
            });

            queryClient.invalidateQueries({
                queryKey: ["like-status", post.id]
            });
        },

        onError: (err) => {
            toast.error(
                err?.response?.data?.message ||
                "Error"
            );
        }
    });

    const handleClick = () => {

        if (!loggedIn) {
            return toast.error(
                "Login required"
            );
        }

        if (liked) {
            unlikeMutation.mutate();
        } else {
            likeMutation.mutate();
        }
    };

    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-2"
        >
            <span
                className={`text-xl transition ${liked
                    ? "text-red-500"
                    : "text-gray-400"
                    }`}
            >
                {liked ? "❤️" : "🤍"}
            </span>

            <span>
                {post.like_count ?? 0}
            </span>
        </button>
    );
}