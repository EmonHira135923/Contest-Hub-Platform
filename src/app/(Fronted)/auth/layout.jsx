import Navvar from "@/Componets/Shared/Navvar";
import React from "react";

export const metadata = {
  title: {
    default: "Authentication",
    template: "%s | ContestHub",
  },
  description:
    "Access ContestHub securely to log in, create an account, and manage your creative contest journey.",
  robots: {
    index: false,
    follow: false,
  },
};

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Navvar />
      {children}
    </div>
  );
};

export default AuthLayout;
