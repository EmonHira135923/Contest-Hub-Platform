import Help from "@/Componets/Shared/Help";
import React from "react";

export const metadata = {
  title: "Help & Support | ContestHub",

  description:
    "Get help and support for ContestHub. Find answers to common questions, platform guides, and contact support for assistance.",

  keywords: [
    "ContestHub help",
    "support",
    "FAQ",
    "help center",
    "contact support",
  ],

  openGraph: {
    title: "Help & Support | ContestHub",
    description:
      "Find answers, guides, and support for ContestHub users.",
    url: "https://your-domain.com/help",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Help & Support | ContestHub",
    description:
      "Get support and help for ContestHub platform.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const HelpPage = () => {
  return (
    <div>
      <Help />
    </div>
  );
};

export default HelpPage;