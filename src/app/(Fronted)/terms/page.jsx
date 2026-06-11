import TermsPage from "@/Componets/Shared/TermsPage";
import React from "react";

export const metadata = {
  title: "Terms & Conditions | ContestHub",

  description:
    "Read ContestHub terms and conditions to understand the rules, responsibilities, and usage policies of the platform.",

  keywords: [
    "terms and conditions",
    "ContestHub terms",
    "user agreement",
    "platform rules",
    "legal",
  ],

  openGraph: {
    title: "Terms & Conditions | ContestHub",
    description:
      "Understand the rules and policies for using ContestHub platform.",
    url: "https://your-domain.com/terms",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | ContestHub",
    description:
      "ContestHub usage terms and platform rules.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const Terms = () => {
  return (
    <div>
      <TermsPage />
    </div>
  );
};

export default Terms;