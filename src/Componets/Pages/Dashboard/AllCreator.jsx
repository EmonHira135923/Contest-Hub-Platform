"use client";
import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  X,
  Smartphone,
  MapPin,
  GraduationCap,
  Link2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import useAuth from "@/Componets/utils/hooks/useAuth";
import useCreators from "@/Componets/utils/hooks/useCreators";
import CreatorTable from "@/Componets/Cards/CreatorTable";
import CreatorSkeleton from "@/Componets/Skeltons/CreatorSkeleton";
import useModal from "@/Componets/utils/hooks/useModal";

// ── Formatters ────────────────────────────────────────────────────────
const fmt = (iso) => {
  if (!iso) return "N/A";
  const d = new Date(iso);
  return isNaN(d)
    ? "N/A"
    : d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

const statusStyles = {
  approved:
    "bg-emerald-100 text-emerald-700 border border-emerald-400 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30",
  pending:
    "bg-amber-100  text-amber-700  border border-amber-400  dark:bg-amber-500/15  dark:text-amber-400  dark:border-amber-500/30",
  rejected:
    "bg-rose-100   text-rose-700   border border-rose-400   dark:bg-rose-500/15   dark:text-rose-400   dark:border-rose-500/30",
};

// ── Page Button ───────────────────────────────────────────────────────
const PageBtn = ({ children, onClick, disabled, active, dark }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={[
      "w-9 h-9 rounded-xl text-xs font-bold flex items-center justify-center transition-all",
      active
        ? "bg-[#C6EB71] text-[#002B36] shadow-md"
        : disabled
          ? "opacity-30 cursor-not-allowed " +
            (dark ? "text-slate-600" : "text-slate-300")
          : dark
            ? "text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/10"
            : "text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200",
    ].join(" ")}
  >
    {children}
  </button>
);

// ── Mobile action button ──────────────────────────────────────────────
const MobileBtn = ({ color, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all"
    style={{ background: `${color}20`, color }}
  >
    {label}
  </button>
);

// ── Detail row ────────────────────────────────────────────────────────
const DetailRow = ({ icon: Icon, label, value, dark }) => (
  <p className="flex items-start gap-2 text-xs">
    <Icon size={13} className="text-slate-400 flex-shrink-0 mt-0.5" />
    <span className={dark ? "text-slate-400" : "text-slate-500"}>{label}:</span>
    <span
      className={`font-medium ${dark ? "text-slate-200" : "text-slate-700"}`}
    >
      {value || "N/A"}
    </span>
  </p>
);

const InfoCard = ({ label, value, dark }) => (
  <div className={`p-3 rounded-xl ${dark ? "bg-[#0f2028]" : "bg-slate-50"}`}>
    <span
      className={`text-[10px] font-medium block mb-1 ${dark ? "text-slate-400" : "text-slate-500"}`}
    >
      {label}
    </span>
    <span
      className={`text-sm font-semibold ${dark ? "text-slate-100" : "text-slate-800"}`}
    >
      {value || "N/A"}
    </span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────
const AllCreator = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const { user } = useAuth();
  const { openModal } = useModal();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCreator, setSelectedCreator] = useState(null);

  const limit = 10;

  const { creators, meta, isLoading, refetch } = useCreators({
    search,
    status: statusFilter,
    page,
    limit,
  });

  // ── meta: { totalData, totalPages, currentPage, limit } ──────────
  const totalPages = meta?.totalPages ?? 1;
  const totalCount = meta?.totalData ?? 0;
  const showingFrom = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const showingTo = Math.min(page * limit, totalCount);

  // ── Action handler ────────────────────────────────────────────────
  const handleActionRequest = (id, actionType, modalTitle) => {
    const isDelete = actionType === "delete";
    openModal({
      title: modalTitle,
      message: `Are you sure you want to ${isDelete ? "delete" : actionType} this creator application? This action cannot be undone.`,
      type: isDelete ? "error" : "info",
      onConfirm: async () => {
        try {
          const url = `/api/creator/${id}`;
          const method = isDelete ? "DELETE" : "PATCH";
          const body = isDelete
            ? undefined
            : JSON.stringify({ status: actionType });
          const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body,
          });
          const data = await res.json();
          if (data.success) {
            toast.success(data.message || "Action completed.");
            refetch();
            if (selectedCreator?._id === id) setSelectedCreator(null);
          } else {
            toast.error(data.message || "Something went wrong.");
          }
        } catch (err) {
          toast.error("Network error. Please try again.");
          console.error(err);
        }
      },
    });
  };

  // ── Colour tokens ─────────────────────────────────────────────────
  const bg = dark
    ? "bg-[#0b1416] text-[#e2eef4]"
    : "bg-slate-100 text-slate-900";
  const cardBg = dark
    ? "bg-[#1a2830] border-[#2a3d47]"
    : "bg-white border-slate-200";
  const inputCls = dark
    ? "bg-[#0f2028] border-[#2a3d47] text-[#e2eef4] placeholder:text-slate-600 focus:border-[#C6EB71]"
    : "bg-slate-50  border-slate-200  text-slate-900 placeholder:text-slate-400 focus:border-violet-400";
  const muted = dark ? "text-slate-500" : "text-slate-400";
  const theadBg = dark
    ? "bg-[#0f2028]/60 border-b border-[#2a3d47] text-[#7a9aab]"
    : "bg-slate-50     border-b border-slate-100  text-slate-500";

  return (
    <div className={`min-h-screen p-3 sm:p-4 md:p-6 transition-colors ${bg}`}>
      <div className="max-w-7xl mx-auto space-y-4">
        {/* ── Header card ──────────────────────────────────────────── */}
        <div className={`rounded-2xl overflow-hidden border ${cardBg}`}>
          {/* Dark green top bar */}
          <div className="bg-[#002B36] px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-[#C6EB71]/10 border border-[#C6EB71]/25 rounded-full px-3 py-1 text-[11px] font-semibold text-[#C6EB71] uppercase tracking-wider mb-2">
                  <Users size={11} /> Creator Space
                </span>
                <h1 className="text-base sm:text-lg font-semibold text-white">
                  All Creator Requests
                </h1>
                <p className="text-[#7a9aab] text-xs mt-0.5">
                  Manage and evaluate platform creator applications.
                </p>
              </div>
              {/* Summary pills */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: "Total", val: totalCount },
                  { label: "Showing", val: `${showingFrom}–${showingTo}` },
                  { label: "Pages", val: totalPages },
                ].map(({ label, val }) => (
                  <div
                    key={label}
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center min-w-[58px]"
                  >
                    <p className="text-[10px] text-[#7a9aab] font-medium">
                      {label}
                    </p>
                    <p className="text-sm font-bold text-[#C6EB71]">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search + Filter */}
          <div
            className={`p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t ${dark ? "border-[#2a3d47]" : "border-slate-100"}`}
          >
            <div className="relative">
              <Search
                size={14}
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${muted}`}
              />
              <input
                type="text"
                placeholder="Search by name, email…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none border transition-all ${inputCls}`}
              />
            </div>
            <div className="relative">
              <Filter
                size={13}
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${muted}`}
              />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none border transition-all appearance-none cursor-pointer ${inputCls}`}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Table card (Desktop ≥ sm) ────────────────────────────── */}
        <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`text-[11px] font-semibold uppercase tracking-wider ${theadBg}`}
                >
                  <th className="px-5 py-3.5 w-10">#</th>
                  <th className="px-5 py-3.5">Creator Info</th>
                  <th className="px-5 py-3.5 w-28">Status</th>
                  <th className="px-5 py-3.5 text-right w-52">Actions</th>
                </tr>
              </thead>
              {isLoading ? (
                <CreatorSkeleton rows={5} isDark={dark} />
              ) : (
                <CreatorTable
                  creators={creators}
                  page={page}
                  limit={limit}
                  isDark={dark}
                  currentAdminId={user?.id}
                  onViewDetails={setSelectedCreator}
                  onActionTrigger={handleActionRequest}
                />
              )}
            </table>
          </div>

          {/* ── Mobile card list (< sm) ──────────────────────────── */}
          <div
            className={`sm:hidden divide-y ${dark ? "divide-[#1e2d38]" : "divide-slate-100"}`}
          >
            {isLoading ? (
              <div className={`py-10 text-center text-sm ${muted}`}>
                Loading…
              </div>
            ) : creators.length === 0 ? (
              <div className={`py-14 text-center text-sm ${muted}`}>
                No creator requests found.
              </div>
            ) : (
              creators.map((creator, i) => {
                const isOwn = creator.userId === user?.id;
                const isApproved = creator.status === "approved";
                const isRejected = creator.status === "rejected";
                const badgeCls =
                  statusStyles[creator.status] ?? statusStyles.pending;

                return (
                  <div
                    key={creator._id}
                    className={`px-4 py-4 ${dark ? "bg-[#1a2830]" : "bg-white"}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Index */}
                      <span
                        className={`text-xs font-bold pt-1 flex-shrink-0 w-5 ${muted}`}
                      >
                        {(page - 1) * limit + i + 1}.
                      </span>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p
                            className={`text-sm font-semibold ${dark ? "text-slate-100" : "text-slate-800"}`}
                          >
                            {creator.name}
                          </p>
                          {isOwn && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded border bg-blue-500/10 text-blue-400 border-blue-500/25">
                              You
                            </span>
                          )}
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${badgeCls}`}
                          >
                            {creator.status}
                          </span>
                        </div>
                        <p className={`text-xs truncate mt-0.5 ${muted}`}>
                          {creator.email}
                        </p>
                        <p className={`text-[11px] mt-0.5 ${muted}`}>
                          {creator.district}, {creator.region}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <MobileBtn
                          color="#7a9aab"
                          onClick={() => setSelectedCreator(creator)}
                          label="👁"
                        />
                        {!isOwn && !isApproved && (
                          <MobileBtn
                            color="#4ade80"
                            onClick={() =>
                              handleActionRequest(
                                creator._id,
                                "approved",
                                "Approve?",
                              )
                            }
                            label="✓"
                          />
                        )}
                        {!isOwn && !isApproved && !isRejected && (
                          <MobileBtn
                            color="#f87171"
                            onClick={() =>
                              handleActionRequest(
                                creator._id,
                                "rejected",
                                "Reject?",
                              )
                            }
                            label="✕"
                          />
                        )}
                        {!isApproved && (
                          <MobileBtn
                            color="#94a3b8"
                            onClick={() =>
                              handleActionRequest(
                                creator._id,
                                "delete",
                                "Delete?",
                              )
                            }
                            label="🗑"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── Pagination ───────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex flex-col xs:flex-row items-center justify-between gap-3">
            <p className={`text-xs ${muted}`}>
              Showing {showingFrom}–{showingTo} of {totalCount}
            </p>
            <div className="flex items-center gap-1">
              {/* Prev */}
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                  dark
                    ? "border-[#2a3d47] text-slate-300 hover:bg-white/5"
                    : "border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <ChevronLeft size={13} /> Prev
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
                )
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && arr[idx - 1] !== p - 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "…" ? (
                    <span
                      key={`gap-${idx}`}
                      className={`w-7 text-center text-xs ${muted}`}
                    >
                      …
                    </span>
                  ) : (
                    <PageBtn
                      key={item}
                      onClick={() => setPage(item)}
                      active={item === page}
                      dark={dark}
                    >
                      {item}
                    </PageBtn>
                  ),
                )}

              {/* Next */}
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                  dark
                    ? "border-[#2a3d47] text-slate-300 hover:bg-white/5"
                    : "border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Next <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Detail Modal ──────────────────────────────────────────────── */}
      {selectedCreator && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCreator(null);
          }}
        >
          <div
            className={`w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden border shadow-2xl ${
              dark
                ? "bg-[#131d24] border-[#2a3d47]"
                : "bg-white border-slate-200"
            }`}
          >
            {/* Modal header */}
            <div className="bg-[#002B36] px-5 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Application Details
                </h2>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[220px] sm:max-w-[300px]">
                  ID: {selectedCreator._id}
                </p>
              </div>
              <button
                onClick={() => setSelectedCreator(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Drag handle (mobile) */}
            <div className="flex justify-center pt-3 sm:hidden">
              <div
                className={`w-10 h-1 rounded-full ${dark ? "bg-white/10" : "bg-slate-200"}`}
              />
            </div>

            <div className="p-4 sm:p-5 space-y-3 max-h-[72vh] overflow-y-auto">
              {/* Name + status */}
              <div className="grid grid-cols-2 gap-3">
                <InfoCard
                  label="Full name"
                  value={selectedCreator.name}
                  dark={dark}
                />
                <div
                  className={`p-3 rounded-xl ${dark ? "bg-[#0f2028]" : "bg-slate-50"}`}
                >
                  <span
                    className={`text-[10px] font-medium block mb-1.5 ${dark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Status
                  </span>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${statusStyles[selectedCreator.status] ?? statusStyles.pending}`}
                  >
                    {selectedCreator.status}
                  </span>
                </div>
              </div>

              {/* Contact + location */}
              <div
                className={`p-3 rounded-xl space-y-2.5 ${dark ? "bg-[#0f2028]" : "bg-slate-50"}`}
              >
                <DetailRow
                  icon={Smartphone}
                  label="Phone"
                  value={selectedCreator.phone}
                  dark={dark}
                />
                <DetailRow
                  icon={MapPin}
                  label="Location"
                  value={`${selectedCreator.district}, ${selectedCreator.region}`}
                  dark={dark}
                />
                <DetailRow
                  icon={GraduationCap}
                  label="Education"
                  value={selectedCreator.education}
                  dark={dark}
                />
                <DetailRow
                  icon={Check}
                  label="Has device"
                  value={selectedCreator.hasDevice === "yes" ? "Yes ✓" : "No"}
                  dark={dark}
                />
              </div>

              {/* OJ Link */}
              <div
                className={`p-3 rounded-xl ${dark ? "bg-[#0f2028]" : "bg-slate-50"}`}
              >
                <span
                  className={`text-[10px] font-medium flex items-center gap-1 mb-1.5 ${dark ? "text-slate-400" : "text-slate-500"}`}
                >
                  <Link2 size={12} /> Online Judge Link
                </span>
                {selectedCreator.ojLink && selectedCreator.ojLink !== "None" ? (
                  <a
                    href={selectedCreator.ojLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline text-sm block truncate"
                  >
                    {selectedCreator.ojLink}
                  </a>
                ) : (
                  <span
                    className={`text-sm italic ${dark ? "text-slate-600" : "text-slate-400"}`}
                  >
                    No link attached
                  </span>
                )}
              </div>

              {/* Dates */}
              <div
                className={`flex flex-wrap justify-between text-[11px] px-1 gap-1 ${muted}`}
              >
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> Applied:{" "}
                  {fmt(selectedCreator.appliedAt)}
                </span>
                <span>Updated: {fmt(selectedCreator.updatedAt)}</span>
              </div>

              {/* Quick-action buttons */}
              {selectedCreator.userId !== user?.id && (
                <div className="flex gap-2 pt-1">
                  {selectedCreator.status !== "approved" && (
                    <button
                      onClick={() =>
                        handleActionRequest(
                          selectedCreator._id,
                          "approved",
                          "Approve Application?",
                        )
                      }
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  {selectedCreator.status === "pending" && (
                    <button
                      onClick={() =>
                        handleActionRequest(
                          selectedCreator._id,
                          "rejected",
                          "Reject Application?",
                        )
                      }
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
                    >
                      Reject
                    </button>
                  )}
                  {selectedCreator.status !== "approved" && (
                    <button
                      onClick={() =>
                        handleActionRequest(
                          selectedCreator._id,
                          "delete",
                          "Delete Application?",
                        )
                      }
                      className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition-colors ${
                        dark
                          ? "border-[#2a3d47] text-slate-400 hover:bg-white/5"
                          : "border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCreator;
