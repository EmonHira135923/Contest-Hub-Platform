import Createaccount from "@/Componets/Pages/Auth/Createaccount";
import React from "react";

export const metadata = {
  title: "Create Account",
  description:
    "Create your ContestHub account to join creative contests, submit projects, track competition progress, and manage your profile securely.",

  keywords: [
    "ContestHub signup",
    "create account ContestHub",
    "register ContestHub",
    "contest platform registration",
    "sign up ContestHub",
  ],

  openGraph: {
    title: "Create Account | ContestHub",
    description:
      "Sign up for ContestHub and start participating in creative contests and competitions.",
    url: "https://your-domain.com/auth/register",
    siteName: "ContestHub",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Create Account | ContestHub",
    description:
      "Join ContestHub today and start your creative contest journey.",
  },

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const Page = () => {
  return (
    <div>
      <Createaccount />
    </div>
  );
};

export default Page;
