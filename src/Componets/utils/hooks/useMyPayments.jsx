import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMyPayments = (search = "", page = 1, limit = 10) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    // Keep user.email in the queryKey so it refetches if the user changes
    queryKey: ["my-payments", user?.email, search, page, limit],
    enabled: !!user?.email, // Don't run the query until the user is logged in
    queryFn: async () => {
      // Removed the email from the URL path since the backend handles it via token
      const res = await axiosSecure.get("/api/payment-success", {
        params: { search, page, limit },
      });

      return res.data;
    },
  });

  return {
    payments: data?.result || [], // Maps to backend 'result'
    meta: {
      total: data?.total || 0,
      page: data?.page || 1,
      limit: data?.limit || 10,
    },
    isLoading,
    refetch,
  };
};

export default useMyPayments;
