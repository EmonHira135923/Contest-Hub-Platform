"use client";

import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import Link from "next/link";
import React from "react";

// ── 6 Demo contests ────────────────────────────────────────────────────────────
const DEMO_CONTESTS = [
  {
    id: 1,
    title: "Global UI Design Championship 2025",
    description:
      "Push the boundaries of digital aesthetics. Create interfaces that feel alive, breathing, and utterly unforgettable for real-world products.",
    category: "Design",
    tag: "Open",
    tagColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    prize: "$6,000",
    participants: 1248,
    slotsPercent: 72,
    slotLabel: "72% of slots filled",
    deadline: "Jan 30",
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    accentColor: "bg-violet-500",
    icon: "🎨",
    avatars: ["A", "B", "C"],
    avatarColors: ["bg-rose-500", "bg-sky-500", "bg-amber-500"],
    joined: "1.2k",
  },
  {
    id: 2,
    title: "Open Source Innovation Hackathon",
    description:
      "Build tools that developers actually need. 48-hour sprint to ship something real — APIs, CLIs, libraries, or dev tools that solve daily friction.",
    category: "Development",
    tag: "Closing Soon",
    tagColor:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    prize: "$10,000",
    participants: 3421,
    slotsPercent: 91,
    slotLabel: "91% of slots filled — hurry!",
    deadline: "Jan 15",
    gradient: "from-teal-500 via-emerald-500 to-cyan-600",
    accentColor: "bg-orange-500",
    icon: "💻",
    avatars: ["D", "E", "F"],
    avatarColors: ["bg-violet-500", "bg-pink-500", "bg-teal-500"],
    joined: "3.4k",
  },
  {
    id: 3,
    title: "Sci-Fi Short Story World Cup",
    description:
      "500 words. Infinite universes. Write a story set 1,000 years from now that makes the reader feel the weight of time passing through a single human moment.",
    category: "Writing",
    tag: "New",
    tagColor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    prize: "$2,500",
    participants: 642,
    slotsPercent: 28,
    slotLabel: "Spots still available",
    deadline: "Feb 28",
    gradient: "from-orange-500 via-rose-500 to-red-600",
    accentColor: "bg-emerald-500",
    icon: "✍️",
    avatars: ["G", "H"],
    avatarColors: ["bg-green-500", "bg-indigo-500"],
    joined: "642",
  },
  {
    id: 4,
    title: "AI Prompt Engineering Masters",
    description:
      "Craft prompts that make large language models perform at an entirely new level. Categories: reasoning chains, creative synthesis, and structured extraction.",
    category: "AI/ML",
    tag: "Hot",
    tagColor: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    prize: "$4,000",
    participants: 2190,
    slotsPercent: 55,
    slotLabel: "55% of slots filled",
    deadline: "Feb 10",
    gradient: "from-pink-600 via-fuchsia-500 to-purple-600",
    accentColor: "bg-pink-500",
    icon: "🤖",
    avatars: ["K", "L", "M"],
    avatarColors: ["bg-fuchsia-500", "bg-yellow-500", "bg-blue-500"],
    joined: "2.1k",
  },
  {
    id: 5,
    title: "Data Visualization Grand Prix",
    description:
      "Turn raw datasets into stories. Use any tool — D3, Observable, Flourish — to reveal a hidden truth inside a complex dataset. Beauty meets insight.",
    category: "Data",
    tag: "Open",
    tagColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    prize: "$3,500",
    participants: 876,
    slotsPercent: 40,
    slotLabel: "40% of slots filled",
    deadline: "Mar 5",
    gradient: "from-blue-600 via-cyan-500 to-sky-600",
    accentColor: "bg-blue-500",
    icon: "📊",
    avatars: ["N", "O"],
    avatarColors: ["bg-cyan-500", "bg-orange-500"],
    joined: "876",
  },
  {
    id: 6,
    title: "Mobile UX Speed Challenge",
    description:
      "Design a complete onboarding flow for a fintech app in under 5 screens. Judges score on clarity, delight, and how fast a new user reaches their first goal.",
    category: "Design",
    tag: "Closing Soon",
    tagColor:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    prize: "$5,000",
    participants: 1560,
    slotsPercent: 83,
    slotLabel: "83% of slots filled",
    deadline: "Jan 22",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    accentColor: "bg-amber-500",
    icon: "📱",
    avatars: ["P", "Q", "R"],
    avatarColors: ["bg-red-500", "bg-teal-500", "bg-violet-500"],
    joined: "1.5k",
  },
];

