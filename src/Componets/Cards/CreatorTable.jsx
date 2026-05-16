import React from "react";
import { Eye, Trash2, Check, X } from "lucide-react";

const statusBadge = {
  approved:
    "bg-emerald-100 text-emerald-700 border border-emerald-400 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30",
  pending:
    "bg-amber-100 text-amber-700 border border-amber-400 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30",
  rejected:
    "bg-rose-100 text-rose-700 border border-rose-400 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30",
};

const CreatorTable = ({
  creators = [],
  page,
  limit,
  isDark,
  currentAdminId,
  onViewDetails,
  onActionTrigger,
}) => {
  const base = (page - 1) * limit;

  if (creators.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan="4"
            className={`text-center py-16 text-sm font-medium ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            No creator requests found.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {creators.map((creator, i) => {
        const isOwnApplication = creator.userId === currentAdminId;
        const isApproved = creator.status === "approved";
        const isRejected = creator.status === "rejected";

        return (
          <tr
            key={creator._id}
            className={`border-t text-sm transition-colors ${
              isDark
                ? "border-[#1e2d38] hover:bg-white/[0.025]"
                : "border-slate-100 hover:bg-slate-50/80"
            }`}
          >
            {/* Index */}
            <td
              className={`px-5 py-4 font-bold text-xs w-12 ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            >
              {base + i + 1}
            </td>

            {/* Creator Info */}
            <td className="px-5 py-4">
              <div>
                <p
                  className={`font-semibold leading-tight flex items-center gap-2 ${
                    isDark ? "text-slate-100" : "text-slate-800"
                  }`}
                >
                  {creator.name}
                  {isOwnApplication && (
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/25 font-normal">
                      You
                    </span>
                  )}
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {creator.email}
                </p>
              </div>
            </td>

            {/* Status */}
            <td className="px-5 py-4">
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${
                  statusBadge[creator.status] || statusBadge.pending
                }`}
              >
                {creator.status || "pending"}
              </span>
            </td>

            {/* Actions */}
            <td className="px-5 py-4 text-right">
              <div className="flex items-center justify-end gap-1.5">
                <button
                  onClick={() => onViewDetails(creator)}
                  className={`h-8 px-3 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                    isDark
                      ? "bg-[#1f313a] text-slate-200 hover:bg-[#283e4a]"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Eye size={13} /> Details
                </button>

                <button
                  disabled={isOwnApplication || isApproved}
                  onClick={() =>
                    onActionTrigger(
                      creator._id,
                      "approved",
                      "Accept Application?",
                    )
                  }
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Accept"
                >
                  <Check size={14} />
                </button>

                <button
                  disabled={isOwnApplication || isApproved || isRejected}
                  onClick={() =>
                    onActionTrigger(
                      creator._id,
                      "rejected",
                      "Reject Application?",
                    )
                  }
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Reject"
                >
                  <X size={14} />
                </button>

                <button
                  disabled={isApproved}
                  onClick={() =>
                    onActionTrigger(
                      creator._id,
                      "delete",
                      "Delete Application?",
                    )
                  }
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-500/10 text-slate-400 hover:bg-rose-500/20 hover:text-rose-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default CreatorTable;
