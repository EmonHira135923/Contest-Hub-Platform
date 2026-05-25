"use client";
import Pagination from "@/Componets/Shared/Pagination";
import useAllSubmission from "@/Componets/utils/hooks/useAllSubmission";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import React, { useState } from "react";

const SubmittedAllContestPage = () => {
  const [page, setPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] = useState(null); // মোডাল ডেটার জন্য স্টেট
  const limit = 10;

  const { data, isLoading } = useAllSubmission(page, limit);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  // উইনার ডিক্লেয়ার করার হ্যান্ডলার ফাংশন
  const handleDeclareWinner = (contest) => {
    // এখানে আপনার উইনার সিলেক্ট করার API কল বা লজিক বসাবেন
    alert(
      `Winner declared for: ${contest.contestTitle}\nWinner Email: ${contest.customer_email}`,
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 p-6 md:p-12 ${
        isDark ? "bg-[#050505] text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1
          className={`text-3xl font-extrabold ${
            isDark
              ? "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              : "text-zinc-900"
          }`}
        >
          Submitted All Contests
        </h1>
        <p
          className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm mt-1`}
        >
          Manage submission links, check notes, and declare official contest
          winners.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className={`h-12 rounded-lg ${isDark ? "bg-zinc-900" : "bg-gray-200"}`}
              ></div>
            ))}
          </div>
        ) : data?.data?.length === 0 ? (
          <div
            className={`text-center py-12 rounded-xl border ${
              isDark
                ? "bg-zinc-900/30 border-zinc-800 text-gray-500"
                : "bg-white border-gray-200 text-gray-400"
            }`}
          >
            <p>No submissions found yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Table Container */}
            <div
              className={`overflow-x-auto rounded-xl border shadow-xl ${
                isDark
                  ? "bg-zinc-900/40 backdrop-blur-md border-zinc-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr
                    className={`border-b font-semibold ${
                      isDark
                        ? "bg-zinc-900/80 border-zinc-800 text-cyan-400"
                        : "bg-gray-100 border-gray-200 text-zinc-700"
                    }`}
                  >
                    <th className="p-4 w-16 text-center">SL</th>
                    <th className="p-4">Contest Title</th>
                    <th className="p-4">Submission Link</th>
                    <th className="p-4">Notes</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {data?.data?.map((contest, index) => {
                    const serialNumber = (page - 1) * limit + index + 1;

                    return (
                      <tr
                        key={contest._id}
                        className={`transition-colors duration-200 ${
                          isDark
                            ? "hover:bg-zinc-800/30 border-zinc-800/50"
                            : "hover:bg-gray-50 border-gray-200"
                        }`}
                      >
                        {/* 1. SL Index */}
                        <td className="p-4 text-center font-mono font-medium text-gray-500">
                          {serialNumber}
                        </td>

                        {/* 2. Contest Title */}
                        <td className="p-4 font-semibold text-base max-w-xs truncate">
                          {contest.contestTitle}
                        </td>

                        {/* 3. Submission URL */}
                        <td className="p-4">
                          <a
                            href={contest.submissionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-500 hover:underline font-mono text-xs break-all"
                          >
                            {contest.submissionLink} ↗
                          </a>
                        </td>

                        {/* 4. Submission Notes */}
                        <td className="p-4 max-w-xs truncate text-gray-400">
                          {contest.submissionNotes || (
                            <span className="text-gray-600 italic">
                              No notes
                            </span>
                          )}
                        </td>

                        {/* 5. Action Buttons */}
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* Details Button */}
                            <button
                              onClick={() => setSelectedSubmission(contest)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                isDark
                                  ? "bg-zinc-800 hover:bg-zinc-700 text-gray-200 border border-zinc-700"
                                  : "bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300"
                              }`}
                            >
                              Details
                            </button>

                            {/* Declare Winner Button */}
                            <button
                              onClick={() => handleDeclareWinner(contest)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md shadow-orange-900/20 transition-all"
                            >
                              Declare Winner
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-4">
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={data?.totalPages || 1}
              />
            </div>
          </div>
        )}
      </div>

      {/* --- Details Modal (পপ-আপ স্ক্রিন) --- */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className={`w-full max-w-2xl rounded-2xl border p-6 shadow-2xl transition-all ${
              isDark
                ? "bg-[#0d0d0d] border-zinc-800 text-gray-100"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-zinc-800/60 pb-4 mb-4">
              <div>
                <span className="text-xs font-mono px-2 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-800/50 rounded">
                  Tracking ID: {selectedSubmission.trackingId}
                </span>
                <h3 className="text-xl font-bold mt-2 text-white">
                  {selectedSubmission.contestTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-white font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Body (Full Data) */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase">
                    Participant Name
                  </h4>
                  <p className="text-sm font-medium">
                    {selectedSubmission.customerName}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase">
                    Participant Email
                  </h4>
                  <p className="text-sm font-mono">
                    {selectedSubmission.customer_email}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase">
                    Payment Status
                  </h4>
                  <p className="text-sm">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {selectedSubmission.paymentStatus} (
                      {selectedSubmission.amount}{" "}
                      {selectedSubmission.currency.toUpperCase()})
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase">
                    Submitted At
                  </h4>
                  <p className="text-sm text-gray-400">
                    {new Date(selectedSubmission.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* URL */}
              <div className="border-t border-zinc-800/40 pt-3">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Project Link
                </h4>
                <a
                  href={selectedSubmission.submissionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline font-mono text-sm break-all"
                >
                  {selectedSubmission.submissionLink} ↗
                </a>
              </div>

              {/* Full Notes */}
              <div className="border-t border-zinc-800/40 pt-3">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  Submission Notes
                </h4>
                <pre className="bg-black/40 text-zinc-300 p-4 rounded-xl text-xs font-mono whitespace-pre-line border border-zinc-800/60 leading-relaxed">
                  {selectedSubmission.submissionNotes ||
                    "No notes submitted by the user."}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 border-t border-zinc-800/60 pt-4 mt-6">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDeclareWinner(selectedSubmission);
                  setSelectedSubmission(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-white"
              >
                Declare Winner Here
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmittedAllContestPage;
