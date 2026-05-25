"use client";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { HiOutlineSparkles } from "react-icons/hi2";
import {
  FiCheck,
  FiClock,
  FiPackage,
  FiTrendingUp,
  FiZap,
  FiAward,
  FiShoppingCart,
  FiCalendar,
  FiBarChart2,
} from "react-icons/fi";
import { MdOutlineRocketLaunch } from "react-icons/md";

/* ── Data ── */
const PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Try the platform",
    price: 9,
    slots: 2,
    validity: 30,
    icon: <FiPackage size={22} />,
    badge: null,
    accent: "indigo",
    features: [
      "2 contest slots",
      "Valid for 30 days",
      "Basic analytics",
      "Community support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Best for active creators",
    price: 19,
    slots: 5,
    validity: 60,
    icon: <MdOutlineRocketLaunch size={22} />,
    badge: "Most popular",
    accent: "blue",
    features: [
      "5 contest slots",
      "Valid for 60 days",
      "Full analytics dashboard",
      "Priority support",
      "Participant insights",
    ],
    current: true,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Unlimited creative control",
    price: 39,
    slots: 12,
    validity: 90,
    icon: <FiAward size={22} />,
    badge: "Best value",
    accent: "amber",
    features: [
      "12 contest slots",
      "Valid for 90 days",
      "Full analytics dashboard",
      "Priority support",
      "Featured contest badge",
      "Dedicated account manager",
    ],
  },
];

const HISTORY = [
  {
    name: "Growth plan",
    date: "22 May 2025",
    price: 19,
    used: 2,
    total: 5,
    icon: <MdOutlineRocketLaunch size={14} />,
  },
  {
    name: "Starter plan",
    date: "10 Apr 2025",
    price: 9,
    used: 2,
    total: 2,
    icon: <FiPackage size={14} />,
  },
  {
    name: "Starter plan",
    date: "01 Mar 2025",
    price: 9,
    used: 2,
    total: 2,
    icon: <FiPackage size={14} />,
  },
];

/* ── Accent maps ── */
const accentMap = {
  indigo: {
    iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    btn: "bg-indigo-600 hover:bg-indigo-500 text-white",
    ring: "ring-indigo-500/40",
    badge:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300",
  },
  blue: {
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
    btn: "bg-blue-600 hover:bg-blue-500 text-white",
    ring: "ring-blue-500/40",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  },
  amber: {
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-600 dark:text-amber-400",
    btn: "bg-amber-500 hover:bg-amber-400 text-white",
    ring: "ring-amber-500/40",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  },
};

/* ── SectionLabel ── */
const SectionLabel = ({ children, isDark }) => (
  <p
    className={`text-[11px] font-semibold uppercase tracking-widest mb-4
    ${isDark ? "text-gray-500" : "text-gray-400"}`}
  >
    {children}
  </p>
);

/* ── StatCard ── */
const StatCard = ({ label, value, sub, icon, isDark, delay }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={delay}
    className={`rounded-2xl p-4 flex flex-col gap-1 transition-colors duration-300
    ${isDark ? "bg-gray-900 ring-1 ring-white/5" : "bg-white border border-gray-100 shadow-sm"}`}
  >
    <div className={`mb-1 ${isDark ? "text-gray-700" : "text-gray-300"}`}>
      {icon}
    </div>
    <p className={`text-[11px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
      {label}
    </p>
    <p
      className={`text-2xl font-bold tabular-nums ${isDark ? "text-gray-100" : "text-gray-800"}`}
    >
      {value}
    </p>
    {sub && (
      <p className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
        {sub}
      </p>
    )}
  </div>
);

/* ── PackageCard ── */
const PackageCard = ({ pkg, isDark }) => {
  const a = accentMap[pkg.accent];
  const isCurrent = pkg.current;
  const delay = pkg.id === "starter" ? 0 : pkg.id === "growth" ? 100 : 200;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className={`relative rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300
        ${
          isCurrent
            ? `ring-2 ${a.ring} ${isDark ? "bg-gray-900" : "bg-white shadow-lg"}`
            : isDark
              ? "bg-gray-900 ring-1 ring-white/5 hover:ring-white/10"
              : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
        }`}
    >
      {/* Badge */}
      {pkg.badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${a.badge}`}
        >
          {pkg.badge}
        </span>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mt-1">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.iconBg} ${a.iconColor}`}
          >
            {pkg.icon}
          </div>
          <div>
            <p
              className={`font-bold text-[15px] ${isDark ? "text-gray-100" : "text-gray-800"}`}
            >
              {pkg.name}
            </p>
            <p
              className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              {pkg.tagline}
            </p>
          </div>
        </div>
        {isCurrent && (
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0
            ${isDark ? "bg-emerald-900/40 text-emerald-400" : "bg-emerald-50 text-emerald-600"}`}
          >
            Active
          </span>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1.5">
        <span
          className={`text-3xl font-black tabular-nums ${isDark ? "text-gray-100" : "text-gray-900"}`}
        >
          ${pkg.price}
        </span>
        <span
          className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
        >
          / {pkg.slots} contests
        </span>
      </div>

      {/* Divider */}
      <div className={`h-px ${isDark ? "bg-gray-800" : "bg-gray-100"}`} />

      {/* Features */}
      <ul className="flex flex-col gap-2 flex-1">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5">
            <FiCheck
              size={13}
              strokeWidth={3}
              className="text-emerald-500 flex-shrink-0"
            />
            <span
              className={`text-[13px] ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {isCurrent ? (
        <button
          disabled
          className={`w-full py-2.5 rounded-xl text-[13px] font-semibold cursor-not-allowed
            ${isDark ? "bg-gray-800 text-gray-500" : "bg-gray-100 text-gray-400"}`}
        >
          <FiCheck className="inline mr-1.5" size={13} />
          Current plan
        </button>
      ) : (
        <button
          className={`w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-150 active:scale-[0.98] ${a.btn}`}
        >
          Buy {pkg.name} · ${pkg.price}
        </button>
      )}
    </div>
  );
};

/* ── HistoryRow ── */
const HistoryRow = ({ item, isDark, isLast, delay }) => {
  const allUsed = item.used === item.total;
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className={`flex items-center justify-between gap-3 px-4 py-3 transition-colors duration-150
        ${isDark ? "hover:bg-white/[0.02]" : "hover:bg-gray-50/70"}
        ${!isLast ? (isDark ? "border-b border-gray-800" : "border-b border-gray-100") : ""}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
          ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}
        >
          {item.icon}
        </div>
        <div className="min-w-0">
          <p
            className={`text-[13px] font-semibold truncate ${isDark ? "text-gray-200" : "text-gray-700"}`}
          >
            {item.name}
          </p>
          <p
            className={`text-[11px] flex items-center gap-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}
          >
            <FiCalendar size={10} /> {item.date}
          </p>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p
          className={`text-[13px] font-bold tabular-nums ${isDark ? "text-gray-200" : "text-gray-700"}`}
        >
          ${item.price}
        </p>
        <p
          className={`text-[11px] tabular-nums font-medium
          ${allUsed ? "text-emerald-500" : isDark ? "text-gray-500" : "text-gray-400"}`}
        >
          {item.used}/{item.total} used
        </p>
      </div>
    </div>
  );
};

