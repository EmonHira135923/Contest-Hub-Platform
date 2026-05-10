"use client";
import Link from "next/link";
import Image from "next/image";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { FaXTwitter, FaLinkedinIn, FaYoutube, FaGithub } from "react-icons/fa6";

const LINKS = {
  Platform: ["Browse Contests", "Create Contest", "Leaderboard", "Pricing"],
  Company: ["About Us", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
};

const SOCIALS = [
  { icon: <FaXTwitter size={13} />, href: "#" },
  { icon: <FaLinkedinIn size={13} />, href: "#" },
  { icon: <FaYoutube size={13} />, href: "#" },
  { icon: <FaGithub size={13} />, href: "#" },
];

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // টেক্সট সাইজ এবং কালার বাড়ানো হয়েছে
  const linkCls = `block text-[15px] py-1.5 transition-colors font-medium ${
    isDark
      ? "text-slate-400 hover:text-violet-400"
      : "text-slate-600 hover:text-violet-700"
  }`;

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        isDark
          ? "bg-[#09090f] border-white/[0.06]"
          : "bg-white border-violet-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 sm:grid-cols-4 gap-10 lg:gap-16">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/10">
              <Image
                src="/Logo.png"
                alt="Logo"
                width={22}
                height={22}
                className="brightness-0 invert"
              />
            </div>
            <span
              className={`text-xl font-black tracking-tight ${isDark ? "text-[#f0eeff]" : "text-indigo-950"}`}
            >
              Contest<span className="text-violet-600">Hub</span>
            </span>
          </Link>
          <p
            className={`text-sm md:text-base leading-relaxed mb-6 font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            The world's leading contest management platform. Where talent meets
            opportunity.
          </p>
          <div className="flex gap-3">
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                  isDark
                    ? "border-white/10 text-slate-400 hover:text-violet-400"
                    : "border-slate-200 text-slate-600 hover:bg-violet-50 hover:text-violet-600"
                }`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([heading, links]) => (
          <div key={heading}>
            <p
              className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${isDark ? "text-violet-300" : "text-indigo-950"}`}
            >
              {heading}
            </p>
            <div className="space-y-2">
              {links.map((l) => (
                <Link key={l} href="#" className={linkCls}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className={`border-t px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${isDark ? "border-white/[0.06]" : "border-violet-100"}`}
      >
        <p
          className={`text-sm md:text-base font-semibold ${isDark ? "text-slate-600" : "text-slate-500"}`}
        >
          © 2026 ContestHub Inc. All rights reserved.
        </p>
        <p
          className={`text-sm md:text-base font-semibold ${isDark ? "text-slate-600" : "text-slate-500"}`}
        >
          Made with <span className="text-red-500">♥</span> for creators
          worldwide
        </p>
      </div>
    </footer>
  );
}
