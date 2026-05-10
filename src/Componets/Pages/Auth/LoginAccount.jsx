"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import SocialAccount from "./SocialAccount";

export default function SignInPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const inputClass = `w-full pl-11 pr-4 py-3.5 text-sm rounded-xl border outline-none transition-all duration-200 font-medium ${
    isDark
      ? "bg-white/[0.05] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-violet-500"
      : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.08)]"
  }`;

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${isDark ? "bg-[#0a0a14]" : "bg-[#f4f3ff]"}`}
    >
      {/* LEFT — Gradient Panel */}
      <div
        className={`hidden md:flex md:w-[42%] flex-col items-center justify-center p-12 text-white relative overflow-hidden transition-all duration-300 ${isDark ? "bg-[#0e0e1c]" : ""}`}
        style={
          !isDark
            ? {
                background:
                  "linear-gradient(135deg, #3730a3 0%, #2563eb 60%, #06b6d4 100%)",
              }
            : {}
        }
      >
        {/* Hex pattern background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: `repeating-linear-gradient(60deg,rgba(255,255,255,0.2) 0,rgba(255,255,255,0.2) 1px,transparent 0,transparent 50%), repeating-linear-gradient(120deg,rgba(255,255,255,0.2) 0,rgba(255,255,255,0.2) 1px,transparent 0,transparent 50%)`,
            backgroundSize: "30px 52px",
          }}
        />

        <div className="relative z-10 text-center max-w-xs">
          <span className="text-6xl mb-5 block">🏆</span>
          <h2 className="text-3xl font-black mb-3 leading-tight tracking-tight">
            Welcome Back
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-8 font-medium">
            Join 284K creators competing for <br /> millions in prizes worldwide
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { num: "$4.2M", label: "Prizes Paid Out" },
              { num: "284K", label: "Active Creators" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-3.5 rounded-2xl text-left"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <p className="text-xl font-black">{s.num}</p>
                <p className="text-[11px] text-white/55 mt-0.5 font-bold uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — Form Panel */}
      <div
        className={`w-full md:w-[58%] flex items-center justify-center p-6 md:p-12 transition-colors duration-300 ${isDark ? "bg-[#0f0f1a]" : "bg-white"}`}
      >
        <div className="w-full max-w-[380px]">
          <div className="mb-8">
            <h1
              className={`text-3xl font-black tracking-tight mb-2 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Sign In
            </h1>
            <p
              className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                {...register("email", { required: "Email is required" })}
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
                {...register("password", { required: "Password is required" })}
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
                size="sm"
                className="text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 text-white font-bold rounded-xl text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-violet-500/20"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              }}
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative py-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <span
                  className={`w-full border-t ${isDark ? "border-white/[0.07]" : "border-slate-100"}`}
                />
              </div>
              <span
                className={`relative px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 ${isDark ? "bg-[#0f0f1a]" : "bg-white"}`}
              >
                or continue with
              </span>
            </div>

            {/* Social Account Buttons */}
            <SocialAccount isDark={isDark} />

            {/* Register Link - Social Icon এর নিচে এবং মেইন ফর্ম টেক্সটের সাথে মিল রেখে */}
            <div className="pt-4 text-center">
              <p
                className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-violet-600 font-bold hover:underline underline-offset-4"
                >
                  Register free →
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
