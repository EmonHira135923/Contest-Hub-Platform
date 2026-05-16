"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import useAxiosSecure from "../utils/hooks/useAxiosSecure";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAuth from "../utils/hooks/useAuth";

const LoginForm = ({ inputClass, isDark }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const { reFetch } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosSecure.post("/api/auth/login", data);
      console.log("Login Success:", response.data);
      toast.success("Login successful!");
      await reFetch();
      router.replace("/dashboard");
      router.refresh();
      // Handle success (e.g., save token, redirect to dashboard)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(message);
      // Handle error (e.g., show a toast notification)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            {...register("email", { 
                required: "Email is required",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                }
            })}
            type="email"
            placeholder="Email Address"
            className={inputClass}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1.5 font-semibold ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`${inputClass} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-500 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1.5 font-semibold ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            href="/auth/forgot-password"
            className="text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 text-white font-bold rounded-xl text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2 disabled:opacity-70"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          }}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
