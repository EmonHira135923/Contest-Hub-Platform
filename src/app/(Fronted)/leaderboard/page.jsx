import LeaderBoard from "@/Componets/Pages/LeaderBoard/LeaderBoard";
import React from "react";

export const metadata = {
  title: "Leaderboard | ContestHub",

  description:
    "Explore the ContestHub leaderboard and discover top-performing contestants, rankings, scores, and achievements across all contests.",

  keywords: [
    "ContestHub leaderboard",
    "contest rankings",
    "top contestants",
    "leaderboard",
    "contest scores",
    "competitive programming rankings",
  ],

  openGraph: {
    title: "Leaderboard | ContestHub",
    description: "View top contestants and rankings on ContestHub leaderboard.",
    url: "https://your-domain.com/leaderboard",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Leaderboard | ContestHub",
    description: "Track rankings, scores, and top contestants on ContestHub.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const LeaderBoardPage = () => {
  return (
    <div>
      <LeaderBoard />
    </div>
  );
};

export default LeaderBoardPage;
