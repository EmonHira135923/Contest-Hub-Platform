"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAxiosSecure from "../utils/hooks/useAxiosSecure";
import { signOut, useSession } from "next-auth/react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  
  // NextAuth থেকে সেশন ডাটা আনা
  const { data: session, status } = useSession();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get("/api/auth/myprofile");
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ১. যদি NextAuth সেশন থাকে, তবে সেটাকে ইউজারে সেট করুন
    if (status === "authenticated" && session?.user) {
      setUser(session.user);
      setLoading(false);
    } 
    // ২. যদি সেশন না থাকে কিন্তু আপনার কাস্টম টোকেন থাকে (যেকোনো একটি উপায়ে চেক করা)
    else if (status === "unauthenticated") {
      fetchUser();
    }
  }, [session, status]);

  // Logout function (সোশ্যাল এবং কাস্টম দুইটাই হ্যান্ডেল করবে)
  const logout = async () => {
    try {
      // যদি সোশ্যাল লগইন থাকে
      if (session) {
        await signOut({ redirect: false });
      }

      // আপনার কাস্টম লগআউট API কল
      const { data } = await axiosSecure.post("/api/auth/logout");
      
      if (data.success || status === "unauthenticated") {
        setUser(null);
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // এরর খেলেও ইউজার ক্লিয়ার করে দেওয়া সেফ সাইড
      setUser(null);
      router.push("/auth/login");
    }
  };

  const authInfo = {
    user,
    loading: loading || status === "loading", // NextAuth এর লোডিংও চেক করবে
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