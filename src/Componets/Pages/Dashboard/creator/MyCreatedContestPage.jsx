"use client";
import Pagination from "@/Componets/Shared/Pagination";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useCreatorOwnContest from "@/Componets/utils/hooks/useCreatorOwnContest";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import Image from "next/image";
import React, { useState } from "react";

const MyCreatedContestPage = () => {
  const { theme: isDark } = useTheme();
  const axiosSecure = useAxiosSecure();

  // 1. Establish state for pagination and search filters
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Your backend route sets a limit of 10 items per page
  const itemsPerPage = 10;

  // 2. Supply state parameters directly to your custom data hook
  const { contests, totalPages, isLoading, error } = useCreatorOwnContest(
    search,
    page,
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Crucial: Reset to page 1 whenever search filters alter
  };

  // 3. Setup semantic color maps built around your custom theme
  const containerClass = isDark
    ? "bg-gray-900 text-gray-100"
    : "bg-gray-50 text-gray-800";
  const cardClass = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";
  const tableHeaderClass = isDark
    ? "bg-gray-700/50 text-gray-300"
    : "bg-gray-100 text-gray-600";
  const tableRowClass = isDark
    ? "border-gray-700 hover:bg-gray-700/30"
    : "border-gray-200 hover:bg-gray-50";
  const inputClass = isDark
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-300 text-gray-900";

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-200 ${containerClass}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Header & Search Bar Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">
            My Created Contests
          </h1>
          <input
            type="text"
            placeholder="Search by title or category..."
            value={search}
            onChange={handleSearchChange}
            className={`w-full sm:w-72 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm ${inputClass}`}
          />
        </div>

        {/* Content States (Loading, Error, Empty, or Table Grid) */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-sm font-medium animate-pulse opacity-70">
              Fetching your contest data...
            </span>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-900 text-red-700 dark:text-red-400 rounded-lg text-sm">
            <strong>Error gathering records:</strong> {error}
          </div>
        ) : contests.length === 0 ? (
          <div className={`text-center p-12 border rounded-xl ${cardClass}`}>
            <p className="text-base font-medium opacity-70">
              No contests created yet.
            </p>
          </div>
        ) : (
          <div
            className={`overflow-hidden border rounded-xl shadow-sm ${cardClass}`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className={`text-xs uppercase font-semibold tracking-wider border-b ${tableHeaderClass}`}
                  >
                    <th className="p-4 w-16 text-center">#</th>
                    <th className="px-6 py-4">Contest Details</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Fee / Prize</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-transparent">
                  {contests.map((contest, index) => (
                    <tr
                      key={contest._id?.$oid || contest._id}
                      className={`text-sm border-b transition-colors ${tableRowClass}`}
                    >
                      {/* ডাইনামিক সিরিয়াল নম্বর যা পেজ ১১, ২১ থেকে চালু হবে */}
                      <td className="p-4 text-center font-medium text-gray-500">
                        {(page - 1) * itemsPerPage + index + 1}
                      </td>
                      {/* Image + Title Layout Cell */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {contest.image && (
                            <Image
                              height={50}
                              width={50}
                              src={contest.image}
                              alt={contest.title}
                              className="w-10 h-10 object-cover rounded-md hidden sm:block bg-gray-200"
                            />
                          )}
                          <div>
                            <span className="font-semibold block">
                              {contest.title}
                            </span>
                            <span className="text-xs opacity-60">
                              Deadline:{" "}
                              {new Date(contest.deadline).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 capitalize opacity-80">
                        {contest.category?.replace("-", " ")}
                      </td>

                      <td className="px-6 py-4">
                        <span className="block font-medium text-green-600 dark:text-green-400">
                          Prize: ${contest.prize?.toLocaleString()}
                        </span>
                        <span className="text-xs opacity-60 block">
                          Fee: ${contest.registrationFee}
                        </span>
                      </td>

                      {/* Payment Status Badging */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                            contest.payment === "paid"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {contest.payment}
                        </span>
                      </td>

                      {/* Admin Verification Status Badging */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                            contest.adminStatus === "approved"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {contest.adminStatus || "pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Component Footer integration */}
            <div
              className={`p-4 border-t flex justify-center ${isDark ? "border-gray-700" : "border-gray-200"}`}
            >
              <Pagination
                setPage={setPage}
                page={page}
                totalPages={totalPages}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCreatedContestPage;
