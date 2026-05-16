"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Trophy,
  FileText,
  Settings,
  Users,
  ChevronDown,
  PlusCircle,
  ClipboardList,
  ShieldCheck,
  CheckCircle2,
  Shield,
  User2,
} from "lucide-react";
import useRole from "../utils/hooks/useRole";
import useAuth from "../utils/hooks/useAuth";

const Aside = ({ collapsed, isDark, mobileOpen, setMobileOpen }) => {
  const pathname = usePathname();
  const role = useRole();
  const { user } = useAuth();
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const navItems = useMemo(() => {
    if (!role) {
      return [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/dashboard",
        },
      ];
    }

    const common = [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
    ];

    if (role === "admin") {
      return [
        ...common,
        {
          label: "Manage Users",
          icon: Users,
          isGroup: true,
          children: [
            {
              label: "All Members",
              icon: Users,
              href: "/dashboard/manage-users",
            },
            {
              label: "Add Member",
              icon: PlusCircle,
              href: "/dashboard/add-user",
            },
          ],
        },
        {
          label: "Manage Creators",
          icon: Shield,
          isGroup: true,
          children: [
            {
              label: "All Creator",
              icon: User2,
              href: "/dashboard/manage-creator",
            },
          ],
        },
        {
          label: "Manage Contests",
          icon: ShieldCheck,
          href: "/dashboard/manage-contests",
        },
      ];
    }

    if (role === "creator") {
      return [
        ...common,
        {
          label: "Add Contest",
          icon: PlusCircle,
          href: "/dashboard/add-contest",
        },
        {
          label: "My Created",
          icon: ClipboardList,
          href: "/dashboard/my-created",
        },
        {
          label: "Submitted Tasks",
          icon: FileText,
          href: "/dashboard/submitted-tasks",
        },
      ];
    }

    return [
      ...common,
      {
        label: "Manage Creators",
        icon: ShieldCheck,
        isGroup: true,
        children: [
          {
            label: "Be-A-Creator",
            icon: PlusCircle,
            href: "/be-a-creator",
          },
        ],
      },
      {
        label: "My Contests",
        icon: Trophy,
        isGroup: true,
        children: [
          {
            label: "Participated",
            icon: CheckCircle2,
            href: "/dashboard/my-participated",
          },
          {
            label: "Winning Contests",
            icon: Trophy,
            href: "/dashboard/my-winning",
          },
        ],
      },
    ];
  }, [role]);

  const sidebarBg = isDark
    ? "bg-[#0f0f0f] border-r border-white/[0.07]"
    : "bg-[#fafafa] border-r border-gray-200";

  const activeLink = isDark
    ? "bg-[#c8f53a]/10 text-[#c8f53a]"
    : "bg-[#b5e318]/15 text-[#5a7a00]";

  const inactiveLink = isDark
    ? "text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100";

  const NavLinkItem = ({ item, isSubItem = false }) => {
    const Icon = item.icon;
    const isExpanded = openMenus[item.label];
    const active = item.href ? pathname === item.href : false;

    if (item.isGroup) {
      return (
        <div className="mb-1">
          <button
            type="button"
            onClick={() => toggleSubMenu(item.label)}
            className={`w-full flex items-center rounded-2xl text-[13.5px] transition-all ${inactiveLink}
            ${
              collapsed
                ? "justify-between px-2 py-3"
                : "justify-between px-3 py-3"
            }`}
          >
            <div
              className={`flex items-center gap-3 ${
                collapsed ? "justify-center flex-1" : ""
              }`}
            >
              <Icon size={19} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </div>

            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {isExpanded && (
            <div className={`mt-1 space-y-1 ${collapsed ? "ml-0" : "ml-4"}`}>
              {item.children.map((child) => (
                <NavLinkItem key={child.href} item={child} isSubItem={true} />
              ))}
            </div>
          )}
        </div>
      );
    }

    if (item.href) {
      return (
        <Link
          href={item.href}
          onClick={() => setMobileOpen && setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 rounded-2xl text-[13.5px] transition-all duration-150 group relative
          ${active ? activeLink : inactiveLink}
          ${collapsed ? "justify-center py-3" : "py-3"}
          ${isSubItem ? "py-2" : ""}
          `}
        >
          <Icon size={isSubItem ? 17 : 19} className="flex-shrink-0" />

          {!collapsed && <span>{item.label}</span>}

          {collapsed && (
            <span className="absolute left-full ml-3 px-2 py-1 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity z-50 bg-gray-900 text-white whitespace-nowrap">
              {item.label}
            </span>
          )}
        </Link>
      );
    }

    return null;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 lg:static lg:translate-x-0 transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        ${sidebarBg} flex flex-col h-screen overflow-hidden shrink-0
        ${collapsed ? "w-[68px]" : "w-[240px]"}
        `}
      >
        <div
          className={`flex items-center gap-3 px-4 py-5 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="relative w-9 h-9 flex-shrink-0">
            <Image
              src="/Logo.png"
              alt="Logo"
              fill
              className="object-contain rounded-xl"
            />
          </div>

          {!collapsed && (
            <span
              className={`font-black tracking-tight text-[17px] ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              ContestHub
            </span>
          )}
        </div>

        <nav className="flex-1 min-h-0 px-2 space-y-1 overflow-y-auto">
          {!role && !collapsed && (
            <div className="px-4 py-2 animate-pulse text-xs text-gray-400">
              Loading menu...
            </div>
          )}

          {!collapsed && role && (
            <p className="px-4 mb-2 text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">
              Menu
            </p>
          )}

          {navItems.map((item) => (
            <NavLinkItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="px-2 pb-4">
          <NavLinkItem
            item={{
              label: "Settings",
              icon: Settings,
              href: "/dashboard/settings",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Aside;
