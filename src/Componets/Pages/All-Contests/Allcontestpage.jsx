"use client";
import { useSearchParams } from "next/navigation";
import useAllContests from "@/Componets/utils/hooks/useAllContests";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { ContestSkeleton } from "@/Componets/Skeltons/ContestSkeleton";
import ContestCard from "@/Componets/Cards/ContestCard";

const Allcontestpage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // URL থেকে সার্চ প্যারামিটারগুলো নিন
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const { contests, isLoading } = useAllContests(q, category);

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-500 ${
        isDark ? "bg-[#05050a] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-black mb-2">Explore All Contests</h1>
            <p className={isDark ? "text-slate-400" : "text-slate-500"}>
              Showing {contests?.length || 0} results for your search
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // লোডিং এর সময় ৬টি স্কেলিটন দেখাবে
            [...Array(6)].map((_, i) => (
              <ContestSkeleton key={i} isDark={isDark} />
            ))
          ) : contests.length > 0 ? (
            contests.map((contest) => (
              <ContestCard
                key={contest._id}
                contest={contest}
                isDark={isDark}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <h2 className="text-xl font-bold">No Contests Found!</h2>
              <p className="text-slate-500">
                Try searching with different keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Allcontestpage;
