"use client";
import Pagination from "@/Componets/Shared/Pagination";
import useMyJoinContest from "@/Componets/utils/hooks/useMyJoinContest";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import React, { useState } from "react";

const MyContestPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // 1. Local states to handle filtering and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 2. Pass state values into your custom TanStack hook
  const { contests, meta, isLoading } = useMyJoinContest(
    searchTerm,
    currentPage,
    itemsPerPage,
  );

  // Calculate total pages safely from meta data
  const totalPages = Math.ceil((meta?.total || 0) / itemsPerPage);

  // 3. Handle search input changes reset page to 1
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div
      className={`p-6 min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Registered Contests
            </h1>
            <p className="text-sm text-gray-500">
              Manage and view your joined contests
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search contest title or transaction..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`w-full px-4 py-2 rounded-lg border text-sm outline-none transition-all ${
                isDark
                  ? "bg-gray-800 border-gray-700 focus:border-blue-500 text-white"
                  : "bg-white border-gray-300 focus:border-blue-500 text-gray-900"
              }`}
            />
          </div>
        </div>

        {/* Table & Data State Handling */}
        <div
          className={`overflow-x-auto rounded-xl border shadow-sm ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
        >
          {isLoading ? (
            <div className="p-12 text-center text-sm text-gray-500">
              Loading your contests...
            </div>
          ) : contests.length === 0 ? (
            <div className="p-12 text-center text-sm text-gray-500">
              You haven't joined any contests yet.
            </div>
          ) : (
            <table className="w-full border-collapse text-left text-sm">
              <thead
                className={`${isDark ? "bg-gray-900 text-gray-400" : "bg-gray-50 text-gray-600"} uppercase text-xs font-semibold`}
              >
                <tr>
                  <th className="p-4 w-16 text-center">#</th>
                  <th className="p-4">Contest Title</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Amount Paid</th>
                  <th className="p-4 text-right">Join Date</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}
              >
                {contests.map((contest, index) => (
                  <tr
                    key={contest._id}
                    className={`hover:${isDark ? "bg-gray-750" : "bg-gray-50/50"} transition-colors`}
                  >
                    {/* ডাইনামিক সিরিয়াল নম্বর যা পেজ ১১, ২১ থেকে চালু হবে */}
                    <td className="p-4 text-center font-medium text-gray-500">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="p-4 font-medium">
                      {contest.contestTitle || "N/A"}
                    </td>
                    <td className="p-4 font-mono text-xs text-blue-500">
                      {contest.transactionId}
                    </td>
                    <td className="p-4 font-medium">${contest.amount}</td>
                    <td className="p-4 text-right text-gray-500">
                      {contest.paidAt?.$date || contest.paidAt
                        ? new Date(
                            contest.paidAt?.$date || contest.paidAt,
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Controls */}
        {!isLoading && totalPages > 1 && (
          <Pagination
            page={currentPage} // আগের ভুল প্রোপ 'currentPage' বদলে 'page' করা হয়েছে
            totalPages={totalPages}
            setPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default MyContestPage;
