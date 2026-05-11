"use client";
import Link from "next/link";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import SocialAccount from "./SocialAccount";
import LoginForm from "@/Componets/Forms/LoginForm";

export default function SignInPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

          <LoginForm inputClass={inputClass} isDark={isDark} />

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
        </div>
      </div>
    </div>
  );
}
