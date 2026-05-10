"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import useTheme from "@/Componets/utils/hooks/useThemeValue";

const CATEGORIES = [
  { label: "Design", value: "design", icon: "🎨" },
  { label: "Development", value: "development", icon: "💻" },
  { label: "Writing", value: "writing", icon: "✍️" },
  { label: "Data Science", value: "data-science", icon: "📊" },
];

export default function HeroBanner() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("design");
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(
      `/all-contests?q=${encodeURIComponent(query)}&category=${activeCategory}`,
    );
  };

  return (
    <section
      className={`relative w-full overflow-hidden transition-all duration-500 ${
        isDark
          ? "bg-[#0a0a14]" // ডার্ক মোডে কালো
          : "bg-[#1e1b6e]" // লাইট মোডে আপনার ইমেজের মতো নীল/পার্পল
      }`}
    >
      {/* Background patterns */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top Glow effect for Light Mode (Blue variant) */}
      {!isDark && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 600,
            height: 220,
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.35) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-24 flex flex-col items-center gap-12 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[13px] font-bold tracking-wide transition-all shadow-sm ${
            isDark
              ? "bg-white/5 border-white/10 text-indigo-200"
              : "bg-white/10 border-white/20 text-[#e0ddff]"
          }`}
        >
          <Sparkles
            size={14}
            className={isDark ? "text-amber-400" : "text-amber-400"}
          />
          PLATFORM OF THE YEAR 2026
        </div>

        {/* Heading */}
        <div className="space-y-6">
          <h1
            className={`text-4xl sm:text-7xl font-black leading-[1.05] tracking-tight transition-colors text-white`}
          >
            Where{" "}
            <span
              className={
                isDark ? "text-indigo-500 italic" : "text-sky-300 italic"
              }
            >
              Talent
            </span>{" "}
            Meets
            <br />
            Opportunity
          </h1>
          <p
            className={`text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto transition-colors ${
              isDark ? "text-slate-400" : "text-[#c8c3ff]/80"
            }`}
          >
            Compete in world-class contests, showcase your skills, and win
            life-changing prizes alongside 300,000+ creators.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-2xl">
          <div
            className={`flex items-center gap-2 rounded-2xl p-2 shadow-2xl transition-all border bg-white ${
              isDark ? "border-white/10" : "border-transparent"
            }`}
          >
            <div className="pl-3">
              <Search size={20} className="text-slate-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search contests..."
              className="flex-1 text-base bg-transparent border-none outline-none py-2.5 text-slate-800 placeholder:text-slate-400"
            />
            <button
              onClick={handleSearch}
              className="px-8 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-lg bg-[#5b50e8] hover:bg-indigo-500"
            >
              Search
            </button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[13px] font-bold border transition-all duration-300 ${
                activeCategory === cat.value
                  ? isDark
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-xl"
                    : "bg-white/20 border-white/30 text-white shadow-lg"
                  : isDark
                    ? "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                    : "bg-white/10 border-white/10 text-[#d4d0ff] hover:bg-white/20 hover:text-white"
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
