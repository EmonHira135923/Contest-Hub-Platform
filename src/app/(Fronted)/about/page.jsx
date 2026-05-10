import Aboutpage from "@/Componets/Pages/About/Aboutpage";

export const metadata = {
  title: "About | ContestHub | Creative Contest Platform",
  description:
    "Learn more about ContestHub — a modern platform where users can discover, join, and manage creative contests including design, writing, gaming reviews, and business ideas.",

  keywords: [
    "ContestHub",
    "about ContestHub",
    "contest platform",
    "creative contests",
    "online competitions",
    "design contest platform",
    "writing contest",
  ],

  openGraph: {
    title: "About ContestHub | Creative Contest Platform",
    description:
      "ContestHub connects creators through design, writing, and idea-based contests. Learn our mission and vision.",
    url: "https://your-domain.com/about",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About ContestHub",
    description:
      "Discover the story and purpose behind ContestHub — a creative contest platform.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function About() {
  return (
    <div>
      <Aboutpage />
    </div>
  );
}
