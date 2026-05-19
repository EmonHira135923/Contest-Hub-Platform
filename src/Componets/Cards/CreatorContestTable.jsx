import Link from "next/link";
import React from "react";
import {
  FiAlignLeft,
  FiDollarSign,
  FiEdit2,
  FiEye,
  FiSearch,
  FiTag,
  FiTrash2,
  FiClock,
} from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";

/* ── Status badge ── */
const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase();
  const styles = {
    approved: {
      wrap: "bg-emerald-50  border border-emerald-300 text-emerald-600",
      dark: "dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-400",
    },
    pending: {
      wrap: "bg-amber-50   border border-amber-300   text-amber-600",
      dark: "dark:bg-amber-950/40  dark:border-amber-700   dark:text-amber-400",
    },
    rejected: {
      wrap: "bg-rose-50    border border-rose-300    text-rose-600",
      dark: "dark:bg-rose-950/40   dark:border-rose-700    dark:text-rose-400",
    },
  };
  const style = styles[s] ?? styles.pending;
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${style.wrap} ${style.dark}`}
    >
      {status}
    </span>
  );
};

/* ── Deadline badge ── */
const DeadlineBadge = ({ deadline, isDark }) => {
  const isExpired = deadline ? new Date(deadline) < new Date() : false;
  const formatted = deadline
    ? new Date(deadline).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs tabular-nums font-medium
        ${
          isExpired
            ? isDark
              ? "text-red-400"
              : "text-red-500"
            : isDark
              ? "text-gray-400"
              : "text-gray-500"
        }`}
    >
      <FiClock
        size={11}
        className={
          isExpired
            ? isDark
              ? "text-red-500"
              : "text-red-400"
            : isDark
              ? "text-gray-500"
              : "text-gray-400"
        }
      />
      {formatted}
    </span>
  );
};

