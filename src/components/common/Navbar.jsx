import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaPenNib, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../store/authStore";
import toast from "react-hot-toast";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { loggedIn, user, resetAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        resetAuth();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    const NavLinks = ({ close }) => (
        <nav className="flex flex-col gap-4 text-slate-700">
            <Link onClick={close} to="/">Home</Link>
            <Link onClick={close} to="/">Explore</Link>
            <Link onClick={close} to="/">Trending</Link>
        </nav>
    );

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-50">
                <Link to="/" className="font-bold text-lg">
                    Blogify
                </Link>

                <button onClick={() => setOpen(true)}>
                    <FaBars className="text-xl" />
                </button>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 border-r border-slate-200 bg-white flex-col p-6">

                <Link to="/" className="text-2xl font-bold mb-10">
                    Blogify
                </Link>

                <NavLinks />

                {/* Bottom Section */}
                <div className="mt-auto pt-6 border-t border-slate-200">

                    {loggedIn && (
                        <>
                            {/* Write */}
                            <Link
                                to="/posts/create"
                                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full mb-4"
                            >
                                <FaPenNib />
                                Write
                            </Link>

                            {/* User Info */}
                            <div className="flex items-center gap-2 text-slate-700 mb-3">
                                <FaUserCircle />
                                <span className="text-sm">
                                    {user?.email || user?.username || "User"}
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
                    )}

                </div>

            </aside>

            {/* Mobile Drawer */}
            {open && (
                <div className="fixed inset-0 z-50 md:hidden">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute left-0 top-0 h-full w-72 bg-white p-6 flex flex-col">

                        <div className="flex justify-between items-center mb-8">
                            <span className="font-bold text-lg">Menu</span>
                            <button onClick={() => setOpen(false)}>
                                <FaTimes />
                            </button>
                        </div>

                        <NavLinks close={() => setOpen(false)} />

                        {/* Bottom Section */}
                        <div className="mt-auto pt-6 border-t border-slate-200">

                            {loggedIn && (
                                <>
                                    {/* Write */}
                                    <Link
                                        onClick={() => setOpen(false)}
                                        to="/posts/create"
                                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full mb-4"
                                    >
                                        <FaPenNib />
                                        Write
                                    </Link>

                                    {/* User */}
                                    <div className="flex items-center gap-2 text-slate-700 mb-3">
                                        <FaUserCircle />
                                        <span className="text-sm">
                                            {user?.email || user?.username || "User"}
                                        </span>
                                    </div>

                                    {/* Logout */}
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm text-red-500"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}

                        </div>

                    </div>
                </div>
            )}
        </>
    );
}