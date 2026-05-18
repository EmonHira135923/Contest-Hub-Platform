import Detailspage from "@/Componets/Pages/All-Contests/Detailspage";
import AuthGuard from "@/Componets/Shared/AuthGuard";
import { ObjectId } from "mongodb";
import { getAllContests } from "@/app/(Backend)/lib/dbConnect";

// 🔥 DIRECT DATABASE FETCH (NO API, NO AXIOS)
const fetchContestDirect = async (contestId) => {
  if (!contestId || !ObjectId.isValid(contestId)) return null;

  try {
    const collection = await getAllContests();

    const contest = await collection.findOne({
      _id: new ObjectId(contestId),
    });

    if (!contest) return null;

    return {
      ...contest,
      _id: contest._id.toString(),
    };
  } catch (error) {
    console.error("DB fetch error:", error.message);
    return null;
  }
};

export async function generateMetadata({ params }) {
  const { id } = await params;

  const contest = await fetchContestDirect(id);

  const title = contest?.title
    ? `${contest.title} | ContestHub`
    : "Contest Details | ContestHub";

  const description =
    contest?.description || "Join contests on ContestHub and win prizes.";

  const image = contest?.image || "https://your-domain.com/og-default.jpg";

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
  };
}

// 🔥 PAGE COMPONENT (SERVER COMPONENT)
const ContestDetailsPage = async ({ params }) => {
  const { id } = await params;

  const contest = await fetchContestDirect(id);

  console.log("ContestDetailsPage render:", contest);

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
