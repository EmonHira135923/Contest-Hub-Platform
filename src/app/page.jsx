import HeroBanner from "@/Componets/Pages/Home/HeroBanner";
import React from "react";

export const metadata = {
  title: "Home | Contest Hub | Contest Hub Platform",
  description:
    "ContestHub is a modern contest management platform where users can discover, join, and manage creative contests including design, writing, gaming reviews, business ideas, and more.",

  keywords: [
    "ContestHub",
    "contest platform",
    "creative contests",
    "design contest",
    "article writing contest",
    "business idea contest",
    "online competitions",
  ],

  openGraph: {
    title: "ContestHub | Creative Contest Platform",
    description:
      "Join creative contests, submit tasks, win prizes, and manage contests easily with ContestHub.",
    url: "https://your-domain.com",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ContestHub | Creative Contest Platform",
    description:
      "Discover and participate in creative contests with ContestHub.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const Home = () => {
  return (
    <div>
      <HeroBanner />
    </div>
  );
};

export default Home;
