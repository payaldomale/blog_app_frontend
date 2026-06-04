import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import { registerSchema } from "./registerSchema";
import { registerUser } from "./authService";

export default function Register() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (formData) => {
        try {
            await registerUser({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            toast.success("Account created successfully 🎉");
            navigate("/login");
        } catch (error) {
            toast.error(error.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">Create Account</h1>
                    <p className="text-slate-500 mt-2">Start sharing your ideas today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Username */}
                    <div>
                        <label className="text-sm font-medium">Username</label>
                        <div className="relative mt-2">
                            <FaUser className="absolute left-4 top-4 text-slate-400" />
                            <input
                                {...register("username")}
                                placeholder="john_doe"
                                className="w-full pl-11 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <div className="relative mt-2">
                            <FaEnvelope className="absolute left-4 top-4 text-slate-400" />
                            <input
                                {...register("email")}
                                placeholder="john@example.com"
                                className="w-full pl-11 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
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
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm font-medium">Confirm Password</label>
                        <div className="relative mt-2">
                            <FaLock className="absolute left-4 top-4 text-slate-400" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                className="w-full pl-11 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-4 top-4"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
                    >
                        {isSubmitting ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p className="text-center text-slate-500 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}