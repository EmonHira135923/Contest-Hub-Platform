import ContestArenapage from "@/Componets/Pages/Contest-Arena/ContestArenapage";
import React from "react";

export const metadata = {
  title: "Contest Arena | ContestHub Bangladesh | Nationwide Creative Contests",
  description:
    "Join ContestHub Contest Arena across all over Bangladesh. Participate in creative contests like design, writing, business ideas, and gaming challenges from every district of Bangladesh.",

  keywords: [
    "Contest Arena Bangladesh",
    "ContestHub Bangladesh",
    "online contests Bangladesh",
    "creative contests BD",
    "design contest Bangladesh",
    "writing contest Bangladesh",
    "business idea contest BD",
    "all districts contest Bangladesh",
  ],

  openGraph: {
    title: "Contest Arena | ContestHub Bangladesh",
    description:
      "A nationwide contest platform covering all 64 districts of Bangladesh. Join, compete, and win creative challenges.",
    url: "https://your-domain.com/contest-arena",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contest Arena | ContestHub Bangladesh",
    description:
      "Compete in creative contests from anywhere in Bangladesh with ContestHub Contest Arena.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const ContestArena = () => {
  return (
    <div>
      <ContestArenapage />
    </div>
  );
};

export default ContestArena;
