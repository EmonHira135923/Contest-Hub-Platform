"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Users,
  ShieldCheck,
  Pencil,
  X,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import UserTableSkeleton from "@/Componets/Skeltons/UserTableSkeleton";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useUsers from "@/Componets/utils/hooks/useAlluser";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import useAuth from "@/Componets/utils/hooks/useAuth";

const roleOptions = ["user", "creator", "admin"];

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const getInitials = (name) =>
  (name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const roleBadge = (role) => {
  const map = {
    admin: "bg-violet-100 text-violet-700 dark-admin",
    creator: "bg-amber-100 text-amber-700",
    user: "bg-slate-100 text-slate-500",
  };
  return map[role] || map.user;
};

// ── Inline role badge colours for dark mode via inline style trick ──
const roleBadgeStyle = (role, isDark) => {
  if (isDark) {
    if (role === "admin")
      return { background: "rgba(139,92,246,0.18)", color: "#c4b5fd" };
    if (role === "creator")
      return { background: "rgba(251,191,36,0.15)", color: "#fcd34d" };
    return { background: "rgba(255,255,255,0.06)", color: "#94a3b8" };
  }
  if (role === "admin") return { background: "#ede9fe", color: "#6d28d9" };
  if (role === "creator") return { background: "#fef3c7", color: "#92400e" };
  return { background: "#f1f5f9", color: "#64748b" };
};

const Alluser = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleValue, setRoleValue] = useState("user");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const limit = 10;

  const { users, meta, isLoading, refetch } = useUsers(search, page, limit);

  const totalUsers = meta?.totalUsers ?? users.length;
  const currentPage = meta?.currentPage ?? page;
  const totalPages = meta?.totalPages ?? 1;
  const showingFrom = totalUsers === 0 ? 0 : (currentPage - 1) * limit + 1;
  const showingTo = Math.min(currentPage * limit, totalUsers);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const openModal = (type, u) => {
    setSelectedUser(u);
    setModalType(type);
    setRoleValue(u?.role || "user");
  };
  const closeModal = (force = false) => {
    if (isSubmitting && !force) return;
    setModalType(null);
    setSelectedUser(null);
    setRoleValue("user");
  };

  const handleRoleUpdate = async () => {
    if (!selectedUser) return;
    if (user?.email === selectedUser?.email) {
      toast.error("You cannot change your own role!");
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await axiosSecure.patch(
        `/api/auth/register/users/${selectedUser._id}`,
        { role: roleValue },
      );
      if (res.data?.success) {
        toast.success(res.data?.message || "Role updated");
        await refetch();
        closeModal(true);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to update role");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser || selectedUser.role === "admin") return;
    try {
      setIsSubmitting(true);
      const res = await axiosSecure.delete(
        `/api/auth/register/users/${selectedUser._id}`,
      );
      toast.success(res.data?.message || "User deleted");
      if (users.length === 1 && page > 1) setPage(page - 1);
      else await refetch();
      closeModal(true);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to delete");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Colours ──────────────────────────────────────────────────────────
  const bg = isDark ? "bg-[#0a0a0a]" : "bg-slate-50";
  const card = isDark
    ? "bg-[#111] border border-[#1e1e1e]"
    : "bg-white border border-slate-100 shadow-sm";
  const txt = isDark ? "text-white" : "text-slate-900";
  const muted = isDark ? "text-slate-500" : "text-slate-400";
  const inputCls = isDark
    ? "bg-[#111] border-[#1e1e1e] text-white placeholder:text-slate-600 focus:border-violet-500"
    : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-violet-400";
  const divider = isDark ? "border-[#1e1e1e]" : "border-slate-100";

  const accentIcon = isDark
    ? "bg-violet-900/40 text-violet-400"
    : "bg-gradient-to-br from-violet-600 to-pink-500 text-white";

  const details = selectedUser
    ? [
        ["User ID", selectedUser._id],
        ["Name", selectedUser.name || "N/A"],
        ["Email", selectedUser.email || "N/A"],
        ["Phone", selectedUser.phone || "N/A"],
        ["Role", selectedUser.role || "user"],
        ["Provider", selectedUser.provider || "Email"],
        ["Created", formatDate(selectedUser.createdAt)],
        ["Updated", formatDate(selectedUser.updatedAt)],
      ]
    : [];

  return (
    <div className={`p-4 sm:p-6 min-h-screen ${bg} ${txt} transition-colors`}>
      <div className="max-w-7xl mx-auto space-y-4">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">All Users</h1>
            <p className={`text-xs mt-0.5 ${muted}`}>
              Manage permissions and view all registered users
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-500" : "text-violet-400"}`}
              size={14}
            />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search name, email, role…"
              className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border outline-none transition-all ${inputCls}`}
            />
          </div>
        </div>

        {/* ── Stats — horizontal compact row ─────────────────────── */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: "Total users", value: totalUsers, Icon: Users },
            { label: "Current page", value: currentPage, Icon: ShieldCheck },
            { label: "Total pages", value: totalPages, Icon: Pencil },
          ].map(({ label, value, Icon }) => (
            <div
              key={label}
              className={`rounded-xl px-3 py-3 flex items-center gap-2.5 ${card}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${accentIcon}`}
              >
                <Icon size={15} />
              </div>
              <div className="min-w-0">
                <p
                  className={`text-[10px] font-medium uppercase tracking-wide truncate ${muted}`}
                >
                  {label}
                </p>
                <p
                  className={`text-lg font-bold leading-none mt-0.5 ${isDark ? "text-violet-400" : "text-violet-600"}`}
                >
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Table ──────────────────────────────────────────────── */}
        <div
          className={`rounded-2xl overflow-hidden border ${isDark ? "border-[#1e1e1e]" : "border-slate-100"}`}
        >
          {/* Desktop table — hidden on mobile */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr
                  className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? "bg-[#111] text-slate-500" : "bg-violet-50 text-violet-500"}`}
                >
                  <th className="px-4 py-3 text-left w-10">#</th>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left w-24">Role</th>
                  <th className="px-4 py-3 text-left w-24">Provider</th>
                  <th className="px-4 py-3 text-right w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="py-8 text-center text-sm text-slate-400">
                        Loading…
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className={`py-16 text-center text-sm ${muted}`}
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((u, i) => (
                    <tr
                      key={u._id}
                      className={`border-t transition-colors ${divider} ${isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50/60"}`}
                    >
                      <td className={`px-4 py-3 text-xs ${muted}`}>
                        {(page - 1) * limit + i + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold flex-shrink-0 relative overflow-hidden ${isDark ? "bg-violet-900/40 text-violet-300" : "bg-violet-100 text-violet-700"}`}
                          >
                            {u.image ? (
                              <Image
                                src={u.image}
                                alt={u.name || "user"}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              getInitials(u.name)
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate max-w-[180px]">
                              {u.name || "—"}
                            </p>
                            <p
                              className={`text-xs truncate max-w-[180px] ${muted}`}
                            >
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                          style={roleBadgeStyle(u.role, isDark)}
                        >
                          {(u.role || "user").toUpperCase()}
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-xs ${muted}`}>
                        {u.provider || "Email"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <ActionBtn
                            icon={Eye}
                            onClick={() => openModal("view", u)}
                            isDark={isDark}
                            color="blue"
                            title="View"
                          />
                          <ActionBtn
                            icon={Pencil}
                            onClick={() => openModal("edit", u)}
                            isDark={isDark}
                            color="violet"
                            title="Edit"
                          />
                          <ActionBtn
                            icon={Trash2}
                            onClick={() => openModal("delete", u)}
                            isDark={isDark}
                            color="red"
                            title="Delete"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile card list — shown only on mobile */}
          <div
            className="sm:hidden divide-y"
            style={{ borderColor: isDark ? "#1e1e1e" : "#f1f5f9" }}
          >
            {isLoading ? (
              <div className="py-10 text-center text-sm text-slate-400">
                Loading…
              </div>
            ) : users.length === 0 ? (
              <div className={`py-14 text-center text-sm ${muted}`}>
                No users found.
              </div>
            ) : (
              users.map((u, i) => (
                <div
                  key={u._id}
                  className={`px-4 py-3.5 ${isDark ? "bg-[#111]" : "bg-white"}`}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold flex-shrink-0 relative overflow-hidden ${isDark ? "bg-violet-900/40 text-violet-300" : "bg-violet-100 text-violet-700"}`}
                    >
                      {u.image ? (
                        <Image
                          src={u.image}
                          alt={u.name || "user"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        getInitials(u.name)
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium truncate">
                          {u.name || "—"}
                        </p>
                        <span
                          className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0"
                          style={roleBadgeStyle(u.role, isDark)}
                        >
                          {(u.role || "user").toUpperCase()}
                        </span>
                      </div>
                      <p className={`text-xs truncate mt-0.5 ${muted}`}>
                        {u.email}
                      </p>
                      <p className={`text-[10px] mt-0.5 ${muted}`}>
                        {u.provider || "Email"}
                      </p>
                    </div>

                    {/* Actions — vertical pill */}
                    <div className={`flex flex-col gap-1.5 flex-shrink-0`}>
                      <ActionBtn
                        icon={Eye}
                        onClick={() => openModal("view", u)}
                        isDark={isDark}
                        color="blue"
                        title="View"
                      />
                      <ActionBtn
                        icon={Pencil}
                        onClick={() => openModal("edit", u)}
                        isDark={isDark}
                        color="violet"
                        title="Edit"
                      />
                      <ActionBtn
                        icon={Trash2}
                        onClick={() => openModal("delete", u)}
                        isDark={isDark}
                        color="red"
                        title="Delete"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Pagination ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className={`text-xs ${muted}`}>
            Showing {showingFrom}–{showingTo} of {totalUsers} users
          </p>
          <div className="flex items-center gap-1.5">
            <PageBtn
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              isDark={isDark}
            >
              <ChevronLeft size={15} />
            </PageBtn>
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
                    key={`dot-${idx}`}
                    className={`w-8 text-center text-xs ${muted}`}
                  >
                    …
                  </span>
                ) : (
                  <PageBtn
                    key={item}
                    onClick={() => setPage(item)}
                    active={item === page}
                    isDark={isDark}
                  >
                    {item}
                  </PageBtn>
                ),
              )}
            <PageBtn
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              isDark={isDark}
            >
              <ChevronRight size={15} />
            </PageBtn>
          </div>
        </div>
      </div>

      {/* ── Modal ──────────────────────────────────────────────────── */}
      {modalType && selectedUser && (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-sm px-0 sm:px-4">
          <div
            className={`w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border overflow-hidden shadow-2xl ${isDark ? "bg-[#13131f] border-white/[0.08]" : "bg-white border-slate-100"}`}
          >
            {/* colour bar */}
            <div className="h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500" />

            {/* drag handle (mobile) */}
            <div className="flex justify-center pt-3 sm:hidden">
              <div
                className={`w-10 h-1 rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}
              />
            </div>

            <div className="p-5 sm:p-6">
              {/* Modal header */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold relative overflow-hidden flex-shrink-0 ${isDark ? "bg-violet-900/40 text-violet-300" : "bg-violet-100 text-violet-700"}`}
                  >
                    {selectedUser.image ? (
                      <Image
                        src={selectedUser.image}
                        alt={selectedUser.name || "User"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      getInitials(selectedUser.name)
                    )}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold">
                      {modalType === "view" && "User details"}
                      {modalType === "edit" && "Update role"}
                      {modalType === "delete" && "Delete user"}
                    </h2>
                    <p className={`text-xs ${muted}`}>
                      {selectedUser.name || selectedUser.email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className={`rounded-xl p-2 transition-colors ${isDark ? "text-slate-500 hover:bg-white/5" : "text-slate-400 hover:bg-slate-100"}`}
                >
                  <X size={17} />
                </button>
              </div>

              {/* View */}
              {modalType === "view" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-0.5">
                  {details.map(([label, value]) => (
                    <div
                      key={label}
                      className={`rounded-xl px-3 py-2.5 border ${isDark ? "border-white/[0.06] bg-white/[0.03]" : "border-slate-100 bg-slate-50"}`}
                    >
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-violet-400"}`}
                      >
                        {label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium break-all">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Edit */}
              {modalType === "edit" && (
                <div className="space-y-3">
                  <p className={`text-xs ${muted}`}>
                    Select a new role for{" "}
                    <strong>{selectedUser.name || selectedUser.email}</strong>
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {roleOptions.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setRoleValue(role)}
                        className={`py-2.5 rounded-xl text-sm font-semibold border transition-all capitalize ${
                          roleValue === role
                            ? "bg-violet-600 text-white border-violet-600"
                            : isDark
                              ? "border-white/10 text-slate-400 hover:bg-white/5"
                              : "border-slate-200 text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Delete */}
              {modalType === "delete" && (
                <div
                  className={`rounded-xl border px-4 py-3.5 ${
                    selectedUser.role === "admin"
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : isDark
                        ? "border-rose-500/20 bg-rose-500/10 text-rose-300"
                        : "border-rose-100 bg-rose-50 text-rose-700"
                  }`}
                >
                  <p className="text-sm font-medium">
                    {selectedUser.role === "admin"
                      ? "Admin accounts cannot be deleted."
                      : `Are you sure you want to delete ${selectedUser.name || selectedUser.email}?`}
                  </p>
                </div>
              )}

              {/* Footer buttons */}
              <div className="flex gap-2 mt-5">
                <button
                  type="button"
                  onClick={() => closeModal()}
                  disabled={isSubmitting}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors disabled:opacity-50 ${isDark ? "border-white/10 text-white/60 hover:bg-white/5" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                >
                  Cancel
                </button>
                {modalType === "edit" && (
                  <button
                    type="button"
                    onClick={handleRoleUpdate}
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? "Saving…" : "Save role"}
                  </button>
                )}
                {modalType === "delete" && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isSubmitting || selectedUser.role === "admin"}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-40 transition-colors"
                  >
                    {isSubmitting ? "Deleting…" : "Delete"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Reusable tiny icon button ─────────────────────────────────────────
const colorMap = {
  blue: {
    dark: "text-blue-400 hover:bg-blue-500/10",
    light: "text-blue-500 hover:bg-blue-50",
  },
  violet: {
    dark: "text-violet-400 hover:bg-violet-500/10",
    light: "text-violet-600 hover:bg-violet-50",
  },
  red: {
    dark: "text-rose-400 hover:bg-rose-500/10",
    light: "text-rose-500 hover:bg-rose-50",
  },
};

const ActionBtn = ({ icon: Icon, onClick, isDark, color, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    aria-label={title}
    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isDark ? colorMap[color].dark : colorMap[color].light}`}
  >
    <Icon size={14} />
  </button>
);

const PageBtn = ({ children, onClick, disabled, active, isDark }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={[
      "w-8 h-8 rounded-lg text-xs font-medium flex items-center justify-center transition-all",
      active
        ? "bg-violet-600 text-white"
        : disabled
          ? "opacity-30 cursor-not-allowed " +
            (isDark ? "text-slate-500" : "text-slate-400")
          : isDark
            ? "text-slate-400 hover:bg-white/5"
            : "text-slate-500 hover:bg-slate-100",
    ].join(" ")}
  >
    {children}
  </button>
);

export default Alluser;
