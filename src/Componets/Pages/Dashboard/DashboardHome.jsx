"use client";
import useAdminContest from "@/Componets/utils/hooks/useAdminContest";
import useAllContests from "@/Componets/utils/hooks/useAllContests";
import useAllSubmission from "@/Componets/utils/hooks/useAllSubmission";
import useMyJoinContest from "@/Componets/utils/hooks/useMyJoinContest";
import useUsers from "@/Componets/utils/hooks/useAlluser";
import useAuth from "@/Componets/utils/hooks/useAuth";
import useCreatorContest from "@/Componets/utils/hooks/useCreatorContest";
import useCreatorOwnContest from "@/Componets/utils/hooks/useCreatorOwnContest";
import useCreators from "@/Componets/utils/hooks/useCreators";
import useRole from "@/Componets/utils/hooks/useRole";
import React from "react";
import useMyPayments from "@/Componets/utils/hooks/useMyPayments";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useTheme from "@/Componets/utils/hooks/useThemeValue";

/* ─────────────────────────────────────────────
   THEME TOKENS
   All colours live here. Swap dark ↔ light by
   reading `isDark` at the top of the component.
───────────────────────────────────────────── */
const getTokens = (isDark) => ({
  // Backgrounds
  pageBg: isDark ? "#080910" : "#f5f6fa",
  cardBg: isDark ? "#0f1119" : "#ffffff",
  headerBg: isDark ? "#0f1119" : "#ffffff",
  chartBg: isDark ? "#0f1119" : "#ffffff",

  // Text
  textPrimary: isDark ? "#f1f5f9" : "#0f172a",
  textSecondary: isDark ? "#94a3b8" : "#64748b",
  textMuted: isDark ? "#475569" : "#94a3b8",

  // Borders
  borderBase: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",

  // Chart grid / tooltip
  chartGrid: isDark ? "#1e2230" : "#e2e8f0",
  tooltipBg: isDark ? "#0f1119" : "#ffffff",
  tooltipBorder: isDark ? "#1e2230" : "#e2e8f0",
  axisText: isDark ? "#64748b" : "#94a3b8",

  // Accent palette (same hues, adjusted for readability)
  purple: isDark ? "#a78bfa" : "#7c3aed",
  purpleBg: isDark ? "rgba(167,139,250,0.08)" : "rgba(124,58,237,0.06)",
  purpleBorder: isDark ? "rgba(167,139,250,0.2)" : "rgba(124,58,237,0.15)",

  amber: isDark ? "#fbbf24" : "#d97706",
  amberBg: isDark ? "rgba(251,191,36,0.08)" : "rgba(217,119,6,0.06)",
  amberBorder: isDark ? "rgba(251,191,36,0.2)" : "rgba(217,119,6,0.15)",

  cyan: isDark ? "#22d3ee" : "#0891b2",
  cyanBg: isDark ? "rgba(34,211,238,0.08)" : "rgba(8,145,178,0.06)",
  cyanBorder: isDark ? "rgba(34,211,238,0.2)" : "rgba(8,145,178,0.15)",

  emerald: isDark ? "#34d399" : "#059669",
  emeraldBg: isDark ? "rgba(52,211,153,0.08)" : "rgba(5,150,105,0.06)",
  emeraldBorder: isDark ? "rgba(52,211,153,0.2)" : "rgba(5,150,105,0.15)",

  pink: isDark ? "#f472b6" : "#db2777",
  pinkBg: isDark ? "rgba(244,114,182,0.08)" : "rgba(219,39,119,0.06)",
  pinkBorder: isDark ? "rgba(244,114,182,0.2)" : "rgba(219,39,119,0.15)",

  indigo: isDark ? "#818cf8" : "#4f46e5",
  indigoBg: isDark ? "rgba(129,140,248,0.08)" : "rgba(79,70,229,0.06)",
  indigoBorder: isDark ? "rgba(129,140,248,0.2)" : "rgba(79,70,229,0.15)",

  teal: isDark ? "#2dd4bf" : "#0d9488",
  tealBg: isDark ? "rgba(45,212,191,0.08)" : "rgba(13,148,136,0.06)",
  tealBorder: isDark ? "rgba(45,212,191,0.2)" : "rgba(13,148,136,0.15)",

  blue: isDark ? "#60a5fa" : "#2563eb",
  blueBg: isDark ? "rgba(96,165,250,0.08)" : "rgba(37,99,235,0.06)",
  blueBorder: isDark ? "rgba(96,165,250,0.2)" : "rgba(37,99,235,0.15)",

  violet: isDark ? "#c084fc" : "#7c3aed",
  violetBg: isDark ? "rgba(192,132,252,0.08)" : "rgba(124,58,237,0.06)",
  violetBorder: isDark ? "rgba(192,132,252,0.2)" : "rgba(124,58,237,0.15)",
});

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
const StatCard = ({ label, value, accentColor, bgColor, borderColor, ghostText, t }) => (
  <div
    style={{
      position: "relative",
      overflow: "hidden",
      borderRadius: "16px",
      border: `1px solid ${borderColor}`,
      background: t.cardBg,
      padding: "20px 22px",
      transition: "border-color 0.2s, box-shadow 0.2s",
      boxShadow: "none",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = accentColor + "55";
      e.currentTarget.style.boxShadow = `0 0 0 1px ${accentColor}22`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = borderColor;
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <p style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", color: t.textSecondary, margin: 0 }}>
      {label}
    </p>
    <h2 style={{ fontSize: "36px", fontWeight: 700, color: accentColor, margin: "6px 0 0", fontFamily: "monospace", lineHeight: 1 }}>
      {value}
    </h2>
    {/* Ghost watermark */}
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        right: "-8px",
        bottom: "-10px",
        fontSize: "56px",
        fontWeight: 800,
        color: accentColor,
        opacity: 0.04,
        letterSpacing: "-2px",
        userSelect: "none",
        pointerEvents: "none",
        lineHeight: 1,
      }}
    >
      {ghostText}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   ROLE BADGE
───────────────────────────────────────────── */
const RoleBadge = ({ role, t }) => {
  const colorMap = {
    admin: { color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
    creator: { color: "#818cf8", bg: "rgba(129,140,248,0.1)" },
    user: { color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
  };
  const c = colorMap[role] || colorMap.user;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: c.color,
        background: c.bg,
        border: `1px solid ${c.color}33`,
        borderRadius: "999px",
        padding: "3px 10px",
      }}
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.color, display: "inline-block" }} />
      {role || "loading"}
    </span>
  );
};

