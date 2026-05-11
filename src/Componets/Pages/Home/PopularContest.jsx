"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import PopularContestSkeleton from "@/Componets/Skeltons/PopularContestSkeleton";
import PopularContestCard from "@/Componets/Cards/PopularContestCard";

const PopularContestSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: popularContests = [], isLoading } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/popularcontest");
      return res.data.data; // আপনার API structure অনুযায়ী
    },
  });

  return (
    <section className="py-20 bg-[#05050a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Popular <span className="text-indigo-500">Contests</span>
          </h2>
          <p className="text-slate-400">Most joined competitions this week</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? // লোডিং এর সময় ৬টি স্কেলিটন দেখাবে
              [...Array(6)].map((_, i) => <PopularContestSkeleton key={i} />)
            : popularContests.map((contest) => (
                <PopularContestCard key={contest._id} contest={contest} />
              ))}
        </div>

        {!isLoading && popularContests.length === 0 && (
            <p className="text-white text-center py-10">No popular contests found.</p>
        )}
      </div>
    </section>
  );
};

export default PopularContestSection;