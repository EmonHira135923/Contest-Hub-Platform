import AdminAllContactPage from "@/Componets/Pages/All-Contests/AdminAllContactPage";
import React from "react";

export const metadata = {
  title: "Manage Contacts | ContestHub",

  description:
    "Admin contact management dashboard for ContestHub. View, manage, and respond to user messages and support requests.",

  keywords: [
    "admin contacts",
    "ContestHub contact",
    "support messages",
    "user messages",
    "contact management",
  ],

  openGraph: {
    title: "Manage Contacts | ContestHub",
    description:
      "Admin dashboard for managing user contact messages in ContestHub.",
    url: "https://your-domain.com/dashboard/contacts",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Manage Contacts | ContestHub",
    description:
      "Handle and manage user contact messages from ContestHub dashboard.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const AllContact = () => {
  return (
    <div>
      <AdminAllContactPage />
    </div>
  );
};

export default AllContact;