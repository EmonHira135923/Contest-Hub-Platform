import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCreatorOwnContest = (search = "", page = 1, enabled = true) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    // The query triggers automatically whenever user.email, search, page, or enabled changes
    queryKey: ["creatorContests", user?.email, search, page, enabled],
    queryFn: async () => {
      if (!user?.email) return null;

      const response = await axiosSecure.get(
        `/api/allcontest/creator?search=${search}&page=${page}`,
      );
      return response.data;
    },
    enabled: !!user?.email && enabled,
  });

  return {
    contests: data?.result || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    isLoading,
    error,
    refetch,
  };
};

export default useCreatorOwnContest;
