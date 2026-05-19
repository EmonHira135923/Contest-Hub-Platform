import { getAllContests } from "@/app/(Backend)/lib/dbConnect";
import { verifyCreator } from "@/app/(Backend)/middlewares/IsCreator";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";

export async function GET(request) {
  try {
    const user = await verifyToken(request);
    await verifyCreator(request);

    if (!user?.email) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;

    const limit = 10;
    const skip = (page - 1) * limit;

    const contestCollection = await getAllContests();

    const query = {
      creatorEmail: user.email,
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { adminStatus: { $regex: search, $options: "i" } },
        { payment: { $regex: search, $options: "i" } },
      ];
    }

    const result = await contestCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await contestCollection.countDocuments(query);

    return Response.json({
      success: true,
      result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
