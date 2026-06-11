import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../store/authStore";

export default function Topbar() {
    const { user } = useAuth();
    const [search, setSearch] = useState("");

    return (
        <header className="bg-white border-b border-slate-200">

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

                {/* User */}
                <div className="flex items-center gap-2 ml-4">
                    <FaUserCircle className="text-2xl text-slate-700" />
                    <span className="text-sm text-slate-700 hidden sm:block">
                        {user?.username || "User"}
                    </span>
                </div>

            </div>

        </header>
    );
}