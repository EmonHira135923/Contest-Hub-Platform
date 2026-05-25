"use client";

import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCheckout = (contest) => {
  const { data: session, status } = useSession();
  const { user } = useAuth(); // কাস্টম ইউজার অবজেক্ট

  // 🔍 ১. দুটি সোর্স থেকেই ইমেইল এবং নাম নেওয়ার চেষ্টা করা হচ্ছে
  const userEmail = session?.user?.email || user?.email || "";
  const userName = session?.user?.name || user?.name || "Participant";

  // 🔐 ২. NextAuth অথবা Custom Auth — যেকোনো একটিতে সেশন বা ইউজার থাকলেই ট্রু হবে
  const isAuthenticated = status === "authenticated" || !!user;

  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async () => {
      // যদি কোনো সোর্স থেকেই ইমেইল না পাওয়া যায়
      if (!userEmail) {
        throw new Error("User email not found. Please log in again.");
      }

      const payload = {
        contestId: contest?._id,
        title: contest?.title,
        category: contest?.category,
        image: contest?.image,
        registrationFee: contest?.registrationFee,
        transactionId: contest?.payment_intent,
        userEmail,
        userName,
      };

      const response = await axiosSecure.post("/api/checkout", payload);

      if (!response || !response.data) {
        throw new Error("Invalid response from checkout API");
      }

      const data = response.data;

      if (!data.url) {
        throw new Error("Checkout URL was not returned from the server.");
      }

      return data;
    },
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    },
  });

  const handleCheckout = () => {
    if (!isAuthenticated) {
      mutation.reset();
      return;
    }
    mutation.mutate();
  };

  return {
    handleCheckout,
    isLoading: mutation.isPending,
    isError: mutation.isError || !isAuthenticated,
    error: !isAuthenticated
      ? "Please log in to continue with payment."
      : mutation.error?.message || "",
    isAuthenticated,
  };
};

export default useCheckout;
