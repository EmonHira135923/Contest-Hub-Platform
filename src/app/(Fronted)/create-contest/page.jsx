import CreateContestPage from "@/Componets/Pages/CreateContest/CreateContestPage";
import React from "react";

export const metadata = {
  title: "Create a Contest | ContestHub Dashboard",
  description:
    "Create and publish a new contest on ContestHub. Set contest details, prizes, deadlines, categories, and start engaging participants.",

  keywords: [
    "create contest",
    "ContestHub creator",
    "publish contest",
    "host online contest",
    "contest dashboard",
  ],

  openGraph: {
    title: "Create a Contest | ContestHub",
    description:
      "Launch a new creative contest on ContestHub and engage participants across Bangladesh.",
    url: "https://your-domain.com/dashboard/create-contest",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Create a Contest | ContestHub",
    description:
      "Build and publish contests easily from your ContestHub dashboard.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const CreateAContest = () => {
  return (
    <div>
      <CreateContestPage />
    </div>
  );
};

export default CreateAContest;
