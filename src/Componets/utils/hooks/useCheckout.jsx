"use client";

import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAxiosSecure from "./useAxiosSecure";

const useCheckout = (contest) => {
  const { data: session, status } = useSession();

  const userEmail = session?.user?.email || "";
  const userName = session?.user?.name || "Participant";
  const isAuthenticated = status === "authenticated" && !!userEmail;

  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        contestId: contest._id,
        title: contest.title,
        category: contest.category,
        image: contest.image,
        registrationFee: contest.registrationFee,
        transactionId: contest.payment_intent,
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
      // navigate to stripe checkout
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
    isLoading: mutation.isLoading,
    isError: mutation.isError || !isAuthenticated,
    error: !isAuthenticated
      ? "Please log in to continue with payment."
      : mutation.error?.message || "",
    isAuthenticated,
  };
};

export default useCheckout;
