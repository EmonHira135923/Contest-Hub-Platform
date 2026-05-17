"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAllContests from "@/Componets/utils/hooks/useAllContests";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { ContestSkeleton } from "@/Componets/Skeltons/ContestSkeleton";
import ContestCard from "@/Componets/Cards/ContestCard";
import Pagination from "@/Componets/Shared/Pagination";

const Allcontestpage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const page = Number(searchParams.get("page") || 1);

  const [searchTerm, setSearchTerm] = useState(q);
  const [selectedCategory, setSelectedCategory] = useState(category);

  const {
    contests,
    categories,
    totalPages,
    currentPage,
    totalCount,
    isLoading,
  } = useAllContests(searchTerm, selectedCategory, page);

  const updateQuery = (
    newSearch = searchTerm,
    newCategory = selectedCategory,
    newPage = 1
  ) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("q", newSearch);
    if (newCategory && newCategory.toLowerCase() !== "all") {
      params.set("category", newCategory);
    }
    if (newPage > 1) params.set("page", String(newPage));
    const queryString = params.toString();
    router.push(`/all-contests${queryString ? `?${queryString}` : ""}`);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    updateQuery(searchTerm, selectedCategory, 1);
  };

  const handleCategoryClick = (value) => {
    setSelectedCategory(value);
    updateQuery(searchTerm, value, 1);
  };

  const handlePageChange = (newPage) => {
    updateQuery(searchTerm, selectedCategory, newPage);
  };

  return (
    <div
      className={`min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isDark ? "bg-[#05050a] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        {/* ───── Hero Banner ───── */}
        <div className="p-[2px] rounded-3xl bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500 shadow-2xl mb-8 sm:mb-12">
          <div className="rounded-[22px] bg-slate-950/95 backdrop-blur-sm text-white px-5 py-6 sm:px-8 sm:py-8">

            {/* Top row — title + badges */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
              <div className="max-w-xl">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight">
                  Discover Contests
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Browse creative competitions with image-first cards, live
                  countdowns, and fast pagination.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                <div className="rounded-full bg-white/10 border border-white/15 px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap">
                  {totalCount ?? 0} Contests
                </div>
                <div className="rounded-full bg-white/10 border border-white/15 px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            </div>

            {/* Search form */}
            <form
              onSubmit={handleSearchSubmit}
              className="grid grid-cols-1 sm:grid-cols-[1fr_auto] lg:grid-cols-[1fr_200px_auto] gap-3 mb-5"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search contests..."
                className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm sm:text-base text-white placeholder:text-slate-400 focus:border-white/50 focus:outline-none transition-colors"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm sm:text-base text-white focus:border-white/50 focus:outline-none transition-colors"
              >
                <option value="all" className="bg-slate-900">
                  All Categories
                </option>
                {categories?.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900">
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-sm sm:text-base font-bold text-slate-900 hover:bg-slate-100 active:scale-95 transition-all whitespace-nowrap"
              >
                Search
              </button>
            </form>

            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryClick("all")}
                className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === "all"
                    ? "bg-white text-slate-900"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/15"
                }`}
              >
                All
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-white text-slate-900"
                      : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/15"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ───── Results label ───── */}
        {!isLoading && contests.length > 0 && (
          <p className={`text-xs sm:text-sm font-medium uppercase tracking-widest mb-4 ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}>
            Showing {contests.length} of {totalCount} results
          </p>
        )}

        {/* ───── Contest Grid ───── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <ContestSkeleton key={i} isDark={isDark} />
            ))
          ) : contests.length > 0 ? (
            contests.map((contest) => (
              <ContestCard key={contest._id} contest={contest} isDark={isDark} />
            ))
          ) : (
            <div className="col-span-full py-16 sm:py-24 text-center">
              <div className={`text-5xl mb-4 ${isDark ? "text-slate-700" : "text-slate-300"}`}>
                🏆
              </div>
              <h2 className="text-lg sm:text-2xl font-bold mb-2">
                No Contests Found
              </h2>
              <p className={`text-sm sm:text-base ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                Try changing your search term or selecting a different category.
              </p>
            </div>
          )}
        </div>

        {/* ───── Pagination ───── */}
        <div className="mt-10 sm:mt-14">
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={handlePageChange}
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
};

export default Allcontestpage;