"use client";

import useTheme from "../utils/hooks/useThemeValue";

const MyContestSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const rows = Array.from({ length: 8 });

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 lg:p-8 transition-colors ${
        isDark ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ── Header skeleton ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div
              className={`h-7 w-52 rounded-lg animate-pulse ${
                isDark ? "bg-slate-800" : "bg-slate-200"
              }`}
            />
            <div
              className={`h-4 w-60 rounded-md animate-pulse ${
                isDark ? "bg-slate-800/70" : "bg-slate-200/70"
              }`}
            />
          </div>
          <div
            className={`h-10 w-full sm:w-72 rounded-xl animate-pulse ${
              isDark ? "bg-slate-800" : "bg-slate-200"
            }`}
          />
        </div>

        {/* ── Stat cards skeleton ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`rounded-xl border p-4 flex items-start gap-3 ${
                isDark
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg animate-pulse flex-shrink-0 ${
                  isDark ? "bg-slate-800" : "bg-slate-200"
                }`}
              />
              <div className="space-y-2 flex-1">
                <div
                  className={`h-2.5 w-14 rounded animate-pulse ${
                    isDark ? "bg-slate-800" : "bg-slate-200"
                  }`}
                />
                <div
                  className={`h-5 w-10 rounded animate-pulse ${
                    isDark ? "bg-slate-700" : "bg-slate-300"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Table skeleton ── */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          {/* thead */}
          <div
            className={`px-5 py-3.5 border-b ${
              isDark
                ? "bg-slate-800/50 border-slate-700"
                : "bg-slate-50 border-slate-100"
            }`}
          >
            <div className="flex items-center gap-5 min-w-[680px]">
              <div
                className={`h-3 w-5 rounded animate-pulse ${
                  isDark ? "bg-slate-700" : "bg-slate-300"
                }`}
              />
              <div
                className={`h-3 w-36 rounded animate-pulse flex-1 ${
                  isDark ? "bg-slate-700" : "bg-slate-300"
                }`}
              />
              <div
                className={`h-3 w-28 rounded animate-pulse ${
                  isDark ? "bg-slate-700" : "bg-slate-300"
                }`}
              />
              <div
                className={`h-3 w-20 rounded animate-pulse ${
                  isDark ? "bg-slate-700" : "bg-slate-300"
                }`}
              />
              <div
                className={`h-3 w-20 rounded animate-pulse ${
                  isDark ? "bg-slate-700" : "bg-slate-300"
                }`}
              />
              <div
                className={`h-3 w-24 rounded animate-pulse ${
                  isDark ? "bg-slate-700" : "bg-slate-300"
                }`}
              />
            </div>
          </div>

          {/* tbody rows */}
          <div
            className={`divide-y ${
              isDark ? "divide-slate-800" : "divide-slate-100"
            }`}
          >
            {rows.map((_, i) => (
              <div key={i} className="px-5 py-4">
                <div className="flex items-center gap-5 min-w-[680px]">
                  <div
                    className={`h-3 w-5 rounded animate-pulse ${
                      isDark ? "bg-slate-800" : "bg-slate-200"
                    }`}
                  />
                  <div
                    className={`h-3 rounded animate-pulse flex-1 ${
                      isDark ? "bg-slate-800" : "bg-slate-200"
                    }`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  />
                  <div
                    className={`h-3 w-28 rounded animate-pulse ${
                      isDark ? "bg-slate-800" : "bg-slate-200"
                    }`}
                    style={{ animationDelay: `${i * 60 + 30}ms` }}
                  />
                  <div
                    className={`h-3 w-16 rounded animate-pulse ${
                      isDark ? "bg-slate-800" : "bg-slate-200"
                    }`}
                    style={{ animationDelay: `${i * 60 + 60}ms` }}
                  />
                  <div
                    className={`h-3 w-20 rounded animate-pulse ${
                      isDark ? "bg-slate-800" : "bg-slate-200"
                    }`}
                    style={{ animationDelay: `${i * 60 + 90}ms` }}
                  />
                  <div
                    className={`h-7 w-24 rounded-lg animate-pulse ${
                      isDark ? "bg-slate-800" : "bg-slate-200"
                    }`}
                    style={{ animationDelay: `${i * 60 + 120}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pagination skeleton ── */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-8 w-8 rounded-lg animate-pulse ${
                isDark ? "bg-slate-800" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyContestSkeleton;
