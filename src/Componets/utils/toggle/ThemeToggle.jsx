"use client";
import useTheme from "../hooks/useThemeValue";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="btn btn-primary"
    >
      {theme}
    </button>
  );
};

export default ThemeToggle;
