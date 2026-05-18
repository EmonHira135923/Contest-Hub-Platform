"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminContest = () => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const adminStatus = "pending";

  const fetchContests = async () => {
    const { data } = await axiosSecure.get(
      `/api/allcontest/admin?q=${search}&adminStatus=${adminStatus}&page=${page}&limit=10`,
    );

    return data;
  };

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["admin-contests", page, search, adminStatus],
    queryFn: fetchContests,
  });

  return {
    contests: data?.data || [],
    totalCount: data?.totalCount || 0,
    totalPages: data?.totalPages || 1,

    page,
    setPage,

    search,
    setSearch,

    loading: isLoading,
    fetching: isFetching,

    refetch,
  };
};

export default useAdminContest;
