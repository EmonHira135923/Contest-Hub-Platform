"use client";
import Pagination from "@/Componets/Shared/Pagination";
import useCreatorContest from "@/Componets/utils/hooks/useCreatorContest";
import useModal from "@/Componets/utils/hooks/useModal";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiX,
  FiCheck,
  FiDollarSign,
  FiTag,
  FiAlignLeft,
  FiClock,
  FiFileText,
} from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { SiInstructure } from "react-icons/si";
import CreatorContestTable, {
  StatusBadge,
  DeadlineBadge,
} from "@/Componets/Cards/CreatorContestTable";
import { PageSkeleton } from "@/Componets/Skeltons/CreatorSkelton";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";

/* ─────────────────── EDIT MODAL ─────────────────── */
const EditModal = ({ isDark, contest, onClose, onSubmit }) => {
  const inputCls = isDark
    ? "bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-600 focus:border-blue-500 focus:bg-gray-800"
    : "bg-gray-50    border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white";
  const labelCls = isDark ? "text-gray-400" : "text-gray-500";
  const errorCls = "text-red-400 text-[10px] mt-1 font-medium";
  const modalBg = isDark ? "bg-gray-900" : "bg-white";
  const titleCls = isDark ? "text-gray-100" : "text-gray-900";

  const todayStr = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      instruction: "",
      prize: "",
      registrationFee: "",
      deadline: "",
    },
  });

  useEffect(() => {
    if (contest) {
      reset({
        title: contest.title ?? "",
        description: contest.description ?? "",
        instruction: contest.instruction ?? "",
        prize: contest.prize ?? "",
        registrationFee: contest.registrationFee ?? "",
        deadline: contest.deadline
          ? new Date(contest.deadline).toISOString().split("T")[0]
          : "",
      });
    }
  }, [contest, reset]);

  const textFields = [
    {
      id: "title",
      label: "Contest Title",
      icon: <FiAlignLeft size={11} />,
      type: "input",
      inputType: "text",
      placeholder: "e.g. Summer Design Challenge",
      rules: {
        required: "Title is required",
        minLength: { value: 3, message: "At least 3 characters" },
      },
    },
    {
      id: "description",
      label: "Description",
      icon: <FiFileText size={11} />,
      type: "textarea",
      placeholder: "Describe your contest…",
      rules: {},
    },
    {
      id: "instruction",
      label: "Instructions",
      icon: <SiInstructure size={11} />,
      type: "textarea",
      placeholder: "Participant instructions…",
      rules: {},
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 ${modalBg} max-h-[90vh] overflow-y-auto`}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-full transition
            ${isDark ? "text-gray-500 hover:bg-gray-800 hover:text-gray-300" : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"}`}
        >
          <FiX size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className={`p-2.5 rounded-xl ${isDark ? "bg-blue-500/15" : "bg-blue-50"}`}
          >
            <FiEdit2 className="text-blue-500" size={19} />
          </span>
          <div>
            <h2 className={`text-lg font-bold ${titleCls}`}>Edit Contest</h2>
            <p
              className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              Update contest details below
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          {/* Text / Textarea fields */}
          {textFields.map(
            ({ id, label, icon, type, inputType, placeholder, rules }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${labelCls}`}
                >
                  {icon} {label}
                </label>

                {type === "textarea" ? (
                  <textarea
                    id={id}
                    rows={3}
                    placeholder={placeholder}
                    {...register(id, rules)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition
                    focus:ring-2 focus:ring-blue-500/20 resize-none ${inputCls}
                    ${errors[id] ? "border-red-500" : ""}`}
                  />
                ) : (
                  <input
                    id={id}
                    type={inputType}
                    placeholder={placeholder}
                    {...register(id, rules)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition
                    focus:ring-2 focus:ring-blue-500/20 ${inputCls}
                    ${errors[id] ? "border-red-500" : ""}`}
                  />
                )}

                {errors[id] && <p className={errorCls}>{errors[id].message}</p>}
              </div>
            ),
          )}

          {/* Prize + Registration Fee */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="prize"
                className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${labelCls}`}
              >
                <FiDollarSign size={11} /> Prize ($)
              </label>
              <input
                id="prize"
                type="number"
                placeholder="500"
                {...register("prize", {
                  required: "Required",
                  min: { value: 0, message: "Must be ≥ 0" },
                  valueAsNumber: true,
                })}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition
                  focus:ring-2 focus:ring-blue-500/20 ${inputCls}
                  ${errors.prize ? "border-red-500" : ""}`}
              />
              {errors.prize && (
                <p className={errorCls}>{errors.prize.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="registrationFee"
                className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${labelCls}`}
              >
                <FiTag size={11} /> Reg. Fee ($)
              </label>
              <input
                id="registrationFee"
                type="number"
                placeholder="10"
                {...register("registrationFee", {
                  required: "Required",
                  min: { value: 0, message: "Must be ≥ 0" },
                  valueAsNumber: true,
                })}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition
                  focus:ring-2 focus:ring-blue-500/20 ${inputCls}
                  ${errors.registrationFee ? "border-red-500" : ""}`}
              />
              {errors.registrationFee && (
                <p className={errorCls}>{errors.registrationFee.message}</p>
              )}
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label
              htmlFor="deadline"
              className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${labelCls}`}
            >
              <FiClock size={11} /> Deadline
            </label>
            <input
              id="deadline"
              type="date"
              min={todayStr}
              {...register("deadline", {
                required: "Deadline is required",
                validate: (v) =>
                  new Date(v) >= new Date(todayStr) ||
                  "Date must be today or in the future",
              })}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition
                focus:ring-2 focus:ring-blue-500/20 ${inputCls}
                ${errors.deadline ? "border-red-500" : ""}`}
            />
            {errors.deadline ? (
              <p className={errorCls}>{errors.deadline.message}</p>
            ) : (
              <p
                className={`text-[10px] mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}
              >
                You can only set a future date to extend the deadline.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition
                ${isDark ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500
                disabled:opacity-60 disabled:cursor-not-allowed text-white transition
                flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Saving…
                </>
              ) : (
                <>
                  <FiCheck size={14} /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ─────────────────── MAIN COMPONENT ─────────────────── */
const AllAproveContest = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingContest, setEditingContest] = useState(null);

  const debounceRef = useRef(null);

  const handleSearchChange = useCallback((e) => {
    const val = e.target.value;
    setInputValue(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(val);
      setPage(1);
    }, 400);
  }, []);

  const { contests, totalPages, isLoading, refetch } = useCreatorContest(
    search,
    page,
  );
  const { openModal } = useModal();

  /* ── Handlers ── */
  const handleDelete = (id) => {
    openModal({
      title: "Delete Contest",
      message:
        "Are you sure you want to delete this contest? This action cannot be undone.",
      type: "error",
      onConfirm: async () => {
        try {
          const res = await axiosSecure.delete(`/api/allcontest/creator/${id}`);
          const data = await res.data;
          data.success
            ? toast.success(data.message || "Contest deleted successfully.")
            : toast.error(data.message || "Something went wrong.");
          refetch();
        } catch {
          toast.error("Network error. Please try again.");
        }
      },
    });
  };

  const openEditModal = (contest) => {
    setEditingContest(contest);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(
        `/api/allcontest/creator/${editingContest._id}`,
        {
          title: data.title,
          prize: data.prize,
          registrationFee: data.registrationFee,
          description: data.description,
          instruction: data.instruction,
          deadline: data.deadline,
        },
      );
      const result = await res.data;
      if (result.success) {
        toast.success("Contest updated successfully!");
        setIsEditModalOpen(false);
        setEditingContest(null);
        refetch();
      } else {
        toast.error(result.message || "Failed to update contest.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  /* ── Full page loading skeleton ── */
  if (isLoading && search === "" && page === 1)
    return <PageSkeleton isDark={isDark} />;

  /* ── Theme tokens ── */
  const bg = isDark ? "bg-gray-950" : "bg-slate-50";
  const card = isDark ? "bg-gray-900" : "bg-white";
  const text = isDark ? "text-gray-100" : "text-gray-900";
  const muted = isDark ? "text-gray-500" : "text-gray-400";
  const subtext = isDark ? "text-gray-400" : "text-gray-500";
  const shadow = isDark ? "shadow-none ring-1 ring-white/5" : "shadow-sm";
  const searchBg = isDark
    ? "bg-gray-800/80 border-gray-700 text-gray-100 placeholder-gray-600"
    : "bg-white       border-gray-200 text-gray-900 placeholder-gray-400";
  const divMobile = isDark ? "divide-gray-800" : "divide-gray-100";
  const rowHovM = isDark ? "hover:bg-white/[0.02]" : "hover:bg-gray-50/70";

  return (
    <div className={`min-h-screen ${bg} ${text}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`p-2.5 rounded-xl ${isDark ? "bg-indigo-500/10" : "bg-indigo-50"}`}
            >
              <HiOutlineClipboardList className="text-indigo-500" size={22} />
            </span>
            <div>
              <h1
                className={`text-xl sm:text-2xl font-bold tracking-tight ${text}`}
              >
                My Contests
              </h1>
              <p className={`text-xs sm:text-sm ${subtext}`}>
                Manage, edit and track your contests
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <FiSearch
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${muted}`}
              size={15}
            />
            <input
              type="text"
              placeholder="Search contests…"
              value={inputValue}
              onChange={handleSearchChange}
              autoComplete="off"
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none transition
                focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 ${searchBg}`}
            />
            {isLoading && inputValue && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg
                  className="animate-spin h-3.5 w-3.5 text-indigo-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* ── Table panel ── */}
        <div className={`${card} ${shadow} rounded-2xl overflow-hidden`}>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <CreatorContestTable
              contests={contests}
              openEditModal={openEditModal}
              handleDelete={handleDelete}
              isDark={isDark}
              isLoading={isLoading}
              page={page}
            />
          </div>

          {/* Mobile cards */}
          <div className={`sm:hidden divide-y ${divMobile}`}>
            {isLoading ? (
              <div className={`py-16 text-center ${subtext}`}>
                <svg
                  className="animate-spin h-6 w-6 mx-auto mb-3 text-indigo-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                <p className="text-xs">Loading contests…</p>
              </div>
            ) : contests.length === 0 ? (
              <div className={`py-16 text-center ${subtext}`}>
                <FiSearch className="mx-auto mb-3 opacity-20" size={32} />
                <p className="text-sm font-medium">No contests found</p>
              </div>
            ) : (
              contests.map((contest, i) => {
                // ✅ FIX 1: disabled when approved OR expired (matches desktop logic)
                const isDisabled =
                  contest.adminStatus === "approved" ||
                  (contest.deadline
                    ? new Date(contest.deadline) < new Date()
                    : false);

                // ✅ FIX 2: correct serial number across all pages
                const serialNumber = (page - 1) * 10 + i + 1;

                const editBtnCls = isDisabled
                  ? `flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold opacity-30 cursor-not-allowed
                      ${isDark ? "text-amber-400 bg-amber-500/10" : "text-amber-600 bg-amber-50"}`
                  : `flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition
                      ${isDark ? "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20" : "text-amber-600 bg-amber-50 hover:bg-amber-100"}`;

                const deleteBtnCls = isDisabled
                  ? `flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold opacity-30 cursor-not-allowed
                      ${isDark ? "text-red-400 bg-red-500/10" : "text-red-600 bg-red-50"}`
                  : `flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition
                      ${isDark ? "text-red-400 bg-red-500/10 hover:bg-red-500/20" : "text-red-600 bg-red-50 hover:bg-red-100"}`;

                return (
                  <div
                    key={contest._id}
                    className={`p-4 ${rowHovM} transition-colors`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        {/* ✅ FIX 2: serialNumber instead of i + 1 */}
                        <span
                          className={`mt-0.5 text-[11px] font-bold tabular-nums min-w-[20px] ${subtext}`}
                        >
                          {serialNumber}.
                        </span>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-semibold text-sm leading-snug truncate ${text}`}
                          >
                            {contest.title}
                          </p>
                          <p className={`text-xs mt-0.5 capitalize ${subtext}`}>
                            {contest.category?.replace(/-/g, " ")}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={contest.adminStatus} />
                    </div>

                    {/* Prize + Deadline row */}
                    <div className="flex items-center justify-between mb-3 pl-7 pr-1">
                      <div className="flex items-center gap-1.5">
                        <FiDollarSign size={12} className="text-emerald-500" />
                        <span className="text-sm font-bold text-emerald-500">
                          {Number(contest.prize).toLocaleString()}
                        </span>
                        <span className={`text-xs ${subtext}`}>prize</span>
                      </div>
                      <DeadlineBadge
                        deadline={contest.deadline}
                        isDark={isDark}
                      />
                    </div>

                    <div className="flex items-center gap-2 pl-7">
                      {/* View — always active */}
                      <Link
                        href={`/all-contests/${contest._id}`}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition
                          ${isDark ? "text-blue-400 bg-blue-500/10 hover:bg-blue-500/20" : "text-blue-600 bg-blue-50 hover:bg-blue-100"}`}
                      >
                        <FiEye size={13} /> View
                      </Link>

                      {/* ✅ FIX 1: Edit — disabled if approved or expired */}
                      <button
                        onClick={() => !isDisabled && openEditModal(contest)}
                        disabled={isDisabled}
                        title={
                          isDisabled
                            ? contest.adminStatus === "approved"
                              ? "Approved contest — editing disabled"
                              : "Deadline passed — editing disabled"
                            : "Edit"
                        }
                        className={editBtnCls}
                      >
                        <FiEdit2 size={13} /> Edit
                      </button>

                      {/* ✅ FIX 1: Delete — disabled if approved or expired */}
                      <button
                        onClick={() => !isDisabled && handleDelete(contest._id)}
                        disabled={isDisabled}
                        title={
                          isDisabled
                            ? contest.adminStatus === "approved"
                              ? "Approved contest — deletion disabled"
                              : "Deadline passed — deletion disabled"
                            : "Delete"
                        }
                        className={deleteBtnCls}
                      >
                        <FiTrash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex justify-end">
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        )}
      </div>

      {/* ── Edit Modal ── */}
      {isEditModalOpen && (
        <EditModal
          isDark={isDark}
          contest={editingContest}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingContest(null);
          }}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default AllAproveContest;
