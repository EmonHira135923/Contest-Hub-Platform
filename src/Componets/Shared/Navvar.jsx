"use client";
import Link from "next/link";
import useTheme from "../utils/hooks/useThemeValue";
export default function Navvar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`navbar px-5 ${
        theme === "light"
          ? "bg-white text-black"
          : "bg-black text-white"
      }`}
    >
      <h1 className="flex-1">Logo</h1>

      <Link href="/">Home</Link>
      <Link href="/about">About</Link>

      <button onClick={toggleTheme} className="btn">
        Toggle
      </button>
    </div>
  );
}