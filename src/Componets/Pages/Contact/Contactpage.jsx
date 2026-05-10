"use client";
import { useForm } from "react-hook-form";
import useTheme from "@/Componets/utils/hooks/useThemeValue";

const INFO = [
  {
    icon: "📧",
    label: "Email",
    value: "hello@contesthub.io\nsupport@contesthub.io",
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
  },
];

export default function Contactpage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { register, handleSubmit } = useForm();

  const card = `rounded-3xl border p-8 md:p-10 ${isDark ? "bg-white/[0.04] border-white/[0.07]" : "bg-white border-violet-200 shadow-lg shadow-violet-500/5"}`;

  const inputCls = `w-full px-6 py-5 rounded-2xl border text-lg font-medium outline-none transition-all mb-5 ${
    isDark
      ? "bg-white/[0.05] border-white/[0.08] text-white focus:border-violet-500"
      : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-500/5"
  }`;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0a0a14]" : "bg-[#f8f6ff]"}`}
    >
      <div className="text-center px-6 pt-32 pb-20">
        <h1
          className={`text-5xl md:text-7xl font-black tracking-tight mb-6 ${isDark ? "text-[#f0eeff]" : "text-indigo-950"}`}
        >
          Get in Touch
        </h1>
        <p
          className={`text-xl md:text-2xl font-semibold ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          Our team responds within 24 hours.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12">
        <div className="space-y-8">
          {INFO.map((info) => (
            <div key={info.label} className={card}>
              <div className="text-4xl mb-5">{info.icon}</div>
              <p className="text-sm font-black uppercase tracking-widest text-violet-600 mb-3">
                {info.label}
              </p>
              <p
                className={`text-lg md:text-xl leading-relaxed font-bold whitespace-pre-line ${isDark ? "text-slate-300" : "text-slate-800"}`}
              >
                {info.value}
              </p>
              {info.chat && (
                <button className="mt-6 px-8 py-3 rounded-xl border-2 text-base font-black transition-all border-violet-500 bg-violet-500 text-white hover:bg-violet-600">
                  Start Chat
                </button>
              )}
            </div>
          ))}
        </div>

        <div className={card}>
          <p className="text-sm font-black uppercase tracking-widest text-violet-600 mb-8">
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
            </select>
            <textarea
              {...register("message")}
              placeholder="Your message..."
              rows={6}
              className={`${inputCls} resize-none`}
            />
            <button
              type="submit"
              className="w-full py-5 rounded-2xl text-xl font-black text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-violet-500/20"
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
