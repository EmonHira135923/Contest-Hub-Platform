"use client";
import LoadingScreen from "@/app/loading";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
  // SSR এরর এড়াতে এবং দ্রুত থিম পেতে এই লজিকটি জরুরি
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("contestHub_theme") || "light";
    }
    return "light";
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("contestHub_theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* মাউন্ট হওয়ার আগে সঠিক থিম সহ লোডিং স্ক্রিন */}
      {!mounted ? (
        <LoadingScreen />
      ) : (
        <div className={theme === "dark" ? "dark" : ""}>{children}</div>
      )}
    </ThemeContext.Provider>
  );
}
