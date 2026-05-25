"use client";
import Pagination from "@/Componets/Shared/Pagination";
import useAllSubmission from "@/Componets/utils/hooks/useAllSubmission";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  TbTrophy,
  TbUsers,
  TbLink,
  TbNotes,
  TbX,
  TbExternalLink,
  TbMail,
  TbUser,
  TbCalendar,
  TbCurrencyDollar,
  TbHash,
  TbFileText,
} from "react-icons/tb";
import SubmittedContestSkeleton from "@/Componets/Skeltons/SubmittedContestSkeleton";
import SubmittedAllContestTable from "@/Componets/Cards/SubmittedAllContestTable";

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, isDark, color }) => (
  <div
    className={`rounded-xl border p-4 flex items-start gap-3 ${
      isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
    }`}
  >
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}
    >
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div className="min-w-0">
      <p
        className={`text-[10.5px] font-semibold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}
      >
        {label}
      </p>
      <p
        className={`text-lg font-bold leading-tight truncate ${isDark ? "text-slate-100" : "text-slate-900"}`}
      >
        {value}
      </p>
    </div>
  </div>
);

// ─── Detail row inside modal ──────────────────────────────────────────────────
const DetailRow = ({ icon: Icon, label, value, mono, isDark }) => (
  <div>
    <p
      className={`text-[10.5px] font-semibold uppercase tracking-widest mb-1 flex items-center gap-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </p>
    <p
      className={`text-sm font-medium break-all ${mono ? "font-mono" : ""} ${isDark ? "text-slate-200" : "text-slate-800"}`}
    >
      {value || "—"}
    </p>
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────
const SubmittedAllContestPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [declaringId, setDeclaringId] = useState(null);
  const limit = 10;

  // আপনার কাস্টম হুক থেকে রি-ফেচ করার জন্য refetch বা mutate বের করে নিন (যদি আপনার হুকে থাকে)
  const { data, isLoading, refetch } = useAllSubmission(page, limit);

  // ── Declare winner handler ──────────────────────────────────────────────────
  const handleDeclareWinner = async (contest) => {
    setDeclaringId(contest._id);
    try {
      // ব্যাকএন্ডে PUT রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await axiosSecure.put(
        "/api/allcontest/contest-submit/winner-declare",
        {
          contestId: contest.contestId, // কনটেস্টের মেইন আইডি
          winnerEmail: contest.customer_email, // উইনারের ইমেইল
        },
      );

      if (response.data.success) {
        toast.success(
          `🏆 Winner declared: ${contest.customerName} for ${contest.contestTitle}`,
        );

        // টেবিলের ডাটা লাইভ আপডেট করার জন্য তানস্ট্যাক কুয়েরি/SWR রি-ফেচ করুন
        if (refetch) refetch();

        // মোডালটি বন্ধ করে দেওয়া হচ্ছে
        if (selectedSubmission?._id === contest._id) {
          setSelectedSubmission(null);
        }
      }
    } catch (err) {
      // ব্যাকএন্ড থেকে পাঠানো কাস্টম মেসেজ বা ডিফল্ট মেসেজ অ্যালার্ট দেওয়া
      const errMsg =
        err.response?.data?.message ||
        "Failed to declare winner. Please try again.";
      toast.error(errMsg);
    } finally {
      setDeclaringId(null);
    }
  };

  if (isLoading) return <SubmittedContestSkeleton />;

  const submissions = data?.data || [];
  const totalPages = data?.totalPages || 1;

  // ── Derived stats ──
  const uniqueContests = new Set(submissions.map((s) => s.contestTitle)).size;
  const uniqueParticipants = new Set(submissions.map((s) => s.customer_email))
    .size;
  const withNotes = submissions.filter((s) => s.submissionNotes).length;

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* ── Page header ── */}
        <div>
          <h1
            className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Submitted All Contests
          </h1>
          <p
            className={`text-sm mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            Manage submission links, check notes, and declare official contest
            winners.
          </p>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            label="Total submissions"
            value={data?.total ?? submissions.length}
            icon={TbFileText}
            isDark={isDark}
            color="bg-blue-500"
          />
          <StatCard
            label="Unique contests"
            value={uniqueContests}
            icon={TbTrophy}
            isDark={isDark}
            color="bg-violet-500"
          />
          <StatCard
            label="Participants"
            value={uniqueParticipants}
            icon={TbUsers}
            isDark={isDark}
            color="bg-emerald-500"
          />
          <StatCard
            label="With notes"
            value={withNotes}
            icon={TbNotes}
            isDark={isDark}
            color="bg-amber-500"
          />
        </div>

        {/* ── Table card ── */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          {submissions.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-slate-800" : "bg-slate-100"}`}
              >
                <TbTrophy
                  className={`w-7 h-7 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                />
              </div>
              <p
                className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                No submissions found yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <SubmittedAllContestTable
                isDark={isDark}
                submissions={submissions}
                page={page}
                limit={limit}
                declaringId={declaringId}
                setSelectedSubmission={setSelectedSubmission}
                handleDeclareWinner={handleDeclareWinner}
              />
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        )}
      </div>

      {/* ── Details modal ── */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div
            className={`w-full max-w-2xl rounded-2xl border shadow-2xl ${
              isDark
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            {/* Modal header */}
            <div
              className={`flex items-start justify-between px-6 py-5 border-b ${isDark ? "border-slate-800" : "border-slate-100"}`}
            >
              <div className="space-y-1">
                <span
                  className={`inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-lg ${isDark ? "bg-blue-950/50 text-blue-400 border border-blue-900" : "bg-blue-50 text-blue-600 border border-blue-200"}`}
                >
                  <TbHash className="w-3 h-3" />
                  {selectedSubmission.trackingId}
                </span>
                <h3
                  className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  {selectedSubmission.contestTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className={`p-1.5 rounded-lg transition-colors ${isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
              >
                <TbX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <DetailRow
                  icon={TbUser}
                  label="Participant Name"
                  value={selectedSubmission.customerName}
                  isDark={isDark}
                />
                <DetailRow
                  icon={TbMail}
                  label="Participant Email"
                  value={selectedSubmission.customer_email}
                  mono
                  isDark={isDark}
                />
                <DetailRow
                  icon={TbCalendar}
                  label="Submitted At"
                  value={new Date(
                    selectedSubmission.submittedAt,
                  ).toLocaleString()}
                  isDark={isDark}
                />
                <div>
                  <p
                    className={`text-[10.5px] font-semibold uppercase tracking-widest mb-1 flex items-center gap-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  >
                    <TbCurrencyDollar className="w-3.5 h-3.5" />
                    Payment Status
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${isDark ? "bg-emerald-900/40 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}
                  >
                    {selectedSubmission.paymentStatus} —{" "}
                    {selectedSubmission.amount}{" "}
                    {selectedSubmission.currency?.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Submission link */}
              <div
                className={`pt-4 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}
              >
                <p
                  className={`text-[10.5px] font-semibold uppercase tracking-widest mb-1.5 flex items-center gap-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                >
                  <TbLink className="w-3.5 h-3.5" />
                  Project Link
                </p>
                <a
                  href={selectedSubmission.submissionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 font-mono text-sm break-all ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
                >
                  <TbExternalLink className="w-4 h-4 flex-shrink-0" />
                  {selectedSubmission.submissionLink}
                </a>
              </div>

              {/* Notes */}
              <div
                className={`pt-4 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}
              >
                <p
                  className={`text-[10.5px] font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                >
                  <TbNotes className="w-3.5 h-3.5" />
                  Submission Notes
                </p>
                <div
                  className={`rounded-xl px-4 py-3 border text-xs font-mono leading-relaxed whitespace-pre-line ${isDark ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                >
                  {selectedSubmission.submissionNotes ||
                    "No notes submitted by the user."}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div
              className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}
            >
              <button
                onClick={() => setSelectedSubmission(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${isDark ? "border border-slate-700 text-slate-300 hover:bg-slate-800" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}
              >
                Close
              </button>

              {/* মোডাল উইনার বাটন লজিক */}
              {selectedSubmission.isWinner ||
              selectedSubmission.contestStatus === "completed" ? (
                <span className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-white">
                  🏆 Already Winner
                </span>
              ) : new Date() < new Date(selectedSubmission.deadline) ? (
                <button
                  disabled
                  className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-not-allowed ${isDark ? "bg-slate-800 text-slate-500" : "bg-slate-200 text-slate-400"}`}
                >
                  Contest is Running
                </button>
              ) : (
                <button
                  onClick={() => handleDeclareWinner(selectedSubmission)}
                  disabled={declaringId === selectedSubmission._id}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    declaringId === selectedSubmission._id
                      ? "bg-amber-300 text-amber-900 cursor-not-allowed"
                      : "bg-amber-500 hover:bg-amber-600 text-white"
                  }`}
                >
                  {declaringId === selectedSubmission._id
                    ? "Declaring…"
                    : "Declare Winner"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmittedAllContestPage;
