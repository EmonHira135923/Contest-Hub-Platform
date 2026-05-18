import axios from "axios";

const useAxiosSecure = () => {
  // Use relative paths in the browser so requests follow the current origin/protocol.
  // When running on the server (SSR) fall back to NEXT_PUBLIC_API_URL or localhost.
  const baseURL =
    typeof window !== "undefined"
      ? ""
      : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const axiosSecure = axios.create({
    baseURL,
    withCredentials: true,
  });

  return axiosSecure;
};

export default useAxiosSecure;
