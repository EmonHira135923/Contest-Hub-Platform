"use client";
import Link from "next/link";
import Image from "next/image";
import useTheme from "@/Componets/utils/hooks/useThemeValue";

export default function NotFound() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        isLight ? "bg-[#f8f6ff]" : "bg-[#09090f]"
      }`}
    >
      {/* Ghost 404 background text */}
      <span
        className="absolute select-none pointer-events-none font-black leading-none"
        style={{
          fontSize: "clamp(120px, 25vw, 240px)",
          letterSpacing: "-8px",
          color: isLight ? "rgba(124,58,237,0.05)" : "rgba(167,139,250,0.04)",
        }}
        aria-hidden="true"
      >
        404
      </span>

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-6 text-center max-w-md">
        {/* Logo row + badge */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
            <Image
              src="/Logo.png"
              alt="ContestHub"
              width={24}
              height={24}
              className="brightness-0 invert"
            />
          </div>
          <span
            className={`text-xl font-extrabold tracking-tight ${
              isLight ? "text-indigo-950" : "text-[#f0eeff]"
            }`}
          >
            Contest
            <span className={isLight ? "text-violet-600" : "text-violet-400"}>
              Hub
            </span>
          </span>

          <div
            className={`w-px h-7 ${
              isLight ? "bg-violet-200" : "bg-violet-900"
            }`}
          />

          <span
            className={`text-sm font-bold px-3 py-0.5 rounded-full border ${
              isLight
                ? "text-violet-700 bg-violet-50 border-violet-200"
                : "text-violet-300 bg-violet-500/10 border-violet-500/20"
            }`}
          >
            404
          </span>
        </div>

        {/* Floating trophy */}
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-7xl animate-[float_3s_ease-in-out_infinite]"
            role="img"
            aria-label="Trophy"
          >
            🏆
          </span>
          <div
            className={`w-10 h-1.5 rounded-full animate-[shadowPulse_3s_ease-in-out_infinite] ${
              isLight ? "bg-violet-200" : "bg-violet-900/50"
            }`}
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3">
          <h1
            className={`text-2xl font-extrabold tracking-tight ${
              isLight ? "text-indigo-950" : "text-[#f0eeff]"
            }`}
          >
            Contest not found
          </h1>
          <p
            className={`text-sm leading-relaxed ${
              isLight ? "text-violet-400" : "text-violet-500"
            }`}
          >
            Looks like this page went off the leaderboard.
            <br />
            The contest you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}
          >
            Go Home
          </Link>
          <Link
            href="/all-contests"
            className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
              isLight
                ? "text-violet-700 border-violet-200 hover:bg-violet-50"
                : "text-violet-300 border-violet-500/20 hover:bg-violet-500/10"
            }`}
          >
            All Contests
          </Link>
        </div>
      </div>
    </div>
  );
}
