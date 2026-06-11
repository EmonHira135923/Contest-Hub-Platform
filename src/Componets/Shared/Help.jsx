"use client";
import React, { useState } from "react";
import useTheme from "../utils/hooks/useThemeValue";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiBook,
  FiAward,
  FiUserCheck,
  FiShield,
  FiDollarSign,
  FiHelpCircle,
  FiMail,
  FiMessageCircle,
  FiZap,
  FiUsers,
  FiEdit3,
  FiCheckCircle,
  FiAlertCircle,
  FiExternalLink,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

/* ─── DATA ─── */
const CATEGORIES = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: <FiZap size={18} />,
  },
  { id: "contests", label: "Contests", icon: <FiAward size={18} /> },
  { id: "participants", label: "Participants", icon: <FiUsers size={18} /> },
  { id: "creators", label: "For Creators", icon: <FiEdit3 size={18} /> },
  { id: "payments", label: "Payments", icon: <FiDollarSign size={18} /> },
  { id: "account", label: "Account", icon: <FiUserCheck size={18} /> },
  { id: "safety", label: "Safety & Rules", icon: <FiShield size={18} /> },
];

const FAQS = [
  /* Getting Started */
  {
    id: 1,
    category: "getting-started",
    q: "What is ContestHub?",
    a: "ContestHub is a competitive platform where creators host skill-based contests and participants compete to win prizes. Categories range from software development and data science to design, cybersecurity, and more.",
  },
  {
    id: 2,
    category: "getting-started",
    q: "How do I create an account?",
    a: "Click 'Sign Up' on the homepage and register with your email or Google account. Once verified, you can join contests as a participant or apply to become a contest creator.",
  },
  {
    id: 3,
    category: "getting-started",
    q: "Is ContestHub free to join?",
    a: "Creating an account is free. Individual contests may have registration fees set by the creator — these are clearly shown on each contest card before you register.",
  },
  /* Contests */
  {
    id: 4,
    category: "contests",
    q: "How does contest approval work?",
    a: "All contests created on ContestHub are reviewed by our admin team before going live. This ensures quality, fair rules, and compliance with our platform guidelines. You'll be notified once your contest is approved or if changes are needed.",
  },
  {
    id: 5,
    category: "contests",
    q: "What happens when a contest deadline passes?",
    a: "Once a contest deadline has passed, the contest is locked. No new participants can register, and the creator can no longer edit or delete the contest. Results and prize distribution happen after the deadline.",
  },
  {
    id: 6,
    category: "contests",
    q: "Can I view a contest without participating?",
    a: "Yes. All approved contests are publicly visible. You can browse the details, rules, and prize structure without registering. Click 'View Details' on any contest card.",
  },
  /* Participants */
  {
    id: 7,
    category: "participants",
    q: "How do I register for a contest?",
    a: "Open the contest detail page and click 'Register Now'. If there's a registration fee, you'll be taken to the payment screen. Once payment is confirmed, you're officially entered.",
  },
  {
    id: 8,
    category: "participants",
    q: "Can I withdraw from a contest after registering?",
    a: "Withdrawals are allowed up to 24 hours before the contest deadline. Registration fees are non-refundable unless the contest is cancelled by the creator or removed by an admin.",
  },
  {
    id: 9,
    category: "participants",
    q: "How are winners selected?",
    a: "Each contest has its own judging criteria defined by the creator — these are visible in the contest instructions. Some use automated scoring, others use manual judging panels.",
  },
  /* Creators */
  {
    id: 10,
    category: "creators",
    q: "How do I create a contest?",
    a: "Go to your Creator Dashboard and click 'Create Contest'. Fill in the title, description, category, prize, registration fee, deadline, and instructions. Submit it for admin review — it will go live once approved.",
  },
  {
    id: 11,
    category: "creators",
    q: "What fields can I edit after a contest is approved?",
    a: "You can edit the contest title, prize amount, registration fee, description, and instructions at any time before the deadline. Once the deadline passes, the contest is fully locked and no edits are possible.",
  },
  {
    id: 12,
    category: "creators",
    q: "Can I delete a contest?",
    a: "Yes, you can delete a contest before the deadline. If participants have already registered, you should contact them before deleting. Contests past their deadline cannot be deleted.",
  },
  /* Payments */
  {
    id: 13,
    category: "payments",
    q: "What payment methods are supported?",
    a: "ContestHub supports credit/debit cards, and major digital wallets. All transactions are processed through our secure payment partner. Your card details are never stored on our servers.",
  },
  {
    id: 14,
    category: "payments",
    q: "How are prize payouts handled?",
    a: "Prizes are distributed to winners within 7 business days of the contest closing. Funds are sent to your registered payout account. You can manage your payout settings in Account Settings.",
  },
  {
    id: 15,
    category: "payments",
    q: "Are registration fees refundable?",
    a: "Registration fees are non-refundable once the contest begins. If a contest is cancelled by the creator or taken down by an admin, all fees are fully refunded within 5–7 business days.",
  },
  /* Account */
  {
    id: 16,
    category: "account",
    q: "How do I reset my password?",
    a: "Click 'Forgot Password' on the login page. Enter your registered email and we'll send a reset link valid for 30 minutes.",
  },
  {
    id: 17,
    category: "account",
    q: "Can I change my email address?",
    a: "Yes. Go to Account Settings → Profile → Edit Email. A verification link will be sent to your new email before the change takes effect.",
  },
  /* Safety */
  {
    id: 18,
    category: "safety",
    q: "What is ContestHub's anti-cheating policy?",
    a: "All submissions are screened for plagiarism and rule violations using automated tools. Violations result in immediate disqualification and a possible account ban. We take fair play seriously.",
  },
  {
    id: 19,
    category: "safety",
    q: "How do I report a problematic contest or user?",
    a: "Use the 'Report' button available on every contest page and user profile. Our moderation team reviews all reports within 24–48 hours.",
  },
];

