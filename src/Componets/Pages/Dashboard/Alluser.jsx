"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Search, Users, ShieldCheck, Pencil, X } from "lucide-react";
import { toast } from "react-toastify";
import UserTable from "@/Componets/Cards/UserTable";
import Pagination from "@/Componets/Shared/Pagination";
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
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Alluser = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleValue, setRoleValue] = useState("user");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const limit = 10;
  const {user} = useAuth();

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

  const openModal = (type, user) => {
    setSelectedUser(user);
    setModalType(type);
    setRoleValue(user?.role || "user");
  };

  const closeModal = (force = false) => {
    if (isSubmitting && !force) return;
    setModalType(null);
    setSelectedUser(null);
    setRoleValue("user");
  };

  const handleRoleUpdate = async () => {
    if (!selectedUser) return;

    // ১. অ্যাডমিন যাতে নিজের রোল পরিবর্তন করতে না পারে সেই চেক
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
        toast.success(res.data?.message || "User role updated successfully");
        await refetch();
        closeModal(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update user role",
      );
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
      if (users.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        await refetch();
      }
      closeModal(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { label: "Total users", value: totalUsers, Icon: Users },
    { label: "Current page", value: currentPage, Icon: ShieldCheck },
    { label: "Total pages", value: totalPages, Icon: Pencil },
  ];

  const details = selectedUser
    ? [
        ["User ID", selectedUser._id],
        ["Name", selectedUser.name || "N/A"],
        ["Email", selectedUser.email || "N/A"],
        ["Phone", selectedUser.phone || "N/A"],
        ["Role", selectedUser.role || "user"],
        ["Provider", selectedUser.provider || "Email"],
        ["Image", selectedUser.image || "N/A"],
        ["Created", formatDate(selectedUser.createdAt)],
        ["Updated", formatDate(selectedUser.updatedAt)],
      ]
    : [];

  return (
    <div
      className={`p-6 min-h-screen transition-colors ${
        isDark
          ? "bg-[#0a0a0a] text-white"
          : "bg-gradient-to-br from-slate-50 via-fuchsia-50/40 to-violet-50/40 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight">All Users</h1>
            <p
              className={`text-sm mt-0.5 ${
                isDark ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Manage permissions and view all registered users
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark ? "text-slate-500" : "text-fuchsia-400"
              }`}
              size={15}
            />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search name, email, role..."
              className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border outline-none transition-all ${
                isDark
                  ? "bg-[#111] border-[#1e1e1e] text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#C6EB71]/30 focus:border-[#C6EB71]"
                  : "bg-white border-fuchsia-100 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-400"
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {stats.map(({ label, value, Icon }) => (
            <div
              key={label}
              className={`rounded-xl px-4 py-3.5 flex items-center gap-3 ${
                isDark
                  ? "bg-[#111] border border-[#1e1e1e]"
                  : "bg-white/90 border border-fuchsia-100 shadow-sm shadow-fuchsia-100/60"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isDark
                    ? "bg-[#002B36]"
                    : "bg-gradient-to-br from-violet-600 to-pink-500"
                }`}
              >
                <Icon
                  size={16}
                  className={isDark ? "text-[#C6EB71]" : "text-white"}
                />
              </div>
              <div>
                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {label}
                </p>
                <p
                  className={`text-xl font-bold ${
                    isDark
                      ? "text-[#C6EB71]"
                      : "bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-transparent"
                  }`}
                >
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`rounded-2xl overflow-hidden border ${
            isDark ? "border-[#1e1e1e]" : "border-fuchsia-100 bg-white/80"
          }`}
        >
          <table className="w-full border-collapse table-fixed">
            <colgroup>
              <col className="w-12" />
              <col className="w-[38%]" />
              <col className="w-[18%]" />
              <col className="w-[18%]" />
              <col className="w-[22%]" />
            </colgroup>
            <thead>
              <tr
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  isDark
                    ? "bg-[#111] text-slate-600"
                    : "bg-gradient-to-r from-violet-50 to-pink-50 text-fuchsia-500"
                }`}
              >
                <th className="px-4 py-3.5 text-left">#</th>
                <th className="px-4 py-3.5 text-left">User details</th>
                <th className="px-4 py-3.5 text-left">Role</th>
                <th className="px-4 py-3.5 text-left">Provider</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            {isLoading ? (
              <UserTableSkeleton isDark={isDark} />
            ) : users.length > 0 ? (
              <UserTable
                users={users}
                page={page}
                limit={limit}
                isDark={isDark}
                onView={(user) => openModal("view", user)}
                onEdit={(user) => openModal("edit", user)}
                onDelete={(user) => openModal("delete", user)}
              />
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    className={`px-4 py-20 text-center text-sm ${
                      isDark ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    No users found.
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className={`text-xs ${
              isDark ? "text-slate-600" : "text-slate-500"
            }`}
          >
            Showing {showingFrom}-{showingTo} of {totalUsers} users
          </p>
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            isDark={isDark}
          />
        </div>
      </div>

      {modalType && selectedUser && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
          <div
            className={`w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl ${
              isDark
                ? "bg-[#13131f] border-white/[0.08]"
                : "bg-white border-fuchsia-100"
            }`}
          >
            <div
              className={`h-1 ${
                isDark
                  ? "bg-gradient-to-r from-[#C6EB71] to-cyan-400"
                  : "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500"
              }`}
            />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl text-sm font-black ${
                      isDark
                        ? "bg-[#C6EB71]/15 text-[#C6EB71]"
                        : "bg-gradient-to-br from-violet-100 to-pink-100 text-fuchsia-700"
                    }`}
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
                    <h2 className="text-lg font-black tracking-tight">
                      {modalType === "view" && "User details"}
                      {modalType === "edit" && "Update user role"}
                      {modalType === "delete" && "Delete user"}
                    </h2>
                    <p
                      className={`text-sm ${
                        isDark ? "text-slate-500" : "text-slate-500"
                      }`}
                    >
                      {selectedUser.name || selectedUser.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => closeModal()}
                  className={`rounded-xl p-2 transition-colors ${
                    isDark
                      ? "text-slate-500 hover:bg-white/5 hover:text-white"
                      : "text-slate-400 hover:bg-fuchsia-50 hover:text-fuchsia-600"
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              {modalType === "view" && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.map(([label, value]) => (
                    <div
                      key={label}
                      className={`rounded-xl border px-4 py-3 ${
                        isDark
                          ? "border-white/[0.06] bg-white/[0.03]"
                          : "border-fuchsia-100 bg-fuchsia-50/35"
                      }`}
                    >
                      <p
                        className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
                          isDark ? "text-slate-500" : "text-fuchsia-400"
                        }`}
                      >
                        {label}
                      </p>
                      <p className="mt-1 break-words text-sm font-semibold">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {modalType === "edit" && (
                <div className="mt-6 space-y-4">
                  <label
                    className={`block text-[10px] font-bold uppercase tracking-[0.16em] ${
                      isDark ? "text-slate-500" : "text-fuchsia-400"
                    }`}
                  >
                    Role
                  </label>
                  <select
                    value={roleValue}
                    onChange={(e) => setRoleValue(e.target.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm font-bold outline-none transition-colors ${
                      isDark
                        ? "bg-[#111] border-[#1e1e1e] text-white focus:border-[#C6EB71]"
                        : "bg-white border-fuchsia-100 text-slate-900 focus:border-fuchsia-400"
                    }`}
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {modalType === "delete" && (
                <div
                  className={`mt-6 rounded-xl border px-4 py-4 ${
                    selectedUser.role === "admin"
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : isDark
                        ? "border-rose-500/20 bg-rose-500/10 text-rose-300"
                        : "border-rose-100 bg-rose-50 text-rose-700"
                  }`}
                >
                  <p className="text-sm font-semibold">
                    {selectedUser.role === "admin"
                      ? "Admin accounts cannot be deleted."
                      : `Are you sure you want to delete ${selectedUser.name || selectedUser.email}?`}
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => closeModal()}
                  disabled={isSubmitting}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors disabled:opacity-50 ${
                    isDark
                      ? "border-white/[0.08] bg-white/[0.04] text-white/60 hover:bg-white/[0.08]"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Cancel
                </button>

                {modalType === "edit" && (
                  <button
                    type="button"
                    onClick={handleRoleUpdate}
                    disabled={isSubmitting}
                    className={`rounded-xl px-5 py-2.5 text-sm font-black text-white transition-opacity disabled:opacity-50 ${
                      isDark
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600"
                        : "bg-gradient-to-r from-violet-600 to-pink-500"
                    }`}
                  >
                    {isSubmitting ? "Saving..." : "Save role"}
                  </button>
                )}

                {modalType === "delete" && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isSubmitting || selectedUser.role === "admin"}
                    className="rounded-xl bg-gradient-to-r from-rose-600 to-red-500 px-5 py-2.5 text-sm font-black text-white transition-opacity disabled:opacity-40"
                  >
                    {isSubmitting ? "Deleting..." : "Delete user"}
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

export default Alluser;
