export const EditProfileSkeleton = ({ isDark }) => (
  <div className={`w-full max-w-md rounded-3xl border animate-pulse ${isDark ? "bg-[#13131f] border-white/5" : "bg-white border-slate-200"}`}>
    <div className="h-1 w-full rounded-t-3xl bg-gray-300/20" />
    <div className="px-8 pt-8 pb-9 space-y-8">
      <div className="space-y-3">
        <div className={`h-4 w-16 rounded ${isDark ? "bg-white/5" : "bg-gray-200"}`} />
        <div className={`h-8 w-40 rounded ${isDark ? "bg-white/5" : "bg-gray-200"}`} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className={`h-24 w-24 rounded-full ${isDark ? "bg-white/5" : "bg-gray-200"}`} />
        <div className={`h-4 w-24 rounded ${isDark ? "bg-white/5" : "bg-gray-200"}`} />
      </div>
      <div className="space-y-6">
        <div className={`h-12 w-full rounded-2xl ${isDark ? "bg-white/5" : "bg-gray-200"}`} />
        <div className={`h-24 w-full rounded-2xl ${isDark ? "bg-white/5" : "bg-gray-200"}`} />
      </div>
      <div className="flex gap-3">
        <div className={`h-12 flex-1 rounded-2xl ${isDark ? "bg-white/5" : "bg-gray-200"}`} />
        <div className={`h-12 flex-[2] rounded-2xl ${isDark ? "bg-white/5" : "bg-gray-200"}`} />
      </div>
    </div>
  </div>
);