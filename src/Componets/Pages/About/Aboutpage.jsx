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

  const card = `rounded-2xl border p-5 transition-colors ${isDark ? "bg-white/[0.04] border-white/[0.07]" : "bg-white border-violet-100"}`;
  const title = `text-xl font-black tracking-tight mb-3 ${isDark ? "text-[#f0eeff]" : "text-indigo-950"}`;
  const body = `text-sm leading-relaxed ${isDark ? "text-[#6b5f8a]" : "text-slate-500"}`;
  const divider = `border-t my-10 ${isDark ? "border-white/[0.06]" : "border-violet-100"}`;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0a0a14]" : "bg-[#f8f6ff]"}`}
    >
      {/* Hero */}
      <div
        className={`relative overflow-hidden py-20 px-6 text-center text-white transition-colors ${isDark ? "bg-[#0d0d1a]" : "bg-[#1e1b6e]"}`}
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
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-56 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.45) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-xs font-bold text-violet-100 mb-5">
            🏆 Built for Creators
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
            Built for Creators,
            <br />
            by Creators
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            We believe talent deserves a fair stage. ContestHub was born to make
            competitions transparent, rewarding, and accessible to everyone.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14">
        {/* Mission */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-violet-600 mb-2">
            Our Mission
          </p>
          <h2 className={title}>Why we exist</h2>
          <blockquote
            className={`rounded-xl border-l-4 border-violet-600 p-5 text-sm leading-relaxed italic ${
              isDark
                ? "bg-violet-900/[0.12] border-violet-500 text-violet-300"
                : "bg-white border-violet-500 text-indigo-700"
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-violet-600 mb-2">
            Meet the Team
          </p>
          <h2 className={title}>The people behind ContestHub</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {TEAM.map((m) => (
              <div key={m.name} className={card + " text-center"}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center text-2xl mx-auto mb-3">
                  {m.emoji}
                </div>
                <p
                  className={`font-black text-sm ${isDark ? "text-[#f0eeff]" : "text-indigo-950"}`}
                >
                  {m.name}
                </p>
                <p
                  className={`text-xs font-semibold mt-1 mb-1 ${isDark ? "text-violet-400" : "text-violet-600"}`}
                >
                  {m.role}
                </p>
                <p
                  className={`text-[11px] ${isDark ? "text-[#4b5563]" : "text-slate-400"}`}
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-violet-600 mb-2">
            Why ContestHub
          </p>
          <h2 className={title}>What sets us apart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {VALUES.map((v) => (
              <div key={v.title} className={card}>
                <div className="text-2xl mb-3">{v.icon}</div>
                <p
                  className={`font-black text-sm mb-1.5 ${isDark ? "text-[#f0eeff]" : "text-indigo-950"}`}
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
