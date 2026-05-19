import AllAproveContest from "@/Componets/Pages/Dashboard/creator/AllAproveContest";
import React from "react";

export const metadata = {
  title: "Approved Contests | ContestHub",

  description:
    "View all approved contests created by you on ContestHub. Track published contests, status, and participation details.",

  keywords: [
    "approved contests",
    "creator contests",
    "ContestHub creator dashboard",
    "published contests",
  ],

  openGraph: {
    title: "Approved Contests | ContestHub",
    description:
      "Manage and monitor your approved contests from the creator dashboard on ContestHub.",
    url: "https://your-domain.com/dashboard/creator-contests",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Approved Contests | ContestHub",
    description:
      "Access all your approved and published contests on ContestHub.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const CreatorContest = () => {
  return (
    <div>
      <AllAproveContest />
    </div>
  );
};

export default CreatorContest;
