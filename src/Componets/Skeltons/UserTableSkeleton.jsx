const UserTableSkeleton = ({ isDark }) => {
  const sk = `rounded-md animate-pulse ${isDark ? "bg-[#1e1e1e]" : "bg-gray-200"}`;

  return (
    <tbody>
      {Array(10).fill(0).map((_, i) => (
        <tr key={i} className={`border-t ${isDark ? "border-white/5" : "border-gray-100"}`}>
          <td className="px-4 py-3.5">
            <div className={`${sk} h-3.5 w-6`} />
          </td>
          <td className="px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className={`${sk} w-9 h-9 rounded-xl flex-shrink-0`} />
              <div>
                <div className={`${sk} h-3.5 w-28 mb-2`} />
                <div className={`${sk} h-2.5 w-40`} />
              </div>
            </div>
          </td>
          <td className="px-4 py-3.5">
            <div className={`${sk} h-5 w-16 rounded-full`} />
          </td>
          <td className="px-4 py-3.5">
            <div className={`${sk} h-3 w-16`} />
          </td>
          <td className="px-4 py-3.5">
            <div className="flex justify-end gap-1.5">
              <div className={`${sk} w-8 h-8 rounded-lg`} />
              <div className={`${sk} w-8 h-8 rounded-lg`} />
              <div className={`${sk} w-8 h-8 rounded-lg`} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default UserTableSkeleton;