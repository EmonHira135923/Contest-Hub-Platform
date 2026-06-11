"use client";
import React, { useState, useRef } from "react";
import useTheme from "../utils/hooks/useThemeValue";
import {
  FiShield,
  FiDatabase,
  FiEye,
  FiLock,
  FiUserCheck,
  FiTrash2,
  FiRefreshCw,
  FiMail,
  FiAlertCircle,
  FiChevronRight,
  FiExternalLink,
  FiGlobe,
  FiServer,
  FiSliders,
  FiInfo,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

/* ─── SECTIONS DATA ─── */
const SECTIONS = [
  {
    id: "overview",
    icon: <FiInfo size={19} />,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    title: "Overview",
    content: [
      {
        type: "text",
        body: "ContestHub ('we', 'our', or 'us') is committed to protecting your personal information. This Privacy Policy explains what data we collect, why we collect it, how we use it, and your rights regarding that data.",
      },
      {
        type: "text",
        body: "By using ContestHub — whether as a visitor, participant, or contest creator — you agree to the practices described in this policy. If you do not agree, please discontinue use of our services.",
      },
      {
        type: "highlight",
        body: "Last updated: June 2026. We notify registered users by email whenever this policy is materially updated.",
      },
    ],
  },
  {
    id: "data-collected",
    icon: <FiDatabase size={19} />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    title: "Data We Collect",
    content: [
      {
        type: "text",
        body: "We collect information you provide directly and data generated automatically when you use our platform.",
      },
      {
        type: "list",
        heading: "Information you provide",
        items: [
          "Account details — name, email address, and password (stored as a hashed value, never plain text).",
          "Profile information — display name, avatar, and bio if you choose to add them.",
          "Contest data — titles, descriptions, prize amounts, deadlines, and instructions created by contest creators.",
          "Payment information — billing address and payment method. Card numbers are processed by our payment provider and never stored on our servers.",
          "Support correspondence — messages you send to our support team.",
        ],
      },
      {
        type: "list",
        heading: "Data collected automatically",
        items: [
          "Device and browser type, operating system, and IP address.",
          "Pages visited, time spent, and actions taken within ContestHub.",
          "Referring URLs and search terms that led you to our platform.",
          "Cookies and similar tracking technologies (see the Cookies section below).",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    icon: <FiSliders size={19} />,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    title: "How We Use Your Data",
    content: [
      {
        type: "text",
        body: "We use your information only for purposes directly related to providing and improving ContestHub.",
      },
      {
        type: "list",
        heading: "Core uses",
        items: [
          "Creating and managing your account, and verifying your identity.",
          "Processing contest registrations and prize payments.",
          "Sending transactional emails — confirmations, password resets, and contest status updates.",
          "Reviewing and approving contests submitted by creators.",
          "Detecting and preventing fraud, abuse, and rule violations.",
        ],
      },
      {
        type: "list",
        heading: "Secondary uses (with your consent where required)",
        items: [
          "Sending product updates, feature announcements, and newsletters. You can unsubscribe at any time.",
          "Analysing usage patterns to improve our platform's performance and design.",
          "Personalising contest recommendations based on your activity.",
        ],
      },
      {
        type: "highlight",
        body: "We do not sell, rent, or trade your personal data to any third party for their own marketing purposes. Ever.",
      },
    ],
  },
  {
    id: "sharing",
    icon: <FiGlobe size={19} />,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    title: "Sharing & Disclosure",
    content: [
      {
        type: "text",
        body: "We share your data only in the limited circumstances described below.",
      },
      {
        type: "list",
        heading: "Service providers",
        items: [
          "Payment processors (e.g. Stripe) — to handle registration fees and prize payouts securely.",
          "Cloud infrastructure providers — to host and store platform data.",
          "Email delivery services — to send transactional and marketing emails.",
          "Analytics providers — to understand aggregate usage patterns. Data shared is anonymised where possible.",
        ],
      },
      {
        type: "list",
        heading: "Legal & safety reasons",
        items: [
          "When required by law, court order, or government authority.",
          "To protect the rights, safety, or property of ContestHub, our users, or the public.",
          "In connection with a merger, acquisition, or sale of assets — you will be notified before your data is transferred under a new privacy policy.",
        ],
      },
    ],
  },
  {
    id: "cookies",
    icon: <FiServer size={19} />,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    title: "Cookies",
    content: [
      {
        type: "text",
        body: "We use cookies and similar technologies to keep you logged in, remember your preferences, and understand how ContestHub is used.",
      },
      {
        type: "list",
        heading: "Types of cookies we use",
        items: [
          "Essential cookies — required for authentication and core platform functionality. These cannot be disabled.",
          "Preference cookies — remember your settings such as dark mode and language.",
          "Analytics cookies — track anonymous usage statistics to help us improve the platform.",
          "Marketing cookies — only used if you have explicitly opted in to receive personalised content.",
        ],
      },
      {
        type: "text",
        body: "You can manage cookie preferences via your browser settings. Disabling non-essential cookies may affect your experience but will not prevent you from using ContestHub.",
      },
    ],
  },
  {
    id: "security",
    icon: <FiLock size={19} />,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    title: "Data Security",
    content: [
      {
        type: "text",
        body: "We take the security of your data seriously and implement industry-standard safeguards.",
      },
      {
        type: "list",
        heading: "Security measures",
        items: [
          "All data is transmitted over HTTPS using TLS 1.2 or higher.",
          "Passwords are hashed using bcrypt — your plain-text password is never stored.",
          "Database access is restricted to authorised personnel only, using role-based controls.",
          "Payment details are processed by PCI-DSS compliant providers — we never touch raw card numbers.",
          "Security audits and penetration tests are conducted regularly.",
        ],
      },
      {
        type: "highlight",
        body: "If you suspect your account has been compromised, change your password immediately and email us at security@contesthub.io.",
      },
    ],
  },
  {
    id: "your-rights",
    icon: <FiUserCheck size={19} />,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    title: "Your Rights",
    content: [
      {
        type: "text",
        body: "Depending on your location, you may have the following rights over your personal data under GDPR, CCPA, or similar regulations.",
      },
      {
        type: "list",
        heading: "Rights you may hold",
        items: [
          "Access — request a copy of the personal data we hold about you.",
          "Correction — ask us to correct inaccurate or incomplete data.",
          "Deletion — request deletion of your account and associated data ('right to be forgotten').",
          "Portability — receive your data in a structured, machine-readable format.",
          "Restriction — ask us to limit how we process your data in certain circumstances.",
          "Objection — object to processing based on legitimate interests or for direct marketing.",
          "Withdraw consent — where processing is based on your consent, withdraw it at any time without affecting prior processing.",
        ],
      },
      {
        type: "text",
        body: "To exercise any of these rights, contact us at privacy@contesthub.io. We will respond within 30 days.",
      },
    ],
  },
  {
    id: "retention",
    icon: <FiTrash2 size={19} />,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    title: "Data Retention",
    content: [
      {
        type: "text",
        body: "We retain your personal data only as long as necessary to provide our services and comply with legal obligations.",
      },
      {
        type: "list",
        heading: "Retention periods",
        items: [
          "Active account data — retained for as long as your account remains active.",
          "Closed account data — deleted or anonymised within 90 days of account closure, except where legally required to retain it.",
          "Payment records — retained for 7 years as required by financial regulations.",
          "Support conversations — retained for 2 years to help resolve recurring issues.",
          "Analytics data — aggregated and anonymised after 12 months.",
        ],
      },
    ],
  },
  {
    id: "updates",
    icon: <FiRefreshCw size={19} />,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
    title: "Policy Updates",
    content: [
      {
        type: "text",
        body: "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.",
      },
      {
        type: "text",
        body: "When we make material changes, we will notify you by email (to the address on your account) and post a notice on our platform at least 14 days before the changes take effect.",
      },
      {
        type: "highlight",
        body: "Continued use of ContestHub after a policy update constitutes acceptance of the revised terms.",
      },
    ],
  },
];

/* ─── SECTION COMPONENT ─── */
const Section = ({ section, isDark, isActive }) => {
  const text = isDark ? "text-gray-100" : "text-gray-900";
  const body = isDark ? "text-gray-400" : "text-gray-600";
  const hlBg = isDark
    ? "bg-indigo-950/50 border-indigo-800/60 text-indigo-300"
    : "bg-indigo-50 border-indigo-200 text-indigo-700";
  const subHd = isDark ? "text-gray-300" : "text-gray-700";
  const dotClr = isDark ? "bg-gray-600" : "bg-gray-300";

  return (
    <div
      id={section.id}
      className={`scroll-mt-6 transition-all duration-300 ${isActive ? "opacity-100" : "opacity-100"}`}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2.5 rounded-xl flex-shrink-0 ${section.bg}`}>
          <span className={section.color}>{section.icon}</span>
        </div>
        <h2 className={`text-lg font-bold ${text}`}>{section.title}</h2>
      </div>

      {/* Section body */}
      <div className="space-y-4">
        {section.content.map((block, i) => {
          if (block.type === "text") {
            return (
              <p key={i} className={`text-sm leading-relaxed ${body}`}>
                {block.body}
              </p>
            );
          }
          if (block.type === "highlight") {
            return (
              <div
                key={i}
                className={`flex gap-3 p-4 rounded-xl border text-sm ${hlBg}`}
              >
                <FiAlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{block.body}</span>
              </div>
            );
          }
          if (block.type === "list") {
            return (
              <div key={i} className="space-y-2">
                {block.heading && (
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider ${subHd} mb-2`}
                  >
                    {block.heading}
                  </p>
                )}
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className={`flex items-start gap-2.5 text-sm leading-relaxed ${body}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${dotClr}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

/* ─── MAIN PAGE ─── */
const Privacypage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeId, setActiveId] = useState("overview");
  const sectionRefs = useRef({});

  /* theme tokens */
  const bg = isDark ? "bg-gray-950" : "bg-slate-50";
  const card = isDark ? "bg-gray-900" : "bg-white";
  const text = isDark ? "text-gray-100" : "text-gray-900";
  const subtext = isDark ? "text-gray-400" : "text-gray-500";
  const muted = isDark ? "text-gray-500" : "text-gray-400";
  const border = isDark ? "border-gray-800" : "border-gray-100";
  const shadow = isDark ? "ring-1 ring-white/5" : "shadow-sm";

  const navActive = isDark
    ? "bg-indigo-600/20 text-indigo-400 border-indigo-600/50"
    : "bg-indigo-50     text-indigo-600 border-indigo-200";
  const navInactive = isDark
    ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200 border-transparent"
    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-transparent";

  const scrollTo = (id) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`min-h-screen ${bg} ${text}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* ── HERO ── */}
        <div className="mb-10 sm:mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
            bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 mb-4"
          >
            <HiOutlineSparkles size={13} /> Legal
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 ${text}`}
          >
            Privacy Policy
          </h1>
          <p className={`text-sm sm:text-base max-w-xl ${subtext}`}>
            We believe privacy is a right, not a feature. Here's exactly how
            ContestHub handles your data — plain and simple.
          </p>

          {/* Meta strip */}
          <div
            className={`flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-xs ${muted}`}
          >
            <span className="flex items-center gap-1.5">
              <FiRefreshCw size={12} /> Last updated: June 2026
            </span>
            <span className="flex items-center gap-1.5">
              <FiShield size={12} /> GDPR & CCPA compliant
            </span>
            <a
              href="mailto:privacy@contesthub.io"
              className="flex items-center gap-1.5 text-indigo-500 hover:underline"
            >
              <FiMail size={12} /> privacy@contesthub.io
            </a>
          </div>
        </div>

        {/* ── LAYOUT: sidebar + content ── */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── LEFT NAV (sticky on desktop, horizontal scroll on mobile) ── */}
          <aside className="lg:w-60 flex-shrink-0">
            {/* Mobile: horizontal pill nav */}
            <div
              className={`lg:hidden flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-none`}
            >
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold
                    border transition ${activeId === s.id ? navActive : navInactive}`}
                >
                  <span className={s.color}>{s.icon}</span>
                  {s.title}
                </button>
              ))}
            </div>

            {/* Desktop: sticky sidebar */}
            <nav
              className={`hidden lg:block sticky top-6 ${card} ${shadow} rounded-2xl p-3 space-y-0.5`}
            >
              <p
                className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest ${muted}`}
              >
                Contents
              </p>
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold
                    border transition-all text-left ${activeId === s.id ? navActive : navInactive}`}
                >
                  <span className={s.color}>{s.icon}</span>
                  <span className="flex-1">{s.title}</span>
                  {activeId === s.id && (
                    <FiChevronRight size={12} className="text-indigo-500" />
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* ── RIGHT: sections ── */}
          <main className="flex-1 min-w-0 space-y-8">
            {SECTIONS.map((section, i) => (
              <div
                key={section.id}
                className={`${card} ${shadow} rounded-2xl p-5 sm:p-7`}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
              >
                <Section
                  section={section}
                  isDark={isDark}
                  isActive={activeId === section.id}
                />

                {/* Divider inside card — not after last */}
                {i < SECTIONS.length - 1 && (
                  <div
                    className={`mt-2 -mx-5 sm:-mx-7 border-b ${border} hidden`}
                  />
                )}
              </div>
            ))}

            {/* ── Contact card ── */}
            <div className={`${card} ${shadow} rounded-2xl p-5 sm:p-7`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-indigo-500/10">
                  <FiMail size={19} className="text-indigo-500" />
                </div>
                <h2 className={`text-lg font-bold ${text}`}>Contact Us</h2>
              </div>
              <p
                className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"} mb-5`}
              >
                If you have questions about this policy, want to exercise your
                data rights, or need to report a privacy concern, reach out to
                our team directly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    label: "General Privacy",
                    email: "privacy@contesthub.io",
                    icon: <FiShield size={15} />,
                    color: "text-indigo-500",
                    bg: "bg-indigo-500/10",
                  },
                  {
                    label: "Security Issues",
                    email: "security@contesthub.io",
                    icon: <FiLock size={15} />,
                    color: "text-rose-500",
                    bg: "bg-rose-500/10",
                  },
                  {
                    label: "Data Requests",
                    email: "data@contesthub.io",
                    icon: <FiDatabase size={15} />,
                    color: "text-blue-500",
                    bg: "bg-blue-500/10",
                  },
                  {
                    label: "General Support",
                    email: "support@contesthub.io",
                    icon: <FiMail size={15} />,
                    color: "text-emerald-500",
                    bg: "bg-emerald-500/10",
                  },
                ].map(({ label, email, icon, color, bg: iconBg }) => (
                  <a
                    key={label}
                    href={`mailto:${email}`}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border ${border} group
                      ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-gray-50"} transition-colors`}
                  >
                    <div className={`p-2 rounded-lg flex-shrink-0 ${iconBg}`}>
                      <span className={color}>{icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold ${text}`}>{label}</p>
                      <p
                        className={`text-xs truncate ${isDark ? "text-indigo-400" : "text-indigo-600"} group-hover:underline`}
                      >
                        {email}
                      </p>
                    </div>
                    <FiExternalLink
                      size={12}
                      className={`ml-auto flex-shrink-0 ${muted} group-hover:text-indigo-500 transition`}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Footer note ── */}
            <p className={`text-center text-xs pb-4 ${muted}`}>
              ContestHub is operated by ContestHub Inc. · All rights reserved ©{" "}
              {new Date().getFullYear()}
            </p>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Privacypage;
