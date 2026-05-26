"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useAuth from "@/Componets/utils/hooks/useAuth";
import ContestEntryModal from "@/Componets/Shared/ContestEntryModal";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Users,
  Trophy,
  DollarSign,
  ArrowLeft,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Terminal,
  FileText,
} from "lucide-react";
import { MdTaskAlt, MdOutlineLeaderboard } from "react-icons/md";

// 📝 কোডফোর্সেস/হ্যাকারর‍্যাংক স্টাইলে ক্লিন টেক্সট এবং ইনস্ট্রাকশন রেন্ডারার কম্পোনেন্ট
const DynamicInstructionRenderer = ({ text, isDark }) => {
  if (!text)
    return <p className="text-sm opacity-60">No instructions provided.</p>;

  // যদি টেক্সটে \n বা \n১. বা প্লেইন টেক্সট ব্রেক থাকে, সেগুলোকে স্প্লিট করে ক্লিন অ্যারে তৈরি করা
  const paragraphs = text
    .split(/\\n\d*\.?|\\n|\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <div className="space-y-4">
      {paragraphs.map((para, index) => {
        // প্রথম লাইনটিকে একটু হাইলাইট করা বা নরমাল বয়লারপ্লেট ক্লিনিং
        const cleanPara = para.replace(/^\d+\.\s*/, ""); // যদি শুরুর দিকে কোনো সংখ্যা থাকে তা রিমুভ করা
        return (
          <div key={index} className="flex gap-3 items-start group">
            <div
              className={`mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold ${
                isDark
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              {index + 1}
            </div>
            <p
              className={`text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              {cleanPara}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const ExpandableText = ({ text, isDark }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return <p className="text-sm opacity-60">Not available.</p>;

  const shouldTruncate = text.length > 300;
  const displayText = isExpanded ? text : `${text.slice(0, 300)}...`;

  return (
    <div className="space-y-3">
      <p
        className={`text-base leading-relaxed whitespace-pre-line ${isDark ? "text-slate-300" : "text-slate-700"}`}
      >
        {shouldTruncate ? displayText : text}
      </p>
      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-sm font-bold text-indigo-500 hover:text-indigo-400 transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp size={16} />
            </>
          ) : (
            <>
              Show More <ChevronDown size={16} />
            </>
          )}
        </button>
      )}
    </div>
  );
};

const Detailspage = ({ contest }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();
  const userEmail = user?.email;

  const isClosed = contest?.deadline
    ? new Date(contest.deadline) < new Date()
    : false;

  // 💳 পেমেন্ট ডাটা কুয়েরি
  const { data: paymentData, isLoading: isPaymentLoading } = useQuery({
    queryKey: ["contest-payment", contest?._id, userEmail],
    enabled: !!contest?._id && !!userEmail && !authLoading,
    retry: false,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/payment-success?contestId=${contest._id}`,
      );
      return res.data;
    },
  });

  // 🎯 পেমেন্ট অ্যারে থেকে শুধুমাত্র নির্দিষ্ট লগইন থাকা ইউজারের ডাটা খুঁজে বের করা
  const userPaymentInfo = paymentData?.success
    ? paymentData.result?.find(
        (payment) =>
          payment.paymentStatus === "paid" &&
          payment.customer_email === userEmail,
      )
    : null;

  // 🔒 ইউজারের পার্সোনাল পেমেন্ট ও সাবমিশন ডাটা এক্সট্র্যাক্ট করা
  const hasPurchased = Boolean(userPaymentInfo);
  const isCheckingPayment = authLoading || (!!userEmail && isPaymentLoading);

  // 🚀 ডাটাবেজের পেমেন্ট ডাটা থেকে ইউজারের নিজস্ব স্ট্যাটাস
  const isUserSubmitted =
    userPaymentInfo?.contestSubmissionStatus === "submitted";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 🏆 গ্লোবাল উইনার কন্ডিশন (প্যারেন্ট অবজেক্ট বা ইউজারের অবজেক্টে ট্রু থাকলে বাটন আনলক হবে)
  const isWinnerDeclared =
    contest?.winnerDeclareStatus === "completed" ||
    contest?.isWinnerDeclared ||
    userPaymentInfo?.isWinner === true;

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-300 ${isDark ? "bg-[#05050a] text-white" : "bg-slate-50 text-slate-900"}`}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/all-contests"
          className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          <ArrowLeft size={16} /> Back to all contests
        </Link>

        {/* 📋 মেইন কন্টেস্ট ব্যানার ও মেটা ড্যাশবোর্ড */}
        <div
          className={`rounded-3xl border overflow-hidden shadow-xl ${isDark ? "bg-[#11111a] border-white/5" : "bg-white border-slate-100"}`}
        >
          {contest?.image && (
            <div className="w-full h-64 md:h-96 relative bg-gray-700">
              <Image
                src={contest.image}
                alt={contest.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute bottom-6 left-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white">
                {contest?.category?.replace("-", " ")}
              </span>
            </div>
          )}

          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight">
                  {contest?.title || "Contest Details"}
                </h1>
                <p
                  className={`text-sm mt-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Created by:{" "}
                  <span className="text-indigo-400 font-medium">
                    {contest?.creatorEmail}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500/10 text-amber-500 font-black text-xl border border-amber-500/20">
                  <Trophy size={24} />
                  <span>$ {contest?.prize?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div
              className={`grid grid-cols-2 md:grid-cols-3 gap-4 border-t pt-6 ${isDark ? "border-white/5" : "border-slate-100"}`}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Participants</p>
                  <p className="font-bold text-sm md:text-base">
                    {contest?.participantsCount || 0} Joined
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Entry Fee</p>
                  <p className="font-bold text-sm md:text-base">
                    {contest?.registrationFee === 0
                      ? "Free"
                      : `$${contest?.registrationFee}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 md:col-span-1">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">
                    Registration Deadline
                  </p>
                  <p className="font-bold text-sm md:text-base">
                    {contest?.deadline
                      ? new Date(contest.deadline).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 💻 মিডল সেকশন: ডেসক্রিপশন এবং হ্যাকারর‍্যাংক স্টাইল ইনস্ট্রাকশন রেন্ডারার */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-8">
            <div
              className={`p-6 md:p-8 rounded-3xl border shadow-sm ${isDark ? "bg-[#11111a] border-white/5" : "bg-white border-slate-100"}`}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-indigo-500" />
                About The Contest
              </h2>
              <ExpandableText text={contest?.description} isDark={isDark} />
            </div>

            <div
              className={`p-6 md:p-8 rounded-3xl border shadow-sm ${isDark ? "bg-[#11111a] border-white/5" : "bg-white border-slate-100"}`}
            >
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <Terminal size={20} className="text-indigo-500" />
                Execution Phases & Instructions
              </h2>
              {/* 🛠️ এখানে ডাইনামিক ফিল্টারিং টাস্ক কল করা হয়েছে */}
              <DynamicInstructionRenderer
                text={contest?.instruction}
                isDark={isDark}
              />
            </div>
          </div>

          {/* ⚡ ডানদিকের স্টিকি অ্যাকশন উইজেট */}
          <div className="sticky top-6 space-y-6">
            <div
              className={`p-6 rounded-3xl border text-center space-y-4 shadow-md ${isDark ? "bg-[#11111a] border-white/5" : "bg-white border-slate-100"}`}
            >
              {!hasPurchased && !isUserSubmitted && !isWinnerDeclared && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                    Registration Cost
                  </p>
                  <p className="text-4xl font-black text-indigo-500 mt-1">
                    {contest?.registrationFee === 0
                      ? "Free"
                      : `$${contest?.registrationFee}`}
                  </p>
                </div>
              )}

              {/* 🔘 কন্ডিশনাল অ্যাকশন বাটন সেকশন (ডাটাবেজ সিঙ্কড) */}
              {isWinnerDeclared ? (
                /* ১. রেজাল্ট ডিক্লেয়ার হয়ে গেলে সরাসরি লিডারবোর্ড বাটন (টপ প্রায়োরিটি) */
                <Link
                  href={`/leaderboard`}
                  className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                    isDark
                      ? "bg-amber-600 text-white hover:bg-amber-500"
                      : "bg-amber-500 text-white hover:bg-amber-400"
                  } hover:scale-[1.02]`}
                >
                  <MdOutlineLeaderboard size={18} />
                  See Your Result
                </Link>
              ) : isCheckingPayment ? (
                /* ২. পেমেন্ট লোডিং স্ট্যাটাস */
                <button
                  type="button"
                  disabled
                  className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md bg-gray-500 text-gray-300 cursor-not-allowed"
                >
                  <CreditCard size={18} />
                  Checking status...
                </button>
              ) : isUserSubmitted ? (
                /* ৩. ইউজার সাবমিট করে দেওয়ার পর ইভালুয়েশন বাটন */
                <button
                  type="button"
                  disabled
                  className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed transition-all shadow-md border ${
                    isDark
                      ? "bg-blue-600/20 border-blue-500/40 text-blue-400"
                      : "bg-blue-50 border border-blue-200 text-blue-500"
                  }`}
                >
                  Result Pending
                </button>
              ) : hasPurchased ? (
                /* ৪. পেমেন্ট ভেরিফাইড এবং সাবমিশন উইন্ডো ওপেন থাকলে */
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                    isClosed
                      ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                      : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20 hover:scale-[1.02]"
                  }`}
                  disabled={isClosed}
                >
                  <MdTaskAlt size={18} />
                  {isClosed ? "Registration Closed" : "Submit Contest"}
                </button>
              ) : (
                /* ৫. গেটওয়ে পেমেন্ট লিংক */
                <Link
                  href={`/payment/${contest?._id}`}
                  className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                    isClosed
                      ? "pointer-events-none bg-gray-500 text-gray-300 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/20 hover:scale-[1.02]"
                  }`}
                >
                  <CreditCard size={18} />
                  {isClosed ? "Registration Closed" : "Pay & Join Now"}
                </Link>
              )}

              <p className="text-[11px] text-slate-500 leading-normal">
                {isWinnerDeclared
                  ? "The official results for this contest have been declared. Check the leaderboard above."
                  : isUserSubmitted
                    ? "Your assignment is under evaluation. Once the creator selects a winner, results will be live."
                    : isClosed
                      ? "This competition has reached its submission deadline."
                      : "Secured transactions. Slots are allocated dynamically upon registration."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ContestEntryModal
          contest={contest}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userEmail={userEmail}
        />
      )}
    </div>
  );
};

export default Detailspage;
