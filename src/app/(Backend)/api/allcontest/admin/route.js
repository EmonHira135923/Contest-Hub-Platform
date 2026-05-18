import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";
import { verifyAdmin } from "@/app/(Backend)/middlewares/IsAdmin";
import { getAllContests } from "@/app/(Backend)/lib/dbConnect";

export async function GET(request) {
  try {
    const user = await verifyToken(request);
    const admin = await verifyAdmin(request, user);

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized - No token found" },
        { status: 401 },
      );
    }

    if (!admin) {
      return Response.json(
        { success: false, message: "Unauthorized - Admin only" },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(request.url);

    const searchQuery = searchParams.get("q") || "";
    const adminStatus = searchParams.get("adminStatus") || "";
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const limit = Math.max(Number(searchParams.get("limit") || 10), 1);
    const skip = (page - 1) * limit;

    const ContestCollection = await getAllContests();

    let filter = {};

    // adminStatus filter
    if (adminStatus) {
      filter.adminStatus = adminStatus;
    }

    // search filter
    if (searchQuery) {
      filter.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { payment: { $regex: searchQuery, $options: "i" } },
        { adminStatus: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const totalCount = await ContestCollection.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const contests = await ContestCollection.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return Response.json({
      success: true,
      data: contests,
      totalCount,
      totalPages,
      page,
      limit,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
