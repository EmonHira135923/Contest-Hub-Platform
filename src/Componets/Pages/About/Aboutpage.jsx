"use client";
import useTheme from "@/Componets/utils/hooks/useThemeValue";

const TEAM = [
  {
    emoji: "👩‍💼",
    name: "Maya Patel",
    role: "CEO & Co-Founder",
    bio: "Former PM at Figma · Yale MBA",
  },
  {
    emoji: "👨‍💻",
    name: "James Liu",
    role: "CTO & Co-Founder",
    bio: "Ex-Google Engineer · MIT CS",
  },
  {
    emoji: "👩‍🎨",
    name: "Aria Santos",
    role: "Head of Design",
    bio: "Ex-Airbnb Designer · 10yr exp",
  },
];

const VALUES = [
  {
    icon: "⚡",
    title: "Lightning Fast Payouts",
    body: "Winners receive their prize within 24 hours via Stripe, PayPal, or bank transfer.",
  },
  {
    icon: "🛡️",
    title: "Fair & Transparent",
    body: "Blind judging, verified creators, and public results ensure integrity every time.",
  },
  {
    icon: "🌍",
    title: "Global Community",
    body: "Compete with and learn from 284K+ creators spanning 140 countries worldwide.",
  },
  {
    icon: "📚",
    title: "Grow Your Skills",
    body: "Every contest is a learning opportunity. Get feedback, improve, and rise the leaderboard.",
  },
];

export default function Aboutpage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const card = `rounded-2xl border p-6 transition-colors ${isDark ? "bg-white/[0.04] border-white/[0.08]" : "bg-white border-violet-200"}`;
  const title = `text-2xl font-black tracking-tight mb-3 ${isDark ? "text-[#f0eeff]" : "text-[#1a1240]"}`;
  const body = `text-[15px] leading-relaxed ${isDark ? "text-[#8b7ec8]" : "text-[#3d3566]"}`;
  const divider = `border-t my-12 ${isDark ? "border-white/[0.07]" : "border-violet-200"}`;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0a0a14]" : "bg-[#f4f2ff]"}`}
    >
      {/* Hero */}
      <div
        className={`relative overflow-hidden py-24 px-6 text-center text-white transition-colors ${isDark ? "bg-[#0d0d1a]" : "bg-[#1e1b6e]"}`}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-56 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.45) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 text-sm font-bold text-violet-100 mb-6">
            🏆 Built for Creators
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-5">
            Built for Creators,
            <br />
            by Creators
          </h1>
          <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            We believe talent deserves a fair stage. ContestHub was born to make
            competitions transparent, rewarding, and accessible to everyone.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Mission */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-3">
            Our Mission
          </p>
          <h2 className={title}>Why we exist</h2>
          <blockquote
            className={`rounded-xl border-l-4 border-violet-600 p-6 text-[16px] leading-relaxed italic ${
              isDark
                ? "bg-violet-900/[0.12] border-violet-400 text-violet-300"
                : "bg-white border-violet-500 text-indigo-800"
            }`}
          >
            "Democratize creative competition — giving every talented
            individual, regardless of background or connections, the platform to
            showcase their skills and earn what they deserve."
          </blockquote>
        </section>

        <div className={divider} />

        {/* Team */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-3">
            Meet the Team
          </p>
          <h2 className={title}>The people behind ContestHub</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            {TEAM.map((m) => (
              <div key={m.name} className={`${card} text-center`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center text-3xl mx-auto mb-4">
                  {m.emoji}
                </div>
                <p
                  className={`font-black text-base ${isDark ? "text-[#f0eeff]" : "text-[#1a1240]"}`}
                >
                  {m.name}
                </p>
                <p
                  className={`text-sm font-semibold mt-1.5 mb-1 ${isDark ? "text-violet-400" : "text-violet-700"}`}
                >
                  {m.role}
                </p>
                <p
                  className={`text-sm ${isDark ? "text-[#4b5563]" : "text-slate-500"}`}
                >
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className={divider} />

        {/* Values */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-3">
            Why ContestHub
          </p>
          <h2 className={title}>What sets us apart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
            {VALUES.map((v) => (
              <div key={v.title} className={card}>
                <div className="text-3xl mb-4">{v.icon}</div>
                <p
                  className={`font-black text-base mb-2 ${isDark ? "text-[#f0eeff]" : "text-[#1a1240]"}`}
                >
                  {v.title}
                </p>
                <p className={body}>{v.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
