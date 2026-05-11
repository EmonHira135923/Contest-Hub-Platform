"use client";
import React from "react";
import Link from "next/link";

const PopularContestCard = ({ contest }) => {
  return (
    <div className="relative group w-full overflow-hidden rounded-[2rem] bg-slate-900 border border-white/10 shadow-2xl transition-all hover:scale-[1.02]">
      {/* Visual Header */}
      <div className="h-48 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative flex items-center justify-center">
        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-4 py-1 rounded-full border border-white/20">
          <span className="text-white font-black tracking-tighter">
            {contest.prize}
          </span>
        </div>
        <span className="text-7xl opacity-20 select-none font-black text-white">
          {contest.category?.substring(0, 2).toUpperCase()}
        </span>
        <div className="absolute -bottom-1 w-full h-12 bg-gradient-to-t from-slate-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-md bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
            {contest.category}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-500 text-[10px] font-bold uppercase italic">
            Popular
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 leading-tight line-clamp-1">
          {contest.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {contest.description}
        </p>

        {/* Stats Grid */}
        <div className="flex items-center justify-between py-4 border-t border-white/5">
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-black">
              Participants
            </p>
            <p className="text-white font-bold">
              {contest.participants?.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase font-black">
              Deadline
            </p>
            <p className="text-rose-400 font-bold">
              {new Date(contest.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <Link href={`/contest/${contest._id}`}>
          <button className="w-full py-4 mt-2 bg-white text-slate-900 font-black rounded-xl hover:bg-indigo-400 hover:text-white transition-colors uppercase tracking-widest text-xs">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularContestCard;
