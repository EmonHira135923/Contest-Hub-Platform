import Alluser from "@/Componets/Pages/Dashboard/Alluser";
import React from "react";

export const metadata = {
  title: "Manage Users | Admin Dashboard | ContestHub",
  description:
    "Manage all registered users on ContestHub. View, update roles, monitor activity, and control platform access from the admin dashboard.",

  keywords: [
    "manage users",
    "ContestHub admin",
    "admin dashboard",
    "user management",
    "ContestHub users",
  ],

  openGraph: {
    title: "Manage Users | ContestHub Admin Dashboard",
    description:
      "Admin panel for managing ContestHub users, roles, and permissions.",
    url: "https://your-domain.com/dashboard/manage-users",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Manage Users | ContestHub",
    description:
      "Control and manage all ContestHub users from the admin dashboard.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const ManageUsers = () => {
  return (
    <div>
      <Alluser />
    </div>
  );
};

export default ManageUsers;
