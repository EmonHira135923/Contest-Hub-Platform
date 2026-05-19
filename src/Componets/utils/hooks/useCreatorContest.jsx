import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCreatorContest = (search = "", page = 1) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["creator-contests", search, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/allcontest/creator?search=${search}&page=${page}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    contests: data?.result || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 0,
    currentPage: data?.page || page,
    limit: data?.limit || 10,
    isLoading,
    error,
    refetch,
  };
};

export default useCreatorContest;
