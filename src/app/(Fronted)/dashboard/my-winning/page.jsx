import MywinningContest from "@/Componets/Pages/Dashboard/MywinningContest";
import React from "react";

export const metadata = {
  title: "My Winning Contests | ContestHub",

  description:
    "Explore all contests you have won on ContestHub. View rankings, prizes, achievements, and your contest-winning history.",

  keywords: [
    "winning contests",
    "contest victories",
    "contest achievements",
    "my wins",
    "contest rankings",
    "ContestHub dashboard",
  ],

  openGraph: {
    title: "My Winning Contests | ContestHub",
    description:
      "View all contests you have won, including rankings, rewards, and achievements on ContestHub.",
    url: "https://your-domain.com/dashboard/winning-contest",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "My Winning Contests | ContestHub",
    description:
      "Track your contest victories, rankings, and rewards on ContestHub.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const WinningContest = () => {
  return (
    <div>
      <MywinningContest />
    </div>
  );
};

export default WinningContest;
