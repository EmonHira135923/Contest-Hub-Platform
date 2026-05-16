import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCreators = ({
  search = "",
  status = "",
  district = "",
  phone = "",
  education = "",
  page = 1,
} = {}) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: creatorsData = { data: [], meta: {} },
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "creators",
      { search, status, district, phone, education, page },
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (status) params.append("status", status);
      if (district) params.append("district", district);
      if (phone) params.append("phone", phone);
      if (education) params.append("education", education);
      params.append("page", page);

      const response = await axiosSecure.get(
        `/api/creator?${params.toString()}`,
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  return {
    creators: creatorsData.data,
    meta: creatorsData.meta,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};

export default useCreators;
