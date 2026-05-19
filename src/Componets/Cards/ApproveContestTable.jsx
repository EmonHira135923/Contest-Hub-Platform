"use client";
import Image from "next/image";
import React from "react";
import { FiCheckCircle, FiXCircle, FiTrash2 } from "react-icons/fi";

const ApproveContestTable = ({
  contests,
  onApprove,
  onReject,
  onDelete,
  isDark,
  page = 1,
}) => {
  return (
    <div
      className={`w-full border rounded-xl shadow-sm overflow-hidden ${
        isDark
          ? "border-neutral-800 bg-neutral-950"
          : "border-gray-200 bg-white"
      }`}
    >
      {/* Horizontal scroll wrapper for mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Table Head */}
          <thead>
            <tr
              className={`border-b text-xs font-semibold uppercase tracking-wider ${
                isDark
                  ? "border-neutral-800 bg-neutral-900 text-neutral-400"
                  : "border-gray-200 bg-gray-50 text-gray-600"
              }`}
            >
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Contest</th>
              <th className="px-4 py-3">Creator</th>
              <th className="px-4 py-3">Reg. Fee</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody
            className={`text-sm divide-y ${
              isDark
                ? "divide-neutral-900 text-neutral-300"
                : "divide-gray-100 text-gray-700"
            }`}
          >
            {contests?.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className={`py-12 text-center ${
                    isDark ? "text-neutral-500" : "text-gray-400"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-8 h-8 opacity-40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                    <span className="text-sm">No contests found.</span>
                  </div>
                </td>
              </tr>
            ) : (
              contests.map((contest, i) => (
                <tr
                  key={contest?._id?.$oid || contest?._id}
                  className={`transition-colors duration-150 ${
                    isDark ? "hover:bg-neutral-900/40" : "hover:bg-gray-50/60"
                  }`}
                >
                  {/* ── Serial number ── */}
                  <td
                    className={`px-4 py-3 text-sm font-semibold tabular-nums ${
                      isDark ? "text-neutral-400" : "text-gray-500"
                    }`}
                  >
                    {(page - 1) * 10 + i + 1}.
                  </td>

                  {/* ── Image & Title ── */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`relative flex-shrink-0 w-9 h-9 rounded-lg overflow-hidden border ${
                          isDark
                            ? "border-neutral-800 bg-neutral-800"
                            : "border-gray-200 bg-gray-100"
                        }`}
                      >
                        <Image
                          fill
                          src={contest?.image}
                          alt={contest?.title}
                          className="object-cover"
                        />
                      </div>
                      <span
                        className={`font-medium truncate max-w-[160px] sm:max-w-[220px] ${
                          isDark ? "text-neutral-100" : "text-gray-900"
                        }`}
                      >
                        {contest?.title}
                      </span>
                    </div>
                  </td>

                  {/* ── Creator Email ── */}
                  <td
                    className={`px-4 py-3 truncate max-w-[160px] ${
                      isDark ? "text-neutral-400" : "text-gray-500"
                    }`}
                  >
                    {contest?.creatorEmail}
                  </td>

                  {/* ── Registration Fee ── */}
                  <td
                    className={`px-4 py-3 font-mono font-medium whitespace-nowrap ${
                      isDark ? "text-neutral-200" : "text-gray-800"
                    }`}
                  >
                    ${contest?.registrationFee}
                  </td>

                  {/* ── Status Badge ── */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-full uppercase tracking-wider ${
                        contest?.adminStatus === "approved"
                          ? isDark
                            ? "bg-emerald-950/50 text-emerald-400"
                            : "bg-emerald-100 text-emerald-800"
                          : contest?.adminStatus === "rejected"
                            ? isDark
                              ? "bg-rose-950/50 text-rose-400"
                              : "bg-rose-100 text-rose-800"
                            : isDark
                              ? "bg-amber-950/50 text-amber-400"
                              : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {contest?.adminStatus || "pending"}
                    </span>
                  </td>

                  {/* ── Action Buttons ── */}
                  {/* ── Action Buttons ── */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      {contest?.adminStatus !== "approved" && (
                        <button
                          onClick={() => onApprove(contest?._id)}
                          title="Approve"
                          className={`p-2 rounded-md transition-all duration-150 ${
                            isDark
                              ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20"
                              : "bg-emerald-600 text-white hover:bg-emerald-700"
                          }`}
                        >
                          <FiCheckCircle size={15} />
                        </button>
                      )}

                      {contest?.adminStatus !== "rejected" && (
                        <button
                          onClick={() => onReject(contest?._id)}
                          title="Reject"
                          className={`p-2 rounded-md transition-all duration-150 ${
                            isDark
                              ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20"
                              : "bg-amber-500 text-white hover:bg-amber-600"
                          }`}
                        >
                          <FiXCircle size={15} />
                        </button>
                      )}

                      <button
                        onClick={() => onDelete(contest?._id)}
                        title="Delete"
                        className={`p-2 rounded-md transition-all duration-150 ${
                          isDark
                            ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20"
                            : "bg-rose-600 text-white hover:bg-rose-700"
                        }`}
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveContestTable;
