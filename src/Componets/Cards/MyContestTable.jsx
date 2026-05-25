import React from "react";
import Link from "next/link";
import { TbArrowUpRight } from "react-icons/tb";

const MyContestTable = ({
  contests,
  currentPage,
  itemsPerPage,
  isDark,
  formatDate,
}) => {
  return (
    <div>
      <table className="w-full min-w-[780px] border-collapse text-left text-sm">
        <thead>
          <tr
            className={`border-b text-[11px] font-semibold uppercase tracking-widest ${
              isDark
                ? "bg-slate-800/60 border-slate-700 text-slate-400"
                : "bg-slate-50 border-slate-100 text-slate-400"
            }`}
          >
            <th className="px-5 py-3.5 w-14 text-center">#</th>
            <th className="px-5 py-3.5">Contest Title</th>
            <th className="px-5 py-3.5">Transaction ID</th>
            <th className="px-5 py-3.5">Amount Paid</th>
            <th className="px-5 py-3.5">Join Date</th>
            <th className="px-5 py-3.5 text-right">Action</th>
          </tr>
        </thead>
        <tbody
          className={`divide-y ${
            isDark ? "divide-slate-800" : "divide-slate-100"
          }`}
        >
          {contests.map((contest, index) => {
            const contestId = contest.contestId || contest._id;

            return (
              <tr
                key={contest._id}
                className={`transition-colors ${
                  isDark ? "hover:bg-slate-800/40" : "hover:bg-slate-50/80"
                }`}
              >
                {/* Serial */}
                <td className="px-5 py-4 text-center">
                  <span
                    className={`text-xs font-mono font-medium ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </span>
                </td>

                {/* Contest title */}
                <td className="px-5 py-4">
                  <span
                    className={`font-semibold text-sm ${
                      isDark ? "text-slate-200" : "text-slate-800"
                    }`}
                  >
                    {contest.contestTitle || "N/A"}
                  </span>
                </td>

                {/* Transaction ID */}
                <td className="px-5 py-4">
                  <span
                    className={`font-mono text-xs font-semibold ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {contest.transactionId}
                  </span>
                </td>

                {/* Amount */}
                <td className="px-5 py-4">
                  <span
                    className={`text-sm font-semibold ${
                      isDark ? "text-emerald-400" : "text-emerald-700"
                    }`}
                  >
                    ${contest.amount}
                  </span>
                </td>

                {/* Join date */}
                <td className="px-5 py-4">
                  <span
                    className={`text-xs ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {formatDate(contest.paidAt)}
                  </span>
                </td>
                {/* Action Button */}
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/all-contests/${contestId}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors ${
                      isDark
                        ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    <TbArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
                    View Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyContestTable;
