import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios";
import {
    GET_ALL_TAGS,
    CREATE_TAG,
} from "../../../constants/apiEndPoints";

/* ---------------- API CALLS ---------------- */

const getAllTags = async () => {
    const { data } = await api.get(GET_ALL_TAGS);
    return data;
};

const createTagApi = async (name) => {
    const { data } = await api.post(CREATE_TAG, { name });
    return data;
};

/* ---------------- COMPONENT ---------------- */

export default function TagSelector({
    selectedTags,
    setSelectedTags,
}) {
    const queryClient = useQueryClient();
    const [input, setInput] = useState("");

    /* ---------------- FETCH TAGS ---------------- */

    const { data, isLoading } = useQuery({
        queryKey: ["tags"],
        queryFn: getAllTags,
    });

    const tags = data?.data || [];

    /* ---------------- CREATE TAG ---------------- */

    const createTagMutation = useMutation({
        mutationFn: createTagApi,

        onSuccess: (res) => {
            const newTag = res.data;

            // refresh tags list
            queryClient.invalidateQueries({
                queryKey: ["tags"],
            });

            // auto-select newly created tag
            setSelectedTags((prev) =>
                prev.includes(newTag.id)
                    ? prev
                    : [...prev, newTag.id]
            );

            setInput("");
        },
    });

    /* ---------------- TOGGLE TAG ---------------- */

    const toggle = (id) => {
        setSelectedTags((prev) =>
            prev.includes(id)
                ? prev.filter((t) => t !== id)
                : [...prev, id]
        );
    };

    /* ---------------- ENTER TO CREATE ---------------- */

    const handleKeyDown = (e) => {
        if (e.key !== "Enter") return;

        e.preventDefault();

        const name = input.trim().toLowerCase();

        // ✅ ADD THIS (your required fix)
        if (!name || name.length < 2) return;

        // check if tag already exists
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

        // create new tag
        createTagMutation.mutate(name);
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="mt-4">

            <p className="text-sm font-medium mb-2">
                Select or Create Tags
            </p>

            {/* INPUT */}
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type tag and press Enter..."
                className="w-full border px-3 py-2 rounded-full text-sm mb-3"
            />

            {/* LOADING */}
            {isLoading && (
                <p className="text-xs text-gray-500 mb-2">
                    Loading tags...
                </p>
            )}

            {/* TAGS LIST */}
            <div className="flex flex-wrap gap-2">

                {tags.map((tag) => {

                    const isSelected = selectedTags.includes(tag.id);

                    return (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() => toggle(tag.id)}
                            className={`
                                px-3 py-1 rounded-full text-xs
                                border transition
                                ${isSelected
                                    ? "bg-black text-white border-black"
                                    : "bg-slate-100 hover:bg-slate-200"
                                }
                            `}
                        >
                            #{tag.name}
                        </button>
                    );
                })}

            </div>

        </div>
    );
}