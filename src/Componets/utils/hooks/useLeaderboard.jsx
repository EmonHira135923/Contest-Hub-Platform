import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useLeaderboard(page = 1, limit = 50) {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["leaderboard", page, limit],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/leaderboard?page=${page}&limit=${limit}`);
      return data;
    },
  });
}