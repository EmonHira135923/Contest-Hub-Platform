"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navlink = ({ href, children, isLight }) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  /**
   * LIGHT MODE:
   * Active: Indigo-600 text, খুব হালকা Indigo ব্যাকগ্রাউন্ড এবং একটি সূক্ষ্ম Indigo বর্ডার।
   * Normal: Slate-600 text, হোভার করলে Indigo ব্লার ব্যাকগ্রাউন্ড।
   */
  const activeClass = isLight
    ? "text-indigo-600 bg-indigo-50 border border-indigo-100/50 shadow-[0_2px_10px_-3px_rgba(79,70,229,0.1)]"
    : "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_15px_-3px_rgba(99,102,241,0.2)]";

  const normalClass = isLight
    ? "text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80 border border-transparent"
    : "text-slate-400 hover:text-indigo-300 hover:bg-white/5 border border-transparent";

  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-xl text-[14px] font-semibold transition-all duration-200 ease-in-out ${
        isActive ? activeClass : normalClass
      }`}
    >
      {/* Active Dot indicator (Optional: চাইলে নিচে ছোট একটি ডট দেখাতে পারো) */}
      {isActive && (
        <span
          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
            isLight ? "bg-indigo-600" : "bg-indigo-400"
          }`}
        />
      )}

      <span className="relative z-10">{children}</span>
    </Link>
  );
};

export default Navlink;
