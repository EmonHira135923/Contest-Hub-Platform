"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/Componets/utils/hooks/useAuth";

const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mb-4 animate-pulse text-2xl font-bold">Checking authentication...</div>
          <p className="text-sm text-slate-300">
            Redirecting to login if you are not signed in.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
