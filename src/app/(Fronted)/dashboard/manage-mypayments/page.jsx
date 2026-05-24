import Mypaymentpage from "@/Componets/Pages/Dashboard/Mypaymentpage";
import React from "react";

export const metadata = {
  title: "My Payments | ContestHub",

  description:
    "View all your ContestHub payment history, contest registration payments, transaction details, and payment status securely.",

  keywords: [
    "ContestHub payments",
    "payment history",
    "contest payments",
    "user transactions",
    "contest registration payment",
  ],

  openGraph: {
    title: "My Payments | ContestHub",
    description:
      "Access your ContestHub payment history and transaction details.",
    url: "https://your-domain.com/dashboard/my-payments",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "My Payments | ContestHub",
    description:
      "Track your ContestHub payment history and registration transactions.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const MyPayment = () => {
  return (
    <div>
      <Mypaymentpage />
    </div>
  );
};

export default MyPayment;