/* ── Main ── */
const CreatorPackage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    AOS.init({ duration: 500, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300
      ${isDark ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* ── Header ── */}
        <div data-aos="fade-down" className="flex items-start gap-4">
          <div
            className={`p-3 rounded-2xl flex-shrink-0
            ${isDark ? "bg-indigo-500/10" : "bg-indigo-50"}`}
          >
            <HiOutlineSparkles className="text-indigo-500" size={22} />
          </div>
          <div>
            <h1
              className={`text-2xl sm:text-3xl font-black tracking-tight
              ${isDark ? "text-gray-100" : "text-gray-900"}`}
            >
              Creator packages
            </h1>
            <p
              className={`text-sm mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              Buy slots to post contests on the platform
            </p>
          </div>
        </div>

        {/* ── Active Plan Banner ── */}
        <div
          data-aos="fade-up"
          className={`rounded-2xl p-5 flex items-center justify-between gap-4 transition-colors duration-300
            ${
              isDark
                ? "bg-emerald-950/40 ring-1 ring-emerald-800/50"
                : "bg-emerald-50 border border-emerald-200"
            }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
              ${isDark ? "bg-emerald-900/60" : "bg-emerald-100"}`}
            >
              <MdOutlineRocketLaunch
                className={isDark ? "text-emerald-400" : "text-emerald-600"}
                size={20}
              />
            </div>
            <div className="min-w-0">
              <p
                className={`font-bold text-sm truncate
                ${isDark ? "text-emerald-300" : "text-emerald-800"}`}
              >
                Growth plan · active
              </p>
              <p
                className={`text-xs flex items-center gap-1 mt-0.5
                ${isDark ? "text-emerald-700" : "text-emerald-600"}`}
              >
                <FiClock size={11} /> Expires 22 Jun 2025
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p
              className={`text-3xl font-black tabular-nums
              ${isDark ? "text-emerald-300" : "text-emerald-700"}`}
            >
              3
            </p>
            <p
              className={`text-[11px] ${isDark ? "text-emerald-700" : "text-emerald-600"}`}
            >
              slots left
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div>
          <SectionLabel isDark={isDark}>Your stats</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard
              label="Total posted"
              value="7"
              sub="contests"
              icon={<FiBarChart2 size={20} />}
              isDark={isDark}
              delay={0}
            />
            <StatCard
              label="Slots used"
              value="2 / 5"
              sub="this package"
              icon={<FiZap size={20} />}
              isDark={isDark}
              delay={80}
            />
            <StatCard
              label="Total spent"
              value="$37"
              sub="all time"
              icon={<FiTrendingUp size={20} />}
              isDark={isDark}
              delay={160}
            />
          </div>
        </div>

        {/* ── Packages ── */}
        <div>
          <SectionLabel isDark={isDark}>Choose a package</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} isDark={isDark} />
            ))}
          </div>
        </div>

        {/* ── History ── */}
        <div data-aos="fade-up">
          <SectionLabel isDark={isDark}>Purchase history</SectionLabel>
          <div
            className={`rounded-2xl overflow-hidden transition-colors duration-300
              ${isDark ? "bg-gray-900 ring-1 ring-white/5" : "bg-white border border-gray-100 shadow-sm"}`}
          >
            {/* History header row */}
            <div
              className={`flex items-center justify-between px-4 py-2.5 border-b
              ${isDark ? "border-gray-800 bg-gray-900/80" : "border-gray-100 bg-gray-50"}`}
            >
              <div className="flex items-center gap-2">
                <FiShoppingCart
                  size={13}
                  className={isDark ? "text-gray-600" : "text-gray-400"}
                />
                <span
                  className={`text-[11px] font-semibold uppercase tracking-widest
                  ${isDark ? "text-gray-600" : "text-gray-400"}`}
                >
                  Package
                </span>
              </div>
              <span
                className={`text-[11px] font-semibold uppercase tracking-widest
                ${isDark ? "text-gray-600" : "text-gray-400"}`}
              >
                Amount
              </span>
            </div>

            {HISTORY.map((item, i) => (
              <HistoryRow
                key={i}
                item={item}
                isDark={isDark}
                isLast={i === HISTORY.length - 1}
                delay={i * 70}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorPackage;
