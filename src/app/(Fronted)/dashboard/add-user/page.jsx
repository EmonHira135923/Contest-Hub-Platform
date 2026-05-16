import AllNewUser from "@/Componets/Pages/Dashboard/AllNewUser";
import React from "react";

export const metadata = {
  title: "Add New User | Admin Dashboard | ContestHub",
  description:
    "Create and add new users to ContestHub from the admin dashboard. Manage platform access, roles, and user onboarding efficiently.",

  keywords: [
    "add new user",
    "ContestHub admin",
    "create user",
    "admin dashboard",
    "user onboarding",
  ],

  openGraph: {
    title: "Add New User | ContestHub Admin Dashboard",
    description:
      "Admin panel for creating and onboarding new users on ContestHub.",
    url: "https://your-domain.com/dashboard/add-new-user",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Add New User | ContestHub",
    description:
      "Create and manage new users from the ContestHub admin dashboard.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const AddNewUser = () => {
  return (
    <div>
      <AllNewUser />
    </div>
  );
};

export default AddNewUser;
