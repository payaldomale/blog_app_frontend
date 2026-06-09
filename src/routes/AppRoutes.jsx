import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import CreatePost from "../features/posts/CreatePost";
import NotFound from "./NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Main routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/create" element={<CreatePost />} />

            {/* 404 catch-all route (IMPORTANT) */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}