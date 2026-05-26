import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbArrowUpRight } from "react-icons/tb";

const MyCreatedContestTable = ({
  isDark,
  contests,
  page,
  itemsPerPage,
  AdminBadge,
  PaymentBadge,
}) => {
  return (
    <div>
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <thead>
          <tr
            className={`border-b text-[11px] font-semibold uppercase tracking-widest ${
              isDark
                ? "bg-slate-800/60 border-slate-700 text-slate-400"
                : "bg-slate-50 border-slate-100 text-slate-400"
            }`}
          >
            <th className="px-5 py-3.5 w-14 text-center">#</th>
            <th className="px-5 py-3.5">Contest Details</th>
            <th className="px-5 py-3.5">Fee / Prize</th>
            <th className="px-5 py-3.5">Payment</th>
            <th className="px-5 py-3.5">Status</th>
            <th className="px-5 py-3.5 text-right">Action</th>
          </tr>
        </thead>
        <tbody
          className={`divide-y ${
            isDark ? "divide-slate-800" : "divide-slate-100"
          }`}
        >
          {contests.map((contest, index) => {
            const contestId = contest._id?.$oid || contest._id;

            return (
              <tr
                key={contestId}
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
                    {(page - 1) * itemsPerPage + index + 1}
                  </span>
                </td>

                {/* Image + title + deadline */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {contest.image && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 hidden sm:block">
                        <Image
                          src={contest.image}
                          alt={contest.title}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <span
                        className={`font-semibold text-sm block truncate ${
                          isDark ? "text-slate-200" : "text-slate-800"
                        }`}
                      >
                        {contest.title}
                      </span>
                      <span
                        className={`text-xs ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        Deadline:{" "}
                        {new Date(contest.deadline).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>
                </td>
                {/* Fee / Prize */}
                <td className="px-5 py-4">
                  <span
                    className={`block text-sm font-semibold ${
                      isDark ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  >
                    Prize: ${contest.prize?.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    Fee: ${contest.registrationFee}
                  </span>
                </td>

                {/* Payment badge */}
                <td className="px-5 py-4">
                  <PaymentBadge status={contest.paymentStatus} />
                </td>

                {/* Admin status badge */}
                <td className="px-5 py-4">
                  <AdminBadge status={contest.adminStatus} />
                </td>

                {/* View details button */}
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

export default MyCreatedContestTable;
