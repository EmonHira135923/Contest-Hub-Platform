"use client";
import ProfileSkeleton from "@/Componets/Skeltons/ProfileSkeleton";
import useAuth from "@/Componets/utils/hooks/useAuth";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import {
  Phone,
  Mail,
  User,
  Shield,
  Calendar,
  Edit2,
  Camera,
  LogIn,
  Copy,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Profilepage() {
  const { theme } = useTheme();
  const { user: profile, loading } = useAuth();
  const [copied, setCopied] = useState(false);
  const isDark = theme === "dark";

  if (loading) return <ProfileSkeleton isDark={isDark} />;
  if (!profile) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(profile?._id || profile?.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // Theme tokens
  const bg = isDark ? "bg-[#0d1117]" : "bg-[#f5f7fa]";
  const cardBg = isDark ? "bg-[#161b22]" : "bg-white";
  const cardBorder = isDark ? "border-white/[0.08]" : "border-gray-200";
  const textPrimary = isDark ? "text-gray-100" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const textMuted = isDark ? "text-gray-600" : "text-gray-400";
  const sectionLabel = `text-[10.5px] font-semibold uppercase tracking-[0.1em] mb-3 ${isDark ? "text-gray-500" : "text-gray-400"}`;
  const fieldCellBg = isDark ? "bg-[#161b22]" : "bg-white";
  const fieldCellBorder = isDark ? "border-white/[0.06]" : "border-gray-100";

  return (
    <div className={`min-h-screen transition-colors ${bg}`}>
      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* ── Top header card ── */}
        <div className={`rounded-xl border ${cardBorder} ${cardBg} p-6 mb-4`}>
          {/* Main Layout Container: Vertical on mobile, Horizontal on desktop */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Top Row for Mobile (Image + Name) */}
            <div className="flex items-center gap-4 w-full">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-[72px] h-[72px] rounded-lg overflow-hidden flex items-center justify-center text-[24px] font-medium ${
                    isDark
                      ? "bg-blue-900/60 text-blue-200"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {profile.image ? (
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      width={72}
                      height={72}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    profile.name?.[0]?.toUpperCase()
                  )}
                </div>
                <button
                  className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border shadow-sm transition-transform hover:scale-110 ${
                    isDark
                      ? "bg-[#1c2128] border-white/[0.1] text-gray-400"
                      : "bg-white border-gray-200 text-gray-500"
                  }`}
                >
                  <Camera size={13} />
                </button>
              </div>

              {/* Name + Badges */}
              <div className="flex-1 min-w-0">
                <h1
                  className={`text-[20px] font-bold leading-tight mb-2 ${textPrimary}`}
                >
                  {profile.name}
                </h1>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${
                      isDark
                        ? "bg-blue-950/60 text-blue-300 border-blue-800/50"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    <Shield size={10} />
                    {profile.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit button: Full width on mobile, Auto width on desktop */}
            <Link
              href={`/profile/${profile?.id || profile?._id}`}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-colors flex-shrink-0 mt-2 sm:mt-0 ${
                isDark
                  ? "border-white/[0.08] text-gray-300 hover:bg-white/[0.04]"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Edit2 size={14} />
              Edit profile
            </Link>
          </div>
        </div>

        {/* ── Contact information ── */}
        <div className="mb-4">
          <p className={sectionLabel}>Contact information</p>
          <div className={`rounded-xl border ${cardBorder} overflow-hidden`}>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x ${isDark ? "divide-white/[0.06]" : "divide-gray-100"}`}
            >
              <FieldCell
                label="Email"
                value={profile.email}
                icon={<Mail size={13} />}
                bg={fieldCellBg}
                textPrimary={textPrimary}
                textMuted={textMuted}
                isDark={isDark}
              />
              <FieldCell
                label="Phone"
                value={profile.phone || "Not provided"}
                icon={<Phone size={13} />}
                bg={fieldCellBg}
                textPrimary={textPrimary}
                textMuted={textMuted}
                isDark={isDark}
              />
            </div>
          </div>
        </div>

        {/* ── Account details ── */}
        <div className="mb-4">
          <p className={sectionLabel}>Account details</p>
          <div className={`rounded-xl border ${cardBorder} overflow-hidden`}>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 divide-y ${isDark ? "divide-white/[0.06]" : "divide-gray-100"}`}
            >
              <div
                className={`grid grid-cols-2 divide-x ${isDark ? "divide-white/[0.06]" : "divide-gray-100"}`}
              >
                <FieldCell
                  label="Role"
                  value={profile.role}
                  icon={<User size={13} />}
                  bg={fieldCellBg}
                  textPrimary={textPrimary}
                  textMuted={textMuted}
                  isDark={isDark}
                />
                <FieldCell
                  label="Login method"
                  value={profile.provider}
                  icon={<LogIn size={13} />}
                  bg={fieldCellBg}
                  textPrimary={textPrimary}
                  textMuted={textMuted}
                  isDark={isDark}
                />
              </div>
              <div
                className={`grid grid-cols-2 divide-x ${isDark ? "divide-white/[0.06]" : "divide-gray-100"}`}
              >
                <FieldCell
                  label="Member since"
                  value={formatDate(profile.createdAt)}
                  icon={<Calendar size={13} />}
                  bg={fieldCellBg}
                  textPrimary={textPrimary}
                  textMuted={textMuted}
                  isDark={isDark}
                />
                <FieldCell
                  label="Security"
                  icon={<Shield size={13} />}
                  bg={fieldCellBg}
                  textPrimary={textPrimary}
                  textMuted={textMuted}
                  isDark={isDark}
                  custom={
                    <span className="flex items-center gap-1.5 text-[13px] font-medium text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      Verified
                    </span>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── User ID bar ── */}
        <div
          className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
            isDark
              ? "bg-[#161b22] border-white/[0.06]"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`text-[10.5px] font-semibold uppercase tracking-[0.1em] ${textMuted}`}
            >
              User ID
            </span>
            <code className={`text-xs font-mono ${textSecondary}`}>
              {profile?._id || profile?.id}
            </code>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
              copied
                ? "text-emerald-500"
                : isDark
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
            }`}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldCell({
  label,
  value,
  icon,
  custom,
  bg,
  textPrimary,
  textMuted,
  isDark,
}) {
  return (
    <div className={`${bg} px-4 py-3.5`}>
      <div
        className={`flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] mb-1.5 ${textMuted} [&_svg]:text-blue-500`}
      >
        {icon}
        {label}
      </div>
      {custom ?? (
        <p className={`text-[13.5px] font-medium break-all ${textPrimary}`}>
          {value}
        </p>
      )}
    </div>
  );
}
