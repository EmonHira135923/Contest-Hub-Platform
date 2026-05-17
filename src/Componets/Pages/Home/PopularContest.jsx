"use client";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import { ContestSkeleton } from "@/Componets/Skeltons/ContestSkeleton";
import ContestCard from "@/Componets/Cards/ContestCard";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { ArrowRight } from "lucide-react";

const PopularContestSection = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();

  // theme থেকে isDark চেক করা
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
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <h2
            className={`text-3xl md:text-5xl font-black mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Popular <span className="text-indigo-500">Contests</span>
          </h2>
          <p className={`${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Most joined competitions this week
          </p>
        </div>

        {/* Contests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? // লোডিং এর সময় ৬টি স্কেলিটন দেখাবে
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

        {/* নো ডেটা মেসেজ */}
        {!isLoading && popularContests.length === 0 && (
          <p
            className={`text-center py-10 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            No popular contests found.
          </p>
        )}

        {/* 🔘 একদম নিচে সেন্ট্রাল "Show All" বাটন (সব স্ক্রিনের জন্য) */}
        {!isLoading && popularContests.length > 0 && (
          <div className="mt-16 flex justify-center">
            <Link
              href="/all-contests"
              className={`group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg ${
                isDark
                  ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-900/30 hover:shadow-indigo-600/20"
                  : "bg-white text-indigo-600 border border-slate-200 hover:bg-indigo-600 hover:text-white shadow-slate-200"
              }`}
            >
              Show All Contests
              <ArrowRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularContestSection;
