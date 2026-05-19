import { ObjectId } from "mongodb";
import { getAllContests } from "@/app/(Backend)/lib/dbConnect";
import { verifyCreator } from "@/app/(Backend)/middlewares/IsCreator";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";

export async function GET(request, { params }) {
  try {
    const user = await verifyToken(request);
    const isCreator = await verifyCreator(request);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized - Invalid Access Token",
        },
        { status: 401 },
      );
    }

    if (!isCreator) {
      return Response.json(
        {
          success: false,
          message: "Forbidden - Only creator allowed",
        },
        { status: 403 },
      );
    }

    const { id } = await params;
    const contestCollection = await getAllContests();

    const result = await contestCollection.findOne({
      _id: new ObjectId(id),
      creatorEmail: user.email,
    });

    return Response.json({
      success: true,
      result,
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

export async function PATCH(request, { params }) {
  try {
    const user = await verifyToken(request);
    const isCreator = await verifyCreator(request);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized - Invalid Access Token",
        },
        { status: 401 },
      );
    }

    if (!isCreator) {
      return Response.json(
        {
          success: false,
          message: "Forbidden - Only creator allowed",
        },
        { status: 403 },
      );
    }

    const { id } = await params;
    const body = await request.json();
    const contestCollection = await getAllContests();

    const existingContest = await contestCollection.findOne({
      _id: new ObjectId(id),
      creatorEmail: user.email,
    });

    if (!existingContest) {
      return Response.json(
        {
          success: false,
          message: "Contest not found",
        },
        { status: 404 },
      );
    }

    const now = new Date();
    const deadlinePassed = new Date(existingContest.deadline) < now;
    const isApproved = existingContest.adminStatus === "approved";

    if (deadlinePassed || isApproved) {
      return Response.json(
        {
          success: false,
          message:
            "This contest cannot be edited because deadline passed or contest already approved",
        },
        { status: 403 },
      );
    }

    const result = await contestCollection.updateOne(
      {
        _id: new ObjectId(id),
        creatorEmail: user.email,
      },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
        },
      },
    );

    return Response.json({
      success: true,
      message: "Contest updated successfully",
      result,
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

export async function DELETE(request, { params }) {
  try {
    const user = await verifyToken(request);
    const isCreator = await verifyCreator(request);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized - Invalid Access Token",
        },
        { status: 401 },
      );
    }

    if (!isCreator) {
      return Response.json(
        {
          success: false,
          message: "Forbidden - Only creator allowed",
        },
        { status: 403 },
      );
    }

    const { id } = await params;
    const contestCollection = await getAllContests();

    const existingContest = await contestCollection.findOne({
      _id: new ObjectId(id),
      creatorEmail: user.email,
    });

    if (!existingContest) {
      return Response.json(
        {
          success: false,
          message: "Contest not found",
        },
        { status: 404 },
      );
    }

    const now = new Date();
    const deadlinePassed = new Date(existingContest.deadline) < now;
    const isApproved = existingContest.adminStatus === "approved";

    if (deadlinePassed || isApproved) {
      return Response.json(
        {
          success: false,
          message:
            "This contest cannot be deleted because deadline passed or contest already approved",
        },
        { status: 403 },
      );
    }

    const result = await contestCollection.deleteOne({
      _id: new ObjectId(id),
      creatorEmail: user.email,
    });

    return Response.json({
      success: true,
      message: "Contest deleted successfully",
      result,
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
