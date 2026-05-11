const PopularContestSkeleton = () => {
  return (
    <div className="w-full rounded-[2rem] bg-slate-900 border border-white/10 overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-800 relative" />
      <div className="p-8 space-y-4">
        <div className="flex gap-2">
          <div className="h-4 w-20 bg-slate-800 rounded" />
          <div className="h-4 w-4 bg-slate-800 rounded-full" />
        </div>
        <div className="h-8 w-3/4 bg-slate-800 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-slate-800 rounded" />
          <div className="h-4 w-5/6 bg-slate-800 rounded" />
        </div>
        <div className="flex justify-between py-4 border-t border-white/5">
          <div className="h-10 w-20 bg-slate-800 rounded" />
          <div className="h-10 w-20 bg-slate-800 rounded" />
        </div>
        <div className="h-12 w-full bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
};

export default PopularContestSkeleton;