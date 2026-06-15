import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import {
    getUserProfile,
    updateUserProfile
} from "../features/user/userService";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

export default function Profile() {
    const { userId } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [original, setOriginal] = useState(null);

    const [form, setForm] = useState({
        username: "",
        bio: "",
        avatar_url: ""
    });

    // FETCH
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(userId);
                const user = Array.isArray(data) ? data[0] : data;

                setOriginal(user);

                setForm({
                    username: user?.username || "",
                    bio: user?.bio || "",
                    avatar_url: user?.avatar_url || ""
                });

            } catch {
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchProfile();
    }, [userId]);

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // SAVE (FIXED)
    const handleSave = async () => {
        try {
            setSaving(true);

            const updated = await updateUserProfile(userId, form);

            const user = updated?.[0] || updated;

            setOriginal(user);

            setForm({
                username: user?.username || "",
                bio: user?.bio || "",
                avatar_url: user?.avatar_url || ""
            });

            setEditing(false);
            toast.success("Profile updated successfully");

        } catch {
            toast.error("Update failed");
        } finally {
            setSaving(false);
        }
    };

    // CANCEL RESET
    const handleCancel = () => {
        if (original) {
            setForm({
                username: original.username || "",
                bio: original.bio || "",
                avatar_url: original.avatar_url || ""
            });
        }
        setEditing(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-500">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

            <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 mb-5">

                {/* X BUTTON */}
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-4 right-4 text-slate-500 hover:text-black"
                >
                    <FaTimes />
                </button>

                <h1 className="text-2xl font-bold mb-6">My Profile</h1>

                {/* AVATAR */}
                <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center font-bold">
                        {form.username?.[0]?.toUpperCase() || "U"}
                    </div>

                    <input
                        name="avatar_url"
                        value={form.avatar_url}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder="Avatar URL"
                        className="w-full border p-2 rounded disabled:bg-slate-100"
                    />
                </div>

                {/* USERNAME */}
                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="Username"
                    className="w-full border p-2 rounded mb-4 disabled:bg-slate-100"
                />

                {/* BIO */}
                <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="Bio"
                    rows={4}
                    className="w-full border p-2 rounded mb-6 disabled:bg-slate-100"
                />

                {/* BUTTONS */}
                <div className="flex gap-3">

                    {!editing ? (
                        <button
                            onClick={() => setEditing(true)}
                            className="w-full bg-black text-white py-2 rounded"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleCancel}
                                className="w-1/2 border py-2 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="w-1/2 bg-black text-white py-2 rounded disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </>
                    )}

                </div>

            </div>
        </div>
    );
}