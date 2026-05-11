import { Calendar, Users, Trophy, ArrowUpRight } from "lucide-react";

const ContestCard = ({ contest, isDark }) => {
  return (
    <div className={`group relative rounded-3xl border p-5 transition-all duration-300 hover:shadow-2xl ${
      isDark 
      ? "bg-[#11111a] border-white/5 hover:border-indigo-500/50" 
      : "bg-white border-slate-100 hover:border-indigo-200"
    }`}>
      {/* Category Badge & Prize */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
          isDark ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600"
        }`}>
          {contest.category}
        </span>
        <div className="flex items-center gap-1.5 text-amber-500 font-bold">
          <Trophy size={16} />
          <span>{contest.prize}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className={`text-xl font-bold leading-tight group-hover:text-indigo-500 transition-colors ${
          isDark ? "text-white" : "text-slate-800"
        }`}>
          {contest.title}
        </h3>
        <p className={`text-sm line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {contest.description}
        </p>
      </div>

      {/* Stats */}
      <div className={`my-6 flex items-center justify-between border-y py-4 ${
        isDark ? "border-white/5" : "border-slate-50"
      }`}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Users size={14} />
            Participants
          </div>
          <span className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-700"}`}>
            {contest.joined}+
          </span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar size={14} />
            Deadline
          </div>
          <span className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-700"}`}>
            {new Date(contest.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
        isDark 
        ? "bg-white/5 text-white hover:bg-indigo-600" 
        : "bg-slate-100 text-slate-800 hover:bg-[#5b50e8] hover:text-white"
      }`}>
        View Details
        <ArrowUpRight size={16} />
      </button>
    </div>
  );
};

export default ContestCard;