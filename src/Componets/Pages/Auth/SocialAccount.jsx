import React from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

const SocialAccount = ({ isDark }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        className={`flex items-center justify-center gap-3 py-3 border rounded-xl font-bold transition-all text-sm ${
          isDark
            ? "border-white/10 text-white hover:bg-white/5"
            : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm"
        }`}
      >
        <Image
          height={20}
          width={20}
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
        />
        Google
      </button>
      <button
        className={`flex items-center justify-center gap-3 py-3 border rounded-xl font-bold transition-all text-sm ${
          isDark
            ? "border-white/10 text-white hover:bg-white/5"
            : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm"
        }`}
      >
        <FaGithub size={20} /> Github
      </button>
    </div>
  );
};

export default SocialAccount;
