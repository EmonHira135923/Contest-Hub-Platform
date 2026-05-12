// src/Components/Pages/Myprofile/ProfileSkeleton.jsx
export default function ProfileSkeleton({ isDark }) {
  const bar = `rounded-lg animate-pulse ${isDark ? "bg-white/[0.07]" : "bg-violet-100"}`;
  
  return (
    <div className={`min-h-screen ${isDark ? "bg-[#0a0a14]" : "bg-[#f4f2ff]"}`}>
      {/* Skeleton Cover */}
      <div className={`h-44 sm:h-52 animate-pulse ${isDark ? "bg-violet-950/20" : "bg-violet-200"}`} />
      
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-14">
        {/* Name & Title Skeleton */}
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-3">
            <div className={`h-8 w-48 ${bar}`} />
            <div className={`h-4 w-64 ${bar}`} />
          </div>
          <div className={`h-10 w-32 rounded-xl ${bar}`} />
        </div>

        {/* Info Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-24 rounded-xl border ${isDark ? "border-white/[0.05]" : "border-violet-100"} ${bar}`} />
          ))}
        </div>
      </div>
    </div>
  );
}