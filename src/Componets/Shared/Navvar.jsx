"use client";
import Link from "next/link";
import Image from "next/image";
import useTheme from "../utils/hooks/useThemeValue";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Sun, Moon, LayoutDashboard, LogOut, User } from "lucide-react";
import Navlink from "./Navlink";
import useAuth from "../utils/hooks/useAuth";

export default function Navvar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const dropdownRef = useRef(null);

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

  // Leaderboard link logic
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Contests", href: "/all-contests" },
    ...(user ? [{ name: "Leaderboard", href: "/leaderboard" }] : []), // শুধুমাত্র লগইন থাকলে দেখাবে
    { name: "Contest Arena", href: "/contest-arena" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isLight ? "bg-white/70 border-b border-black/[0.06] text-slate-700" : "bg-[#0a0a14]/75 border-b border-white/[0.05] text-white"}`} style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between relative">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm transition-transform group-hover:scale-95">
            <Image src="/Logo.png" alt="ContestHub" width={20} height={20} className="brightness-0 invert" />
          </div>
          <span className={`text-lg font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white/90"}`}>
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
          <button onClick={toggleTheme} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLight ? "bg-black/[0.04] hover:bg-black/[0.08]" : "bg-white/[0.05] hover:bg-white/[0.1]"}`}>
            {isLight ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          <div className="flex items-center gap-2">
            {loading ? (
              /* --- 🟢 Skeleton Loading --- */
              <div className="flex items-center gap-2">
                <div className={`w-20 h-8 rounded-lg animate-pulse ${isLight ? "bg-slate-200" : "bg-white/10"}`}></div>
                <div className={`w-9 h-9 rounded-full animate-pulse ${isLight ? "bg-slate-200" : "bg-white/10"}`}></div>
              </div>
            ) : user ? (
              /* Logged In */
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-500/50 hover:border-indigo-500 transition-all active:scale-90">
                  <Image src={user?.image || "/default-avatar.png"} alt="Profile" fill className="object-cover" />
                </button>
                {isProfileOpen && (
                  <div className={`absolute right-0 mt-3 w-52 rounded-2xl border shadow-xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden ${isLight ? "bg-white border-slate-100" : "bg-[#12121f] border-white/10"}`}>
                    <div className={`px-4 py-3 border-b ${isLight ? "border-slate-100 bg-slate-50/50" : "border-white/5 bg-white/5"}`}>
                      <p className={`text-[13px] font-bold truncate ${isLight ? "text-slate-900" : "text-white"}`}>{user?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate font-medium">{user?.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                        <LayoutDashboard size={15} /> Dashboard
                      </Link>
                      <Link href="/profile" onClick={() => setIsProfileOpen(false)} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                        <User size={15} /> Myprofile
                      </Link>
                      <button onClick={() => { logout(); setIsProfileOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-red-500 hover:bg-red-500/10 transition-colors">
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Not Logged In */
              <div className="hidden sm:flex items-center gap-1">
                <Link href="/auth/login" className={`px-3 py-1.5 text-[13px] font-medium rounded-lg ${isLight ? "text-slate-500 hover:bg-slate-100" : "text-slate-400 hover:bg-white/[0.05]"}`}>Sign In</Link>
                <Link href="/auth/signup" className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md active:scale-95">Join Free</Link>
              </div>
            )}

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10">
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden border-t ${isLight ? "bg-white border-black/[0.05]" : "bg-[#0a0a14] border-white/[0.05]"}`}>
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`block py-2.5 text-sm font-medium ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                {link.name}
              </Link>
            ))}
            {!loading && !user && (
              <div className="pt-4 mt-2 border-t border-white/[0.05] flex flex-col gap-2">
                <Link href="/auth/login" className="text-center py-2 text-sm font-medium">Sign In</Link>
                <Link href="/auth/signup" className="text-center bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold">Join Free</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}