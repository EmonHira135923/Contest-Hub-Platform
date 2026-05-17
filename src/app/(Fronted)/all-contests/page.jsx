import Allcontestpage from "@/Componets/Pages/All-Contests/Allcontestpage";


export const metadata = {
  title: "All Contests | ContestHub Bangladesh | Explore Creative Competitions",
  description:
    "Browse all active and upcoming contests on ContestHub across Bangladesh. Join design, writing, gaming, and business idea competitions from every region.",

  keywords: [
    "all contests Bangladesh",
    "ContestHub contests",
    "online contest platform BD",
    "creative competitions",
    "design contests",
    "writing contests",
    "gaming contests Bangladesh",
    "business idea contest BD",
  ],

  openGraph: {
    title: "All Contests | ContestHub Bangladesh",
    description:
      "Explore all creative contests across Bangladesh on ContestHub. Join, compete, and win exciting prizes.",
    url: "https://your-domain.com/all-contests",
    siteName: "ContestHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "All Contests | ContestHub Bangladesh",
    description:
      "Find and join all active creative contests across Bangladesh on ContestHub.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const AllContests = () => {
  return (
    <div>
      <Allcontestpage />
    </div>
  );
};

export default AllContests;
