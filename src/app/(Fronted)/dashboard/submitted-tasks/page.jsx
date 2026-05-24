import SubmittedAllContestPage from "@/Componets/Pages/Dashboard/creator/SubmittedAllContestPage";
import React from "react";

export const metadata = {
  title: "Submitted Contests | ContestHub",

  description:
    "View all submitted contest entries on ContestHub. Track submissions, participation, and contest results as a creator.",

  keywords: [
    "submitted contests",
    "contest submissions",
    "ContestHub creator",
    "contest entries",
    "submission dashboard",
  ],

  openGraph: {
    title: "Submitted Contests | ContestHub",
    description: "Track all contest submissions and entries on ContestHub.",
    url: "https://your-domain.com/dashboard/submitted-contests",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Submitted Contests | ContestHub",
    description: "View and manage all submitted contest entries.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const SubmittedAllContest = () => {
  return (
    <div>
      <SubmittedAllContestPage />
    </div>
  );
};

export default SubmittedAllContest;
