import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../components/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import CreatePost from "../features/posts/CreatePost";
import PostDetails from "../features/posts/PostDetails";
import NotFound from "./NotFound";

export default function AppRoutes() {
    return (
        <Routes>

            {/* App Layout Routes */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/posts/create" element={<CreatePost />} />
                <Route path="/posts/:id" element={<PostDetails />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}