"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import {
  Calendar,
  Users,
  Trophy,
  DollarSign,
  ArrowLeft,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// 📝 বড় টেক্সট হ্যান্ডেল করার জন্য কাস্টম কম্পোনেন্ট
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

  // ডেডলাইন চেক
  const isClosed = contest?.deadline
    ? new Date(contest.deadline) < new Date()
    : false;
  const hasPaid = contest?.payment === "paid";

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-300 ${isDark ? "bg-[#05050a] text-white" : "bg-slate-50 text-slate-900"}`}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* 🔙 Back Button */}
        <Link
          href="/all-contests"
          className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          <ArrowLeft size={16} /> Back to all contests
        </Link>

        {/* 🖼️ Hero Banner & Main Info */}
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
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
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

              {/* 💰 Prize Tag */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500/10 text-amber-500 font-black text-xl border border-amber-500/20">
                  <Trophy size={24} />
                  <span>$ {contest?.prize?.toLocaleString()}</span>
                </div>
                {hasPaid && (
                  <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 px-4 py-2 text-sm font-semibold">
                    Contest Paid
                  </span>
                )}
              </div>
            </div>

            {/* 📊 Core Stats Grid */}
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

        {/* 📚 Detailed Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-8">
            <div
              className={`p-6 md:p-8 rounded-3xl border shadow-sm ${isDark ? "bg-[#11111a] border-white/5" : "bg-white border-slate-100"}`}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                About The Contest
              </h2>
              <ExpandableText text={contest?.description} isDark={isDark} />
            </div>

            <div
              className={`p-6 md:p-8 rounded-3xl border shadow-sm ${isDark ? "bg-[#11111a] border-white/5" : "bg-white border-slate-100"}`}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                Execution Phases & Instructions
              </h2>
              <ExpandableText text={contest?.instruction} isDark={isDark} />
            </div>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="sticky top-6 space-y-6">
            <div
              className={`p-6 rounded-3xl border text-center space-y-4 shadow-md ${isDark ? "bg-[#11111a] border-white/5" : "bg-white border-slate-100"}`}
            >
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

              <button
                type="button"
                disabled={isClosed || hasPaid}
                className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  hasPaid
                    ? "bg-emerald-500/10 text-emerald-200 cursor-not-allowed"
                    : isClosed
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/20 hover:scale-[1.02]"
                }`}
              >
                <CreditCard size={18} />
                {hasPaid ? "Already Paid" : isClosed ? "Registration Closed" : "Pay & Join Now"}
              </button>

              <p className="text-[11px] text-slate-500 leading-normal">
                {isClosed
                  ? "This competition has reached its submission deadline."
                  : "Secured transactions. Slots are allocated dynamically upon registration."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailspage;
