import { Eye, Pencil, Trash2 } from "lucide-react";

const roleBadge = {
  admin: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
  creator: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400",
  user: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

const getInitials = (name) =>
  (name || "?")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const UserTable = ({
  users,
  page,
  limit,
  isDark,
  onView,
  onEdit,
  onDelete,
}) => {
  const base = (page - 1) * limit;

  return (
    <tbody>
      {users.map((user, i) => (
        <tr
          key={user._id}
          className={`border-t transition-colors ${
            isDark
              ? "border-white/5 hover:bg-white/[0.03]"
              : "border-fuchsia-100/70 hover:bg-fuchsia-50/40"
          }`}
        >
          <td className="px-4 py-3.5">
            <span
              className={`text-xs font-bold ${
                isDark ? "text-slate-600" : "text-violet-300"
              }`}
            >
              {base + i + 1}
            </span>
          </td>

          <td className="px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  isDark
                    ? "bg-[#C6EB71]/20 text-[#C6EB71]"
                    : "bg-gradient-to-br from-violet-100 to-pink-100 text-fuchsia-700 ring-1 ring-fuchsia-200"
                }`}
              >
                {getInitials(user.name)}
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  {user.name || "N/A"}
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {user.email}
                </p>
              </div>
            </div>
          </td>

          <td className="px-4 py-3.5">
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                roleBadge[user.role] || roleBadge.user
              }`}
            >
              {user.role || "user"}
            </span>
          </td>

          <td className="px-4 py-3.5">
            <span
              className={`text-xs ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            >
              {user.provider || "Email"}
            </span>
          </td>

          <td className="px-4 py-3.5 text-right">
            <div className="flex items-center justify-end gap-1.5">
              <button
                onClick={() => onView(user)}
                title="View"
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isDark
                    ? "text-[#C6EB71] bg-[#C6EB71]/10 hover:bg-[#C6EB71]/25"
                    : "text-violet-600 bg-violet-500/10 hover:bg-violet-500/20"
                }`}
              >
                <Eye size={14} />
              </button>
              <button
                onClick={() => onEdit(user)}
                title="Edit role"
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isDark
                    ? "text-blue-400 bg-blue-500/10 hover:bg-blue-500/20"
                    : "text-fuchsia-600 bg-fuchsia-500/10 hover:bg-fuchsia-500/20"
                }`}
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(user)}
                title="Delete"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default UserTable;
