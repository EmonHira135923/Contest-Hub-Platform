import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  return axiosSecure;
};

export default useAxiosSecure;