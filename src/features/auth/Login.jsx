import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import { loginSchema } from "./loginSchema";
import { loginUser } from "./authService";
import { useAuth } from "../../store/authStore";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const { setUser, setUserId, setToken, setLoggedIn } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (formData) => {
        try {
            const data = await loginUser(formData);

            // console.log("LOGIN RESPONSE:", data);

            const user = data.user;

            setUser(user);
            setUserId(user.id);
            setToken(data.token);
            setLoggedIn(true);

            toast.success("Welcome back 👋");

            navigate("/");
        } catch (error) {
            toast.error(error.message || "Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white border rounded-3xl shadow-xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">Welcome Back</h1>
                    <p className="text-slate-500 mt-2">Sign in to continue writing</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <div className="relative mt-2">
                            <FaEnvelope className="absolute left-4 top-4 text-slate-400" />
                            <input
                                {...register("email")}
                                className="w-full pl-11 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium">Password</label>
                        <div className="relative mt-2">
                            <FaLock className="absolute left-4 top-4 text-slate-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                className="w-full pl-11 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
                    >
                        {isSubmitting ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-slate-500 mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-indigo-600 font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}