const CreatorContestTable = ({
  contests,
  openEditModal,
  handleDelete,
  isDark,
  isLoading,
  page,
}) => {
  const muted = isDark ? "text-gray-500" : "text-gray-400";
  const text = isDark ? "text-gray-100" : "text-gray-800";
  const subtext = isDark ? "text-gray-400" : "text-gray-500";
  const divider = isDark ? "border-gray-800/80" : "border-gray-100";
  const rowHov = isDark ? "hover:bg-white/[0.02]" : "hover:bg-gray-50/70";

  const headers = [
    { label: "#", width: "w-10", center: true },
    { label: "Contest Title", icon: <FiAlignLeft size={12} /> },
    { label: "Category", icon: <MdOutlineCategory size={12} /> },
    { label: "Prize", icon: <FiDollarSign size={12} />, width: "w-24" },
    { label: "Deadline", icon: <FiClock size={12} />, width: "w-32" },
    { label: "Status", icon: <FiTag size={12} />, width: "w-28" },
    { label: "Actions", width: "w-28", center: true },
  ];

  /* ── inline loading skeleton ── */
  if (isLoading) {
    const base = isDark ? "bg-gray-700/50" : "bg-gray-200/70";
    return (
      <table className="w-full text-sm border-separate border-spacing-0">
        <thead>
          <tr>
            {headers.map(({ label }) => (
              <th key={label} className={`px-5 py-3.5 border-b ${divider}`}>
                <div className={`h-3 w-16 rounded animate-pulse ${base}`} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr
              key={i}
              className="animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {[...Array(7)].map((__, j) => (
                <td key={j} className={`px-5 py-4 border-b ${divider}`}>
                  <div
                    className={`h-4 rounded ${base} ${
                      j === 0
                        ? "w-6"
                        : j === 1
                          ? "w-40"
                          : j === 4
                            ? "w-16"
                            : "w-20"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <table className="w-full text-sm border-separate border-spacing-0">
      {/* ── Header ── */}
      <thead>
        <tr>
          {headers.map(({ label, icon, width, center }) => (
            <th
              key={label}
              className={`px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest ${muted}
                border-b ${divider} ${width ?? ""} ${center ? "text-center" : "text-left"}`}
            >
              {icon ? (
                <span className="inline-flex items-center gap-1.5">
                  {icon} {label}
                </span>
              ) : (
                label
              )}
            </th>
          ))}
        </tr>
      </thead>

      {/* ── Body ── */}
      <tbody>
        {contests.length === 0 ? (
          <tr>
            <td colSpan={7} className={`py-20 text-center ${subtext}`}>
              <FiSearch className="mx-auto mb-3 opacity-20" size={34} />
              <p className="text-sm font-medium">No contests found</p>
              <p className="text-xs mt-1 opacity-60">
                Try adjusting your search
              </p>
            </td>
          </tr>
        ) : (
          contests.map((contest, i) => {
            // ✅ FIX: disabled when approved OR expired
            const isDisabled =
              contest.adminStatus === "approved" ||
              (contest.deadline
                ? new Date(contest.deadline) < new Date()
                : false);

            const editCls = isDisabled
              ? `p-2 rounded-lg opacity-30 cursor-not-allowed ${isDark ? "text-amber-400" : "text-amber-500"}`
              : `p-2 rounded-lg transition-all duration-150 ${
                  isDark
                    ? "text-amber-400 hover:bg-amber-500/15 hover:text-amber-300"
                    : "text-amber-500 hover:bg-amber-50   hover:text-amber-700"
                }`;

            const deleteCls = isDisabled
              ? `p-2 rounded-lg opacity-30 cursor-not-allowed ${isDark ? "text-red-400" : "text-red-500"}`
              : `p-2 rounded-lg transition-all duration-150 ${
                  isDark
                    ? "text-red-400 hover:bg-red-500/15 hover:text-red-300"
                    : "text-red-500 hover:bg-red-50   hover:text-red-700"
                }`;

            return (
              <tr
                key={contest._id}
                className={`group ${rowHov} transition-colors duration-150`}
              >
                {/* # */}
                <td className={`px-5 py-4 text-center border-b ${divider}`}>
                  <span
                    className={`text-xs font-semibold tabular-nums ${subtext}`}
                  >
                    {(page - 1) * 10 + i + 1}.
                  </span>
                </td>

                {/* Title */}
                <td className={`px-5 py-4 border-b ${divider}`}>
                  <span
                    className={`font-semibold max-w-[200px] truncate block ${text}`}
                  >
                    {contest.title}
                  </span>
                </td>

                {/* Category */}
                <td
                  className={`px-5 py-4 capitalize border-b ${divider} ${subtext}`}
                >
                  {contest.category?.replace(/-/g, " ")}
                </td>

                {/* Prize */}
                <td className={`px-5 py-4 border-b ${divider}`}>
                  <span className="font-bold text-emerald-500 tabular-nums">
                    ${Number(contest.prize).toLocaleString()}
                  </span>
                </td>

                {/* Deadline */}
                <td className={`px-5 py-4 border-b ${divider}`}>
                  <DeadlineBadge deadline={contest.deadline} isDark={isDark} />
                </td>

                {/* Status */}
                <td className={`px-5 py-4 border-b ${divider}`}>
                  <StatusBadge status={contest.adminStatus} />
                </td>

                {/* Actions */}
                <td className={`px-5 py-4 border-b ${divider}`}>
                  <div className="flex items-center justify-center gap-1">
                    {/* View — always active */}
                    <Link
                      href={`/all-contests/${contest._id}`}
                      title="View Details"
                      className={`p-2 rounded-lg transition-all duration-150
                        ${
                          isDark
                            ? "text-blue-400 hover:bg-blue-500/15 hover:text-blue-300"
                            : "text-blue-500 hover:bg-blue-50   hover:text-blue-700"
                        }`}
                    >
                      <FiEye size={16} />
                    </Link>

                    {/* ✅ FIX: Edit — disabled if approved or expired */}
                    <button
                      onClick={() => !isDisabled && openEditModal(contest)}
                      title={
                        isDisabled
                          ? contest.adminStatus === "approved"
                            ? "Approved contest — editing disabled"
                            : "Deadline passed — editing disabled"
                          : "Edit"
                      }
                      disabled={isDisabled}
                      className={editCls}
                    >
                      <FiEdit2 size={16} />
                    </button>

                    {/* ✅ FIX: Delete — disabled if approved or expired */}
                    <button
                      onClick={() => !isDisabled && handleDelete(contest._id)}
                      title={
                        isDisabled
                          ? contest.adminStatus === "approved"
                            ? "Approved contest — deletion disabled"
                            : "Deadline passed — deletion disabled"
                          : "Delete"
                      }
                      disabled={isDisabled}
                      className={deleteCls}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export { StatusBadge, DeadlineBadge };
export default CreatorContestTable;