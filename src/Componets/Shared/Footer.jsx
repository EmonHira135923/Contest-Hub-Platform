"use client";
import Link from "next/link";
import Image from "next/image";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { FaXTwitter, FaLinkedinIn, FaYoutube, FaGithub } from "react-icons/fa6";

const LINKS = {
  Platform: [
    { label: "Home", href: "/" },
    { label: "All Contests", href: "/all-contests" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Contest Arena", href: "/contest-arena" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const SOCIALS = [
  { icon: <FaXTwitter size={14} />, href: "#" },
  { icon: <FaLinkedinIn size={14} />, href: "#" },
  { icon: <FaYoutube size={14} />, href: "#" },
  { icon: <FaGithub size={14} />, href: "#" },
];

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        isDark
          ? "bg-[#07070f] border-white/[0.07]"
          : "bg-white border-violet-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-2 sm:grid-cols-4 gap-10 lg:gap-16">
        {/* Brand col */}
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-[11px] bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <Image
                src="/Logo.png"
                alt="ContestHub"
                width={22}
                height={22}
                className="brightness-0 invert"
              />
            </div>
            <span
              className={`text-xl font-black ${isDark ? "text-[#f0eeff]" : "text-[#1a1240]"}`}
            >
              Contest
              <span className={isDark ? "text-violet-400" : "text-violet-700"}>
                Hub
              </span>
            </span>
          </Link>

          <p
            className={`text-[14px] leading-relaxed mb-5 ${isDark ? "text-[#4b5563]" : "text-[#3d3566]"}`}
          >
            The world's leading contest management platform. Where talent meets
            opportunity.
          </p>

          <div className="flex gap-2.5 flex-wrap">
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className={`w-9 h-9 rounded-[9px] border flex items-center justify-center transition-all ${
                  isDark
                    ? "border-white/[0.09] text-[#6b5f8a] hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-900/20"
                    : "border-violet-200 text-violet-700 hover:border-violet-400 hover:bg-violet-50"
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
              className={`text-[13px] font-black uppercase tracking-widest mb-5 ${
                isDark ? "text-[#d4ceff]" : "text-[#1a1240]"
              }`}
            >
              {heading}
            </p>
            <div className="flex flex-col gap-1.5">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`text-[15px] transition-colors hover:underline ${
                    isDark
                      ? "text-[#4b5563] hover:text-violet-400"
                      : "text-[#3d3566] hover:text-violet-700"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className={`border-t px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDark ? "border-white/[0.07]" : "border-violet-200"
        }`}
      >
        <p
          className={`text-[13px] ${
            isDark ? "text-[#374151]" : "text-[#5b4fa0]"
          }`}
        >
          © {new Date().getFullYear()} ContestHub Inc. All rights reserved.
        </p>
        <p
          className={`text-[13px] ${isDark ? "text-[#374151]" : "text-[#5b4fa0]"}`}
        >
          Made with <span className="text-red-500">♥</span> for creators
          worldwide
        </p>
      </div>
    </footer>
  );
}
