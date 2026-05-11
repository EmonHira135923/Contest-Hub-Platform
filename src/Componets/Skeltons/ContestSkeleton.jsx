export const ContestSkeleton = ({ isDark }) => {
  return (
    <div
      className={`rounded-3xl border p-5 animate-pulse ${
        isDark ? "bg-[#11111a] border-white/5" : "bg-white border-slate-100"
      }`}
    >
      <div className="flex justify-between mb-4">
        <div
          className={`h-6 w-20 rounded-full ${isDark ? "bg-white/5" : "bg-slate-200"}`}
        />
        <div
          className={`h-6 w-16 rounded-md ${isDark ? "bg-white/5" : "bg-slate-200"}`}
        />
      </div>
      <div className="space-y-3">
        <div
          className={`h-7 w-3/4 rounded-md ${isDark ? "bg-white/5" : "bg-slate-200"}`}
        />
        <div
          className={`h-4 w-full rounded-md ${isDark ? "bg-white/5" : "bg-slate-200"}`}
        />
        <div
          className={`h-4 w-5/6 rounded-md ${isDark ? "bg-white/5" : "bg-slate-200"}`}
        />
      </div>
      <div
        className={`my-6 h-12 border-y ${isDark ? "border-white/5" : "border-slate-50"}`}
      />
      <div
        className={`h-11 w-full rounded-xl ${isDark ? "bg-white/5" : "bg-slate-200"}`}
      />
    </div>
  );
};
