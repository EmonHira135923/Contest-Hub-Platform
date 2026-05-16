import AllCreator from "@/Componets/Pages/Dashboard/AllCreator";
import React from "react";

export const metadata = {
  title: "All Creators | Admin Dashboard | ContestHub",
  description:
    "Manage all creators on ContestHub from the admin dashboard. View creator profiles, monitor activity, and manage permissions.",

  keywords: [
    "all creators",
    "ContestHub creators",
    "admin dashboard",
    "creator management",
    "ContestHub admin",
  ],

  openGraph: {
    title: "All Creators | ContestHub Admin Dashboard",
    description:
      "Admin panel for managing all creators and their activities on ContestHub.",
    url: "https://your-domain.com/dashboard/all-creators",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "All Creators | ContestHub",
    description: "Manage all creators from the ContestHub admin dashboard.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const AllCratorpage = () => {
  return (
    <div>
      <AllCreator />
    </div>
  );
};

export default AllCratorpage;
