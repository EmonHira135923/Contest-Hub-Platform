"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/Componets/Shared/Pagination";
import useAuth from "@/Componets/utils/hooks/useAuth";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useTheme from "@/Componets/utils/hooks/useThemeValue";

const AdminAllContactPage = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const isDark = theme === "dark";

  // Manage current pagination index locally
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch Paginated Contact Messages via TanStack Query
  const {
    data: contactResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["adminAllContacts", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/contact?page=${page}&limit=${limit}`,
      );
      return res.data;
    },
    keepPreviousData: true, // Smooth UI transition between pages
  });

  const messages = contactResponse?.data || [];
  const meta = contactResponse?.meta || { totalPages: 1 };

  // Tailwind Context Styles based on dark configuration status
  const bgClass = isDark
    ? "bg-[#0a0a14] text-white"
    : "bg-[#f4f2ff] text-[#1a1240]";
  const cardClass = isDark
    ? "bg-white/[0.04] border-white/[0.08]"
    : "bg-white border-violet-200";
  const headerRowClass = isDark
    ? "bg-white/[0.02] text-violet-300 border-white/[0.08]"
    : "bg-violet-50 text-violet-800 border-violet-200";
  const borderRowClass = isDark
    ? "border-white/[0.06] hover:bg-white/[0.02]"
    : "border-violet-100 hover:bg-violet-50/50";

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dashboard Title Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Contact Messages
            </h1>
            <p
              className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              Review and manage user submissions received across your
              application channels.
            </p>
          </div>
          {isFetching && (
            <span className="text-xs bg-violet-500/20 text-violet-400 font-medium px-3 py-1.5 rounded-full animate-pulse">
              Syncing Data...
            </span>
          )}
        </div>

        {/* Table Layout Container */}
        <div
          className={`border rounded-2xl overflow-hidden shadow-sm ${cardClass}`}
        >
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`border-b text-xs font-bold uppercase tracking-wider ${headerRowClass}`}
                >
                  <th className="py-4 px-5 w-16">Sl No</th>
                  <th className="py-4 px-5">Sender</th>
                  <th className="py-4 px-5">Subject</th>
                  <th className="py-4 px-5">Message Body</th>
                  <th className="py-4 px-5">Date Submitted</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-transparent">
                {isLoading ? (
                  /* Loading Skeleton State Generator */
                  Array.from({ length: limit }).map((_, index) => (
                    <tr
                      key={`skeleton-${index}`}
                      className={`border-b ${borderRowClass}`}
                    >
                      <td className="py-4 px-5">
                        <div
                          className={`h-4 w-6 rounded animate-pulse ${isDark ? "bg-white/10" : "bg-slate-200"}`}
                        />
                      </td>
                      <td className="py-4 px-5">
                        <div className="space-y-2">
                          <div
                            className={`h-4 w-32 rounded animate-pulse ${isDark ? "bg-white/10" : "bg-slate-200"}`}
                          />
                          <div
                            className={`h-3 w-40 rounded animate-pulse ${isDark ? "bg-white/5" : "bg-slate-100"}`}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div
                          className={`h-4 w-28 rounded animate-pulse ${isDark ? "bg-white/10" : "bg-slate-200"}`}
                        />
                      </td>
                      <td className="py-4 px-5">
                        <div
                          className={`h-4 w-64 rounded animate-pulse ${isDark ? "bg-white/10" : "bg-slate-200"}`}
                        />
                      </td>
                      <td className="py-4 px-5">
                        <div
                          className={`h-4 w-20 rounded animate-pulse ${isDark ? "bg-white/10" : "bg-slate-200"}`}
                        />
                      </td>
                    </tr>
                  ))
                ) : messages.length === 0 ? (
                  /* Empty Messages Condition Row */
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-slate-500 font-medium"
                    >
                      No contact entries found in database.
                    </td>
                  </tr>
                ) : (
                  /* Active Data Rows Output Generation */
                  messages.map((item, index) => {
                    // Dynamic continuous tracking count tracker calculator
                    const globalSerialIndex = (page - 1) * limit + (index + 1);

                    return (
                      <tr
                        key={item._id || index}
                        className={`border-b transition-colors ${borderRowClass}`}
                      >
                        <td className="py-4 px-5 font-bold text-violet-500">
                          {globalSerialIndex}
                        </td>
                        <td className="py-4 px-5">
                          <div className="font-semibold">{item.name}</div>
                          <div
                            className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
                          >
                            {item.email}
                          </div>
                        </td>
                        <td className="py-4 px-5 font-medium">
                          {item.subject}
                        </td>
                        <td
                          className={`py-4 px-5 max-w-xs truncate ${isDark ? "text-slate-300" : "text-slate-600"}`}
                          title={item.message}
                        >
                          {item.message}
                        </td>
                        <td
                          className={`py-4 px-5 text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
                        >
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Controls Component Wrapper */}
        {meta.totalPages > 1 && (
          <div className="flex justify-center pt-2">
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={meta.totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAllContactPage;
