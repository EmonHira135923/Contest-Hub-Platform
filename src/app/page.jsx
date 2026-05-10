"use client";

import useTheme from "@/Componets/utils/hooks/useThemeValue";

export default function Home() {
  const { theme } = useTheme();

  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isLight ? "bg-slate-100 text-black" : "bg-slate-950 text-white"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-4">Home Page</h1>

        <p
          className={`text-lg mb-10 ${
            isLight ? "text-slate-700" : "text-slate-300"
          }`}
        >
          Current Theme: {theme}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div
            className={`p-6 rounded-2xl shadow-lg ${
              isLight
                ? "bg-white border border-slate-200"
                : "bg-slate-900 border border-slate-700"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-3 ${
                isLight ? "text-purple-600" : "text-cyan-400"
              }`}
            >
              Card One
            </h2>

            <p className={isLight ? "text-slate-600" : "text-slate-300"}>
              Theme changes only where you use the hook.
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl shadow-lg ${
              isLight
                ? "bg-white border border-slate-200"
                : "bg-slate-900 border border-slate-700"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-3 ${
                isLight ? "text-pink-600" : "text-yellow-400"
              }`}
            >
              Card Two
            </h2>

            <p className={isLight ? "text-slate-600" : "text-slate-300"}>
              Navbar toggle updates this page colors.
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl shadow-lg ${
              isLight
                ? "bg-white border border-slate-200"
                : "bg-slate-900 border border-slate-700"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-3 ${
                isLight ? "text-blue-600" : "text-green-400"
              }`}
            >
              Card Three
            </h2>

            <p className={isLight ? "text-slate-600" : "text-slate-300"}>
              Same UI, different colors for both modes.
            </p>
          </div>
        </div>

        <button
          className={`mt-10 px-8 py-3 rounded-xl font-semibold ${
            isLight ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}
