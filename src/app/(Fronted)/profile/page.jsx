import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import Profilepage from "@/Componets/Pages/Myprofile/Profilepage";
import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function generateMetadata() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  let userName = "User";

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET_KEY);

      const userCollection = await getUsers();
      const user = await userCollection.findOne({
        email: decoded.email,
      });

      if (user?.name) {
        userName = user.name;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    title: `${userName} | ContestHub Dashboard`,
    description: `Manage ${userName}'s ContestHub profile, view joined contests, track submissions, and achievements.`,

    keywords: [
      "ContestHub profile",
      userName,
      "contest profile",
      "user dashboard",
    ],

    openGraph: {
      title: `${userName} | ContestHub`,
      description: `Access ${userName}'s ContestHub dashboard profile.`,
      url: "https://your-domain.com/dashboard/my-profile",
      siteName: "ContestHub",
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${userName} | ContestHub`,
      description: `Track ${userName}'s contest journey on ContestHub.`,
    },

    robots: {
      index: false,
      follow: false,
    },
  };
}

const Myprofile = () => {
  return (
    <div>
      <Profilepage />
    </div>
  );
};

export default Myprofile;
