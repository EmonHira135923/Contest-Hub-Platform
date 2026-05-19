"use client";
import React, { useContext } from "react";
import Pagination from "@/Componets/Shared/Pagination";
import useAdminContest from "@/Componets/utils/hooks/useAdminContest";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import TableSkeleton from "@/Componets/Skeltons/TableSkeleton";
import ApproveContestTable from "@/Componets/Cards/ApproveContestTable";
import { toast } from "react-toastify";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useModal from "@/Componets/utils/hooks/useModal";

const Approvecontest = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const axiosSecure = useAxiosSecure();
  const { openModal } = useModal();

  const {
    contests,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    loading,
    refetch,
  } = useAdminContest();

  // ১. Approve হ্যান্ডলার
  const handleApproveClick = (id) => {
    openModal({
      title: "Approve Contest?",
      message:
        "Are you sure you want to approve this contest for public display?",
      type: "success", // মোডালের গ্রিন একসেন্ট একটিভেট করবে
      onConfirm: async () => {
        try {
          const res = await axiosSecure.patch(`/api/allcontest/admin/${id}`, {
            action: "approved",
          });
          if (res.data.success) {
            toast.success("Contest approved successfully!");
            refetch();
          }
        } catch (error) {
          toast.error(error?.response?.data?.message || "Approval failed.");
        }
      },
    });
  };

  // ২. Reject হ্যান্ডলার
  const handleRejectClick = (id) => {
    openModal({
      title: "Reject Contest?",
      message:
        "Are you sure you want to reject this submission? This will change status to rejected.",
      type: "info", // মোডালের পার্পেল/ইন্ডিগো একসেন্ট একটিভেট করবে
      onConfirm: async () => {
        try {
          const res = await axiosSecure.patch(`/api/allcontest/admin/${id}`, {
            action: "rejected",
          });
          if (res.data.success) {
            toast.warning("Contest has been rejected.");
            refetch();
          }
        } catch (error) {
          toast.error(error?.response?.data?.message || "Rejection failed.");
        }
      },
    });
  };

  // ৩. Delete হ্যান্ডলার
  const handleDeleteClick = (id) => {
    openModal({
      title: "Delete Permanently?",
      message:
        "Warning! This action cannot be undone. Do you really want to delete this contest?",
      type: "error", // মোডালের রেড একসেন্ট একটিভেট করবে
      onConfirm: async () => {
        try {
          const res = await axiosSecure.delete(`/api/allcontest/admin/${id}`);
          if (res.data.success) {
            toast.error("Contest deleted successfully!");
            refetch();
          }
        } catch (error) {
          toast.error(error?.response?.data?.message || "Deletion failed.");
        }
      },
    });
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? "bg-neutral-950 text-neutral-100" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Approve Contest
            </h1>
            <p className="text-sm text-gray-500 dark:text-neutral-400">
              Manage and verify community submitted contests.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search contests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-150 ${
                isDark
                  ? "bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:ring-indigo-400 focus:border-indigo-400"
                  : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-400"
              }`}
            />
          </div>
        </div>

        {/* Dynamic content rendering */}
        {loading ? (
          <TableSkeleton />
        ) : (
          <div className="space-y-4">
            <ApproveContestTable
              contests={contests}
              onApprove={handleApproveClick}
              onReject={handleRejectClick}
              onDelete={handleDeleteClick}
              isDark={isDark}
              page={page}
            />

            {/* Pagination Setup */}
            <div className="flex justify-end pt-2">
              <Pagination
                setPage={setPage}
                page={page}
                totalPages={totalPages}
                isDark={isDark}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Approvecontest;
