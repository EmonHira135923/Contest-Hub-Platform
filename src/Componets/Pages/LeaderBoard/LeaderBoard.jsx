"use client";

import React, { useState } from "react";
import useAuth from "@/Componets/utils/hooks/useAuth";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { Eye, X, Trophy } from "lucide-react";
import Image from "next/image";
import useLeaderboard from "@/Componets/utils/hooks/useLeaderboard";

const LeaderBoard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // মডাল স্টেটস
  const [selectedContest, setSelectedContest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ডেটা ফেচিং
  const { data: leaderboardData, isPending } = useLeaderboard(1, 50);
  const allUsers = leaderboardData?.result || [];

  // console.log("users",allUsers);

  // ১, ২ এবং ৩ নম্বর পজিশনের বিজয়ী আলাদা করা হচ্ছে
  const firstPlace = allUsers[0];
  const secondPlace = allUsers[1];
  const thirdPlace = allUsers[2];

  // ৪ নম্বর থেকে বাকি প্রতিযোগীদের তালিকা
  const remainingUsers = allUsers.slice(3);

  // ইউজারের নিজস্ব পজিশন বের করার লজিক
  const currentUserIndex = allUsers.findIndex(
    (u) => u.customer_email === user?.email,
  );
  const currentUserData =
    currentUserIndex !== -1 ? allUsers[currentUserIndex] : null;

  // থিম ভিত্তিক প্রিমিয়াম স্টাইল
  const containerBg = isDark
    ? "bg-gradient-to-br from-[#0d0e12] via-[#13151a] to-[#090a0f] text-gray-100"
    : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800";

  const cardStyle = isDark
    ? "bg-[#181a21]/70 backdrop-blur-md border border-gray-800/60 shadow-2xl"
    : "bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl";

  const openDetailsModal = (userContestData) => {
    setSelectedContest(userContestData);
    setIsModalOpen(true);
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cyan-400">
        Loading Leaderboard...
      </div>
    );
  }

  return (
    <div
      className={`${containerBg} min-h-screen p-4 md:p-8 transition-colors duration-300 pb-20`}
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className={`text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-10 ${isDark ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500" : "text-gray-900"}`}
        >
          🏆 Global Leaderboard
        </h1>

        {/* ================= TOP 3 PODIUM SECTION ================= */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 mb-12 mt-16">
          {/* 2nd Place */}
          {secondPlace && (
            <div className="flex flex-col items-center order-2 md:order-1 mt-6">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full border-4 border-pink-500 p-1 bg-gray-900 overflow-hidden shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                  <Image
                    height={50}
                    width={50}
                    src={
                      secondPlace.customerImage ||
                      "https://i.ibb.co/31N708D/avatar.png"
                    }
                    alt="2nd Place"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-gray-900">
                  2
                </span>
              </div>
              <p className="mt-4 font-bold text-sm tracking-wide">
                {secondPlace.customerName}
              </p>
              <div className="w-28 h-24 mt-2 bg-gradient-to-b from-pink-600/20 to-transparent border-t-4 border-pink-500 rounded-t-xl flex flex-col items-center justify-center backdrop-blur-sm">
                <span className="text-xs text-gray-400">Won Prize</span>
                <span className="text-sm font-bold text-pink-400">
                  ${secondPlace.contestPrize || secondPlace.amount}
                </span>
              </div>
            </div>
          )}

          {/* 1st Place - Champion */}
          {firstPlace && (
            <div className="flex flex-col items-center order-1 md:order-2 scale-110 md:-mt-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-cyan-400 p-1 bg-gray-900 overflow-hidden shadow-[0_0_25px_rgba(34,211,238,0.6)]">
                  <Image
                    height={50}
                    width={50}
                    src={
                      firstPlace.customerImage ||
                      "https://i.ibb.co/31N708D/avatar.png"
                    }
                    alt="1st Place"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-gray-900 shadow-md animate-bounce">
                  1
                </span>
              </div>
              <p className="mt-4 font-extrabold text-base tracking-wide text-cyan-400">
                {firstPlace.customerName}
              </p>
              <p className="text-[10px] font-semibold uppercase text-emerald-400 tracking-widest -mt-1">
                Champion
              </p>
              <div className="w-32 h-32 mt-2 bg-gradient-to-b from-cyan-500/30 to-transparent border-t-4 border-cyan-400 rounded-t-xl flex flex-col items-center justify-center backdrop-blur-md shadow-[0_-5px_20px_rgba(34,211,238,0.1)]">
                <span className="text-xs text-cyan-200/70">Grand Prize</span>
                <span className="text-base font-extrabold text-cyan-300">
                  ${firstPlace.contestPrize || firstPlace.amount}
                </span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {thirdPlace && (
            <div className="flex flex-col items-center order-3 mt-10">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-amber-500 p-1 bg-gray-900 overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                  <Image
                    height={50}
                    width={50}
                    src={
                      thirdPlace.customerImage ||
                      "https://i.ibb.co/31N708D/avatar.png"
                    }
                    alt="3rd"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-gray-900">
                  3
                </span>
              </div>
              <p className="mt-4 font-bold text-sm tracking-wide">
                {thirdPlace.customerName}
              </p>
              <div className="w-28 h-20 mt-2 bg-gradient-to-b from-amber-600/20 to-transparent border-t-4 border-amber-500 rounded-t-xl flex flex-col items-center justify-center backdrop-blur-sm">
                <span className="text-xs text-gray-400">Won Prize</span>
                <span className="text-sm font-bold text-amber-400">
                  ${thirdPlace.contestPrize || thirdPlace.amount}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ================= CURRENT USER POSITION PANEL ================= */}
        {currentUserData && (
          <div
            className={`mb-8 p-5 rounded-2xl border ${isDark ? "bg-gradient-to-r from-purple-900/40 via-[#181a21]/80 to-[#181a21] border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.15)]" : "bg-purple-50 border-purple-200 shadow-lg"} transform transition-all duration-300 hover:scale-[1.01]`}
          >
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">
              Your Position
            </p>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${isDark ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" : "bg-purple-200 text-purple-800"}`}
                >
                  #{currentUserIndex + 1}
                </div>
                {/* ইউজারের নিজস্ব প্রফেশনাল ইমেজ */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 border border-purple-500/30">
                  <Image
                    height={50}
                    width={50}
                    src={
                      currentUserData.customerImage ||
                      "https://i.ibb.co/31N708D/avatar.png"
                    }
                    alt="You"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-wide">
                    {currentUserData.customerName}
                  </h3>
                  <p
                    className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {currentUserData.customer_email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => openDetailsModal(currentUserData)}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${isDark ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20" : "bg-purple-700 hover:bg-purple-800 text-white"}`}
              >
                <Eye size={14} /> View Details
              </button>
            </div>
          </div>
        )}

        {/* ================= RANK 4 TO REST LIST SECTION ================= */}
        <div className={`${cardStyle} rounded-2xl overflow-hidden shadow-xl`}>
          <div
            className={`p-4 border-b ${isDark ? "border-gray-800/60 bg-[#1f222b]/50" : "bg-gray-100 border-gray-200"} text-xs font-bold uppercase tracking-wider text-gray-400`}
          >
            Contestants Rankings
          </div>
          <div className="divide-y divide-gray-800/30 max-h-[500px] overflow-y-auto">
            {remainingUsers.length > 0 ? (
              remainingUsers.map((item, index) => {
                const currentRank = index + 4; // ৪ নম্বর থেকে সিরিয়াল শুরু
                return (
                  <div
                    key={item._id}
                    className={`flex items-center justify-between p-4 transition-colors duration-200 ${isDark ? "hover:bg-[#20242f]/30" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-8 font-bold text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
                      >
                        #{currentRank}
                      </span>
                      {/* ৪+ সিরিয়ালের ইউজারদের প্রোফাইল ইমেজ */}
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-800 border border-gray-700/50">
                        <Image
                          height={50}
                          width={50}
                          src={
                            item.customerImage ||
                            "https://i.ibb.co/TBPXQQ0F/users.png"
                          }
                          alt={item.customerName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          {item.customerName}
                        </h4>
                        <p
                          className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          {item.customer_email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-lg font-bold ${item.isWinner ? (isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600") : isDark ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-600"}`}
                      >
                        {item.isWinner ? "Winner" : "Participant"}
                      </span>
                      <button
                        onClick={() => openDetailsModal(item)}
                        className={`p-2 rounded-lg transition-all duration-200 ${isDark ? "bg-gray-800/80 hover:bg-cyan-500/20 hover:text-cyan-400 text-gray-400" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
                        title="View Submission Details"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center p-8 text-xs text-gray-500">
                No other contestants found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= DETAILS POPUP / MODAL ================= */}
      {isModalOpen && selectedContest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-md p-6 rounded-2xl relative shadow-2xl border transform transition-all duration-300 scale-100 ${isDark ? "bg-[#14161d] border-gray-800 text-gray-100" : "bg-white border-gray-200 text-gray-800"}`}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className={`absolute top-4 right-4 p-1.5 rounded-xl transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Trophy size={20} className="text-amber-400" />
              <h3 className="text-lg font-bold">Contest Summary</h3>
            </div>

            <div className="space-y-4 text-sm">
              <div
                className={`p-3 rounded-xl ${isDark ? "bg-gray-900/50" : "bg-gray-50"}`}
              >
                <p className="text-xs text-gray-500 font-semibold mb-0.5">
                  Contest Name
                </p>
                <p className="font-bold text-cyan-400">
                  {selectedContest.contestTitle}
                </p>
              </div>

              {/* মডালে কন্টেস্টের ব্যানার ইমেজ সুন্দর ডিজাইনে শো করার জন্য */}
              {selectedContest.contestImage && (
                <div className="w-full h-32 relative rounded-xl overflow-hidden border border-gray-700/30">
                  <Image
                    height={50}
                    width={50}
                    src={selectedContest.contestImage}
                    alt="Contest Banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`p-3 rounded-xl ${isDark ? "bg-gray-900/50" : "bg-gray-50"}`}
                >
                  <p className="text-xs text-gray-500 font-semibold mb-0.5">
                    Registration Fee
                  </p>
                  <p className="font-bold">
                    ${selectedContest.registrationFee || 0}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl ${isDark ? "bg-gray-900/50" : "bg-gray-50"}`}
                >
                  <p className="text-xs text-gray-500 font-semibold mb-0.5">
                    Contest Prize
                  </p>
                  <p className="font-bold text-emerald-400">
                    ${selectedContest.contestPrize || selectedContest.amount}
                  </p>
                </div>
              </div>

              <div
                className={`p-3 rounded-xl ${isDark ? "bg-gray-900/50" : "bg-gray-50"}`}
              >
                <p className="text-xs text-gray-500 font-semibold mb-0.5">
                  Transaction ID
                </p>
                <p className="font-mono text-xs select-all text-purple-400">
                  {selectedContest.transactionId}
                </p>
              </div>

              {selectedContest.wonAt && (
                <div
                  className={`p-3 rounded-xl ${isDark ? "bg-emerald-950/20 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-100"}`}
                >
                  <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider mb-0.5">
                    Victory Declared At
                  </p>
                  <p className="font-semibold text-xs">
                    {new Date(
                      selectedContest.wonAt?.$date || selectedContest.wonAt,
                    ).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