/* ─────────────────────────────────────────────
   CHART CARD WRAPPER
───────────────────────────────────────────── */
const ChartCard = ({ eyebrow, title, badge, badgeColor, children, borderColor, t }) => (
  <div
    style={{
      borderRadius: "20px",
      background: t.chartBg,
      border: `1px solid ${borderColor}`,
      padding: "22px",
      boxShadow: "none",
    }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "18px" }}>
      <div>
        <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: t.textMuted, margin: 0, fontFamily: "monospace" }}>
          {eyebrow}
        </p>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: t.textPrimary, margin: "4px 0 0" }}>
          {title}
        </h3>
      </div>
      <span
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          color: badgeColor,
          background: badgeColor + "18",
          border: `1px solid ${badgeColor}33`,
          borderRadius: "999px",
          padding: "3px 9px",
          textTransform: "uppercase",
          flexShrink: 0,
        }}
      >
        {badge}
      </span>
    </div>
    {children}
  </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const DashboardHome = () => {
  const role = useRole();
  const { user } = useAuth();
  const isAdmin = role === "admin";
  const isCreator = role === "creator";
  const isUser = role === "user";
  const isLoggedIn = !!user?.email;

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const t = getTokens(isDark);

  const { contests } = useAdminContest(isAdmin && isLoggedIn);
  const { allContests } = useAllContests("", "", 1, isAdmin && isLoggedIn);
  const { allSubmissions } = useAllSubmission(isCreator && isLoggedIn);
  const { users } = useUsers(isAdmin && isLoggedIn);
  const { contests: creatorContests } = useCreatorContest("", 1, isCreator && isLoggedIn);
  const { contests: creatorContest } = useCreatorOwnContest("", 1, isCreator && isLoggedIn);
  const { creators } = useCreators({}, isAdmin && isLoggedIn);
  const { contests: myJoinContests } = useMyJoinContest("", 1, 10, isUser && isLoggedIn);
  const { payments } = useMyPayments("", 1, 10, isUser && isLoggedIn);

  const totalSpent = payments?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const winningContests = payments?.filter((item) => item.isWinner === true) || [];

  // Chart data — colours work for both modes
  const adminChartData = [
    { name: "Users", value: users?.length || 0, color: t.purple },
    { name: "Pending", value: contests?.length || 0, color: t.amber },
    { name: "Creators", value: creators?.length || 0, color: t.teal },
  ];

  const creatorChartData = [
    { name: "Owned", value: creatorContest?.length || 0, color: t.pink },
    { name: "Pool", value: creatorContests?.length || 0, color: t.indigo },
    { name: "Submissions", value: allSubmissions?.length || 0, color: t.emerald },
  ];

  const userChartData = [
    { name: "Registered", value: myJoinContests?.length || 0, color: t.blue },
    { name: "Won", value: winningContests.length, color: t.emerald },
    { name: "Total Paid", value: totalSpent, color: t.violet },
  ];

  const tooltipStyle = {
    backgroundColor: t.tooltipBg,
    border: `1px solid ${t.tooltipBorder}`,
    borderRadius: "10px",
    color: t.textPrimary,
    fontSize: "13px",
  };

  return (
    <div style={{ minHeight: "100vh", background: t.pageBg, color: t.textPrimary, padding: "28px 32px", transition: "background 0.25s" }}>

      {/* ── Header ── */}
      <div
        style={{
          marginBottom: "28px",
          background: t.headerBg,
          border: `1px solid ${t.borderBase}`,
          borderRadius: "18px",
          padding: "22px 26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: t.textPrimary, margin: 0, letterSpacing: "-0.02em" }}>
            Welcome back,{" "}
            <span style={{ color: isDark ? "#22d3ee" : "#0891b2" }}>
              {user?.displayName || "Contestant"}
            </span>
          </h1>
          <p style={{ fontSize: "13px", color: t.textSecondary, margin: "4px 0 0" }}>
            Here's what's happening on your dashboard today.
          </p>
        </div>
        <RoleBadge role={role} t={t} />
      </div>

      {/* ── Stat Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "14px",
          marginBottom: "28px",
        }}
      >
        {/* ADMIN */}
        {isAdmin && (
          <>
            <StatCard label="Total Registered Users"   value={users?.length || 0}           accentColor={t.purple}  bgColor={t.purpleBg}  borderColor={t.purpleBorder}  ghostText="USR"  t={t} />
            <StatCard label="Pending Review Contests"  value={contests?.length || 0}         accentColor={t.amber}   bgColor={t.amberBg}   borderColor={t.amberBorder}   ghostText="PND"  t={t} />
            <StatCard label="Global Active Contests"   value={allContests?.length || 0}      accentColor={t.cyan}    bgColor={t.cyanBg}    borderColor={t.cyanBorder}    ghostText="ALL"  t={t} />
            <StatCard label="Total Creators Available" value={creators?.length || 0}         accentColor={t.teal}   bgColor={t.tealBg}   borderColor={t.tealBorder}   ghostText="TEAM" t={t} />
          </>
        )}

        {/* CREATOR */}
        {isCreator && (
          <>
            <StatCard label="My Created Contests"        value={creatorContest?.length || 0}  accentColor={t.pink}   bgColor={t.pinkBg}   borderColor={t.pinkBorder}   ghostText="OWN"  t={t} />
            <StatCard label="Total Contest Pool"         value={creatorContests?.length || 0} accentColor={t.indigo} bgColor={t.indigoBg} borderColor={t.indigoBorder} ghostText="POOL" t={t} />
            <StatCard label="All Submissions"            value={allSubmissions?.length || 0}   accentColor={t.emerald} bgColor={t.emeraldBg} borderColor={t.emeraldBorder} ghostText="SUB"  t={t} />
          </>
        )}

        {/* USER */}
        {isUser && (
          <>
            <StatCard label="Registered Contests"  value={myJoinContests?.length || 0} accentColor={t.blue}   bgColor={t.blueBg}   borderColor={t.blueBorder}   ghostText="JOIN" t={t} />
            <StatCard label="Total Investments"    value={`$${totalSpent}`}             accentColor={t.violet} bgColor={t.violetBg} borderColor={t.violetBorder} ghostText="PAID" t={t} />
            <StatCard label="Contests Won"         value={winningContests.length}       accentColor={t.emerald} bgColor={t.emeraldBg} borderColor={t.emeraldBorder} ghostText="WIN" t={t} />
          </>
        )}
      </div>

      {/* ── Charts ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>

        {isAdmin && (
          <ChartCard
            eyebrow="Admin Overview"
            title="Platform Snapshot"
            badge="admin"
            badgeColor={t.amber}
            borderColor={t.amberBorder}
            t={t}
          >
            <div style={{ height: "260px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={adminChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label>
                    {adminChartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend
                    verticalAlign="bottom"
                    height={32}
                    wrapperStyle={{ fontSize: "12px", color: t.textSecondary }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        )}

        {isCreator && (
          <ChartCard
            eyebrow="Creator Insights"
            title="Contest Performance"
            badge="creator"
            badgeColor={t.indigo}
            borderColor={t.indigoBorder}
            t={t}
          >
            <div style={{ height: "260px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={creatorChartData} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: t.axisText, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: t.axisText, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    cursor={{ fill: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={32}
                    wrapperStyle={{ fontSize: "12px", color: t.textSecondary }}
                    payload={creatorChartData.map((e) => ({ value: e.name, type: "square", id: e.name, color: e.color }))}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {creatorChartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        )}

        {isUser && (
          <ChartCard
            eyebrow="User Summary"
            title="Activity Breakdown"
            badge="user"
            badgeColor={t.blue}
            borderColor={t.blueBorder}
            t={t}
          >
            <div style={{ height: "260px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={userChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={42} outerRadius={85} label>
                    {userChartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend
                    verticalAlign="bottom"
                    height={32}
                    wrapperStyle={{ fontSize: "12px", color: t.textSecondary }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;