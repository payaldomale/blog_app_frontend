import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios";
import {
    GET_ALL_TAGS,
    CREATE_TAG,
} from "../../../constants/apiEndPoints";

const getAllTags = async () => {
    const { data } = await api.get(GET_ALL_TAGS);
    return data;
};

const createTagApi = async (name) => {
    const { data } = await api.post(CREATE_TAG, { name });
    return data;
};

export default function TagSelector({
    selectedTags,
    setSelectedTags,
}) {
    const queryClient = useQueryClient();
    const [input, setInput] = useState("");

    const { data } = useQuery({
        queryKey: ["tags"],
        queryFn: getAllTags,
    });

    const tags = data?.data || [];

    const createTagMutation = useMutation({
        mutationFn: createTagApi,
        onSuccess: (res) => {
            const newTag = res.data;

            queryClient.invalidateQueries({ queryKey: ["tags"] });

            setSelectedTags((prev) =>
                prev.includes(newTag.id)
                    ? prev
                    : [...prev, newTag.id]
            );

            setInput("");
        },
    });

    const toggle = (id) => {
        setSelectedTags((prev) =>
            prev.includes(id)
                ? prev.filter((t) => t !== id)
                : [...prev, id]
        );
    };

    const handleKeyDown = (e) => {
        if (e.key !== "Enter") return;

        e.preventDefault();

        const name = input.trim().toLowerCase();
        if (!name) return;

        const existing = tags.find(
            (t) => t.name.toLowerCase() === name
        );

        if (existing) {
            if (!selectedTags.includes(existing.id)) {
                setSelectedTags((prev) => [...prev, existing.id]);
            }
            setInput("");
            return;
        }

        createTagMutation.mutate(name);
    };

    return (
        <div className="mt-4">
            <p className="text-sm font-medium mb-2">
                Select or Create Tags
            </p>

            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type tag and press Enter..."
                className="w-full border px-3 py-2 rounded-full text-sm mb-3"
            />

            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <button
                        key={tag.id}
                        onClick={() => toggle(tag.id)}
                        className={`px-3 py-1 rounded-full text-xs ${selectedTags.includes(tag.id)
                            ? "bg-black text-white"
                            : "bg-slate-100"
                            }`}
                    >
                        #{tag.name}
                    </button>
                ))}
            </div>
        </div>
    );
}