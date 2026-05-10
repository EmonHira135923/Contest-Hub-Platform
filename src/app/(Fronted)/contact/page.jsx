import Contactpage from "@/Componets/Pages/Contact/Contactpage";
import React from "react";

export const metadata = {
  title: "Contact | ContestHub | Get in Touch",
  description:
    "Contact ContestHub for support, feedback, or partnership inquiries. We are here to help users and creators connect and grow through creative contests.",

  keywords: [
    "ContestHub contact",
    "contact contest platform",
    "support ContestHub",
    "creative contest help",
    "online contest support",
  ],

  openGraph: {
    title: "Contact ContestHub",
    description:
      "Reach out to ContestHub for any questions, support, or collaboration opportunities.",
    url: "https://your-domain.com/contact",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact ContestHub",
    description: "Get in touch with ContestHub for support and inquiries.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const Contact = () => {
  return (
    <div>
      <Contactpage />
    </div>
  );
};

export default Contact;
