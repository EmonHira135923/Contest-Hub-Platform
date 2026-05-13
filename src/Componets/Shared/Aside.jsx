"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Trophy,
  FileText,
  Settings,
  Wallet,
  BarChart3,
  Users,
  X,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Contests", icon: Trophy, href: "/dashboard/contests" },
  { label: "My Profile", icon: User, href: "/dashboard/profile" },
  { label: "Reports", icon: BarChart3, href: "/dashboard/reports" },
  { label: "Documents", icon: FileText, href: "/dashboard/documents" },
  { label: "Members", icon: Users, href: "/dashboard/members" },
  { label: "Wallet", icon: Wallet, href: "/dashboard/wallet" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const Aside = ({ collapsed, isDark, mobileOpen, setMobileOpen }) => {
  const pathname = usePathname();

  // ── color tokens ───────────────────────────────────────────────────────────
  const sidebarBg = isDark
    ? "bg-[#0f0f0f] border-r border-white/[0.07]"
    : "bg-[#fafafa] border-r border-gray-200";

  const logoText = isDark ? "text-gray-100" : "text-gray-900";
  const menuLabel = isDark ? "text-white/20" : "text-gray-400";

  const activeLink = isDark
    ? "bg-[#c8f53a]/10 text-[#c8f53a] font-semibold"
    : "bg-[#b5e318]/15 text-[#5a7a00] font-semibold";

  const inactiveLink = isDark
    ? "text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100";

  const activeIcon = isDark ? "text-[#c8f53a]" : "text-[#6a9200]";
  const inactiveIcon = isDark
    ? "text-white/30 group-hover:text-white/60"
    : "text-gray-400 group-hover:text-gray-600";

  const tooltipBg = isDark
    ? "bg-[#1a1a1a] border-white/10 text-white"
    : "bg-gray-900 border-gray-700 text-white";

  // ── sidebar inner content ──────────────────────────────────────────────────
  const SidebarContent = () => (
    <div
      className={`${sidebarBg} flex flex-col h-full transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[220px]"}`}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 py-5 ${collapsed ? "justify-center" : ""}`}
      >
        <div className="relative w-9 h-9 flex-shrink-0">
          <Image
            src="/Logo.png"
            alt="ContestHub"
            fill
            className="object-contain rounded-xl"
          />
        </div>
        {!collapsed && (
          <span className={`font-black tracking-tight text-[17px] ${logoText}`}>
            ContestHub
          </span>
        )}
        {/* Mobile close button */}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className={`ml-auto p-1 rounded-lg ${isDark ? "text-white/40 hover:text-white hover:bg-white/10" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"}`}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Menu label */}
      {!collapsed && (
        <p
          className={`px-5 mb-2 text-[10px] font-bold tracking-[0.2em] uppercase ${menuLabel}`}
        >
          Menu
        </p>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-3 rounded-2xl text-[13.5px] transition-all duration-150 group relative
                ${active ? activeLink : inactiveLink}
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <Icon
                size={19}
                className={`flex-shrink-0 transition-colors ${active ? activeIcon : inactiveIcon}`}
              />
              {!collapsed && <span>{label}</span>}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <span
                  className={`absolute left-full ml-3 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-xl z-50 border ${tooltipBg}`}
                >
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="h-5" />
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <div className="hidden lg:flex h-full flex-shrink-0">
        <SidebarContent />
      </div>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full z-50 lg:hidden shadow-2xl">
            <div className={`${sidebarBg} flex flex-col h-full w-[260px]`}>
              {/* Logo + close */}
              <div className="flex items-center gap-3 px-4 py-5">
                <div className="relative w-9 h-9 flex-shrink-0">
                  <Image
                    src="/Logo.png"
                    alt="ContestHub"
                    fill
                    className="object-contain rounded-xl"
                  />
                </div>
                <span
                  className={`font-black tracking-tight text-[17px] ${logoText}`}
                >
                  ContestHub
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className={`ml-auto p-1.5 rounded-xl ${isDark ? "text-white/40 hover:text-white hover:bg-white/10" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"}`}
                >
                  <X size={18} />
                </button>
              </div>

              <p
                className={`px-5 mb-2 text-[10px] font-bold tracking-[0.2em] uppercase ${menuLabel}`}
              >
                Menu
              </p>

              <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
                {NAV.map(({ label, icon: Icon, href }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-2xl text-[13.5px] transition-all duration-150 group
                        ${active ? activeLink : inactiveLink}
                      `}
                    >
                      <Icon
                        size={19}
                        className={`flex-shrink-0 ${active ? activeIcon : inactiveIcon}`}
                      />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="h-5" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Aside;
