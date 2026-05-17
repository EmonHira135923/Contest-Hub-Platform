import { ObjectId } from "mongodb";
import { getAllContests } from "../../../lib/dbConnect";

export async function GET(request, { params }) {
  try {
    const url = new URL(request.url);
    const fromPath = url.pathname.split("/").filter(Boolean).pop() || "";
    const contestId = String(params?.id || fromPath).split("?")[0];

    if (!contestId || !ObjectId.isValid(contestId)) {
      console.warn("Invalid contest ID in allcontest route", {
        paramsId: params?.id,
        pathId: fromPath,
        fullUrl: request.url,
      });
      return Response.json(
        { success: false, message: "Invalid contest ID" },
        { status: 400 },
      );
    }

    const collection = await getAllContests();
    const contest = await collection.findOne({ _id: new ObjectId(contestId) });

    if (!contest) {
      return Response.json(
        { success: false, message: "Contest not found" },
        { status: 404 },
      );
    }

    const safeContest = {
      ...contest,
      _id: contest._id.toString(),
    };

    return Response.json({ success: true, data: safeContest });
  } catch (error) {
    console.error("Fetch contest by ID error:", error.message);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
