"use client";

import useTheme from "@/Componets/utils/hooks/useThemeValue";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef } from "react";

// ── Animated counter ──────────────────────────────────────────────────────────
const AnimatedNumber = ({ target, suffix = "", prefix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => {
    const num = Math.round(v);
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  });

  useEffect(() => {
    if (inView) {
      const raw =
        typeof target === "string"
          ? parseFloat(target.replace(/[^0-9.]/g, ""))
          : target;
      motionVal.set(raw);
    }
  }, [inView, motionVal, target]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};

const STATS = [
  {
    value: 284,
    suffix: "K+",
    label: "Active Participants",
    icon: "👥",
    color: "from-violet-500 to-indigo-500",
  },
  {
    value: 12.8,
    suffix: "K",
    label: "Contests Hosted",
    icon: "🏟️",
    color: "from-teal-500 to-cyan-500",
  },
  {
    value: 2.4,
    prefix: "$",
    suffix: "M",
    label: "Prizes Awarded",
    icon: "💵",
    color: "from-amber-500 to-orange-500",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    icon: "⭐",
    color: "from-pink-500 to-rose-500",
  },
];

const FEATURES = [
  {
    icon: "🚀",
    title: "Launch in Minutes",
    desc: "Set up your contest, define rules, and go live with our guided builder in under 5 minutes.",
  },
  {
    icon: "⚖️",
    title: "Fair & Transparent Judging",
    desc: "Blind reviews, rubric-based scoring, and optional community voting — you choose the format.",
  },
  {
    icon: "💳",
    title: "Instant Prize Payouts",
    desc: "Winners receive funds within 24 hours via Stripe, PayPal, or crypto. No delays, no drama.",
  },
  {
    icon: "📣",
    title: "Built-in Reach",
    desc: "Your contest is promoted to 284K+ creators the moment you publish. Zero extra marketing cost.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const CreatorAdveristement = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`w-full transition-colors duration-300 ${isDark ? "bg-[#0f1623]" : "bg-slate-50"}`}
    >
      {/* ── Gradient Stats Banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-teal-500 py-20 px-4">
        {/* Animated blobs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/15 blur-3xl"
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Trusted by Creators Worldwide
            </h2>
            <p className="mt-2 text-white/70 text-base">
              Real numbers, real impact
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.04, y: -4 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center cursor-default"
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-3xl md:text-4xl font-black text-white">
                  <AnimatedNumber
                    target={s.value}
                    prefix={s.prefix || ""}
                    suffix={s.suffix || ""}
                  />
                </div>
                <p className="text-sm text-white/70 mt-1 font-medium">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Features Grid ── */}
      <div className={`py-20 px-4 ${isDark ? "bg-[#0f1623]" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span
              className={`text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${
                isDark
                  ? "bg-indigo-900/30 text-indigo-400"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              🎯 For Contest Creators
            </span>
            <h2
              className={`mt-4 text-3xl md:text-4xl font-extrabold tracking-tight ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-teal-500 bg-clip-text text-transparent">
                Run a Great Contest
              </span>
            </h2>
            <p
              className={`mt-3 max-w-xl mx-auto text-base ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              From setup to payout, we handle the complexity so you can focus on
              discovering talent.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={`rounded-2xl p-6 border flex gap-4 items-start cursor-default transition-colors ${
                  isDark
                    ? "bg-[#161d2e] border-slate-700/60 hover:border-indigo-700/60"
                    : "bg-slate-50 border-slate-200 hover:border-indigo-300 shadow-sm"
                }`}
              >
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    isDark ? "bg-indigo-900/30" : "bg-indigo-50"
                  }`}
                >
                  {f.icon}
                </div>
                <div>
                  <h3
                    className={`font-bold text-base ${
                      isDark ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    {f.title}
                  </h3>
                  <p
                    className={`text-sm mt-1 leading-relaxed ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <button className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
              Start Your First Contest — It&apos;s Free
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CreatorAdveristement;
