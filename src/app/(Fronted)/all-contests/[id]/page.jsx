import Detailspage from "@/Componets/Pages/All-Contests/Detailspage";
import AuthGuard from "@/Componets/Shared/AuthGuard";
import React from "react";
import { ObjectId } from "mongodb";
import { getAllContests } from "@/app/(Backend)/lib/dbConnect";

const normalizeBaseUrl = () => {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_API_URL;
  if (rawUrl) {
    try {
      return new URL(rawUrl).toString().replace(/\/$/, "");
    } catch (error) {
      console.warn(
        "Invalid base URL in env, falling back to http://localhost:3000:",
        rawUrl,
      );
    }
  }
  return "http://localhost:3000";
};

const fetchContestDirect = async (contestId) => {
  if (!contestId || !ObjectId.isValid(contestId)) return null;

  try {
    const collection = await getAllContests();
    const contest = await collection.findOne({ _id: new ObjectId(contestId) });
    return contest ? { ...contest, _id: contest._id.toString() } : null;
  } catch (error) {
    console.error("Direct contest fetch error:", error.message);
    return null;
  }
};

const fetchContest = async (contestId) => {
  if (!contestId) return null;

  const baseUrl = normalizeBaseUrl();
  const url = `${baseUrl}/api/allcontest/${contestId}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      console.warn("Contest API fetch failed", {
        url,
        status: res.status,
        statusText: res.statusText,
        body: errorText,
      });
      return await fetchContestDirect(contestId);
    }

    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    console.error("Contest fetch error:", error.message);
    return await fetchContestDirect(contestId);
  }
};

// 🔥 DYNAMIC SEO METADATA
export async function generateMetadata({ params }) {
  const { id } = await params;
  const contest = await fetchContest(id);

  const title = contest?.title
    ? `${contest.title} | ContestHub Contest`
    : "Contest Details | ContestHub";

  const description =
    contest?.description ||
    "Join creative contests on ContestHub and win exciting prizes across Bangladesh.";

  const image =
    contest?.image || "https://your-domain.com/og-default-contest.jpg";

  return {
    title,
    description,

    keywords: [
      "ContestHub",
      "contest details",
      "online contest",
      "creative competition",
      contest?.title,
    ],

    openGraph: {
      title,
      description,
      url: `https://your-domain.com/all-contests/${id}`,
      siteName: "ContestHub",
      locale: "en_US",
      type: "article",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: contest?.title || "ContestHub Contest",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// 🔥 PAGE COMPONENT
const ContestDetailsPage = async ({ params }) => {
  const { id } = await params;
  const contest = await fetchContest(id);

  console.log("ContestDetailsPage render with contest:", contest);

  if (!contest) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Contest Not Found</h1>
      </div>
    );
  }

  return (
    <AuthGuard>
      <Detailspage contest={contest} />
    </AuthGuard>
  );
};

export default ContestDetailsPage;
