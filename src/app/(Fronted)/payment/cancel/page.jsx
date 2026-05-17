import PaymentCancel from "@/Componets/Pages/Payments/PaymentCancel.jsx/PaymentCancel";
import React from "react";

export const metadata = {
  title: "Payment Cancelled | ContestHub",
  description:
    "Your payment process was cancelled. Return to ContestHub to retry payment or continue exploring contests.",

  keywords: [
    "payment cancelled",
    "ContestHub payment",
    "payment failed",
    "contest payment",
  ],

  openGraph: {
    title: "Payment Cancelled | ContestHub",
    description: "Payment was cancelled on ContestHub. Retry securely anytime.",
    url: "https://your-domain.com/payment/cancel",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Payment Cancelled | ContestHub",
    description: "Your payment was cancelled. Return to ContestHub anytime.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const Paymentpage = () => {
  return (
    <div>
      <PaymentCancel />
    </div>
  );
};

export default Paymentpage;
