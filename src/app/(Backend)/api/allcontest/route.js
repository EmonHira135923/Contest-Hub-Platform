import { getAllContests } from "../../lib/dbConnect";
import { verifyCreator } from "../../middlewares/IsCreator";
import { verifyToken } from "../../middlewares/verifyToken";

export async function GET(request) {
  try {
    const isUser = await verifyToken(request);
    if (!isUser) {
      return Response.json(
        { success: false, message: "Unauthorized: Invalid credentials" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("q") || "";
    const categoryQuery = searchParams.get("category") || "";

    const ContestCollection = await getAllContests();

    const uniqueCategories = await ContestCollection.distinct("category");

    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const limit = Math.max(Number(searchParams.get("limit") || 10), 1);
    const skip = (page - 1) * limit;

    // default filter -> শুধু approved contest
    let filter = {
      adminStatus: "approved",
    };

    if (searchQuery) {
      filter.title = { $regex: searchQuery, $options: "i" };
    }

    if (
      categoryQuery &&
      categoryQuery.trim() !== "" &&
      categoryQuery.toLowerCase() !== "all"
    ) {
      filter.category = { $regex: new RegExp(`^${categoryQuery}$`, "i") };
    }

    const totalCount = await ContestCollection.countDocuments(filter);
    const totalPages = Math.max(Math.ceil(totalCount / limit), 1);

    const contests = await ContestCollection.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return Response.json({
      success: true,
      count: contests.length,
      totalCount,
      page,
      limit,
      totalPages,
      categories: uniqueCategories,
      data: contests,
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const isUser = await verifyToken(request);
    const isCreator = await verifyCreator(request);

    if (!isUser) {
      return Response.json(
        { success: false, message: "Unauthorized: Invalid credentials" },
        { status: 401 },
      );
    }

    if (!isCreator) {
      return Response.json(
        {
          success: false,
          message: "Forbidden: Only creators can create contests",
        },
        { status: 403 },
      );
    }

    const body = await request.json();
    const ContestCollection = await getAllContests();

    const newContest = {
      title: body.title,
      description: body.description,
      category: body.category,
      prize: body.prize,
      registrationFee: body.registrationFee,
      instruction: body.instruction,
      image: body.image, // Cloudinary URL
      deadline: body.deadline,
      participantsCount: 0,
      adminStatus: "pending", // অ্যাডমিন চেক করার জন্য
      payment: "unpaid", // পেমেন্ট স্ট্যাটাস (ক্রিয়েটর পেমেন্ট করলে 'paid' হবে)
      creatorEmail: body.creatorEmail,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await ContestCollection.insertOne(newContest);

    return Response.json({
      success: true,
      message: "Contest created successfully",
      id: result.insertedId,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
