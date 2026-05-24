import MyContestPage from "@/Componets/Pages/Dashboard/MyContestPage";
import React from "react";

export const metadata = {
  title: "My Contests | ContestHub",

  description:
    "View and manage all contests you have joined or created on ContestHub. Track participation, status, and results.",

  keywords: [
    "my contests",
    "ContestHub contests",
    "user contests",
    "joined contests",
    "created contests",
  ],

  openGraph: {
    title: "My Contests | ContestHub",
    description: "Manage all your joined and created contests in ContestHub.",
    url: "https://your-domain.com/dashboard/my-contests",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "My Contests | ContestHub",
    description: "Track your contest participation and created contests.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const MyContest = () => {
  return (
    <div>
      <MyContestPage />
    </div>
  );
};

export default MyContest;
