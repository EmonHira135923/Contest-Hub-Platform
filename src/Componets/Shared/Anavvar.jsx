"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useAuth from "../utils/hooks/useAuth";
import {
  LayoutDashboard,
  User,
  Bell,
  ChevronLeft,
  Menu,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";

const Anavvar = ({
  collapsed,
  setCollapsed,
  isDark,
  toggleTheme,
  setMobileOpen,
}) => {
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

  // ── color tokens ──────────────────────────────────────────────────────────
  const nav = isDark
    ? "bg-[#0f0f0f] border-b border-white/[0.07]"
    : "bg-white border-b border-gray-200";

  const iconBtn = isDark
    ? "text-white/40 hover:text-white hover:bg-white/[0.06]"
    : "text-gray-400 hover:text-gray-700 hover:bg-gray-100";

  const dropCard = isDark
    ? "bg-[#141414] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
    : "bg-white border border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.12)]";

  const nameText = isDark ? "text-gray-100" : "text-gray-900";
  const emailText = isDark ? "text-white/30" : "text-gray-400";

  const dropItem = isDark
    ? "text-white/50 hover:bg-white/[0.05] hover:text-white"
    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";

  const divider = isDark ? "border-white/[0.06]" : "border-gray-100";

  return (
    <header
      className={`${nav} h-16 flex items-center justify-between px-4 lg:px-5 flex-shrink-0 transition-colors duration-300`}
    >
      {/* Left side */}
      <div className="flex items-center gap-2">
        {/* Mobile: hamburger → opens overlay drawer */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className={`lg:hidden p-2 rounded-xl transition-all duration-200 ${iconBtn}`}
        >
          <Menu size={20} />
        </button>

        {/* Desktop: collapse/expand sidebar */}
        <button
          onClick={() => setCollapsed((p) => !p)}
          className={`hidden lg:flex p-2 rounded-xl transition-all duration-200 ${iconBtn}`}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-xl transition-all duration-200 ${iconBtn}`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Bell */}
        <button
          className={`relative p-2 rounded-xl transition-all duration-200 ${iconBtn}`}
        >
          <Bell size={18} />
          <span
            className={`absolute top-1.5 right-1.5 w-2 h-2 bg-[#c8f53a] rounded-full ring-2 ${isDark ? "ring-[#0f0f0f]" : "ring-white"}`}
          />
        </button>

        {/* Avatar + dropdown */}
        <div className="relative ml-1" ref={dropRef}>
          <button
            onClick={() => setDropOpen((p) => !p)}
            className={`flex items-center gap-2 pl-1 pr-2.5 py-1.5 rounded-2xl border transition-all duration-200 ${
              isDark
                ? "border-white/[0.08] hover:border-white/[0.14] hover:bg-white/[0.04]"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="relative w-8 h-8 rounded-xl overflow-hidden flex-shrink-0">
              {user?.image ? (
                <Image
                  fill
                  src={user.image}
                  alt="avatar"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#c8f53a] to-[#8ab520] flex items-center justify-center text-[#1a2a00] text-xs font-black">
                  {user?.name?.[0] ?? "U"}
                </div>
              )}
            </div>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${dropOpen ? "rotate-180" : ""} ${isDark ? "text-white/30" : "text-gray-400"}`}
            />
          </button>

          {/* Dropdown */}
          {dropOpen && (
            <div
              className={`absolute right-0 top-full mt-2 w-64 rounded-2xl z-50 overflow-hidden ${dropCard}`}
            >
              {/* User info */}
              <div className="px-5 py-4">
                <p
                  className={`font-black text-[15px] tracking-tight leading-tight ${nameText}`}
                >
                  {user?.name ?? "User"}
                </p>
                <p className={`text-xs mt-1 ${emailText}`}>
                  {user?.email ?? ""}
                </p>
              </div>

              <div className={`border-t ${divider}`} />

              {/* Links */}
              <div className="p-2">
                <Link
                  href="/dashboard"
                  onClick={() => setDropOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${dropItem}`}
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setDropOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${dropItem}`}
                >
                  <User size={15} />
                  My Profile
                </Link>
              </div>

              <div className={`border-t ${divider}`} />

              {/* Logout */}
              <div className="p-2">
                <button
                  onClick={() => {
                    logout();
                    setDropOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-semibold text-red-500 hover:bg-red-500/10 transition-all duration-150"
                >
                  <LogOut size={15} />
                  Logout
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
