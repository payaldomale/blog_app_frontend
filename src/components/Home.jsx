export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold text-slate-900">
                    Latest Stories
                </h1>
                <p className="text-slate-500 mt-2">
                    Discover thoughts, ideas and stories from writers
                </p>
            </div>

            {/* Posts container */}
            <div className="max-w-4xl mx-auto px-4 space-y-6">

                {/* Dummy Post Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Understanding React Query in 5 Minutes
                    </h2>
                    <p className="text-slate-600 mt-2">
                        Learn how server state management works in modern React apps...
                    </p>

                    <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
                        <span>by John Doe</span>
                        <span>2 min read</span>
                    </div>
                </div>

                {/* Another Dummy Post */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Building Auth System with JWT
                    </h2>
                    <p className="text-slate-600 mt-2">
                        Step-by-step guide to building authentication in MERN stack...
                    </p>

                    <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
                        <span>by Jane Smith</span>
                        <span>4 min read</span>
                    </div>
                </div>

            </div>
        </div>
    );
}