"use client";
import MyCreatedContestTable from "@/Componets/Cards/MyCreatedContestTable";
import Pagination from "@/Componets/Shared/Pagination";
import MyCreatedContestSkeleton from "@/Componets/Skeltons/Mycreatedcontestskeleton";
import useCreatorOwnContest from "@/Componets/utils/hooks/useCreatorOwnContest";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { useState } from "react";
import {
  TbSearch,
  TbX,
  TbTrophy,
  TbCurrencyDollar,
  TbCircleCheck,
  TbClock,
  TbAlertCircle,
} from "react-icons/tb";

// ─── Stat card (reused same pattern as other pages) ───────────────────────────
export const StatCard = ({ label, value, icon: Icon, isDark, color }) => (
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

// ─── Payment badge ────────────────────────────────────────────────────────────
export const PaymentBadge = ({ status }) => {
  const isPaid = status?.toLowerCase() === "paid";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize whitespace-nowrap ${
        isPaid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
      }`}
    >
      {isPaid ? (
        <TbCircleCheck className="w-3 h-3 flex-shrink-0" />
      ) : (
        <TbAlertCircle className="w-3 h-3 flex-shrink-0" />
      )}
      {status || "unpaid"}
    </span>
  );
};

// ─── Admin status badge ───────────────────────────────────────────────────────
export const AdminBadge = ({ status }) => {
  const isApproved = status?.toLowerCase() === "approved";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize whitespace-nowrap ${
        isApproved ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
      }`}
    >
      {isApproved ? (
        <TbCircleCheck className="w-3 h-3 flex-shrink-0" />
      ) : (
        <TbClock className="w-3 h-3 flex-shrink-0" />
      )}
      {status || "pending"}
    </span>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────
const MyCreatedContestPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { contests, totalPages, isLoading, error } = useCreatorOwnContest(
    search,
    page,
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const clearSearch = () => {
    setSearch("");
    setPage(1);
  };

  if (isLoading) return <MyCreatedContestSkeleton />;

  // ── Derived stats ──
  const approvedCount = contests.filter(
    (c) => c.adminStatus?.toLowerCase() === "approved",
  ).length;

  const paidCount = contests.filter(
    (c) => c.payment?.toLowerCase() === "paid",
  ).length;

  const totalPrize = contests.reduce(
    (sum, c) => sum + (parseFloat(c.prize) || 0),
    0,
  );

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
              My Created Contests
            </h1>
            <p
              className={`text-sm mt-0.5 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Manage and track all contests you have created
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
              placeholder="Search by title or category…"
              value={search}
              onChange={handleSearchChange}
              className={`flex-1 text-sm bg-transparent outline-none placeholder:text-slate-400 min-w-0 ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            />
            {search && (
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
            label="Total created"
            value={contests.length}
            icon={TbTrophy}
            isDark={isDark}
            color="bg-blue-500"
          />
          <StatCard
            label="Total prize pool"
            value={`$${totalPrize.toLocaleString()}`}
            icon={TbCurrencyDollar}
            isDark={isDark}
            color="bg-emerald-500"
          />
          <StatCard
            label="Approved"
            value={approvedCount}
            icon={TbCircleCheck}
            isDark={isDark}
            color="bg-violet-500"
          />
          <StatCard
            label="Paid"
            value={paidCount}
            icon={TbClock}
            isDark={isDark}
            color="bg-amber-500"
          />
        </div>

        {/* ── Error state ── */}
        {error && (
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${
              isDark
                ? "bg-red-950/30 border-red-900 text-red-400"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            <TbAlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Error:</strong> {error}
            </span>
          </div>
        )}

        {/* ── Table card ── */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          {contests.length === 0 ? (
            /* Empty state */
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
                {search
                  ? "No contests match your search"
                  : "No contests created yet"}
              </p>
              {search && (
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
              overflow-x-auto wrapper + min-w-[900px] on table
              keeps all columns intact — no overlap on small screens
            */
            <div className="overflow-x-auto">
              <MyCreatedContestTable
                isDark={isDark}
                contests={contests}
                page={page}
                itemsPerPage={itemsPerPage}
                AdminBadge={AdminBadge}
                PaymentBadge={PaymentBadge}
              />
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export default MyCreatedContestPage;
