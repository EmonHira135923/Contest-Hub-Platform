import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllContests = (search = "", category = "") => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contests", search, category],
    queryFn: async () => {
      // আপনার API এখন Response.json({ success, data, categories }) রিটার্ন করে
      const res = await axiosSecure.get(
        `api/allcontest?q=${search}&category=${category}`,
      );
      return res.data;
    },
  });

  return {
    contests: data?.data || [],
    categories: data?.categories || [], // API থেকে আসা ইউনিক ক্যাটাগরি
    isLoading,
    refetch,
  };
};

export default useAllContests;
