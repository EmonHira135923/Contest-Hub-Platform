"use client";
import React, { useState } from "react";
import useTheme from "../utils/hooks/useThemeValue"; // ← path ঠিক করো
import Aside from "./Aside"; // ← path ঠিক করো
import Anavvar from "./Anavvar"; // ← path ঠিক করো

const DashboardLayoutClient = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Desktop sidebar collapsed state
  const [collapsed, setCollapsed] = useState(false);

  // Mobile drawer open state
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageBg = isDark ? "bg-[#0a0a0a]" : "bg-gray-100";
  const contentText = isDark ? "text-gray-100" : "text-gray-900";

  return (
    <div
      className={`flex h-screen w-full overflow-hidden ${pageBg} transition-colors duration-300`}
    >
      {/* ── Sidebar (desktop: inline | mobile: overlay inside Aside) ── */}
      <Aside
        collapsed={collapsed}
        isDark={isDark}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* ── Main content area ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Navbar */}
        <Anavvar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isDark={isDark}
          toggleTheme={toggleTheme}
          setMobileOpen={setMobileOpen}
        />

        {/* Page content */}
        <main
          className={`flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-6 transition-colors duration-300 ${contentText}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutClient;
