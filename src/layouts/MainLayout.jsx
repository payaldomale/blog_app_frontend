import Sidebar from "../components/common/Navbar";
import Topbar from "../components/common/Topbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-white text-slate-900">

            <Sidebar />

            {/* Main */}
            <div className="md:pl-72">

                <Topbar />

                <main className="min-h-screen">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}