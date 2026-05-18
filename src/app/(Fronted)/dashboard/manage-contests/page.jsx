import Approvecontest from "@/Componets/Pages/Dashboard/admin/Approvecontest";
import React from "react";

export const metadata = {
  title: "All Contests | ContestHub Platform",
  description:
    "Browse all available contests on ContestHub. Join exciting creative and coding contests, compete with others, and win amazing prizes.",

  keywords: [
    "all contests",
    "ContestHub contests",
    "online contests",
    "creative competitions",
    "coding contests",
    "contest platform",
  ],

  openGraph: {
    title: "All Contests | ContestHub",
    description:
      "Explore and join all active contests on ContestHub platform.",
    url: "https://your-domain.com/all-contests",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "All Contests | ContestHub",
    description:
      "Find and join exciting contests on ContestHub platform.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const AllContestpage = () => {
  return (
    <div>
      <Approvecontest/>
    </div>
  );
};

export default AllContestpage;
