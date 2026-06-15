import { useState } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaSignOutAlt, FaTrash } from "react-icons/fa";
import { deleteUser } from "../features/user/userService";

export default function Settings() {
    const { user, userId, resetAuth } = useAuth();
    const navigate = useNavigate();

    const [deleting, setDeleting] = useState(false);

    const handleLogout = () => {
        resetAuth();
        navigate("/login");
    };

    const handleDelete = async () => {
        const ok = window.confirm(
            "This will permanently delete your account. Continue?"
        );

        if (!ok) return;

        try {
            setDeleting(true);
            await deleteUser(userId);

            toast.success("Account deleted");
            resetAuth();
            navigate("/login");

        } catch (err) {
            toast.error("Failed to delete account");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex justify-center p-6">

            <div className="w-full max-w-xl">

                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Settings
                    </h1>
                    <p className="text-sm text-slate-500">
                        Manage your account and preferences
                    </p>
                </div>

                {/* CARD */}
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl overflow-hidden">

                    {/* ACCOUNT INFO */}
                    <div className="p-5 border-b border-slate-100">
                        <p className="text-xs text-slate-500">Logged in as</p>
                        <p className="text-sm font-medium text-slate-800">
                            {user?.email}
                        </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="divide-y divide-slate-100">

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition"
                        >
                            <span className="flex items-center gap-2 text-slate-700 font-medium">
                                <FaSignOutAlt />
                                Logout
                            </span>
                        </button>

                        {/* Delete */}
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="w-full flex items-center justify-between px-5 py-4 hover:bg-red-50 transition group"
                        >
                            <span className="flex items-center gap-2 text-red-600 font-medium">
                                <FaTrash />
                                {deleting ? "Deleting..." : "Delete Account"}
                            </span>

                            <span className="text-xs text-slate-400 group-hover:text-red-500">
                                irreversible
                            </span>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}