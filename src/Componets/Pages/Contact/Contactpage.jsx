"use client";
import { useForm } from "react-hook-form";
import useTheme from "@/Componets/utils/hooks/useThemeValue";

const INFO = [
  {
    icon: "📧",
    label: "Email",
    value: "hello@contesthub.io\nsupport@contesthub.io",
    chat: false,
  },
  {
    icon: "💬",
    label: "Live Chat",
    value: "Available Mon–Fri, 9am–6pm EST",
    chat: true,
  },
  {
    icon: "📍",
    label: "Office",
    value: "340 Pine Street, Suite 500\nSan Francisco, CA 94104",
    chat: false,
  },
];

const FAQS = [
  "How do I withdraw my prize?",
  "Can I host a contest as an organization?",
  "How is judging done?",
  "Refund & cancellation policy",
];

export default function Contactpage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { register, handleSubmit } = useForm();

  const card = `rounded-2xl border p-6 ${isDark ? "bg-white/[0.04] border-white/[0.08]" : "bg-white border-violet-200"}`;

  const inputCls = `w-full px-4 py-3.5 rounded-xl border text-[15px] outline-none transition-all mb-3 ${
    isDark
      ? "bg-white/[0.05] border-white/[0.09] text-white placeholder:text-slate-600 focus:border-violet-500"
      : "bg-white border-violet-200 text-[#1a1240] placeholder:text-slate-400 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
  }`;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0a0a14]" : "bg-[#f4f2ff]"}`}
    >
      {/* Header */}
      <div className="text-center px-6 pt-20 pb-12">
        <span
          className={`inline-block px-5 py-2 rounded-full text-sm font-bold border mb-5 ${
            isDark
              ? "bg-violet-900/20 border-violet-500/30 text-violet-300"
              : "bg-violet-50 border-violet-300 text-violet-800"
          }`}
        >
          💬 We're here to help
        </span>
        <h1
          className={`text-4xl sm:text-5xl font-black tracking-tight mb-4 ${isDark ? "text-[#f0eeff]" : "text-[#1a1240]"}`}
        >
          Get in Touch
        </h1>
        <p
          className={`text-base sm:text-lg ${isDark ? "text-[#8b7ec8]" : "text-[#3d3566]"}`}
        >
          Our team responds to all messages within 24 hours
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-6">
        {/* Left */}
        <div className="space-y-4">
          {INFO.map((info) => (
            <div key={info.label} className={card}>
              <div className="text-2xl mb-3">{info.icon}</div>
              <p
                className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? "text-violet-400" : "text-violet-700"}`}
              >
                {info.label}
              </p>
              <p
                className={`text-[14px] leading-relaxed whitespace-pre-line ${isDark ? "text-[#8b7ec8]" : "text-[#3d3566]"}`}
              >
                {info.value}
              </p>
              {info.chat && (
                <button
                  className={`mt-3 px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                    isDark
                      ? "border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20"
                      : "border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100"
                  }`}
                >
                  Start Chat
                </button>
              )}
            </div>
          ))}

          {/* FAQ */}
          <div className={card}>
            <p
              className={`text-[15px] font-black mb-4 ${isDark ? "text-[#f0eeff]" : "text-[#1a1240]"}`}
            >
              FAQ Quick Links
            </p>
            {FAQS.map((q, i) => (
              <p
                key={q}
                className={`text-[14px] font-semibold py-2.5 cursor-pointer transition-colors ${
                  i < FAQS.length - 1
                    ? `border-b ${isDark ? "border-white/[0.07]" : "border-violet-100"}`
                    : ""
                } ${isDark ? "text-violet-400 hover:text-violet-200" : "text-violet-700 hover:text-violet-900"}`}
              >
                → {q}
              </p>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className={card}>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-6">
            Send a Message
          </p>
          <form onSubmit={handleSubmit((d) => console.log(d))}>
            <input
              {...register("name")}
              placeholder="Full Name"
              className={inputCls}
            />
            <input
              {...register("email")}
              placeholder="Email Address"
              type="email"
              className={inputCls}
            />
            <select {...register("subject")} className={inputCls}>
              <option>General Inquiry</option>
              <option>Technical Issue</option>
              <option>Partnership</option>
              <option>Press</option>
            </select>
            <textarea
              {...register("message")}
              placeholder="Your message..."
              rows={6}
              className={`${inputCls} resize-none`}
            />
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              }}
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
