"use client";

import ProfileSkeleton from "@/Componets/Skeltons/ProfileSkeleton";
import useAuth from "@/Componets/utils/hooks/useAuth";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import {
  Phone,
  Mail,
  User,
  Shield,
  Calendar,
  Edit2,
  Camera,
  LogIn,
  Copy,
  Check,
  PieChart as PieIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ─── Win % chart colours ────────────────────────────────────────────────────
const WIN_COLOR = "#22c55e"; // green-500
const LOSE_COLOR = "#3b82f6"; // blue-500

// ─── Custom centre label rendered inside the donut hole ─────────────────────
const DonutLabel = ({ cx, cy, winPct }) => (
  <>
    <text
      x={cx}
      y={cy - 8}
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ fontSize: 22, fontWeight: 700, fill: "currentColor" }}
    >
      {winPct}%
    </text>
    <text
      x={cx}
      y={cy + 14}
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ fontSize: 11, fill: "#94a3b8" }}
    >
      win rate
    </text>
  </>
);

// ─── Custom tooltip ──────────────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, isDark }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div
      className={`px-3 py-2 rounded-lg border text-xs font-medium ${
        isDark
          ? "bg-slate-800 border-slate-700 text-slate-200"
          : "bg-white border-gray-200 text-gray-700"
      }`}
    >
      {name}: <span className="font-bold">{value}</span>
    </div>
  );
};

