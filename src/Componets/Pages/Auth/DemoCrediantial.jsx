"use client";
import { useState } from "react";
import { Copy, Check, KeyRound } from "lucide-react";

const credentials = [
  { role: "Creator", email: "user@gmail.com", password: "123456Aa!" },
  { role: "Admin", email: "admin@gmail.com", password: "123456Aa!" },
];

const roleBadge = {
  Creator: "bg-blue-600 text-white",
  Admin: "bg-green-600 text-white",
};

function CopyButton({ value, isDark }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className={`transition-colors ml-1 ${
        isDark
          ? "text-zinc-500 hover:text-zinc-300"
          : "text-zinc-400 hover:text-zinc-600"
      }`}
      aria-label="Copy"
    >
      {copied ? (
        <Check size={11} className="text-green-500" />
      ) : (
        <Copy size={11} />
      )}
    </button>
  );
}

export default function DemoCredential({ isDark }) {
  return (
    <div
      className={`border rounded-lg p-3 w-full mt-3 transition-colors ${
        isDark
          ? "bg-[#1a1a2e] border-zinc-700/50"
          : "bg-white border-zinc-200 shadow-sm"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center gap-2 pb-2 mb-2 border-b ${
          isDark ? "border-zinc-700/50" : "border-zinc-100"
        }`}
      >
        <div
          className={`w-6 h-6 rounded-md flex items-center justify-center ${
            isDark ? "bg-indigo-600/20" : "bg-indigo-50"
          }`}
        >
          <KeyRound
            size={13}
            className={isDark ? "text-indigo-400" : "text-indigo-600"}
          />
        </div>
        <div>
          <p
            className={`text-[12px] font-semibold leading-none ${
              isDark ? "text-zinc-100" : "text-zinc-800"
            }`}
          >
            Demo credentials
          </p>
          <p
            className={`text-[10px] mt-0.5 ${
              isDark ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            For testing purposes only
          </p>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {credentials.map(({ role, email, password }) => (
          <div key={role}>
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded mb-1 inline-block ${roleBadge[role]}`}
            >
              {role}
            </span>
            <div className="grid grid-cols-2 gap-x-3">
              {[
                ["Email", email],
                ["Password", password],
              ].map(([label, val]) => (
                <div key={label}>
                  <p
                    className={`text-[9px] uppercase tracking-wide mb-0.5 ${
                      isDark ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  >
                    {label}
                  </p>
                  <div className="flex items-center">
                    <span
                      className={`text-[11px] font-mono ${
                        isDark ? "text-zinc-200" : "text-zinc-700"
                      }`}
                    >
                      {val}
                    </span>
                    <CopyButton value={val} isDark={isDark} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
