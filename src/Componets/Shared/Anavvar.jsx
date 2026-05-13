"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useAuth from "../utils/hooks/useAuth";
import {
  User,
  Bell,
  ChevronLeft,
  Menu,
  LogOut,
  Moon,
  Sun,
  Home,
} from "lucide-react";

const Anavvar = ({ collapsed, setCollapsed, isDark, toggleTheme }) => {
  const { user, logout } = useAuth();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const nav = isDark
    ? "bg-[#0e1117] border-b border-white/[0.06]"
    : "bg-white border-b border-slate-200";

  const iconBtn = isDark
    ? "hover:bg-white/[0.06] text-white/40 hover:text-white"
    : "hover:bg-slate-100 text-slate-400 hover:text-slate-700";

  const dropCard = isDark
    ? "bg-[#13131f] border border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
    : "bg-white border border-slate-200 shadow-[0_16px_48px_rgba(0,0,0,0.12)]";

  const dropItem = isDark
    ? "text-white/60 hover:bg-white/[0.06] hover:text-white"
    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900";

  const dropDivider = isDark ? "border-white/[0.07]" : "border-slate-100";

  return (
    <header
      className={`${nav} h-16 flex items-center justify-between px-5 flex-shrink-0 transition-colors duration-300`}
    >
      {/* Left: sidebar toggle */}
      <button
        onClick={() => setCollapsed((p) => !p)}
        className={`p-2 rounded-xl transition-all duration-200 ${iconBtn}`}
      >
        {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Right: theme + bell + avatar */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-xl transition-all duration-200 ${iconBtn}`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notification bell */}
        <button
          className={`relative p-2 rounded-xl transition-all duration-200 ${iconBtn}`}
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full ring-2 ring-[#0e1117]" />
        </button>

        {/* Avatar + dropdown */}
        <div className="relative" ref={dropRef}>
          <button
            onClick={() => setDropOpen((p) => !p)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl transition-all duration-200 hover:bg-white/[0.05]"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-violet-500/40 flex-shrink-0">
              {user?.image ? (
                <Image
                  fill
                  src={user.image}
                  alt="avatar"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black">
                  {user?.name?.[0] ?? "U"}
                </div>
              )}
            </div>
          </button>

          {/* Dropdown */}
          {dropOpen && (
            <div
              className={`absolute right-0 top-full mt-2 w-64 rounded-2xl z-50 overflow-hidden ${dropCard}`}
            >
              {/* User info */}
              <div className="px-5 py-4">
                <p
                  className={`font-black text-[15px] tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  {user?.name ?? "User"}
                </p>
                <p
                  className={`text-xs mt-0.5 ${isDark ? "text-white/30" : "text-slate-400"}`}
                >
                  {user?.email ?? ""}
                </p>
              </div>

              <div className={`border-t ${dropDivider}`} />

              {/* Links */}
              <div className="p-2">
                <Link
                  href="/"
                  onClick={() => setDropOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${dropItem}`}
                >
                  <Home size={16} /> Home
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setDropOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${dropItem}`}
                >
                  <User size={16} /> My Profile
                </Link>
              </div>

              <div className={`border-t ${dropDivider}`} />

              {/* Logout */}
              <div className="p-2">
                <button
                  onClick={() => {
                    logout();
                    setDropOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-semibold text-red-500 hover:bg-red-500/10 transition-all duration-150"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Anavvar;
