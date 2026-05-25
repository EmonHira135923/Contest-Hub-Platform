import React from "react";
import { TbExternalLink } from "react-icons/tb";

const SubmittedAllContestTable = ({
  isDark,
  submissions,
  page,
  limit,
  declaringId,
  setSelectedSubmission,
  handleDeclareWinner,
}) => {
  // বর্তমান সময় ট্র্যাকিং (মে ২০২৬)
  const now = new Date();

  return (
    <div>
      <table className="w-full min-w-[860px] border-collapse text-left text-sm">
        <thead>
          <tr
            className={`border-b text-[11px] font-semibold uppercase tracking-widest ${isDark ? "bg-slate-800/60 border-slate-700 text-slate-400" : "bg-slate-50 border-slate-100 text-slate-400"}`}
          >
            <th className="px-5 py-3.5 w-14 text-center">#</th>
            <th className="px-5 py-3.5">Contest Title</th>
            <th className="px-5 py-3.5">Submission Link</th>
            <th className="px-5 py-3.5">Notes</th>
            <th className="px-5 py-3.5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody
          className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-100"}`}
        >
          {submissions.map((contest, index) => {
            // ডেডলাইন এবং উইনার স্ট্যাটাস চেক ⏰
            const isRunning = contest.deadline
              ? now < new Date(contest.deadline)
              : false;
            const alreadyHasWinner =
              contest.isWinner || contest.contestStatus === "completed";

            return (
              <tr
                key={contest._id}
                className={`transition-colors ${isDark ? "hover:bg-slate-800/40" : "hover:bg-slate-50/80"}`}
              >
                {/* Serial */}
                <td className="px-5 py-4 text-center">
                  <span
                    className={`text-xs font-mono font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  >
                    {(page - 1) * limit + index + 1}
                  </span>
                </td>

                {/* Contest title */}
                <td className="px-5 py-4">
                  <span
                    className={`font-semibold text-sm block max-w-[180px] truncate ${isDark ? "text-slate-200" : "text-slate-800"}`}
                  >
                    {contest.contestTitle}
                  </span>
                </td>

                {/* Submission link */}
                <td className="px-5 py-4">
                  <a
                    href={contest.submissionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 font-mono text-xs max-w-[160px] truncate ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
                  >
                    <TbExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                    {contest.submissionLink}
                  </a>
                </td>

                {/* Notes preview */}
                <td className="px-5 py-4">
                  <span
                    className={`text-xs max-w-[140px] truncate block ${contest.submissionNotes ? (isDark ? "text-slate-400" : "text-slate-600") : isDark ? "text-slate-600 italic" : "text-slate-400 italic"}`}
                  >
                    {contest.submissionNotes || "No notes"}
                  </span>
                </td>

                {/* Action buttons */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {/* Details button */}
                    <button
                      onClick={() => setSelectedSubmission(contest)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors ${
                        isDark
                          ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      Details
                    </button>

                    {/* ডাইনামিক কন্ডিশনাল বাটন 🏆 */}
                    {alreadyHasWinner ? (
                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20`}
                      >
                        Winner Selected
                      </span>
                    ) : isRunning ? (
                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${isDark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"} border border-transparent`}
                      >
                        Running...
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDeclareWinner(contest)}
                        disabled={declaringId === contest._id}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                          declaringId === contest._id
                            ? "bg-amber-300 text-amber-900 cursor-not-allowed"
                            : "bg-amber-500 hover:bg-amber-600 text-white"
                        }`}
                      >
                        {declaringId === contest._id
                          ? "Declaring…"
                          : "Declare Winner"}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedAllContestTable;
