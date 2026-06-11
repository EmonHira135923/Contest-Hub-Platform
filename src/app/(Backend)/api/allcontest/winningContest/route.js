import { getAllContests } from "@/app/(Backend)/lib/dbConnect";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";

export async function GET(request) {
  try {
    const isVerify = await verifyToken(request);

    if (!isVerify) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized access",
        },
        {
          status: 401,
        },
      );
    }

    const { searchParams } = new URL(request.url);

    const email = searchParams.get("email");

    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const limit = Math.max(Number(searchParams.get("limit") || 10), 1);
    const skip = (page - 1) * limit;

    const ContestCollection = await getAllContests();

    const filter = {
      winner: { $exists: true },
      "winner.email": email,
    };

    const totalCount = await ContestCollection.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const winners = await ContestCollection.find(filter, {
      projection: {
        winner: 1,
        title: 1,
        image: 1,
        prize: 1,
        category: 1,
        deadline: 1,
      },
    })
      .sort({ "winner.declaredAt": -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return Response.json({
      success: true,
      count: winners.length,
      totalCount,
      totalPages,
      currentPage: page,
      limit,
      data: winners,
    });
  } catch (error) {
    console.error("API Error:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
