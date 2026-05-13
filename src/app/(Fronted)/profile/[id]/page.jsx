import { cookies } from "next/headers";
import React from "react";
import jwt from "jsonwebtoken";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import EditProfilepage from "@/Componets/Pages/Myprofile/EditProfilepage";

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
    title: `Edit Profile | ${userName} | ContestHub`,
    description: `Update ${userName}'s ContestHub profile information, manage account settings, and customize personal details.`,

    keywords: [
      "edit profile",
      "ContestHub profile settings",
      userName,
      "update user profile",
      "dashboard settings",
    ],

    openGraph: {
      title: `Edit Profile | ${userName} | ContestHub`,
      description: `Manage and update ${userName}'s ContestHub profile settings.`,
      url: "https://your-domain.com/dashboard/update-profile",
      siteName: "ContestHub",
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `Edit Profile | ${userName} | ContestHub`,
      description: `Customize and update ${userName}'s ContestHub profile.`,
    },

    robots: {
      index: false,
      follow: false,
    },
  };
}

const UpdateProfile = () => {
  return (
    <div>
      <EditProfilepage />
    </div>
  );
};

export default UpdateProfile;