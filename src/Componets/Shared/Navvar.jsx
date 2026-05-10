"use client";
import Link from "next/link";
import Image from "next/image";
import useTheme from "../utils/hooks/useThemeValue";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Navlink from "./Navlink";

export default function Navvar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLight = theme === "light";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Contests", href: "/all-contests" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Contest Arena", href: "/contest-arena" },
    { name: "About", href: "/about" }, // "About Us" থেকে ছোট করে "About" করা হয়েছে
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isLight
          ? "bg-white/70 border-b border-black/[0.06] text-slate-700"
          : "bg-[#0a0a14]/75 border-b border-white/[0.05] text-white"
      }`}
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none opacity-50"
        style={{
          background: isLight
            ? "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 40%, rgba(139,92,246,0.2) 60%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.5) 40%, rgba(139,92,246,0.3) 60%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm transition-transform group-hover:scale-95">
            <Image
              src="/Logo.png"
              alt="ContestHub"
              width={20}
              height={20}
              className="brightness-0 invert"
            />
          </div>
          <span
            className={`text-lg font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white/90"}`}
          >
            Contest<span className="text-indigo-500">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav Links - Reduced text size to xs/sm */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Navlink key={link.name} href={link.href} isLight={isLight}>
              <span className="text-[13px] font-medium px-1">{link.name}</span>
            </Navlink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isLight
                ? "bg-black/[0.04] hover:bg-black/[0.08] text-slate-500"
                : "bg-white/[0.05] hover:bg-white/[0.1] text-slate-400"
            }`}
          >
            {isLight ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Desktop Auth */}
          <div className="hidden sm:flex items-center gap-1">
            <Link
              href="/login"
              className={`px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all ${
                isLight
                  ? "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm active:scale-95"
            >
              Join Free
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              isLight
                ? "hover:bg-slate-100 text-slate-500"
                : "hover:bg-white/[0.07] text-slate-400"
            }`}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden border-t animate-in fade-in slide-in-from-top-2 duration-200 ${
            isLight
              ? "bg-white/95 border-black/[0.05]"
              : "bg-[#0a0a14]/95 border-white/[0.05]"
          }`}
        >
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isLight
                    ? "text-slate-600 hover:text-indigo-600"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-white/[0.05] flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-center py-2 text-sm font-medium ${isLight ? "text-slate-600" : "text-slate-400"}`}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold"
              >
                Join Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
