"use client";
import Image from "next/image";

const LoadingScreen = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-300 ${
        isDark ? "bg-[#020617]" : "bg-white"
      }`}
    >
      <div className="relative flex flex-col items-center">
        <div className="relative w-24 h-24 mb-6">
          <Image
            src="/Logo.png"
            alt="Loading..."
            fill
            className={`object-contain animate-pulse ${
              isDark ? "brightness-125" : ""
            }`}
          />
        </div>

        <div
          className={`w-48 h-1.5 rounded-full overflow-hidden ${
            isDark ? "bg-slate-800" : "bg-slate-100"
          }`}
        >
          <div className="h-full bg-indigo-600 animate-barSlide shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
        </div>

        <div className="mt-6 flex flex-col items-center gap-1">
          <h2
            className={`text-xl font-black tracking-widest uppercase ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Contest<span className="text-indigo-600">Hub</span>
          </h2>
          <p
            className={`text-[10px] font-bold tracking-[0.3em] uppercase ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Loading Experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
