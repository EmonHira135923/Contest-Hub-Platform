import LoginAccount from "@/Componets/Pages/Auth/LoginAccount";
import React from "react";

export const metadata = {
  title: "Login | ContestHub | ContestHub Platform",
  description:
    "Securely log in to your ContestHub account to join contests, manage submissions, track results, and explore creative competitions.",

  keywords: [
    "ContestHub login",
    "login ContestHub",
    "contest platform login",
    "user authentication",
    "secure login",
  ],

  openGraph: {
    title: "Login | ContestHub",
    description:
      "Access your ContestHub account to manage contests, submissions, and creative challenges.",
    url: "https://your-domain.com/auth/login",
    siteName: "ContestHub",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Login | ContestHub",
    description:
      "Sign in to ContestHub and continue your creative contest journey.",
  },

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const Loginpage = () => {
  return (
    <div>
      <LoginAccount />
    </div>
  );
};

export default Loginpage;
