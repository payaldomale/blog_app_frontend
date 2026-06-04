import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
            <div className="text-center max-w-md">
                <FaExclamationTriangle className="text-6xl text-indigo-500 mx-auto mb-6" />

                <h1 className="text-5xl font-bold text-slate-900 mb-3">
                    404
                </h1>

                <p className="text-slate-600 text-lg mb-6">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}