"use client";

import React, { useState } from "react";
import Link from "next/link";
import Pagination from "@/Componets/Shared/Pagination";
import useAuth from "@/Componets/utils/hooks/useAuth";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import useWinningContest from "@/Componets/utils/hooks/useWinningContest";
import { Eye } from "lucide-react"; // আইকনের জন্য লারাবেল/রিয়্যাক্ট আইকন বা lucide-react ব্যবহার করতে পারেন

const MywinningContest = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    winningContests = [],
    totalPages = 1,
    isPending,
  } = useWinningContest(page, limit);

  // থিম ভিত্তিক প্রিমিয়াম স্টাইল ডাইনামিক ক্লাস
  const containerBg = isDark
    ? "bg-gradient-to-br from-[#0d0e12] via-[#13151a] to-[#090a0f] text-gray-100"
    : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800";

  const cardStyle = isDark
    ? "bg-[#181a21]/70 backdrop-blur-md border border-gray-800/60 shadow-2xl shadow-black/40"
    : "bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl shadow-gray-300/50";

  const tableHeaderStyle = isDark
    ? "bg-[#1f222b]/80 text-cyan-400 font-semibold border-b border-gray-800"
    : "bg-gray-200/80 text-gray-700 font-semibold border-b border-gray-300";

  const rowStyle = isDark
    ? "border-b border-gray-800/40 hover:bg-[#20242f]/40 transition-colors duration-200"
    : "border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200";

  return (
    <div
      className={`${containerBg} min-h-screen p-6 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isDark ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" : "text-gray-900"}`}
            >
              My Winning Contests
            </h1>
            <p
              className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Manage and view all the contests you have successfully won.
            </p>
          </div>

          {/* Winner Badge Status */}
          <div
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider self-start md:self-auto ${isDark ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]" : "bg-blue-50 text-blue-600 border border-blue-200"}`}
          >
            🏆 Elite Competitor
          </div>
        </div>

        {/* Table Container Card */}
        <div className={`${cardStyle} rounded-2xl overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={tableHeaderStyle}>
                  <th className="p-4 text-center w-16">#</th>
                  <th className="p-4">Contest Title</th>
                  <th className="p-4">Prize Pool</th>
                  <th className="p-4 hidden md:table-cell">Winner Account</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-transparent">
                {isPending ? (
                  // প্রিমিয়াম স্কেলিটন লোডার
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className={rowStyle}>
                      <td className="p-4 text-center">
                        <div
                          className={`h-4 w-4 rounded mx-auto animate-pulse ${isDark ? "bg-gray-800" : "bg-gray-300"}`}
                        ></div>
                      </td>
                      <td className="p-4">
                        <div
                          className={`h-4 w-48 rounded animate-pulse ${isDark ? "bg-gray-800" : "bg-gray-300"}`}
                        ></div>
                      </td>
                      <td className="p-4">
                        <div
                          className={`h-4 w-20 rounded animate-pulse ${isDark ? "bg-gray-800" : "bg-gray-300"}`}
                        ></div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div
                          className={`h-4 w-40 rounded animate-pulse ${isDark ? "bg-gray-800" : "bg-gray-300"}`}
                        ></div>
                      </td>
                      <td className="p-4 text-center">
                        <div
                          className={`h-8 w-24 rounded mx-auto animate-pulse ${isDark ? "bg-gray-800" : "bg-gray-300"}`}
                        ></div>
                      </td>
                    </tr>
                  ))
                ) : winningContests.length > 0 ? (
                  winningContests.map((item, index) => {
                    // MongoDB ID বা সাধারণ ID হ্যান্ডেল করার লজিক
                    const idString = item._id?.$oid || item._id;

                    return (
                      <tr key={idString} className={rowStyle}>
                        <td
                          className={`p-4 text-center font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}
                        >
                          {(page - 1) * limit + index + 1}
                        </td>
                        <td className="p-4 font-semibold tracking-wide">
                          {item.title}
                        </td>
                        <td className="p-4">
                          <span
                            className={`font-bold px-2.5 py-1 rounded-lg text-sm ${isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"}`}
                          >
                            ${item.prize?.toLocaleString()}
                          </span>
                        </td>
                        <td
                          className={`p-4 text-sm hidden md:table-cell ${isDark ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {item.winner?.email}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* Details অ্যাকশন বাটন */}
                            <Link
                              href={`/all-contests/${idString}`}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
                                isDark
                                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.03]"
                                  : "bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:scale-[1.03]"
                              }`}
                            >
                              <Eye size={14} />
                              Details
                            </Link>

                            {/* Cashout বাটন */}
                            <button
                              onClick={() => {
                                // আপনার ক্যাশআউট হ্যান্ডলার লজিক এখানে হবে (যেমন: ওপেন মডাল বা পেমেন্ট গেটওয়ে ট্রিগার)
                                alert(`Cashout processing for: ${item.title}`);
                              }}
                              className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
                                isDark
                                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.03]"
                                  : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:scale-[1.03]"
                              }`}
                            >
                              {/* Lucide icon ব্যবহার করলে <DollarSign size={14} /> দিতে পারেন */}
                              <span>$</span>
                              Cashout
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  // নো ডেটা ফাউন্ড রো
                  <tr>
                    <td colSpan="5" className="text-center p-12">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-3xl">🏆</span>
                        <p
                          className={`text-base font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          No winning contests found yet.
                        </p>
                        <p
                          className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}
                        >
                          Keep participating to unlock victories!
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        <div className="mt-6 flex justify-end">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default MywinningContest;
