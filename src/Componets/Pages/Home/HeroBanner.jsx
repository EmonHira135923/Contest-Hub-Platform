"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Loader2 } from "lucide-react";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import useAllContests from "@/Componets/utils/hooks/useAllContests";

export default function HeroBanner() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  
  // API থেকে ডাইনামিক ক্যাটাগরি এবং ডাটা নিয়ে আসা
  const { categories, isLoading } = useAllContests(query, activeCategory);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  // সার্চ এবং ক্যাটাগরি প্যারামিটার হ্যান্ডলার
  const handleSearch = (searchQuery = query, category = activeCategory) => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append("q", searchQuery.trim());
    if (category) params.append("category", category);

    // ইউজারকে সার্চ রেজাল্ট পেজে পাঠিয়ে দেওয়া
    router.push(`/all-contests?${params.toString()}`);
  };

  const handleCategoryClick = (categoryValue) => {
    // যদি একই ক্যাটাগরিতে আবার ক্লিক করে তবে ফিল্টার রিমুভ হবে, নাহলে সিলেক্ট হবে
    const newCategory = activeCategory === categoryValue ? "" : categoryValue;
    setActiveCategory(newCategory);
    handleSearch(query, newCategory);
  };

  // ক্যাটাগরি নামের সাথে আইকন ম্যাচ করার জন্য একটি ছোট ম্যাপার
  const getIcon = (name) => {
    const icons = {
      Design: "🎨",
      Development: "💻",
      Writing: "✍️",
      "Data Science": "📊",
    };
    return icons[name] || "🚀"; // ডিফল্ট আইকন
  };

  return (
    <section
      className={`relative w-full overflow-hidden transition-all duration-500 ${
        isDark ? "bg-[#0a0a14]" : "bg-[#1e1b6e]"
      }`}
    >
      {/* Background patterns */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-24 flex flex-col items-center gap-12 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[13px] font-bold tracking-wide shadow-sm ${
            isDark
              ? "bg-white/5 border-white/10 text-indigo-200"
              : "bg-white/10 border-white/20 text-[#e0ddff]"
          }`}
        >
          <Sparkles size={14} className="text-amber-400" />
          PLATFORM OF THE YEAR 2026
        </div>

        {/* Heading */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-7xl font-black leading-[1.05] tracking-tight text-white">
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
            className={`text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto ${
              isDark ? "text-slate-400" : "text-[#c8c3ff]/80"
            }`}
          >
            Compete in world-class contests, showcase your skills, and win
            life-changing prizes alongside 300,000+ creators.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-2 rounded-2xl p-2 shadow-2xl border bg-white overflow-hidden transition-focus-within:ring-4 ring-indigo-500/20">
            <div className="pl-3">
              <Search size={20} className="text-slate-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by contest title..."
              className="flex-1 text-base bg-transparent border-none outline-none py-2.5 text-slate-800 placeholder:text-slate-400"
            />
            <button
              onClick={() => handleSearch()}
              className="px-8 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-lg bg-[#5b50e8] hover:bg-indigo-500"
            >
              Search
            </button>
          </div>
        </div>

        {/* Dynamic Category pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {isLoading ? (
            <div className="flex items-center gap-2 text-white/50 animate-pulse">
              <Loader2 size={16} className="animate-spin" />
              <span>Loading Categories...</span>
            </div>
          ) : (
            categories?.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[13px] font-bold border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-xl scale-105"
                    : isDark
                    ? "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                    : "bg-white/10 border-white/10 text-[#d4d0ff] hover:bg-white/20 hover:text-white"
                }`}
              >
                <span>{getIcon(cat)}</span> {cat}
              </button>
            ))
          )}
        </div>
      </div>
    </section>
  );
}