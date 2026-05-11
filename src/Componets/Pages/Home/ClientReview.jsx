"use client";

import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { motion } from "framer-motion";
import React from "react";

const REVIEWS = [
  {
    id: 1,
    text: "ContestHub completely changed my career. I won my first design competition here and it opened doors I never thought possible. The platform is polished and the community is amazing.",
    name: "Sarah Chen",
    role: "UI Designer",
    tag: "$10k winner",
    avatar: "SC",
    avatarColor: "from-violet-500 to-purple-600",
    stars: 5,
  },
  {
    id: 2,
    text: "The hackathon experience was incredible. Well-structured, fair judging and the prize money was delivered instantly. I've competed on other platforms and nothing compares.",
    name: "Marcus Rodriguez",
    role: "Developer",
    tag: "3x winner",
    avatar: "MR",
    avatarColor: "from-teal-500 to-cyan-600",
    stars: 5,
  },
  {
    id: 3,
    text: "As a contest creator, the tools are phenomenal. Managing submissions, communicating with participants, and declaring winners is seamless. My contests get 5× more entries here.",
    name: "Alex Lin",
    role: "Contest Creator",
    tag: "Brand Agency",
    avatar: "AL",
    avatarColor: "from-amber-500 to-orange-600",
    stars: 5,
  },
  {
    id: 4,
    text: "I was skeptical at first but after my second contest win I'm a true believer. The judging is transparent, the community is supportive, and payouts are instant.",
    name: "Priya Nair",
    role: "AI Engineer",
    tag: "$4k winner",
    avatar: "PN",
    avatarColor: "from-pink-500 to-rose-600",
    stars: 5,
  },
  {
    id: 5,
    text: "I've entered 12 contests and placed in 7. The skill growth alone is worth it — but the prize money is a great bonus. This platform genuinely rewards talent.",
    name: "David Kim",
    role: "Full-Stack Dev",
    tag: "Top 10%",
    avatar: "DK",
    avatarColor: "from-blue-500 to-indigo-600",
    stars: 5,
  },
  {
    id: 6,
    text: "The data viz contest pushed me to try techniques I had never used. I didn't win but the feedback from judges was gold. Already signed up for the next one.",
    name: "Lena Müller",
    role: "Data Scientist",
    tag: "2x finalist",
    avatar: "LM",
    avatarColor: "from-emerald-500 to-teal-600",
    stars: 4,
  },
  {
    id: 7,
    text: "Running a writing contest here was effortless. The submission portal, automated reminders, and leaderboard all work beautifully. Highly recommend for any organizer.",
    name: "James Okafor",
    role: "Publisher",
    tag: "Contest Organizer",
    avatar: "JO",
    avatarColor: "from-orange-500 to-red-600",
    stars: 5,
  },
  {
    id: 8,
    text: "I've recommended ContestHub to my entire design cohort. The exposure you get when you place is unreal — I landed two freelance clients from my contest profile alone.",
    name: "Yuki Tanaka",
    role: "Graphic Designer",
    tag: "$6k winner",
    avatar: "YT",
    avatarColor: "from-fuchsia-500 to-pink-600",
    stars: 5,
  },
];

const Stars = ({ count, isDark }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-3.5 h-3.5 ${
          i < count
            ? "text-amber-400"
            : isDark
              ? "text-slate-600"
              : "text-slate-200"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ review, isDark }) => (
  <div
    className={`shrink-0 w-72 rounded-2xl border p-5 flex flex-col gap-4 transition-colors ${
      isDark
        ? "bg-[#161d2e] border-slate-700/60"
        : "bg-white border-slate-200 shadow-sm"
    }`}
  >
    {/* Quote icon */}
    <div
      className={`text-3xl font-serif leading-none ${
        isDark ? "text-indigo-500/50" : "text-indigo-300"
      }`}
    >
      "
    </div>

    {/* Text */}
    <p
      className={`text-sm leading-relaxed flex-1 ${
        isDark ? "text-slate-300" : "text-slate-600"
      }`}
    >
      {review.text}
    </p>

    {/* Footer */}
    <div className="flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-full bg-gradient-to-br ${review.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}
      >
        {review.avatar}
      </div>
      <div className="min-w-0">
        <p
          className={`text-xs font-bold truncate ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}
        >
          {review.name}
        </p>
        <p
          className={`text-xs truncate ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}
        >
          {review.role} · {review.tag}
        </p>
      </div>
      <Stars count={review.stars} isDark={isDark} />
    </div>
  </div>
);

// ── Marquee row (CSS infinite scroll) ────────────────────────────────────────
const MarqueeRow = ({ reviews, direction = "left", isDark }) => {
  const doubled = [...reviews, ...reviews]; // duplicate for seamless loop

  return (
    <div className="overflow-hidden relative w-full">
      {/* Fade edges */}
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 ${
          isDark
            ? "bg-gradient-to-r from-[#0f1623] to-transparent"
            : "bg-gradient-to-r from-slate-50 to-transparent"
        }`}
      />
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 ${
          isDark
            ? "bg-gradient-to-l from-[#0f1623] to-transparent"
            : "bg-gradient-to-l from-slate-50 to-transparent"
        }`}
      />

      <div
        className={`flex gap-4 w-max ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} isDark={isDark} />
        ))}
      </div>
    </div>
  );
};

const ClientReview = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const row1 = REVIEWS.slice(0, 4);
  const row2 = REVIEWS.slice(4);

  return (
    <>
      {/* ── Inject keyframe animations ── */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 32s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 36s linear infinite;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section
        className={`w-full py-20 overflow-hidden transition-colors duration-300 ${
          isDark ? "bg-[#0f1623]" : "bg-slate-50"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 mb-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span
              className={`text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${
                isDark
                  ? "bg-emerald-900/30 text-emerald-400"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              💬 Community Voice
            </span>
            <h2
              className={`mt-4 text-4xl md:text-5xl font-extrabold tracking-tight ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              What Creators Say
            </h2>
            <p
              className={`mt-2 text-base ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Real stories from our community
            </p>
          </motion.div>
        </div>

        {/* ── Marquee rows ── */}
        <div className="flex flex-col gap-5">
          <MarqueeRow reviews={row1} direction="left" isDark={isDark} />
          <MarqueeRow reviews={row2} direction="right" isDark={isDark} />
        </div>

        {/* ── Summary stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`mt-14 mx-4 md:mx-auto max-w-2xl rounded-2xl border flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x overflow-hidden ${
            isDark
              ? "border-slate-700 divide-slate-700"
              : "border-slate-200 divide-slate-200 shadow-sm"
          }`}
        >
          {[
            { label: "Reviews", value: "12,400+", icon: "💬" },
            { label: "Avg Rating", value: "4.9 / 5", icon: "⭐" },
            { label: "Would Recommend", value: "98%", icon: "👍" },
          ].map((s, i) => (
            <div
              key={i}
              className={`flex-1 text-center py-6 px-4 ${
                isDark ? "bg-[#161d2e]" : "bg-white"
              }`}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div
                className={`text-2xl font-black ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                {s.value}
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default ClientReview;
