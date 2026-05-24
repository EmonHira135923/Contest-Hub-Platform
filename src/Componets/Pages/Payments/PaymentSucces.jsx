"use client";

import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import {
  TbCircleCheck,
  TbAlertTriangle,
  TbHash,
  TbCreditCard,
  TbCalendar,
  TbCopy,
  TbArrowRight,
  TbHome,
  TbLoader2,
  TbShieldCheck,
} from "react-icons/tb";

const PaymentSuccess = () => {
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams.get("session_id");
  const trackingId = searchParams.get("trackingId");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["payment-success", sessionId],
    enabled: !!sessionId,
    retry: false,
    queryFn: async () => {
      const res = await axiosSecure.patch(
        `/api/payment-success?session_id=${sessionId}`,
      );
      return res.data;
    },
  });

  const dark = theme === "dark";

  const page = `min-h-screen flex items-center justify-center px-4 transition-colors ${
    dark ? "bg-slate-950" : "bg-slate-100"
  }`;

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className={page}>
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              dark ? "bg-slate-800" : "bg-white"
            }`}
          >
            <TbLoader2
              className={`w-6 h-6 animate-spin ${
                dark ? "text-slate-400" : "text-slate-400"
              }`}
            />
          </div>
          <p
            className={`text-sm font-medium ${
              dark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Verifying your payment…
          </p>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (isError || !data) {
    return (
      <div className={page}>
        <div
          className={`w-full max-w-sm rounded-2xl border overflow-hidden ${
            dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}
        >
          {/* top accent */}
          <div className="h-1 w-full bg-amber-400" />

          <div className="p-8 flex flex-col items-center gap-5 text-center">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                dark ? "bg-amber-900/30" : "bg-amber-50"
              }`}
            >
              <TbAlertTriangle
                className={`w-7 h-7 ${
                  dark ? "text-amber-400" : "text-amber-500"
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <h1
                className={`text-lg font-semibold ${
                  dark ? "text-white" : "text-slate-900"
                }`}
              >
                Verification failed
              </h1>
              <p
                className={`text-sm leading-relaxed ${
                  dark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                We could not confirm your payment. Contact support with your
                tracking ID below.
              </p>
            </div>

            {trackingId && (
              <div
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border ${
                  dark
                    ? "bg-slate-800 border-slate-700"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <TbHash
                  className={`w-4 h-4 shrink-0 ${
                    dark ? "text-slate-500" : "text-slate-400"
                  }`}
                />
                <span
                  className={`font-mono text-xs truncate ${
                    dark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {trackingId}
                </span>
              </div>
            )}

            <button
              onClick={() => router.push("/")}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border transition-colors ${
                dark
                  ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <TbHome className="w-4 h-4" />
              Return home
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Success ── */
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const rows = [
    { icon: TbHash, label: "Tracking ID", value: trackingId, mono: true },
    {
      icon: TbCreditCard,
      label: "Transaction ID",
      value: data.transactionId,
      mono: true,
    },
    { icon: TbCalendar, label: "Date", value: date, mono: false },
  ];

  const handleCopy = () =>
    trackingId && navigator.clipboard.writeText(trackingId);

  return (
    <div className={page}>
      <div className="w-full max-w-sm flex flex-col gap-3">
        {/* ── Security badge ── */}
        <div
          className={`flex items-center justify-between px-4 py-2.5 rounded-xl border ${
            dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <TbShieldCheck
              className={`w-4 h-4 ${
                dark ? "text-emerald-400" : "text-emerald-600"
              }`}
            />
            <span
              className={`text-xs font-medium ${
                dark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Secured & verified
            </span>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              dark
                ? "bg-emerald-900/40 text-emerald-400"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            Paid
          </span>
        </div>

        {/* ── Main card ── */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}
        >
          {/* Top accent stripe */}
          <div className="h-1 w-full bg-emerald-500" />

          {/* Hero */}
          <div
            className={`px-8 pt-7 pb-6 flex flex-col items-center gap-4 border-b ${
              dark ? "border-slate-800" : "border-slate-100"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                dark ? "bg-emerald-900/40" : "bg-emerald-50"
              }`}
            >
              <TbCircleCheck
                className={`w-8 h-8 ${
                  dark ? "text-emerald-400" : "text-emerald-600"
                }`}
              />
            </div>

            <div className="text-center space-y-1">
              <p
                className={`text-xs font-semibold uppercase tracking-widest ${
                  dark ? "text-emerald-400" : "text-emerald-600"
                }`}
              >
                Payment successful
              </p>
              <h1
                className={`text-xl font-semibold ${
                  dark ? "text-white" : "text-slate-900"
                }`}
              >
                All done!
              </h1>
              <p
                className={`text-sm leading-relaxed ${
                  dark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Your contest entry has been confirmed and recorded.
              </p>
            </div>
          </div>

          {/* Detail rows */}
          <div className="px-6">
            {rows.map(({ icon: Icon, label, value, mono }, i) => (
              <div
                key={label}
                className={`flex items-center justify-between py-3.5 ${
                  i < rows.length - 1
                    ? `border-b ${
                        dark ? "border-slate-800" : "border-slate-100"
                      }`
                    : ""
                }`}
              >
                <span
                  className={`flex items-center gap-2 text-sm ${
                    dark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </span>
                <span
                  className={`text-xs ${
                    mono ? "font-mono" : ""
                  } ${dark ? "text-slate-200" : "text-slate-800"} ${
                    value ? "" : "opacity-40"
                  }`}
                  style={{ fontFamily: mono ? "monospace" : undefined }}
                >
                  {(() => {
                    const mono = rows[i].mono;
                    return (
                      <span
                        className={`text-xs ${dark ? "text-slate-200" : "text-slate-800"}`}
                        style={{ fontFamily: mono ? "monospace" : undefined }}
                      >
                        {value ?? "—"}
                      </span>
                    );
                  })()}
                </span>
              </div>
            ))}
          </div>

          {/* Copy button */}
          <div
            className={`px-6 py-4 border-t ${
              dark ? "border-slate-800" : "border-slate-100"
            }`}
          >
            <button
              onClick={handleCopy}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
                dark
                  ? "border-slate-700 text-slate-400 hover:bg-slate-800"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <TbCopy className="w-4 h-4" />
              Copy tracking ID
            </button>
          </div>
        </div>

        {/* ── Primary CTA ── */}
        <button
          onClick={() => router.push("/dashboard")}
          className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-semibold transition-colors ${
            dark
              ? "bg-white text-slate-900 hover:bg-slate-100"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          Go to dashboard
          <TbArrowRight className="w-4 h-4" />
        </button>

        {/* ── Footer ── */}
        <p
          className={`text-center text-xs ${
            dark ? "text-slate-600" : "text-slate-400"
          }`}
        >
          Need help?{" "}
          <button
            onClick={() => router.push("/support")}
            className={`underline underline-offset-2 transition-colors ${
              dark
                ? "text-slate-400 hover:text-slate-300"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Contact support
          </button>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
