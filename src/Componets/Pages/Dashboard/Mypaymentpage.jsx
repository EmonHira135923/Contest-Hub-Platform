"use client";
import Pagination from "@/Componets/Shared/Pagination";
import useMyPayments from "@/Componets/utils/hooks/useMyPayments";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import React, { useState } from "react";

const Mypaymentpage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // 1. Local states to handle filtering and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 2. Pass state values into your custom TanStack hook
  const { payments, meta, isLoading } = useMyPayments(
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
              Payment History
            </h1>
            <p className="text-sm text-gray-500">
              View and track your contest payments
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search trans ID, status..."
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
              Loading your payments...
            </div>
          ) : payments.length === 0 ? (
            <div className="p-12 text-center text-sm text-gray-500">
              No payment history records found.
            </div>
          ) : (
            <table className="w-full border-collapse text-left text-sm">
              <thead
                className={`${isDark ? "bg-gray-900 text-gray-400" : "bg-gray-50 text-gray-600"} uppercase text-xs font-semibold`}
              >
                <tr>
                  {/* ১. ইনডেক্স এর জন্য হেডার যোগ করা হয়েছে */}
                  <th className="p-4 w-16 text-center">#</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Contest Title</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}
              >
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className={`hover:${isDark ? "bg-gray-750" : "bg-gray-50/50"} transition-colors`}
                  >
                    {/* ২. ডাইনামিক সিরিয়াল নম্বর যা পেজ পরিবর্তনের সাথে আপডেট হবে */}
                    <td className="p-4 text-center font-medium text-gray-500">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="p-4 font-mono text-xs font-medium text-blue-500">
                      {payment.transactionId}
                    </td>
                    <td className="p-4 font-medium">
                      {/* ডাটাবেজ অবজেক্ট অনুযায়ী 'contestTitle' ব্যবহার করা হয়েছে */}
                      {payment.contestTitle || "N/A"}
                    </td>
                    <td className="p-4 capitalize">
                      {payment.amount} {payment.currency || "usd"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          payment.paymentStatus?.toLowerCase() === "success" ||
                          payment.paymentStatus?.toLowerCase() === "paid"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {payment.paymentStatus || "Pending"}
                      </span>
                    </td>
                    <td className="p-4 text-right text-gray-500">
                      {payment.paidAt?.$date || payment.paidAt
                        ? new Date(
                            payment.paidAt?.$date || payment.paidAt,
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
