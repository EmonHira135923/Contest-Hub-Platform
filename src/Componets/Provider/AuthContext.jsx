"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Router ইমপোর্ট করুন
import useAxiosSecure from "../utils/hooks/useAxiosSecure";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const router = useRouter(); // Router ইনিশিয়ালাইজ করুন

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get("/api/auth/myprofile");
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      // 401 এরর সাইলেন্ট রাখার জন্য কনসোল অফ রাখা হয়েছে
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      const { data } = await axiosSecure.post("/api/auth/logout");
      
      if (data.success) {
        setUser(null); // ইউজার স্টেট ক্লিয়ার
        router.push("/auth/login"); // লগইন পেজে পাঠিয়ে দেওয়া
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const authInfo = {
    user,
    loading,
    setUser,
    logout,
    reFetch: fetchUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};