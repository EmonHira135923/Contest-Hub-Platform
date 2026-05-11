"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import React from "react";

const WINNERS = [
  {
    id: 1,
    name: "Sarah Chen",
    prize: "$10,000",
    contest: "UI Design Championship",
    company: "Beatmap Creative Studio",
    category: "Design",
    place: "1st Place",
    avatar: "SC",
    avatarColor: "from-violet-500 to-purple-600",
    emoji: "🐻",
    spotlight: true,
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    prize: "$6,500",
    contest: "Open Source Hackathon",
    company: "DevForge Labs",
    category: "Development",
    place: "1st Place",
    avatar: "MR",
    avatarColor: "from-teal-500 to-cyan-600",
    emoji: "💻",
    spotlight: false,
  },
  {
    id: 3,
    name: "Priya Nair",
    prize: "$4,000",
    contest: "AI Prompt Masters",
    company: "Neural Craft",
    category: "AI/ML",
    place: "1st Place",
    avatar: "PN",
    avatarColor: "from-pink-500 to-rose-600",
    emoji: "🤖",
    spotlight: false,
  },
  {
    id: 4,
    name: "Alex Lin",
    prize: "$3,500",
    contest: "Data Viz Grand Prix",
    company: "Insight Atlas",
    category: "Data",
    place: "1st Place",
    avatar: "AL",
    avatarColor: "from-amber-500 to-orange-600",
    emoji: "📊",
    spotlight: false,
  },
];

const STATS = [
  { label: "Total Prize Money", value: "$2.4M+", icon: "💰" },
  { label: "Winners This Year", value: "1,284", icon: "🏆" },
  { label: "Avg Prize per Winner", value: "$1,870", icon: "📈" },
  { label: "Success Rate", value: "98%", icon: "⭐" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

const WinnerAdvertisment = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`relative w-full overflow-hidden py-20 px-4 transition-colors duration-300 ${
        isDark ? "bg-[#0f1623]" : "bg-white"
      }`}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-amber-500" : "bg-amber-300"
          }`}
        />
        <div
          className={`absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full blur-3xl opacity-15 ${
            isDark ? "bg-orange-600" : "bg-orange-300"
          }`}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4 ${
              isDark
                ? "bg-amber-500/15 text-amber-400"
                : "bg-amber-50 text-amber-600"
            }`}
          >
            🏆 Winner Spotlight
          </span>
          <h2
            className={`text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            Real People.{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Real Wins.
            </span>
          </h2>
          <p
            className={`mt-3 text-base max-w-xl mx-auto ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Every week, talented creators walk away with life-changing prizes.
            You could be next.
          </p>
        </motion.div>

        {/* ── Spotlight Card (large) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-px">
            <div
              className={`rounded-3xl p-8 md:p-10 ${
                isDark ? "bg-[#161d2e]" : "bg-white"
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${WINNERS[0].avatarColor} flex items-center justify-center text-3xl shadow-lg`}
                  >
                    {WINNERS[0].emoji}
                  </div>
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    #1
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                      isDark ? "text-amber-400" : "text-amber-600"
                    }`}
                  >
                    🥇 Winner Spotlight
                  </p>
                  <h3
                    className={`text-2xl md:text-3xl font-extrabold ${
                      isDark ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    {WINNERS[0].name} wins{" "}
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                      {WINNERS[0].prize}
                    </span>
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {WINNERS[0].contest} — {WINNERS[0].company}
                  </p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${
                        isDark
                          ? "bg-amber-900/30 text-amber-300"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      🎨 {WINNERS[0].category}
                    </span>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        isDark
                          ? "bg-emerald-900/30 text-emerald-300"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {WINNERS[0].place}
                    </span>
                  </div>
                </div>

                {/* Prize highlight */}
                <div className="shrink-0 text-right">
                  <div className="text-4xl font-black bg-gradient-to-br from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    {WINNERS[0].prize}
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    Prize Awarded
                  </p>
                </div>
              </div>

              {/* Inspiring quote */}
              <div
                className={`mt-6 pt-6 border-t text-sm italic leading-relaxed ${
                  isDark
                    ? "border-slate-700 text-slate-400"
                    : "border-slate-100 text-slate-500"
                }`}
              >
                "I never thought entering a contest would lead to a full-time
                contract with a dream studio. This platform changed everything
                for me. If you're on the fence — just enter."
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Other Winners Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {WINNERS.slice(1).map((w, i) => (
            <motion.div
              key={w.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-5 border transition-all cursor-default ${
                isDark
                  ? "bg-[#161d2e] border-slate-700/60 hover:border-amber-700/50"
                  : "bg-slate-50 border-slate-200 hover:border-amber-300 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${w.avatarColor} flex items-center justify-center text-xl shadow`}
                >
                  {w.emoji}
                </div>
                <div>
                  <p
                    className={`text-sm font-bold ${
                      isDark ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    {w.name}
                  </p>
                  <p
                    className={`text-xs ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {w.company}
                  </p>
                </div>
                <span className="ml-auto text-lg font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  {w.prize}
                </span>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {w.contest}
              </p>
              <div className="flex gap-2 mt-3">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    isDark
                      ? "bg-slate-700 text-slate-300"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {w.category}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-500/20 text-amber-500">
                  {w.place}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 ${
            isDark
              ? "bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-800/30"
              : "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200"
          }`}
        >
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div
                className={`text-2xl font-black ${
                  isDark ? "text-amber-400" : "text-amber-600"
                }`}
              >
                {s.value}
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p
            className={`text-sm mb-4 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Join 284K+ participants competing for life-changing prizes
          </p>
          <button className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
            Enter a Contest Today →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WinnerAdvertisment;
