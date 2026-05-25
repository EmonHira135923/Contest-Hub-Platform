"use client";
import MyContestTable from "@/Componets/Cards/MyContestTable";
import Pagination from "@/Componets/Shared/Pagination";
import MyContestSkeleton from "@/Componets/Skeltons/MyContestSkeleton";
import useMyJoinContest from "@/Componets/utils/hooks/useMyJoinContest";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { useEffect, useState } from "react";
import {
  TbSearch,
  TbX,
  TbTrophy,
  TbCurrencyDollar,
  TbCalendarEvent,
  TbListDetails,
} from "react-icons/tb";

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, isDark, color }) => (
  <div
    className={`rounded-xl border p-4 flex items-start gap-3 ${
      isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
    }`}
  >
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}
    >
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div className="min-w-0">
      <p
        className={`text-[10.5px] font-semibold uppercase tracking-widest ${
          isDark ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-lg font-bold leading-tight truncate ${
          isDark ? "text-slate-100" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────
const MyContestPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { contests, meta, isLoading } = useMyJoinContest(
    searchTerm,
    currentPage,
    itemsPerPage,
  );

  // console.log("cotests", contests);

  const totalPages = Math.ceil((meta?.total || 0) / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  // ── Derived stats ──
  const totalSpent = contests.reduce(
    (sum, c) => sum + (parseFloat(c.amount) || 0),
    0,
  );

  const formatDate = (raw) => {
    if (!raw) return "N/A";
    const d = new Date(raw?.$date || raw);
    return isNaN(d)
      ? "N/A"
      : d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className={`text-2xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Registered Contests
            </h1>
            <p
              className={`text-sm mt-0.5 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Manage and view all your joined contests
            </p>
          </div>

          {/* Search */}
          <div
            className={`flex items-center gap-2 w-full sm:w-72 px-3 py-2 rounded-xl border transition-colors ${
              isDark
                ? "bg-slate-900 border-slate-700 focus-within:border-blue-500"
                : "bg-white border-slate-200 focus-within:border-blue-400"
            }`}
          >
            <TbSearch
              className={`w-4 h-4 flex-shrink-0 ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            />
            <input
              type="text"
              placeholder="Search contest title or transaction…"
              value={searchTerm}
              onChange={handleSearchChange}
              className={`flex-1 text-sm bg-transparent outline-none placeholder:text-slate-400 min-w-0 ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            />
            {searchTerm && (
              <button onClick={clearSearch} className="flex-shrink-0">
                <TbX
                  className={`w-4 h-4 ${
                    isDark
                      ? "text-slate-500 hover:text-slate-300"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            label="Total contests"
            value={meta?.total ?? contests.length}
            icon={TbTrophy}
            isDark={isDark}
            color="bg-blue-500"
          />
          <StatCard
            label="Total spent"
            value={`$${totalSpent.toFixed(2)}`}
            icon={TbCurrencyDollar}
            isDark={isDark}
            color="bg-emerald-500"
          />
          <StatCard
            label="This page"
            value={contests.length}
            icon={TbListDetails}
            isDark={isDark}
            color="bg-violet-500"
          />
          <StatCard
            label="Current page"
            value={`${currentPage} / ${totalPages || 1}`}
            icon={TbCalendarEvent}
            isDark={isDark}
            color="bg-amber-500"
          />
        </div>

        {/* ── Table card ── */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          {isLoading ? (
            <MyContestSkeleton isDark={isDark} />
          ) : contests.length === 0 ? (
            /* ── Empty state ── */
            <div className="py-16 flex flex-col items-center gap-3">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isDark ? "bg-slate-800" : "bg-slate-100"
                }`}
              >
                <TbTrophy
                  className={`w-7 h-7 ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                />
              </div>
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {searchTerm
                  ? "No contests found"
                  : "You haven't joined any contests yet"}
              </p>
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className={`text-xs underline underline-offset-2 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            /*
              MOBILE SCROLL:
              overflow-x-auto on wrapper + min-w-[780px] on table
              ensures columns never squish or overlap on small screens
            */
            <div className="overflow-x-auto">
              <MyContestTable
                isDark={isDark}
                contests={contests}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                formatDate={formatDate}
              />
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            setPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default MyContestPage;