// ── Single Contest Card ────────────────────────────────────────────────────────
const ContestCard = ({ contest, isDark }) => {
  const {
    id,
    title,
    description,
    category,
    tag,
    tagColor,
    prize,
    participants,
    slotsPercent,
    slotLabel,
    deadline,
    gradient,
    accentColor,
    icon,
    avatars,
    avatarColors,
    joined,
  } = contest;

  return (
    <div
      className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col ${
        isDark
          ? "bg-[#161d2e] border-slate-700/60 hover:border-slate-500"
          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
      }`}
    >
      {/* ── Card Banner ── */}
      <div
        className={`relative h-44 bg-gradient-to-br ${gradient} overflow-hidden`}
      >
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')]" />

        {/* Prize badge */}
        <div
          className={`absolute top-3 right-3 ${accentColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}
        >
          {prize}
        </div>

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
            {icon}
          </span>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
              isDark
                ? "border-slate-600 text-slate-300 bg-slate-700/50"
                : "border-slate-200 text-slate-600 bg-slate-100"
            }`}
          >
            {category}
          </span>
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tagColor}`}
          >
            {tag}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-base leading-snug ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}
        >
          {title}
        </h3>

        {/* Description with slice */}
        <p
          className={`text-xs leading-relaxed flex-1 ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {description.length > 110
            ? description.slice(0, 110) + "…"
            : description}
        </p>

        {/* Deadline + participants */}
        <div
          className={`flex items-center gap-4 text-xs ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Ends {deadline}
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {participants.toLocaleString()} participants
          </span>
        </div>

        {/* Slot progress bar */}
        <div>
          <div
            className={`w-full h-1.5 rounded-full overflow-hidden ${
              isDark ? "bg-slate-700" : "bg-slate-100"
            }`}
          >
            <div
              className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-500`}
              style={{ width: `${slotsPercent}%` }}
            />
          </div>
          <p
            className={`text-xs mt-1 ${
              slotsPercent > 80
                ? "text-red-400"
                : isDark
                  ? "text-slate-500"
                  : "text-slate-400"
            }`}
          >
            {slotLabel}
          </p>
        </div>

        {/* Footer: avatars + Details button */}
        <div className="flex items-center justify-between pt-1">
          {/* Stacked avatars */}
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-2">
              {avatars.map((letter, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full ${avatarColors[i]} border-2 ${
                    isDark ? "border-[#161d2e]" : "border-white"
                  } flex items-center justify-center text-white text-xs font-bold`}
                >
                  {letter}
                </div>
              ))}
            </div>
            <span
              className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              +{joined} joined
            </span>
          </div>

          {/* Details button */}
          <Link href={`/contest/${id}`}>
            <button className="text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white transition-all duration-200 shadow-md shadow-indigo-500/30">
              Details →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// ── Main Section ───────────────────────────────────────────────────────────────
const PopularContest = () => {
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const isDark = theme === "dark";

  // In production: fetch from API with axiosSecure
  // useEffect(() => {
  //   axiosSecure.get("/contests/popular").then(res => setContests(res.data));
  // }, [axiosSecure]);

  return (
    <section
      className={`w-full py-16 px-4 transition-colors duration-300 ${
        isDark ? "bg-[#0f1623]" : "bg-slate-50"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <span
            className={`text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
              isDark
                ? "text-indigo-400 bg-indigo-900/30"
                : "text-indigo-600 bg-indigo-50"
            }`}
          >
            Featured
          </span>
          <h2
            className={`mt-3 text-4xl font-extrabold tracking-tight ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            Popular Contests
          </h2>
          <p
            className={`mt-2 text-base ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Trending competitions with the highest prize pools
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_CONTESTS.map((contest) => (
            <ContestCard key={contest.id} contest={contest} isDark={isDark} />
          ))}
        </div>

        {/* ── Show All Button ── */}
        <div className="mt-12 flex justify-center">
          <Link href="/all-contests">
            <button
              className={`group flex items-center gap-2 px-8 py-3 rounded-2xl border-2 font-semibold text-sm transition-all duration-300 hover:gap-3 ${
                isDark
                  ? "border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
                  : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              Browse All Contests
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularContest;
