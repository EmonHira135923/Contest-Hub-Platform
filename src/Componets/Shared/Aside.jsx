"use client";
import React from "react";
import Link from "next/link";
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

const Aside = ({ collapsed, isDark }) => {
  const pathname = usePathname();

  const sidebar = isDark
    ? "bg-[#0e1117] border-r border-white/[0.06]"
    : "bg-[#1e1b4b] border-r border-indigo-900/30";

  return (
    <aside
      className={`${sidebar} flex flex-col h-full transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[220px]"}`}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 py-5 ${collapsed ? "justify-center" : ""}`}
      >
        <div className="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl w-9 h-9 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-900/40">
          <span className="text-white font-black text-sm">CH</span>
        </div>
        {!collapsed && (
          <span className="text-white font-black tracking-tight text-lg">
            ContestHub
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="mx-4 mb-3 border-t border-white/[0.07]" />

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group relative
                ${
                  active
                    ? "bg-gradient-to-r from-violet-600/90 to-indigo-600/80 text-white shadow-lg shadow-violet-900/30"
                    : "text-white/40 hover:text-white/80 hover:bg-white/[0.06]"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 ${active ? "text-white" : "text-white/40 group-hover:text-white/70"}`}
              />
              {!collapsed && <span>{label}</span>}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#1e1b4b] text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-xl z-50 border border-white/10">
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="h-4" />
    </aside>
  );
};

export default Aside;
