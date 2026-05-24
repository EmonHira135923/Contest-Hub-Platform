"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ContestEntryModal from "@/Componets/Shared/ContestEntryModal";
import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useAuth from "@/Componets/utils/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Users,
  Trophy,
  ArrowUpRight,
  DollarSign,
  CreditCard,
} from "lucide-react";

const ContestCard = ({ contest, isDark }) => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userEmail = user?.email;
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!contest?.deadline) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const difference = +new Date(contest.deadline) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  });

  const [isClosed, setIsClosed] = useState(
    contest?.deadline ? new Date(contest.deadline) < new Date() : false,
  );

  // ⏰ লাইভ কাউন্টডাউন লজিক
  useEffect(() => {
    if (!contest?.deadline) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(contest.deadline) - +new Date();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      const difference = +new Date(contest.deadline) - +new Date();
      if (difference <= 0) {
        setIsClosed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [contest?.deadline]);

  const formatTime = (time) => String(time).padStart(2, "0");

  const formatCategory = (slug) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // 💳 Stripe পেমেন্ট গেটওয়েতে পাঠানোর হ্যান্ডলার

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

  const hasPurchased =
    paymentData?.success &&
    paymentData.result?.some((payment) => payment.paymentStatus === "paid");
  const canJoinContest = Boolean(userEmail && hasPurchased);
  const isCheckingPayment =
    authLoading || (!!userEmail && isPaymentLoading);

  const timeBoxStyle = `flex flex-col items-center justify-center w-12 h-14 rounded-xl font-bold ${
    isDark ? "bg-indigo-600/20 text-indigo-400" : "bg-indigo-600 text-white"
  }`;

  return (
    <div
      className={`group relative rounded-3xl border p-5 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between ${
        isDark
          ? "bg-[#11111a] border-white/5 hover:border-indigo-500/50"
          : "bg-white border-slate-100 hover:border-indigo-200"
      }`}
    >
      <div>
        {/* 🖼️ Contest Banner Image */}
        {contest?.image && (
          <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 relative bg-gray-700">
            <Image
              src={contest.image}
              alt={contest.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* 🕒 লাইভ কাউন্টডাউন UI */}
        {contest?.deadline && (
          <div className="mb-5 text-center">
            <p
              className={`text-xs font-semibold mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              {isClosed ? "Contest Closed" : "Contest closes in"}
            </p>
            {!isClosed && (
              <div className="flex gap-2 justify-center items-center">
                <div className={timeBoxStyle}>
                  <span className="text-lg">{formatTime(timeLeft.days)}</span>
                  <span className="text-[8px] uppercase tracking-wider opacity-80">
                    Days
                  </span>
                </div>
                <div className={timeBoxStyle}>
                  <span className="text-lg">{formatTime(timeLeft.hours)}</span>
                  <span className="text-[8px] uppercase tracking-wider opacity-80">
                    Hrs
                  </span>
                </div>
                <div className={timeBoxStyle}>
                  <span className="text-lg">
                    {formatTime(timeLeft.minutes)}
                  </span>
                  <span className="text-[8px] uppercase tracking-wider opacity-80">
                    Min
                  </span>
                </div>
                <div className={timeBoxStyle}>
                  <span className="text-lg">
                    {formatTime(timeLeft.seconds)}
                  </span>
                  <span className="text-[8px] uppercase tracking-wider opacity-80">
                    Sec
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Category Badge & Prize */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                isDark
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              {formatCategory(contest?.category)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-500 font-bold">
            <Trophy size={16} />
            <span>${contest?.prize?.toLocaleString()}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3
            className={`text-xl font-bold leading-tight group-hover:text-indigo-500 transition-colors ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            {contest?.title}
          </h3>
          <p
            className={`text-sm line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {contest?.description}
          </p>
        </div>

        {/* Stats */}
        <div
          className={`my-6 flex items-center justify-between border-y py-4 ${isDark ? "border-white/5" : "border-slate-50"}`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Users size={14} />
              Participants
            </div>
            <span
              className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-700"}`}
            >
              {contest?.participantsCount || 0} Joined
            </span>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <DollarSign size={14} />
              Entry Fee
            </div>
            <span
              className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-700"}`}
            >
              {contest?.registrationFee === 0
                ? "Free"
                : `$${contest?.registrationFee}`}
            </span>
          </div>

          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar size={14} />
              Deadline
            </div>
            <span
              className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-700"}`}
            >
              {contest?.deadline
                ? new Date(contest.deadline).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* 🔘 Action Buttons */}
      <div className="flex items-center gap-3 mt-2">
        <Link
          href={`/all-contests/${contest?._id}`}
          className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border ${
            isDark
              ? "bg-transparent border-white/10 text-white hover:bg-white/5 hover:border-white/20"
              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          View Details
          <ArrowUpRight size={14} />
        </Link>

        {isClosed ? (
          <button
            disabled
            className="flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all bg-gray-500 text-gray-300 cursor-not-allowed"
          >
            Closed
          </button>
        ) : isCheckingPayment ? (
          <button
            type="button"
            disabled
            className="flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all bg-gray-500 text-gray-300 cursor-not-allowed"
          >
            Checking...
          </button>
        ) : canJoinContest ? (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isDark
                ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-900/20"
                : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-200"
            }`}
          >
            Join Contest
            <CreditCard size={14} />
          </button>
        ) : (
          <Link
            href={`/payment/${contest?._id}`}
            className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isDark
                ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-900/20"
                : "bg-[#5b50e8] text-white hover:bg-[#4a3fd4] shadow-indigo-200"
            }`}
          >
            Join Now
            <CreditCard size={14} />
          </Link>
        )}
      </div>

      {isModalOpen && (
        <ContestEntryModal
          contest={contest}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ContestCard;
