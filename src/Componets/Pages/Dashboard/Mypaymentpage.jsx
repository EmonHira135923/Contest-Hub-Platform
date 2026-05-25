"use client";
import PaymentsTable from "@/Componets/Cards/PaymentsTable";
import Pagination from "@/Componets/Shared/Pagination";
import PaymentTableSkeleton from "@/Componets/Skeltons/PaymentSkelton";
import useMyPayments from "@/Componets/utils/hooks/useMyPayments";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { useState, useMemo } from "react";
import {
  TbSearch,
  TbReceipt2,
  TbCircleCheck,
  TbClock,
  TbCurrencyDollar,
  TbX,
} from "react-icons/tb";

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase();
  const isPaid = s === "success" || s === "paid";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
        isPaid
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      }`}
    >
      {isPaid ? (
        <TbCircleCheck className="w-3 h-3" />
      ) : (
        <TbClock className="w-3 h-3" />
      )}
      {status || "Pending"}
    </span>
  );
};

// ─── Stat card ───────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, isDark, accent }) => (
  <div
    className={`rounded-xl border p-4 flex items-start gap-3 ${
      isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
    }`}
  >
    <div
      className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${accent}`}
    >
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div className="min-w-0">
      <p
        className={`text-[10.5px] font-semibold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}
      >
        {label}
      </p>
      <p
        className={`text-lg font-bold leading-tight truncate ${isDark ? "text-slate-100" : "text-slate-900"}`}
      >
        {value}
      </p>
    </div>
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────
const Mypaymentpage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    payments = [],
    meta,
    isLoading,
  } = useMyPayments(searchTerm, currentPage, itemsPerPage);

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
  const stats = useMemo(() => {
    const totalPaid = payments
      .filter((p) =>
        ["success", "paid"].includes(p.paymentStatus?.toLowerCase()),
      )
      .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

    const paidCount = payments.filter((p) =>
      ["success", "paid"].includes(p.paymentStatus?.toLowerCase()),
    ).length;

    const pendingCount = payments.length - paidCount;

    return { totalPaid, paidCount, pendingCount };
  }, [payments]);

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
              className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Payment History
            </h1>
            <p
              className={`text-sm mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              View and track all your contest payments
            </p>
          </div>

          {/* Search Input Container */}
          <div
            className={`flex items-center gap-2 w-full sm:w-72 px-3 py-2 rounded-xl border transition-colors ${
              isDark
                ? "bg-slate-900 border-slate-700 focus-within:border-blue-500"
                : "bg-white border-slate-200 focus-within:border-blue-400"
            }`}
          >
            <TbSearch
              className={`w-4 h-4 flex-shrink-0 ${isDark ? "text-slate-500" : "text-slate-400"}`}
            />
            <input
              type="text"
              placeholder="Search transaction ID, status…"
              value={searchTerm}
              onChange={handleSearchChange}
              className={`flex-1 text-sm bg-transparent outline-none placeholder:text-slate-400 min-w-0 ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="flex-shrink-0"
                type="button"
              >
                <TbX
                  className={`w-4 h-4 ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}
                />
              </button>
            )}
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            label="Total payments"
            value={meta?.total ?? payments.length}
            icon={TbReceipt2}
            isDark={isDark}
            accent="bg-blue-500"
          />
          <StatCard
            label="Total paid"
            value={`$${stats.totalPaid.toFixed(2)}`}
            icon={TbCurrencyDollar}
            isDark={isDark}
            accent="bg-emerald-500"
          />
          <StatCard
            label="Successful"
            value={stats.paidCount}
            icon={TbCircleCheck}
            isDark={isDark}
            accent="bg-green-500"
          />
          <StatCard
            label="Pending"
            value={stats.pendingCount}
            icon={TbClock}
            isDark={isDark}
            accent="bg-amber-500"
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
          {/* 🎯 লোডিং ট্র্যাকিং ফিক্স: টাইপ করার সময় টেবিল যেন গায়েব না হয়ে স্কেলেটন ও ডেটার ডম ট্রি ঠিক রাখে */}
          {isLoading ? (
            <div className="p-4">
              <PaymentTableSkeleton />
            </div>
          ) : payments.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-slate-800" : "bg-slate-100"}`}
              >
                <TbReceipt2
                  className={`w-7 h-7 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                />
              </div>
              <p
                className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                {searchTerm ? "No results found" : "No payment history yet"}
              </p>
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className={`text-xs underline underline-offset-2 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <PaymentsTable
                isDark={isDark}
                payments={payments}
                StatusBadge={StatusBadge}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                formDate={formatDate}
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

export default Mypaymentpage;
