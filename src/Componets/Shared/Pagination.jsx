"use client";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Pagination = ({ page, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 px-6">
      <p className="text-sm text-gray-400 font-medium order-2 sm:order-1">
        Showing Page <span className="text-[#002B36] font-bold">{page}</span> of <span className="text-[#002B36] font-bold">{totalPages}</span>
      </p>

      <div className="flex items-center gap-3 order-1 sm:order-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl font-bold text-[#002B36] hover:bg-[#002B36] hover:text-white disabled:opacity-30 transition-all shadow-sm"
        >
          <FiArrowLeft /> Prev
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-12 h-12 rounded-xl font-black transition-all ${
                page === i + 1 
                ? "bg-[#C6EB71] text-[#002B36] shadow-lg shadow-[#C6EB71]/30" 
                : "bg-white text-gray-400 hover:border-[#C6EB71] border border-transparent"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl font-bold text-[#002B36] hover:bg-[#002B36] hover:text-white disabled:opacity-30 transition-all shadow-sm"
        >
          Next <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;