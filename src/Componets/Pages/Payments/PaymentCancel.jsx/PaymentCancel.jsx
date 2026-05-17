"use client";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { FiInfo, FiArrowLeft, FiHome } from "react-icons/fi";
import useTheme from "@/Componets/utils/hooks/useThemeValue";

const PaymentCancel = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-[#16131f]" : "bg-gradient-to-br from-slate-50 to-violet-50"
      }`}
    >
      {/* Card */}
      <div
        className={`relative w-full max-w-md rounded-3xl overflow-hidden transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-b from-[#1e1b2e] to-[#1a1728] border border-[#2e2a45] shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
            : "bg-white border border-violet-100 shadow-[0_30px_70px_rgba(100,80,200,0.1)]"
        }`}
      >
        {/* Top accent bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-red-500 via-orange-400 to-amber-400" />

        <div className="px-10 pt-12 pb-10 flex flex-col items-center">
          {/* Icon */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-7 animate-pulse ${
              isDark
                ? "bg-red-500/10 border border-red-500/20"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <MdOutlineCancel
              className={`text-5xl ${isDark ? "text-red-400" : "text-red-500"}`}
            />
          </div>

          {/* Badge */}
          <span
            className={`text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full mb-3 ${
              isDark
                ? "bg-red-500/15 text-red-400 border border-red-500/25"
                : "bg-red-50 text-red-500 border border-red-200"
            }`}
          >
            Payment Cancelled
          </span>

          {/* Heading */}
          <h1
            className={`text-3xl font-extrabold tracking-tight text-center mb-3 leading-tight ${
              isDark ? "text-slate-100" : "text-[#1e1b4b]"
            }`}
          >
            Oops! You cancelled.
          </h1>

          {/* Subtext */}
          <p
            className={`text-sm text-center leading-relaxed mb-8 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Your payment was not completed and{" "}
            <span
              className={`font-semibold ${
                isDark ? "text-slate-200" : "text-slate-800"
              }`}
            >
              no charges were made.
            </span>{" "}
            You can go back and try again whenever you're ready.
          </p>

          {/* Info box */}
          <div
            className={`w-full flex items-start gap-3 rounded-2xl px-5 py-4 mb-7 ${
              isDark
                ? "bg-white/[0.03] border border-white/[0.06]"
                : "bg-indigo-50/50 border border-indigo-100"
            }`}
          >
            <FiInfo
              className={`mt-0.5 shrink-0 text-base ${
                isDark ? "text-indigo-400" : "text-indigo-500"
              }`}
            />
            <p
              className={`text-[13px] leading-relaxed ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Your registration spot is still available. Complete your payment
              before the contest fills up!
            </p>
          </div>

          {/* Divider */}
          <div
            className={`w-full border-t border-dashed mb-7 ${
              isDark ? "border-white/[0.07]" : "border-slate-200"
            }`}
          />

          {/* Buttons */}
          <div className="w-full flex flex-col gap-3">
            {/* Primary */}
            <Link
              href="/contests"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              <FiArrowLeft className="text-base" />
              Browse Contests
            </Link>

            {/* Secondary */}
            <Link
              href="/"
              className={`w-full flex items-center justify-center gap-2 py-[14px] rounded-2xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] ${
                isDark
                  ? "bg-white/[0.04] border border-white/[0.07] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200"
                  : "bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <FiHome className="text-base" />
              Go to Home
            </Link>
          </div>

          {/* Support note */}
          <p
            className={`mt-6 text-xs text-center ${
              isDark ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Need help?{" "}
            <Link
              href="/contact"
              className={`font-semibold hover:underline ${
                isDark ? "text-indigo-400" : "text-indigo-500"
              }`}
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
