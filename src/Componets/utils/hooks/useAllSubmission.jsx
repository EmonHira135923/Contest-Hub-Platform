import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllSubmission = (page = 1, limit = 10) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    // queryKey-তে ডিপেন্ডেন্সি ট্র্যাকিং-এর জন্য page এবং limit রাখা ভালো
    queryKey: ["allSubmissions", page, limit],
    queryFn: async () => {
      // আপনার কাঙ্ক্ষিত API এন্ডপয়েন্ট ও কুয়েরি প্যারামিটার
      const { data } = await axiosSecure.get(
        `/api/allcontest/contest-submit?contestSubmissionStatus=submitted&page=${page}&limit=${limit}`,
      );
      console.log("useAllSubmission data:", data);
      return data;
    },
  });
};

export default useAllSubmission;
