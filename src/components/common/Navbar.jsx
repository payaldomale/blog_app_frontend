import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import { FaPenNib, FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Navbar() {
    const navigate = useNavigate();

    const { loggedIn, user, resetAuth } = useAuth();

    const handleLogout = () => {
        resetAuth();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Left - Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-slate-900 tracking-tight"
                >
                    Blogify
                </Link>

                {/* Center - optional nav */}
                <div className="hidden md:flex gap-6 text-sm text-slate-600">
                    <Link to="/" className="hover:text-slate-900">
                        Home
                    </Link>

                    <Link to="/" className="hover:text-slate-900">
                        Explore
                    </Link>

                    <Link to="/" className="hover:text-slate-900">
                        Trending
                    </Link>
                </div>

                {/* Right - Auth Section */}
                <div className="flex items-center gap-4">

                    {loggedIn ? (
                        <>
                            {/* Create Post */}
                            <button
                                onClick={() => navigate("/create")}
                                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-slate-800 transition"
                            >
                                <FaPenNib />
                                Write
                            </button>

                            {/* User */}
                            <div className="flex items-center gap-2 text-slate-700">
                                <FaUserCircle className="text-xl" />
                                <span className="text-sm hidden sm:block">
                                    {user?.username || "User"}
                                </span>
                            </div>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="text-sm text-red-500 hover:text-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm text-slate-700 hover:text-black"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}