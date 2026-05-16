import React from "react";

const CreatorSkeleton = ({ rows = 5, isDark }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, index) => (
        <tr
          key={index}
          className={`border-t animate-pulse ${
            isDark
              ? "border-white/5 bg-white/[0.01]"
              : "border-slate-100 bg-slate-50/40"
          }`}
        >
          <td className="px-5 py-5 w-12">
            <div
              className={`h-4 w-4 rounded ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
            />
          </td>
          <td className="px-5 py-5">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
              />
              <div className="space-y-2">
                <div
                  className={`h-4 w-28 rounded ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
                />
                <div
                  className={`h-3 w-40 rounded ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
                />
              </div>
            </div>
          </td>
          <td className="px-5 py-5">
            <div
              className={`h-5 w-16 rounded-full ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
            />
          </td>
          <td className="px-5 py-5 text-right">
            <div className="flex items-center justify-end gap-2">
              <div
                className={`w-20 h-8 rounded-lg ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
              />
              <div
                className={`w-8 h-8 rounded-lg ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
              />
              <div
                className={`w-8 h-8 rounded-lg ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
              />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default CreatorSkeleton;
