import React from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import DashboardHome from "@/Componets/Pages/Dashboard/DashboardHome";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  let role = "user";

  if (token) {
    try {
      const secret = new TextEncoder().encode(
        process.env.NEXTAUTH_SECRET_KEY
      );

      const { payload } = await jwtVerify(token, secret);
      role = payload?.role || "user";
    } catch (error) {
      console.log("Metadata JWT Error:", error);
    }
  }

  const roleTitles = {
    admin: "Admin Dashboard",
    creator: "Contest Creator Dashboard",
    user: "User Dashboard",
  };

  const currentTitle = roleTitles[role.toLowerCase()] || "Dashboard";

  return {
    title: `${currentTitle} | ContestHub`,
    description: `Access your ${role} dashboard on ContestHub to manage contests, submissions, analytics, and profile settings.`,

    keywords: [
      "ContestHub dashboard",
      "contest dashboard",
      "admin dashboard",
      "creator dashboard",
      role,
    ],

    openGraph: {
      title: `${currentTitle} | ContestHub`,
      description: `Manage your ContestHub activities as a ${role}.`,
      url: "https://your-domain.com/dashboard",
      siteName: "ContestHub",
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${currentTitle} | ContestHub`,
      description: `Access your ${role} dashboard on ContestHub.`,
    },

    robots: {
      index: false,
      follow: false,
    },
  };
}

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <DashboardHome />
    </div>
  );
};

export default Dashboard;