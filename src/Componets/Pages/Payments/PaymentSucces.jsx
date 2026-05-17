"use client";

import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

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
    retry: false, // don't retry a PATCH — it may double-process
    queryFn: async () => {
      const res = await axiosSecure.patch(
        `/api/payment-success?session_id=${sessionId}`,
      );
      return res.data;
    },
  });

  const bg =
    theme === "dark" ? "bg-[#0f172a] text-white" : "bg-white text-black";

  if (isLoading) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${bg}`}>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin opacity-40" />
          <p className="text-sm opacity-60">Verifying your payment…</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${bg}`}>
        <div className="max-w-sm w-full p-8 rounded-2xl border text-center space-y-3">
          <p className="text-2xl">⚠️</p>
          <h1 className="text-xl font-medium">Verification failed</h1>
          <p className="text-sm opacity-60">
            We couldn't confirm your payment. Please contact support with your
            tracking ID.
          </p>
          {trackingId && (
            <p className="text-xs font-mono opacity-40">{trackingId}</p>
          )}
          <button
            onClick={() => router.push("/")}
            className="mt-4 w-full py-2 rounded-lg border text-sm hover:bg-black/5 transition"
          >
            Return home
          </button>
        </div>
      </div>
    );
  }

  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={`min-h-screen flex justify-center items-center px-4 ${bg}`}>
      <div className="max-w-md w-full p-8 rounded-2xl shadow-sm border space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-3xl">
            ✓
          </div>
          <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            Verified
          </span>
          <h1 className="text-2xl font-medium">Payment successful</h1>
          <p className="text-sm opacity-60">
            Your contest payment has been confirmed and recorded.
          </p>
        </div>

        <hr className="opacity-10" />

        {/* Details */}
        <dl className="space-y-3 text-sm">
          {[
            { label: "Tracking ID", value: trackingId },
            { label: "Transaction ID", value: data.transactionId },
            { label: "Date", value: date },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <dt className="opacity-50">{label}</dt>
              <dd className="font-mono text-xs">{value ?? "—"}</dd>
            </div>
          ))}
        </dl>

        <hr className="opacity-10" />

        {/* Action */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full py-2.5 rounded-xl border text-sm font-medium hover:bg-black/5 transition"
        >
          Go to dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
