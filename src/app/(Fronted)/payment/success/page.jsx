import PaymentSucces from "@/Componets/Pages/Payments/PaymentSucces";
import React from "react";

export const metadata = {
  title: "Payment Successful | ContestHub",
  description:
    "Your payment was completed successfully on ContestHub. Continue exploring contests and creator features.",

  keywords: [
    "payment success",
    "ContestHub payment",
    "successful payment",
    "contest payment",
  ],

  openGraph: {
    title: "Payment Successful | ContestHub",
    description: "Payment completed successfully on ContestHub.",
    url: "https://your-domain.com/payment/success",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Payment Successful | ContestHub",
    description: "Your payment was completed successfully on ContestHub.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const PaymentSuccesspage = () => {
  return (
    <div>
      <PaymentSucces />
    </div>
  );
};

export default PaymentSuccesspage;