// ─── Main page ───────────────────────────────────────────────────────────────
export default function Profilepage() {
  const { theme } = useTheme();
  const { user: profile, loading } = useAuth();
  const [copied, setCopied] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const isDark = theme === "dark";

  if (loading) return <ProfileSkeleton isDark={isDark} />;
  if (!profile) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(profile?._id || profile?.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // ── Contest stats (replace with real data from profile/API) ──
  const won = profile.contestsWon ?? 15;
  const participated = profile.contestsParticipated ?? 20;
  const losses = participated - won;
  const winPct = participated > 0 ? Math.round((won / participated) * 100) : 0;

  const pieData = [
    { name: "Won", value: won },
    { name: "Not won", value: losses },
  ];

  // ── Theme tokens ──
  const bg = isDark ? "bg-[#0d1117]" : "bg-[#f5f7fa]";
  const cardBg = isDark ? "bg-[#161b22]" : "bg-white";
  const cardBorder = isDark ? "border-white/[0.08]" : "border-gray-200";
  const textPrimary = isDark ? "text-gray-100" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const textMuted = isDark ? "text-gray-600" : "text-gray-400";
  const sectionLabel = `text-[10.5px] font-semibold uppercase tracking-[0.1em] mb-3 ${
    isDark ? "text-gray-500" : "text-gray-400"
  }`;
  const fieldCellBg = isDark ? "bg-[#161b22]" : "bg-white";
  const divideColor = isDark ? "divide-white/[0.06]" : "divide-gray-100";

  return (
    <div className={`min-h-screen transition-colors ${bg}`}>
      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* ── Top header card ── */}
        <div className={`rounded-xl border ${cardBorder} ${cardBg} p-6 mb-4`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center gap-4 w-full">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-[72px] h-[72px] rounded-lg overflow-hidden flex items-center justify-center text-[24px] font-medium ${
                    isDark
                      ? "bg-blue-900/60 text-blue-200"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {profile.image ? (
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      width={72}
                      height={72}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    profile.name?.[0]?.toUpperCase()
                  )}
                </div>
                <button
                  className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border shadow-sm transition-transform hover:scale-110 ${
                    isDark
                      ? "bg-[#1c2128] border-white/[0.1] text-gray-400"
                      : "bg-white border-gray-200 text-gray-500"
                  }`}
                >
                  <Camera size={13} />
                </button>
              </div>

              {/* Name + role */}
              <div className="flex-1 min-w-0">
                <h1
                  className={`text-[20px] font-bold leading-tight mb-2 ${textPrimary}`}
                >
                  {profile.name}
                </h1>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${
                      isDark
                        ? "bg-blue-950/60 text-blue-300 border-blue-800/50"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    <Shield size={10} />
                    {profile.role}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={`/profile/${profile?.id || profile?._id}`}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-colors flex-shrink-0 mt-2 sm:mt-0 ${
                isDark
                  ? "border-white/[0.08] text-gray-300 hover:bg-white/[0.04]"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Edit2 size={14} />
              Edit profile
            </Link>
          </div>
        </div>

        {/* ── Contact information ── */}
        <div className="mb-4">
          <p className={sectionLabel}>Contact information</p>
          <div className={`rounded-xl border ${cardBorder} overflow-hidden`}>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x ${divideColor}`}
            >
              <FieldCell
                label="Email"
                value={profile.email}
                icon={<Mail size={13} />}
                bg={fieldCellBg}
                textPrimary={textPrimary}
                textMuted={textMuted}
              />
              <FieldCell
                label="Phone"
                value={profile.phone || "Not provided"}
                icon={<Phone size={13} />}
                bg={fieldCellBg}
                textPrimary={textPrimary}
                textMuted={textMuted}
              />
            </div>
          </div>
        </div>

        {/* ── Account details ── */}
        <div className="mb-4">
          <p className={sectionLabel}>Account details</p>
          <div className={`rounded-xl border ${cardBorder} overflow-hidden`}>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 divide-y ${divideColor}`}
            >
              <div className={`grid grid-cols-2 divide-x ${divideColor}`}>
                <FieldCell
                  label="Role"
                  value={profile.role}
                  icon={<User size={13} />}
                  bg={fieldCellBg}
                  textPrimary={textPrimary}
                  textMuted={textMuted}
                />
                <FieldCell
                  label="Login method"
                  value={profile.provider}
                  icon={<LogIn size={13} />}
                  bg={fieldCellBg}
                  textPrimary={textPrimary}
                  textMuted={textMuted}
                />
              </div>
              <div className={`grid grid-cols-2 divide-x ${divideColor}`}>
                <FieldCell
                  label="Member since"
                  value={formatDate(profile.createdAt)}
                  icon={<Calendar size={13} />}
                  bg={fieldCellBg}
                  textPrimary={textPrimary}
                  textMuted={textMuted}
                />
                <FieldCell
                  label="Security"
                  icon={<Shield size={13} />}
                  bg={fieldCellBg}
                  textPrimary={textPrimary}
                  textMuted={textMuted}
                  custom={
                    <span className="flex items-center gap-1.5 text-[13px] font-medium text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      Verified
                    </span>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Win percentage chart ── */}
        <div className="mb-4">
          {/* Section header with toggle */}
          <div className="flex items-center justify-between mb-3">
            <p className={sectionLabel.replace("mb-3", "mb-0")}>
              Win percentage
            </p>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className={`text-[11px] font-medium ${textMuted}`}>
                {showChart ? "Hide chart" : "Show chart"}
              </span>
              {/* Toggle switch — Tailwind only */}
              <button
                role="switch"
                aria-checked={showChart}
                onClick={() => setShowChart((v) => !v)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full border transition-colors ${
                  showChart
                    ? isDark
                      ? "bg-blue-600 border-blue-700"
                      : "bg-blue-600 border-blue-600"
                    : isDark
                      ? "bg-slate-700 border-slate-600"
                      : "bg-gray-300 border-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                    showChart ? "translate-x-[18px]" : "translate-x-[2px]"
                  }`}
                />
              </button>
            </label>
          </div>

          {showChart && (
            <div className={`rounded-xl border ${cardBorder} ${cardBg} p-5`}>
              {participated === 0 ? (
                <p className={`text-sm text-center py-6 ${textSecondary}`}>
                  No contest data yet.
                </p>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Donut */}
                  <div className="w-[180px] h-[180px] flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={52}
                          outerRadius={74}
                          startAngle={90}
                          endAngle={-270}
                          paddingAngle={3}
                          dataKey="value"
                          labelLine={false}
                        >
                          <Cell key="won" fill={WIN_COLOR} strokeWidth={0} />
                          <Cell
                            key="not-won"
                            fill={LOSE_COLOR}
                            strokeWidth={0}
                          />
                        </Pie>
                        {/* centre label via recharts label prop */}
                        <Pie
                          data={[{ value: 1 }]}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={0}
                          dataKey="value"
                          label={({ cx, cy }) => (
                            <DonutLabel cx={cx} cy={cy} winPct={winPct} />
                          )}
                          labelLine={false}
                          fill="transparent"
                          stroke="none"
                        />
                        <Tooltip
                          content={<ChartTooltip isDark={isDark} />}
                          cursor={false}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Stat cards */}
                  <div className="flex-1 w-full grid grid-cols-2 gap-3">
                    {/* Won */}
                    <div
                      className={`rounded-lg px-4 py-3 ${
                        isDark ? "bg-slate-800/60" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                        <span
                          className={`text-[10.5px] font-semibold uppercase tracking-widest ${textMuted}`}
                        >
                          Won
                        </span>
                      </div>
                      <p className={`text-2xl font-bold ${textPrimary}`}>
                        {won}
                      </p>
                    </div>

                    {/* Participated */}
                    <div
                      className={`rounded-lg px-4 py-3 ${
                        isDark ? "bg-slate-800/60" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                        <span
                          className={`text-[10.5px] font-semibold uppercase tracking-widest ${textMuted}`}
                        >
                          Entered
                        </span>
                      </div>
                      <p className={`text-2xl font-bold ${textPrimary}`}>
                        {participated}
                      </p>
                    </div>

                    {/* Win rate full width */}
                    <div
                      className={`col-span-2 rounded-lg px-4 py-3 ${
                        isDark ? "bg-blue-950/40" : "bg-blue-50"
                      }`}
                    >
                      <p
                        className={`text-[10.5px] font-semibold uppercase tracking-widest mb-1 ${
                          isDark ? "text-blue-400" : "text-blue-500"
                        }`}
                      >
                        Win rate
                      </p>
                      {/* Progress bar */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex-1 h-1.5 rounded-full ${
                            isDark ? "bg-blue-900" : "bg-blue-200"
                          }`}
                        >
                          <div
                            className="h-full rounded-full bg-green-500 transition-all"
                            style={{ width: `${winPct}%` }}
                          />
                        </div>
                        <span
                          className={`text-sm font-bold ${
                            isDark ? "text-blue-300" : "text-blue-700"
                          }`}
                        >
                          {winPct}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── User ID bar ── */}
        <div
          className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
            isDark
              ? "bg-[#161b22] border-white/[0.06]"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`text-[10.5px] font-semibold uppercase tracking-[0.1em] ${textMuted}`}
            >
              User ID
            </span>
            <code className={`text-xs font-mono ${textSecondary}`}>
              {profile?._id || profile?.id}
            </code>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
              copied
                ? "text-emerald-500"
                : isDark
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
            }`}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FieldCell sub-component ─────────────────────────────────────────────────
function FieldCell({ label, value, icon, custom, bg, textPrimary, textMuted }) {
  return (
    <div className={`${bg} px-4 py-3.5`}>
      <div
        className={`flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] mb-1.5 ${textMuted} [&_svg]:text-blue-500`}
      >
        {icon}
        {label}
      </div>
      {custom ?? (
        <p className={`text-[13.5px] font-medium break-all ${textPrimary}`}>
          {value}
        </p>
      )}
    </div>
  );
}
