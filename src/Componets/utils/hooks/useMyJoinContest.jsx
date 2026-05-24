import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMyJoinContest = (search = "", page = 1, limit = 10) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-contests", user?.email, search, page, limit],
    enabled: !!user?.email,
    queryFn: async () => {
      // URL থেকে ভুল কুয়েরি টেক্সট সরিয়ে params এর ভেতর অবজেক্ট হিসেবে পাঠানো হয়েছে
      const res = await axiosSecure.get("/api/payment-success", {
        params: {
          search,
          page,
          limit,
          paymentStatus: "paid", // ব্যাকএন্ড যদি এই কুয়েরি রিসিভ করতে পারে
        },
      });

      return res.data;
    },
  });

  return {
    contests: data?.result || [],
    meta: {
      total: data?.total || 0,
      page: data?.page || 1,
      limit: data?.limit || 10,
    },
    isLoading,
    refetch,
  };
};

export default useMyJoinContest;
