"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllSubmission = (page = 1, limit = 10) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["allSubmissions", page, limit],
    queryFn: async () => {
      // ব্যাকএন্ডে অলরেডি কন্ডিশন হ্যান্ডেল করা আছে, তাই প্যারামিটার ক্লিন রাখা হলো
      const { data } = await axiosSecure.get(
        `/api/allcontest/contest-submit?page=${page}&limit=${limit}`,
      );
      return data;
    },
    placeholderData: (previousData) => previousData, // 🟢 পেজ চেঞ্জ করার সময় UI যাতে ফ্লিকার (ঝিলিক) না মারে
  });
};

export default useAllSubmission;
