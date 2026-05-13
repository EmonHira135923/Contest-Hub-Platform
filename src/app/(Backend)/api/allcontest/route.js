import { getAllContests } from "../../lib/dbConnect";


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("q") || "";
    const categoryQuery = searchParams.get("category") || "";

    const ContestCollection = await getAllContests();

    // ১. ডাইনামিক ক্যাটাগরি
    const uniqueCategories = await ContestCollection.distinct("category");

    // ২. ফিল্টার লজিক
    let filter = {};
    if (searchQuery) {
      filter.title = { $regex: searchQuery, $options: "i" };
    }

    // categoryQuery যদি খালি না থাকে এবং "all" না হয়
    if (
      categoryQuery &&
      categoryQuery.trim() !== "" &&
      categoryQuery.toLowerCase() !== "all"
    ) {
      filter.category = { $regex: new RegExp(`^${categoryQuery}$`, "i") };
    }

    const contests = await ContestCollection.find(filter).toArray();

    return Response.json({
      success: true,
      count: contests.length,
      categories: uniqueCategories,
      data: contests,
    });
  } catch (error) {
    console.error("API Error:", error); // এটি আপনার সার্ভার কনসোলে এরর দেখাবে
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// POST → new contest create
export async function POST(request) {
  try {
    const body = await request.json();

    const ContestCollection = await getAllContests();

    const newContest = {
      title: body.title,
      description: body.description,
      category: body.category,
      tag: body.tag,
      prize: body.prize,
      participants: 0,
      image,
      deadline: body.deadline,
      joined: "0",
      createdAt: new Date(),
    };

    const result = await ContestCollection.insertOne(newContest);

    return Response.json({
      success: true,
      message: "Contest created",
      id: result.insertedId,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
