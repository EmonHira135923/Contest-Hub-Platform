"use client";
import React, { useState } from "react";
import useTheme from "../utils/hooks/useThemeValue";
import Aside from "./Aside";
import Anavvar from "./Anavvar";

const DashboardLayoutClient = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [collapsed, setCollapsed] = useState(false);

  const bg = isDark ? "bg-[#080b10]" : "bg-slate-100";

  return (
    <div
      className={`flex h-screen overflow-hidden ${bg} transition-colors duration-300`}
    >
      {/* Sidebar */}
      <Aside collapsed={collapsed} isDark={isDark} />

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Anavvar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />

        {/* Page content */}
        <main
          className={`flex-1 overflow-y-auto p-6 transition-colors duration-300 ${isDark ? "text-white" : "text-slate-900"}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutClient;
