"use client";
import React, { useState, useRef } from "react";
import useTheme from "../utils/hooks/useThemeValue";
import {
  FiFileText,
  FiUserCheck,
  FiAward,
  FiEdit3,
  FiDollarSign,
  FiShield,
  FiAlertTriangle,
  FiSlash,
  FiRefreshCw,
  FiMail,
  FiAlertCircle,
  FiChevronRight,
  FiExternalLink,
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiGlobe,
  FiLock,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

/* ─── SECTIONS DATA ─── */
const SECTIONS = [
  {
    id: "acceptance",
    icon: <FiFileText size={19} />,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    title: "Acceptance of Terms",
    content: [
      {
        type: "text",
        body: "Welcome to ContestHub. By accessing or using our platform — whether as a visitor, participant, or contest creator — you agree to be bound by these Terms of Service ('Terms') and our Privacy Policy.",
      },
      {
        type: "text",
        body: "If you are using ContestHub on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.",
      },
      {
        type: "highlight",
        variant: "info",
        body: "These Terms constitute a legally binding agreement. Please read them carefully. If you do not agree, you must stop using ContestHub immediately.",
      },
    ],
  },
  {
    id: "eligibility",
    icon: <FiUserCheck size={19} />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    title: "Eligibility",
    content: [
      {
        type: "text",
        body: "To use ContestHub you must meet the following requirements at all times.",
      },
      {
        type: "list",
        heading: "You must",
        variant: "check",
        items: [
          "Be at least 16 years of age, or have verifiable parental/guardian consent if younger.",
          "Provide accurate, current, and complete information when creating your account.",
          "Maintain the security of your account credentials and notify us immediately of any unauthorised access.",
          "Comply with all applicable local, national, and international laws in your use of ContestHub.",
        ],
      },
      {
        type: "list",
        heading: "You must not",
        variant: "cross",
        items: [
          "Create an account if you have been previously banned from ContestHub.",
          "Impersonate any person, entity, or ContestHub employee.",
          "Use the platform for any unlawful or fraudulent purpose.",
        ],
      },
    ],
  },
  {
    id: "accounts",
    icon: <FiLock size={19} />,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    title: "Accounts & Security",
    content: [
      {
        type: "text",
        body: "Your ContestHub account is personal to you. You are responsible for all activity that occurs under your account.",
      },
      {
        type: "list",
        heading: "Account responsibilities",
        items: [
          "Keep your password secure and do not share it with anyone.",
          "Use a strong, unique password not used on other services.",
          "Log out from shared devices after each session.",
          "Notify support@contesthub.io immediately if you suspect unauthorised access.",
        ],
      },
      {
        type: "highlight",
        variant: "warning",
        body: "ContestHub will never ask for your password via email, chat, or support ticket. Any such request is fraudulent.",
      },
    ],
  },
  {
    id: "contests",
    icon: <FiAward size={19} />,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    title: "Contest Rules",
    content: [
      {
        type: "text",
        body: "All contests hosted on ContestHub are subject to both these Terms and the individual contest rules set by the creator. In the event of a conflict, these Terms take precedence.",
      },
      {
        type: "list",
        heading: "General contest rules",
        items: [
          "All submissions must be entirely your own original work unless the contest explicitly allows team entries.",
          "Plagiarism, code sharing, or collaboration outside the scope permitted by the contest will result in immediate disqualification.",
          "You may not discuss contest problems publicly — on social media, forums, or messaging platforms — while the contest is active.",
          "Attempts to manipulate scoring systems, exploit platform bugs, or gain an unfair advantage will result in disqualification and account suspension.",
          "Once a contest deadline has passed, no new registrations or submissions are accepted.",
        ],
      },
      {
        type: "highlight",
        variant: "info",
        body: "ContestHub reserves the right to disqualify any participant whose conduct is deemed unfair, abusive, or in violation of these Terms, at our sole discretion.",
      },
    ],
  },
  {
    id: "creators",
    icon: <FiEdit3 size={19} />,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    title: "Creator Responsibilities",
    content: [
      {
        type: "text",
        body: "Contest creators take on additional responsibilities beyond those of regular participants. By creating a contest you agree to the following.",
      },
      {
        type: "list",
        heading: "You agree to",
        variant: "check",
        items: [
          "Provide accurate, complete, and non-misleading contest information — including title, description, rules, prize, and deadline.",
          "Distribute prizes to winners within 14 business days of the contest closing.",
          "Not cancel an approved contest without giving registered participants at least 72 hours' notice and issuing full refunds of registration fees.",
          "Ensure your contest complies with all applicable laws and ContestHub guidelines.",
          "Not use contest data, participant submissions, or personal information for any purpose outside of judging.",
        ],
      },
      {
        type: "list",
        heading: "You must not",
        variant: "cross",
        items: [
          "Create contests that are misleading, deceptive, or designed to collect data without legitimate competitive purpose.",
          "Edit core contest details (prize, deadline, rules) in a way that materially disadvantages registered participants.",
          "Use ContestHub to launder money, circumvent financial regulations, or engage in fraudulent prize schemes.",
        ],
      },
    ],
  },
  {
    id: "payments",
    icon: <FiDollarSign size={19} />,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    title: "Payments & Refunds",
    content: [
      {
        type: "text",
        body: "ContestHub processes payments for registration fees and prize distributions through our PCI-DSS compliant payment provider.",
      },
      {
        type: "list",
        heading: "Registration fees",
        items: [
          "Fees are charged at the time of contest registration and are non-refundable once the contest has begun.",
          "If a contest is cancelled by the creator before it begins, all registration fees are refunded in full within 5–7 business days.",
          "If ContestHub removes a contest for policy violations, all registration fees are refunded in full.",
        ],
      },
      {
        type: "list",
        heading: "Prizes & platform fees",
        items: [
          "ContestHub charges a platform fee on prize amounts; this is deducted before distribution and disclosed on the pricing page.",
          "Prizes are held in escrow by ContestHub until the contest closes and winners are verified.",
          "Winners receive their prize to their registered payout account within 14 business days of the contest closing.",
          "ContestHub is not liable for delays caused by incorrect payout details provided by the winner.",
        ],
      },
      {
        type: "highlight",
        variant: "warning",
        body: "Disputed transactions must be raised within 30 days of the charge. After this period, charges are considered accepted.",
      },
    ],
  },
  {
    id: "conduct",
    icon: <FiShield size={19} />,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
    title: "Acceptable Use",
    content: [
      {
        type: "text",
        body: "ContestHub is a competitive, professional platform. All users are expected to behave with integrity and respect.",
      },
      {
        type: "list",
        heading: "Prohibited conduct",
        variant: "cross",
        items: [
          "Harassment, abuse, hate speech, or threatening behaviour toward any user, creator, or ContestHub employee.",
          "Uploading or transmitting malware, viruses, or malicious code of any kind.",
          "Attempting to gain unauthorised access to ContestHub systems, databases, or other users' accounts.",
          "Reverse engineering, scraping, or automated harvesting of ContestHub content without written permission.",
          "Posting spam, unsolicited promotions, or off-topic advertising within the platform.",
          "Circumventing geo-restrictions, IP bans, or other access controls.",
        ],
      },
    ],
  },
  {
    id: "ip",
    icon: <FiGlobe size={19} />,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    title: "Intellectual Property",
    content: [
      {
        type: "text",
        body: "ContestHub and its content — including logo, design, code, and copy — are owned by ContestHub Inc. and protected by copyright, trademark, and other intellectual property laws.",
      },
      {
        type: "list",
        heading: "Your content",
        items: [
          "You retain full ownership of the submissions, code, and creative work you submit to contests.",
          "By submitting to a contest, you grant ContestHub a limited, non-exclusive licence to display your submission for judging and, with your consent, promotional purposes.",
          "You warrant that your submissions do not infringe the intellectual property rights of any third party.",
        ],
      },
      {
        type: "list",
        heading: "Platform content",
        items: [
          "You may not copy, reproduce, distribute, or create derivative works from ContestHub's platform content without prior written consent.",
          "You may link to ContestHub from external sites provided you do not imply any endorsement or affiliation.",
        ],
      },
    ],
  },
  {
    id: "termination",
    icon: <FiSlash size={19} />,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    title: "Suspension & Termination",
    content: [
      {
        type: "text",
        body: "ContestHub reserves the right to suspend or permanently terminate any account that violates these Terms, at our sole discretion and without prior notice in serious cases.",
      },
      {
        type: "list",
        heading: "Grounds for immediate suspension",
        items: [
          "Cheating, plagiarism, or manipulation of contest results.",
          "Fraudulent payment activity or prize scheme abuse.",
          "Harassment or threatening behaviour toward other users.",
          "Any activity that poses a security risk to ContestHub or its users.",
        ],
      },
      {
        type: "text",
        body: "If your account is terminated, you may appeal by contacting support@contesthub.io within 14 days. Appeals are reviewed on a case-by-case basis.",
      },
      {
        type: "highlight",
        variant: "warning",
        body: "Termination does not entitle you to a refund of any registration fees paid prior to the decision.",
      },
    ],
  },
  {
    id: "liability",
    icon: <FiAlertTriangle size={19} />,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    title: "Limitation of Liability",
    content: [
      {
        type: "text",
        body: "To the fullest extent permitted by law, ContestHub and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
      },
      {
        type: "list",
        heading: "This includes but is not limited to",
        items: [
          "Loss of revenue, profits, data, or goodwill.",
          "Service interruptions, bugs, or security breaches beyond our reasonable control.",
          "Actions or omissions of third-party service providers (payment processors, hosting providers, etc.).",
          "Disputes between participants and contest creators regarding prize distribution or contest results.",
        ],
      },
      {
        type: "highlight",
        variant: "info",
        body: "ContestHub's total aggregate liability to you for any claim arising from these Terms shall not exceed the total fees you have paid to ContestHub in the 12 months preceding the claim.",
      },
    ],
  },
  {
    id: "changes",
    icon: <FiRefreshCw size={19} />,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    title: "Changes to Terms",
    content: [
      {
        type: "text",
        body: "We may revise these Terms at any time. When we make material changes, we will notify you by email and display a notice on the platform at least 14 days before the changes take effect.",
      },
      {
        type: "text",
        body: "Minor changes — such as corrections, clarifications, or updates to reflect new features — may be made without advance notice.",
      },
      {
        type: "highlight",
        variant: "info",
        body: "Continued use of ContestHub after updated Terms take effect constitutes your acceptance of the revised Terms.",
      },
    ],
  },
];

/* ─── HIGHLIGHT BLOCK ─── */
const Highlight = ({ variant = "info", body, isDark }) => {
  const styles = {
    info: {
      light: "bg-indigo-50  border-indigo-200  text-indigo-700",
      dark: "bg-indigo-950/50 border-indigo-800/60 text-indigo-300",
      icon: <FiAlertCircle size={15} className="flex-shrink-0 mt-0.5" />,
    },
    warning: {
      light: "bg-amber-50  border-amber-200  text-amber-700",
      dark: "bg-amber-950/50 border-amber-800/60 text-amber-300",
      icon: <FiAlertTriangle size={15} className="flex-shrink-0 mt-0.5" />,
    },
  };
  const s = styles[variant] ?? styles.info;
  const cls = isDark ? s.dark : s.light;
  return (
    <div
      className={`flex gap-3 p-4 rounded-xl border text-sm leading-relaxed ${cls}`}
    >
      {s.icon}
      <span>{body}</span>
    </div>
  );
};

/* ─── SECTION COMPONENT ─── */
const Section = ({ section, isDark }) => {
  const text = isDark ? "text-gray-100" : "text-gray-900";
  const body = isDark ? "text-gray-400" : "text-gray-600";
  const subHd = isDark ? "text-gray-300" : "text-gray-700";
  const dotClr = isDark ? "bg-gray-600" : "bg-gray-300";

  return (
    <div id={section.id} className="scroll-mt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 rounded-xl flex-shrink-0 ${section.bg}`}>
          <span className={section.color}>{section.icon}</span>
        </div>
        <h2 className={`text-lg font-bold ${text}`}>{section.title}</h2>
      </div>

      {/* Content blocks */}
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
              <Highlight
                key={i}
                variant={block.variant}
                body={block.body}
                isDark={isDark}
              />
            );
          }

          if (block.type === "list") {
            const isCheck = block.variant === "check";
            const isCross = block.variant === "cross";
            return (
              <div key={i} className="space-y-2">
                {block.heading && (
                  <p
                    className={`text-xs font-bold uppercase tracking-wider mb-2 ${subHd}`}
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
                      {isCheck ? (
                        <FiCheckCircle
                          size={14}
                          className="flex-shrink-0 mt-0.5 text-emerald-500"
                        />
                      ) : isCross ? (
                        <FiXCircle
                          size={14}
                          className="flex-shrink-0 mt-0.5 text-rose-500"
                        />
                      ) : (
                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${dotClr}`}
                        />
                      )}
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
const TermsPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeId, setActiveId] = useState("acceptance");

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
            Terms of Service
          </h1>
          <p className={`text-sm sm:text-base max-w-xl ${subtext}`}>
            These terms govern your use of ContestHub. They're written in plain
            language — take a few minutes to read them.
          </p>

          {/* Meta strip */}
          <div
            className={`flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-xs ${muted}`}
          >
            <span className="flex items-center gap-1.5">
              <FiRefreshCw size={12} /> Last updated: June 2026
            </span>
            <span className="flex items-center gap-1.5">
              <FiInfo size={12} /> Effective immediately for new users
            </span>
            <a
              href="mailto:legal@contesthub.io"
              className="flex items-center gap-1.5 text-indigo-500 hover:underline"
            >
              <FiMail size={12} /> legal@contesthub.io
            </a>
          </div>
        </div>

        {/* ── LAYOUT ── */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile: horizontal pill nav */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 mb-2 scrollbar-none">
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

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <nav
              className={`sticky top-6 ${card} ${shadow} rounded-2xl p-3 space-y-0.5`}
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

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-6">
            {SECTIONS.map((section) => (
              <div
                key={section.id}
                className={`${card} ${shadow} rounded-2xl p-5 sm:p-7`}
              >
                <Section section={section} isDark={isDark} />
              </div>
            ))}

            {/* ── Contact card ── */}
            <div className={`${card} ${shadow} rounded-2xl p-5 sm:p-7`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-indigo-500/10">
                  <FiMail size={19} className="text-indigo-500" />
                </div>
                <h2 className={`text-lg font-bold ${text}`}>
                  Questions about these Terms?
                </h2>
              </div>
              <p
                className={`text-sm leading-relaxed mb-5 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                If anything here is unclear, or if you need to raise a legal
                matter, our team is here to help.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    label: "Legal & Terms",
                    email: "legal@contesthub.io",
                    icon: <FiFileText size={15} />,
                    color: "text-indigo-500",
                    bg: "bg-indigo-500/10",
                  },
                  {
                    label: "Account Issues",
                    email: "support@contesthub.io",
                    icon: <FiUserCheck size={15} />,
                    color: "text-blue-500",
                    bg: "bg-blue-500/10",
                  },
                  {
                    label: "Payment Disputes",
                    email: "billing@contesthub.io",
                    icon: <FiDollarSign size={15} />,
                    color: "text-emerald-500",
                    bg: "bg-emerald-500/10",
                  },
                  {
                    label: "Abuse & Safety",
                    email: "safety@contesthub.io",
                    icon: <FiShield size={15} />,
                    color: "text-rose-500",
                    bg: "bg-rose-500/10",
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

            {/* Footer note */}
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

export default TermsPage;
