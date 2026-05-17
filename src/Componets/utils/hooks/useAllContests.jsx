import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllContests = (search = "", category = "", page = 1) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contests", search, category, page],
    queryFn: async () => {
      // আপনার API এখন Response.json({ success, data, categories, totalPages, page }) রিটার্ন করে
      const res = await axiosSecure.get(
        `api/allcontest?q=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&page=${page}`,
      );
      return res.data;
    },
  });

  return {
    contests: data?.data || [],
    categories: data?.categories || [], // API থেকে আসা ইউনিক ক্যাটাগরি
    totalPages: data?.totalPages || 1,
    currentPage: data?.page || page,
    totalCount: data?.totalCount || 0,
    isLoading,
    refetch,
  };
};

export default useAllContests;
