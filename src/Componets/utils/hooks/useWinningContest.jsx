import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useWinningContest = (page = 1, limit = 10) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isPending, refetch, isError, error } = useQuery({
    queryKey: ["winningContest", user?.email, page, limit],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/allcontest/winningContest?email=${user.email}&page=${page}&limit=${limit}`,
      );

      return res.data;
    },
  });

  return {
    winningContests: data?.data || [],
    totalCount: data?.totalCount || 0,
    totalPages: data?.totalPages || 0,
    currentPage: data?.currentPage || page,
    limit: data?.limit || limit,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useWinningContest;
