import MyCreatedContestPage from "@/Componets/Pages/Dashboard/creator/MyCreatedContestPage";
import React from "react";
export const metadata = {
  title: "My Created Contests | ContestHub",

  description:
    "Manage all contests you have created on ContestHub. View, edit, and track contest performance and participants.",

  keywords: [
    "created contests",
    "ContestHub creator",
    "contest management",
    "my contests",
    "creator dashboard",
  ],

  openGraph: {
    title: "My Created Contests | ContestHub",
    description: "View and manage all contests created by you on ContestHub.",
    url: "https://your-domain.com/dashboard/my-created-contests",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "My Created Contests | ContestHub",
    description: "Track and manage your created contests in ContestHub.",
  },

  robots: {
    index: false,
    follow: false,
  },
};
const MyCreatedContest = () => {
  return (
    <div>
      <MyCreatedContestPage />
    </div>
  );
};

export default MyCreatedContest;
