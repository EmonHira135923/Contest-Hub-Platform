"use client";
import Link from "next/link";
import Image from "next/image";
import useTheme from "../utils/hooks/useThemeValue";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import Navlink from "./Navlink";
import useAuth from "../utils/hooks/useAuth";
import useRole from "../utils/hooks/useRole";

export default function Navvar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const dropdownRef = useRef(null);
  const role = useRole();
  const isLight = theme === "light";

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Contests", href: "/all-contests" },
    ...(user
      ? [
          { name: "Leaderboard", href: "/leaderboard" },
          // শুধুমাত্র 'user' রোলের জন্যই BeACreator লিঙ্কটি দেখাবে
          ...(role === "user"
            ? [{ name: "BeACreator", href: "/be-a-creator" }]
            : []),
        ]
      : []),
    { name: "Contest Arena", href: "/contest-arena" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${isLight ? "bg-white/70 border-b border-black/[0.06] text-slate-700" : "bg-[#0a0a14]/75 border-b border-white/[0.05] text-white"}`}
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
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

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Navlink key={link.name} href={link.href} isLight={isLight}>
              <span className="text-[13px] font-medium px-1">{link.name}</span>
            </Navlink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLight ? "bg-black/[0.04] hover:bg-black/[0.08]" : "bg-white/[0.05] hover:bg-white/[0.1]"}`}
          >
            {isLight ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Desktop User Dropdown Section */}
          <div className="hidden lg:block relative" ref={dropdownRef}>
            {!loading && user ? (
              <>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-500/50 hover:border-indigo-500 transition-all active:scale-90 relative"
                >
                  <Image
                    src={user?.image || "/default-avatar.png"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </button>

                {/* --- Laptop/Desktop Modal --- */}
                {isProfileOpen && (
                  <div
                    className={`absolute right-0 mt-3 w-64 rounded-2xl border shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden ${isLight ? "bg-white border-slate-100" : "bg-[#12121f] border-white/10"}`}
                  >
                    {/* Name & Email added here */}
                    <div
                      className={`px-5 py-4 border-b ${isLight ? "bg-slate-50/50 border-slate-100" : "bg-white/5 border-white/5"}`}
                    >
                      <p
                        className={`text-[14px] font-bold truncate ${isLight ? "text-slate-900" : "text-white"}`}
                      >
                        {user?.name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate font-medium mt-0.5">
                        {user?.email}
                      </p>
                    </div>

                    <div className="p-1.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                      >
                        <LayoutDashboard
                          size={16}
                          className="text-indigo-500"
                        />{" "}
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                      >
                        <User size={16} className="text-indigo-500" /> My
                        profile
                      </Link>
                      <div
                        className={`my-1.5 border-t ${isLight ? "border-slate-100" : "border-white/5"}`}
                      />
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-red-500 hover:bg-red-500/10 transition-colors text-left"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              !loading && (
                <Link
                  href="/auth/login"
                  className="px-5 py-1.5 rounded-full text-[13px] font-bold bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 transition-all active:scale-95"
                >
                  Join
                </Link>
              )
            )}
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden border-t animate-in slide-in-from-top-2 duration-300 ${isLight ? "bg-white border-black/[0.05]" : "bg-[#0a0a14] border-white/[0.05]"}`}
        >
          {/* Mobile Profile Header */}
          {!loading && user && (
            <div
              className={`px-6 py-6 border-b ${isLight ? "bg-slate-50/50 border-slate-100" : "bg-white/5 border-white/5"}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-indigo-500 relative">
                  <Image
                    src={user?.image || "/default-avatar.png"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-base font-bold truncate ${isLight ? "text-slate-900" : "text-white"}`}
                  >
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate font-medium">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Mobile Quick Actions */}
              <div className="grid grid-cols-3 gap-2 mt-5">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border ${isLight ? "bg-white border-slate-200 text-slate-600" : "bg-white/5 border-white/10 text-slate-400"}`}
                >
                  <LayoutDashboard size={18} />
                  <span className="text-[10px] font-bold uppercase">
                    Dashboard
                  </span>
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border ${isLight ? "bg-white border-slate-200 text-slate-600" : "bg-white/5 border-white/10 text-slate-400"}`}
                >
                  <User size={18} />
                  <span className="text-[10px] font-bold uppercase">
                    Profile
                  </span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500"
                >
                  <LogOut size={18} />
                  <span className="text-[10px] font-bold uppercase">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Mobile Nav Links */}
          <div className="px-6 py-4 space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-3">
              Main Menu
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-3 rounded-xl text-sm font-semibold transition-colors ${isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
              >
                {link.name}
              </Link>
            ))}

            {!loading && !user && (
              <div className="pt-4 mt-2 border-t border-white/[0.05] flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2.5 text-sm font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center bg-indigo-600 text-white py-3 rounded-xl text-sm font-bold shadow-lg"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
