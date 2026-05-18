import { getAllContests } from "../../lib/dbConnect";

export async function GET(request) {
  try {
    const ContestCollection = await getAllContests();

    const result = await ContestCollection.find({ adminStatus: "approved" })
      .sort({ participantsCount: -1 })
      .limit(6)
      .toArray();

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
