import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = (enabledOrSearch = true, search = "", page = 1, limit = 10) => {
  const axiosSecure = useAxiosSecure();

  const enabled = typeof enabledOrSearch === "boolean" ? enabledOrSearch : true;
  const searchTerm = typeof enabledOrSearch === "string" ? enabledOrSearch : search;
  const pageNumber = typeof enabledOrSearch === "string" ? search : page;
  const limitNumber = typeof enabledOrSearch === "string" ? page : limit;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", enabled, searchTerm, pageNumber, limitNumber],
    enabled,
    queryFn: async () => {
      const res = await axiosSecure.get("/api/auth/register", {
        params: { search: searchTerm, page: pageNumber, limit: limitNumber },
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
