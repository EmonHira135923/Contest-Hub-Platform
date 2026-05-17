"use client";

import useAxiosSecure from "@/Componets/utils/hooks/useAxiosSecure";
import useTheme from "@/Componets/utils/hooks/useThemeValue";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

const PaymentSucces = () => {
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const trackingId = searchParams.get("trackingId");

  const { data, isLoading, error } = useQuery({
    queryKey: ["payment-success", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axiosSecure.patch(
        `/api/payment-success?session_id=${sessionId}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1>Verifying Payment...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1>Payment verification failed</h1>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex justify-center items-center ${
        theme === "dark"
          ? "bg-[#0f172a] text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="max-w-lg w-full p-8 rounded-3xl shadow-xl border">
        <h1 className="text-3xl font-black mb-4">Payment Successful 🎉</h1>

        <p className="mb-3">
          Your payment has been successfully verified.
        </p>

        <p className="mb-2">
          <span className="font-bold">Tracking ID:</span>{" "}
          {trackingId}
        </p>

        <p className="mb-2">
          <span className="font-bold">Transaction ID:</span>{" "}
          {data?.transactionId}
        </p>

        <p className="text-green-600 font-bold mt-4">
          Contest payment completed successfully.
        </p>
      </div>
    </div>
  );
};

export default PaymentSucces;