const GUIDES = [
  {
    icon: <FiAward size={20} />,
    title: "Join Your First Contest",
    desc: "Step-by-step walkthrough from browsing to submission.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: <FiEdit3 size={20} />,
    title: "Create a Contest",
    desc: "Everything creators need to launch a successful contest.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: <FiDollarSign size={20} />,
    title: "Payments & Prizes",
    desc: "How registration fees, escrow, and payouts work.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: <FiShield size={20} />,
    title: "Community Rules",
    desc: "Fair play guidelines every contestant must follow.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

/* ─── FAQ ITEM ─── */
const FaqItem = ({ faq, isDark }) => {
  const [open, setOpen] = useState(false);
  const border = isDark ? "border-gray-800" : "border-gray-100";
  const itemBg = isDark ? "bg-gray-900" : "bg-white";
  const textCls = isDark ? "text-gray-100" : "text-gray-900";
  const bodyCls = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <div
      className={`${itemBg} border ${border} rounded-2xl overflow-hidden transition-shadow ${open ? "shadow-md" : "shadow-sm"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors
          ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-gray-50"}`}
      >
        <span className={`text-sm font-semibold ${textCls}`}>{faq.q}</span>
        <span
          className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-0" : ""} ${isDark ? "text-gray-500" : "text-gray-400"}`}
        >
          {open ? <FiChevronUp size={17} /> : <FiChevronDown size={17} />}
        </span>
      </button>
      {open && (
        <div
          className={`px-5 pb-5 text-sm leading-relaxed ${bodyCls} border-t ${border} pt-4`}
        >
          {faq.a}
        </div>
      )}
    </div>
  );
};

/* ─── MAIN ─── */
const Help = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  /* filtered FAQs */
  const filtered = FAQS.filter((f) => {
    const matchTab = activeTab === "all" || f.category === activeTab;
    const matchSearch =
      search.trim() === "" ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  /* theme tokens */
  const bg = isDark ? "bg-gray-950" : "bg-slate-50";
  const card = isDark ? "bg-gray-900" : "bg-white";
  const text = isDark ? "text-gray-100" : "text-gray-900";
  const subtext = isDark ? "text-gray-400" : "text-gray-500";
  const muted = isDark ? "text-gray-500" : "text-gray-400";
  const border = isDark ? "border-gray-800" : "border-gray-200";
  const shadow = isDark ? "ring-1 ring-white/5 shadow-none" : "shadow-sm";

  const searchBg = isDark
    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-600"
    : "bg-white    border-gray-200 text-gray-900 placeholder-gray-400";

  const tabActive = isDark
    ? "bg-indigo-600 text-white"
    : "bg-indigo-600 text-white";
  const tabInactive = isDark
    ? "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
    : "bg-white    text-gray-500 hover:bg-gray-100 hover:text-gray-700";

  return (
    <div className={`min-h-screen ${bg} ${text}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {/* ── HERO ── */}
        <div className="text-center space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
            bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 mb-2"
          >
            <HiOutlineSparkles size={13} /> Help Center
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${text}`}
          >
            How can we help you?
          </h1>
          <p className={`text-sm sm:text-base max-w-lg mx-auto ${subtext}`}>
            Find answers to common questions, browse guides, or get in touch
            with our support team.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mt-4">
            <FiSearch
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${muted}`}
              size={17}
            />
            <input
              type="text"
              placeholder="Search for answers…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveTab("all");
              }}
              className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm outline-none transition
                focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400 ${searchBg}`}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium ${muted} hover:${text} transition`}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── QUICK GUIDES ── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <FiBook size={17} className="text-indigo-500" />
            <h2 className={`text-base font-bold ${text}`}>Quick Guides</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GUIDES.map((g) => (
              <div
                key={g.title}
                className={`${card} ${shadow} rounded-2xl p-5 flex items-start gap-4 cursor-pointer group
                  transition-all hover:-translate-y-0.5 hover:shadow-md`}
              >
                <div className={`p-2.5 rounded-xl flex-shrink-0 ${g.bg}`}>
                  <span className={g.color}>{g.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold ${text} group-hover:text-indigo-500 transition-colors`}
                  >
                    {g.title}
                  </p>
                  <p className={`text-xs mt-0.5 ${subtext}`}>{g.desc}</p>
                </div>
                <FiExternalLink
                  size={14}
                  className={`flex-shrink-0 mt-1 ${muted} group-hover:text-indigo-500 transition-colors`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <FiHelpCircle size={17} className="text-indigo-500" />
            <h2 className={`text-base font-bold ${text}`}>
              Frequently Asked Questions
            </h2>
          </div>

          {/* Category tabs — horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition
                ${activeTab === "all" ? tabActive : tabInactive}`}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition
                  ${activeTab === c.id ? tabActive : tabInactive}`}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          {filtered.length === 0 ? (
            <div className={`text-center py-16 ${subtext}`}>
              <FiSearch className="mx-auto mb-3 opacity-20" size={32} />
              <p className="text-sm font-medium">No results found</p>
              <p className="text-xs mt-1 opacity-70">
                Try a different keyword or browse all categories
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filtered.map((faq) => (
                <FaqItem key={faq.id} faq={faq} isDark={isDark} />
              ))}
            </div>
          )}

          {/* Result count */}
          {search && filtered.length > 0 && (
            <p className={`text-xs mt-4 ${muted}`}>
              Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}{" "}
              for "{search}"
            </p>
          )}
        </section>

        {/* ── STATUS INDICATORS ── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <FiCheckCircle size={17} className="text-indigo-500" />
            <h2 className={`text-base font-bold ${text}`}>
              Contest Status Guide
            </h2>
          </div>
          <div className={`${card} ${shadow} rounded-2xl overflow-hidden`}>
            {[
              {
                status: "Approved",
                color:
                  "bg-emerald-50 border border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-700",
                desc: "Contest is live and open for registration.",
              },
              {
                status: "Pending",
                color:
                  "bg-amber-50  border border-amber-300   text-amber-700  dark:bg-amber-950/40  dark:text-amber-400  dark:border-amber-700",
                desc: "Awaiting admin review — not yet visible to the public.",
              },
              {
                status: "Rejected",
                color:
                  "bg-rose-50   border border-rose-300    text-rose-700   dark:bg-rose-950/40   dark:text-rose-400   dark:border-rose-700",
                desc: "Did not meet platform guidelines. Check feedback and resubmit.",
              },
              {
                status: "Expired",
                color: `px-2 py-0.5 rounded-md text-xs font-semibold ${isDark ? "bg-red-950/40 text-red-400" : "bg-red-50 text-red-500"}`,
                desc: "Deadline has passed. Contest is locked — editing and deletion disabled.",
                custom: true,
              },
            ].map(({ status, color, desc, custom }, i) => (
              <div
                key={status}
                className={`flex items-center gap-4 px-5 py-4
                  ${i > 0 ? `border-t ${border}` : ""}
                  ${isDark ? "hover:bg-white/[0.02]" : "hover:bg-gray-50/70"} transition-colors`}
              >
                {custom ? (
                  <span className={color}>{status}</span>
                ) : (
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${color}`}
                  >
                    {status}
                  </span>
                )}
                <p className={`text-sm ${subtext}`}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <FiMessageCircle size={17} className="text-indigo-500" />
            <h2 className={`text-base font-bold ${text}`}>Still need help?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Email */}
            <a
              href="mailto:support@contesthub.io"
              className={`${card} ${shadow} rounded-2xl p-5 flex items-start gap-4 group
                hover:-translate-y-0.5 hover:shadow-md transition-all`}
            >
              <div className="p-2.5 rounded-xl bg-indigo-500/10 flex-shrink-0">
                <FiMail size={20} className="text-indigo-500" />
              </div>
              <div>
                <p
                  className={`text-sm font-semibold ${text} group-hover:text-indigo-500 transition-colors`}
                >
                  Email Support
                </p>
                <p className={`text-xs mt-0.5 ${subtext}`}>
                  support@contesthub.io
                </p>
                <p className={`text-xs mt-2 ${muted}`}>
                  Response within 24 hours
                </p>
              </div>
            </a>

            {/* Live chat */}
            <div
              className={`${card} ${shadow} rounded-2xl p-5 flex items-start gap-4 cursor-pointer group
                hover:-translate-y-0.5 hover:shadow-md transition-all`}
            >
              <div className="p-2.5 rounded-xl bg-emerald-500/10 flex-shrink-0">
                <FiMessageCircle size={20} className="text-emerald-500" />
              </div>
              <div>
                <p
                  className={`text-sm font-semibold ${text} group-hover:text-emerald-500 transition-colors`}
                >
                  Live Chat
                </p>
                <p className={`text-xs mt-0.5 ${subtext}`}>
                  Chat with our support team
                </p>
                <p className={`text-xs mt-2`}>
                  <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available 9am – 6pm UTC
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER NOTE ── */}
        <div className={`text-center text-xs ${muted} pb-4`}>
          <FiAlertCircle size={13} className="inline mr-1 -mt-0.5" />
          For account security issues or urgent matters, please email{" "}
          <a
            href="mailto:security@contesthub.io"
            className="text-indigo-500 hover:underline"
          >
            security@contesthub.io
          </a>
        </div>
      </div>
    </div>
  );
};

export default Help;
