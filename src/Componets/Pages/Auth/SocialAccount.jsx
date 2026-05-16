"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im"; // একটি স্পিনার আইকন

const SocialAccount = ({ isDark }) => {
  const router = useRouter();
  // আলাদা আলাদা প্রোভাইডারের জন্য লোডিং স্টেট
  const [loading, setLoading] = useState({
    google: false,
    github: false,
  });

  const handleSocialLogin = async (provider) => {
    try {
      // সংশ্লিষ্ট প্রোভাইডারের লোডিং শুরু
      setLoading((prev) => ({ ...prev, [provider]: true }));

      const res = await signIn(provider, {
        redirect: false, // আমরা ম্যানুয়ালি রিডাইরেক্ট করবো
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        console.error("Login failed:", res.error);
        setLoading((prev) => ({ ...prev, [provider]: false }));
      } else if (res?.url) {
        // সফল হলে কাঙ্খিত পেজে পাঠিয়ে দেওয়া
        router.push(res.url);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Google Button */}
      <button
        type="button"
        disabled={loading.google || loading.github}
        onClick={() => handleSocialLogin("google")}
        className={`flex items-center justify-center gap-3 py-3 border rounded-xl font-bold transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
          isDark
            ? "border-white/10 text-white hover:bg-white/5"
            : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm"
        }`}
      >
        {loading.google ? (
          <ImSpinner2 className="animate-spin text-lg" />
        ) : (
          <Image
            height={20}
            width={20}
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
        )}
        {loading.google ? "Processing..." : "Google"}
      </button>

      {/* Github Button */}
      <button
        type="button"
        disabled={loading.google || loading.github}
        onClick={() => handleSocialLogin("github")}
        className={`flex items-center justify-center gap-3 py-3 border rounded-xl font-bold transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
          isDark
            ? "border-white/10 text-white hover:bg-white/5"
            : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm"
        }`}
      >
        {loading.github ? (
          <ImSpinner2 className="animate-spin text-lg" />
        ) : (
          <FaGithub size={20} />
        )}
        {loading.github ? "Processing..." : "Github"}
      </button>
    </div>
  );
};

export default SocialAccount;