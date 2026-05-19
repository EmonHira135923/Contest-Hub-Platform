/* ─────────────────── PAGE-LEVEL SKELETON ─────────────────── */
export const PageSkeleton = ({ isDark }) => {
  const base = isDark ? "bg-gray-700/60" : "bg-gray-200/80";
  const card = isDark ? "bg-gray-800" : "bg-white";
  const pulse = "animate-pulse";

  return (
    <div
      className={`p-4 sm:p-6 min-h-screen ${isDark ? "bg-gray-950" : "bg-slate-50"}`}
    >
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className={`h-8 w-64 rounded-lg ${base} ${pulse}`} />
        <div className={`h-10 w-full sm:w-72 rounded-xl ${base} ${pulse}`} />
      </div>

      {/* Stats bar skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`${card} rounded-xl p-4 shadow-sm ${pulse}`}>
            <div className={`h-4 w-16 rounded mb-2 ${base}`} />
            <div className={`h-7 w-10 rounded ${base}`} />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className={`${card} rounded-2xl shadow-md overflow-hidden`}>
        {/* Table header */}
        <div
          className={`px-4 py-3 border-b ${isDark ? "border-gray-700 bg-gray-800/80" : "border-gray-100 bg-gray-50"}`}
        >
          <div className="hidden sm:grid grid-cols-5 gap-4">
            {["w-32", "w-20", "w-16", "w-16", "w-24"].map((w, i) => (
              <div key={i} className={`h-4 ${w} rounded ${base} ${pulse}`} />
            ))}
          </div>
          <div className={`sm:hidden h-4 w-40 rounded ${base} ${pulse}`} />
        </div>

        {/* Table rows */}
        <TableSkeleton isDark={isDark} rows={6} />
      </div>

      {/* Pagination skeleton */}
      <div className="mt-6 flex justify-end">
        <div className={`h-10 w-48 rounded-xl ${base} ${pulse}`} />
      </div>
    </div>
  );
};

/* ─────────────────── TABLE ROW SKELETON ─────────────────── */
export const TableSkeleton = ({ isDark, rows = 5 }) => {
  const base = isDark ? "bg-gray-700/60" : "bg-gray-200/80";
  const border = isDark ? "border-gray-700/60" : "border-gray-100";

  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`flex flex-col sm:grid sm:grid-cols-5 gap-2 sm:gap-4 px-4 py-4 border-b ${border} animate-pulse`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {/* Mobile label */}
          <div className={`sm:hidden h-3 w-20 rounded ${base} mb-1`} />

          <div className={`h-4 w-3/4 sm:w-40 rounded-md ${base}`} />
          <div className={`h-4 w-1/2 sm:w-20 rounded-md ${base}`} />
          <div className={`h-4 w-1/4 sm:w-16 rounded-md ${base}`} />
          <div className={`h-5 w-20 sm:w-20 rounded-full ${base}`} />
          <div className="flex items-center gap-2">
            <div className={`h-7 w-7 rounded-lg ${base}`} />
            <div className={`h-7 w-7 rounded-lg ${base}`} />
            <div className={`h-7 w-7 rounded-lg ${base}`} />
          </div>
        </div>
      ))}
    </>
  );
};
