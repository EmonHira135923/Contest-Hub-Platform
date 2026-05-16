import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = (search = "", page = 1, limit = 10) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", search, page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/auth/register", {
        params: { search, page, limit },
      });

      return res.data;
    },
  });

  return {
    users: data?.data || [],
    meta: data?.meta || {},
    isLoading,
    refetch,
  };
};

export default useUsers;
