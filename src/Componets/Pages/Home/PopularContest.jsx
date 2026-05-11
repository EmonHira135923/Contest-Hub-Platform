"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import { ContestSkeleton } from "@/Componets/Skeltons/ContestSkeleton";
import ContestCard from "@/Componets/Cards/ContestCard";
import useTheme from "@/Componets/utils/hooks/useThemeValue";

const PopularContestSection = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();

  // theme থেকে isDark চেক করা (যেহেতু নিচে isDark ব্যবহার করেছেন)
  const isDark = theme === "dark";

  const { data: popularContests = [], isLoading } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/popularcontest");
      return res.data.data;
    },
  });

  return (
    <section
      className={`py-20 transition-colors duration-500 ${isDark ? "bg-[#05050a]" : "bg-slate-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2
            className={`text-3xl md:text-5xl font-black mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Popular <span className="text-indigo-500">Contests</span>
          </h2>
          <p className={`${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Most joined competitions this week
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? // লোডিং এর সময় ৬টি স্কেলিটন দেখাবে
              [...Array(6)].map((_, i) => (
                <ContestSkeleton key={i} isDark={isDark} />
              ))
            : popularContests.map((contest) => (
                <ContestCard
                  key={contest._id}
                  contest={contest}
                  isDark={isDark}
                />
              ))}
        </div>

        {!isLoading && popularContests.length === 0 && (
          <p
            className={`text-center py-10 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            No popular contests found.
          </p>
        )}
      </div>
    </section>
  );
};

export default PopularContestSection;
