import Privacypage from "@/Componets/Shared/Privacypage";
import React from "react";

export const metadata = {
  title: "Privacy Policy | ContestHub",

  description:
    "Read ContestHub privacy policy to understand how we collect, use, and protect your personal data and information.",

  keywords: [
    "privacy policy",
    "ContestHub privacy",
    "data protection",
    "user privacy",
    "terms and privacy",
  ],

  openGraph: {
    title: "Privacy Policy | ContestHub",
    description:
      "Understand how ContestHub handles and protects your personal data.",
    url: "https://your-domain.com/privacy",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | ContestHub",
    description: "ContestHub privacy and data protection policy details.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const Privacy = () => {
  return (
    <div>
      <Privacypage />
    </div>
  );
};

export default Privacy;
