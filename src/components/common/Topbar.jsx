import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
    const { user, resetAuth } = useAuth();
    // console.log("TOPBAR USER OBJECT:", user);

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        resetAuth();
        navigate("/login");
    };

    // ✅ close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className="bg-white border-b border-slate-200 relative">

            <div className="flex items-center justify-between px-6 py-3">

                {/* Search */}
                <div className="flex items-center gap-2 w-full max-w-xl bg-slate-100 px-3 py-2 rounded-full">
                    <FaSearch className="text-slate-500" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search posts..."
                        className="bg-transparent outline-none w-full text-sm text-slate-700"
                    />
                </div>

                {/* Profile */}
                <div ref={menuRef} className="relative ml-4">

                    {/* Trigger */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 hover:bg-slate-100 px-2 py-1 rounded-full transition"
                    >
                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                            {getInitials(user?.email)}
                        </div>

                        <span className="text-sm text-slate-700 hidden sm:block">
                            {user?.email?.split("@")[0] || "User"}
                            {/* {console.log("name:", user?.email?.split("@")[0])} */}
                        </span>
                    </button>

                    {/* Dropdown */}
                    <div
                        className={`
                            absolute right-0 mt-2 w-56 bg-white border border-slate-200 
                            rounded-xl shadow-lg overflow-hidden transition-all duration-150
                            ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                        `}
                    >

                        {/* User Info Header */}
                        <div className="px-4 py-3 border-b bg-slate-50">
                            <p className="text-sm font-semibold text-slate-900">
                                {user?.email?.split("@")[0] || "User"}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                                {user?.email}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="py-1">

                            <button
                                onClick={() => {
                                    navigate("/profile");
                                    setOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                            >
                                Profile
                            </button>

                            <button
                                onClick={() => {
                                    navigate("/my-posts");
                                    setOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                            >
                                My Posts
                            </button>

                            <button
                                onClick={() => {
                                    navigate("/settings");
                                    setOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                            >
                                Settings
                            </button>

                        </div>

                        {/* Divider */}
                        <div className="border-t" />

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                        >
                            Sign out
                        </button>

                    </div>

                </div>

            </div>

        </header>
    );
}