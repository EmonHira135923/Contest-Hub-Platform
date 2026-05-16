import BeACreatorPage from "@/Componets/Pages/BeaCreator/BeACreatorPage";
import React from "react";

export const metadata = {
  title: "Be a Creator | ContestHub Bangladesh",
  description:
    "Join ContestHub as a creator and start hosting creative contests in Bangladesh. Earn, engage users, and grow your community through design, writing, and idea-based competitions.",

  keywords: [
    "be a creator",
    "ContestHub creator",
    "host contests Bangladesh",
    "create contest platform",
    "earn from contests",
    "contest organizer BD",
  ],

  openGraph: {
    title: "Be a Creator | ContestHub Bangladesh",
    description:
      "Become a ContestHub creator and launch your own contests across Bangladesh. Engage participants and grow your audience.",
    url: "https://your-domain.com/be-a-creator",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Be a Creator | ContestHub",
    description:
      "Start hosting contests and become a creator on ContestHub Bangladesh.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const BeaCreator = () => {
  return (
    <div>
      <BeACreatorPage />
    </div>
  );
};

export default BeaCreator;
