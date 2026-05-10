"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  Mail,
  Phone,
  User,
  Upload,
  Lock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import useTheme from "@/Componets/utils/hooks/useThemeValue";

export default function Createaccount() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const inputClass = `w-full pl-11 pr-4 py-3.5 text-sm rounded-xl border outline-none transition-all duration-200 ${
    isDark
      ? "bg-white/[0.05] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-violet-500 focus:bg-white/[0.08]"
      : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.08)]"
  }`;

  const socialBtn = `flex items-center justify-center gap-2.5 py-3 border rounded-xl text-sm font-bold transition-all ${
    isDark
      ? "bg-white/[0.05] border-white/[0.08] text-slate-200 hover:bg-white/[0.1] hover:border-violet-500/40"
      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-violet-400/40 shadow-sm"
  }`;

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${isDark ? "bg-[#0a0a14]" : "bg-[#f4f3ff]"}`}
    >
      {/* LEFT — Info Panel */}
      <div
        className={`hidden md:flex md:w-[42%] flex-col items-center justify-center p-12 text-white relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#0e0e1c]" : "bg-[#1e1b6e]"}`}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-48 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.4) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 text-center max-w-xs">
          <span className="text-6xl mb-5 block">🚀</span>
          <h2 className="text-3xl font-black mb-3 leading-tight">
            Join ContestHub
          </h2>
          <p className="text-indigo-100/60 text-sm leading-relaxed mb-8">
            Your next win is one contest away.
            <br />
            Start competing today.
          </p>
          <ul className="text-left inline-block space-y-4">
            {[
              "Free to join, no subscription",
              "Instant prize payouts via Stripe",
              "Verified contests & creators",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm font-semibold"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT — Form Panel */}
      <div
        className={`w-full md:w-[58%] flex items-center justify-center p-6 md:p-12 transition-colors duration-300 ${isDark ? "bg-[#0f0f1a]" : "bg-white"}`}
      >
        <div className="w-full max-w-[420px]">
          <div className="mb-7">
            <h1
              className={`text-3xl font-black tracking-tight mb-1.5 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Create Account
            </h1>
            <p className="text-slate-500 text-sm">
              Join the largest creator community
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            {/* Name */}
            <div className="relative">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                {...register("name", { required: true })}
                placeholder="Full Name"
                className={inputClass}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 pl-1">
                  Name is required
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email Address"
                className={inputClass}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 pl-1">
                  Email is required
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                {...register("phone")}
                type="tel"
                placeholder="Phone Number"
                className={inputClass}
              />
            </div>

            {/* Photo Upload */}
            <label
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer text-sm transition-all ${
                isDark
                  ? "bg-white/[0.05] border-white/[0.08] text-slate-500 hover:border-violet-500/40"
                  : "bg-white border-slate-200 text-slate-400 hover:border-violet-400/40"
              }`}
            >
              <Upload size={16} className="text-slate-400 flex-shrink-0" />
              <span className="truncate">
                {fileName || "Upload Profile Photo"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("photo")}
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              />
            </label>

            {/* Password */}
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                {...register("password", { required: true, minLength: 6 })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-500 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 pl-1">
                  Min 6 characters required
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-white font-bold rounded-xl text-sm transition-all hover:opacity-90 active:scale-[0.98] mt-1"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              }}
            >
              Create Free Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className={`absolute inset-0 flex items-center`}>
              <span
                className={`w-full border-t ${isDark ? "border-white/[0.07]" : "border-slate-200"}`}
              />
            </div>
            <span
              className={`relative px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 ${isDark ? "bg-[#0f0f1a]" : "bg-white"}`}
            >
              or sign up with
            </span>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button className={socialBtn}>
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                width={18}
                height={18}
                alt="Google"
              />
              Google
            </button>
            <button className={socialBtn}>
              <FaGithub size={18} /> GitHub
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-7">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-violet-600 font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
