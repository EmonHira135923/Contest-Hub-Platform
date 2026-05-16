"use client";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Pagination = ({ page, totalPages, setPage, isDark = false }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 px-6">
      <p
        className={`text-sm font-medium order-2 sm:order-1 ${
          isDark ? "text-gray-500" : "text-slate-400"
        }`}
      >
        Showing Page{" "}
        <span
          className={`font-bold ${
            isDark ? "text-[#C6EB71]" : "text-violet-600"
          }`}
        >
          {page}
        </span>{" "}
        of{" "}
        <span
          className={`font-bold ${
            isDark ? "text-[#C6EB71]" : "text-pink-600"
          }`}
        >
          {totalPages}
        </span>
      </p>

      <div className="flex items-center gap-3 order-1 sm:order-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`flex items-center gap-2 px-6 py-3 border rounded-xl font-bold disabled:opacity-30 transition-all shadow-sm ${
            isDark
              ? "bg-[#111] border-[#1e1e1e] text-[#C6EB71] hover:bg-[#C6EB71] hover:text-[#002B36]"
              : "bg-white border-fuchsia-100 text-violet-700 hover:bg-violet-600 hover:text-white"
          }`}
        >
          <FiArrowLeft /> Prev
        </button>

        <div className="flex gap-2">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`w-12 h-12 rounded-xl font-black transition-all ${
                page === pageNumber
                  ? isDark
                    ? "bg-[#C6EB71] text-[#002B36] shadow-lg shadow-[#C6EB71]/30"
                    : "bg-gradient-to-br from-violet-600 to-pink-500 text-white shadow-lg shadow-pink-500/20"
                  : isDark
                    ? "bg-[#111] text-slate-500 hover:border-[#C6EB71] border border-transparent"
                    : "bg-white text-slate-400 hover:border-fuchsia-300 border border-transparent"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`flex items-center gap-2 px-6 py-3 border rounded-xl font-bold disabled:opacity-30 transition-all shadow-sm ${
            isDark
              ? "bg-[#111] border-[#1e1e1e] text-[#C6EB71] hover:bg-[#C6EB71] hover:text-[#002B36]"
              : "bg-white border-fuchsia-100 text-pink-700 hover:bg-pink-600 hover:text-white"
          }`}
        >
          Next <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
