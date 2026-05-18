import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";
import { verifyAdmin } from "@/app/(Backend)/middlewares/IsAdmin";

const toObjectId = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return new ObjectId(id);
};

export async function GET(request, { params }) {
  try {
    const userAuth = await verifyToken(request);
    if (!userAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin only access" },
        { status: 403 },
      );
    }

    const objectId = toObjectId(params.id);
    if (!objectId) {
      return NextResponse.json(
        { success: false, message: "Invalid user id" },
        { status: 400 },
      );
    }

    const usersCollection = await getUsers();

    const user = await usersCollection.findOne(
      { _id: objectId },
      { projection: { password: 0 } },
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: { ...user, _id: user._id.toString() },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const userAuth = await verifyToken(request);
    if (!userAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin only access" },
        { status: 403 },
      );
    }

    const objectId = toObjectId(params.id);
    if (!objectId) {
      return NextResponse.json(
        { success: false, message: "Invalid user id" },
        { status: 400 },
      );
    }

    const { role } = await request.json();
    const allowedRoles = ["admin", "creator", "user"];

    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role" },
        { status: 400 },
      );
    }

    const usersCollection = await getUsers();

    const result = await usersCollection.updateOne(
      { _id: objectId },
      {
        $set: {
          role,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const updatedUser = await usersCollection.findOne(
      { _id: objectId },
      { projection: { password: 0 } },
    );

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: { ...updatedUser, _id: updatedUser._id.toString() },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin only access" },
        { status: 403 },
      );
    }

    const userAuth = await verifyToken(request);
    if (!userAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const objectId = toObjectId(params.id);
    if (!objectId) {
      return NextResponse.json(
        { success: false, message: "Invalid user id" },
        { status: 400 },
      );
    }

    const usersCollection = await getUsers();

    const targetUser = await usersCollection.findOne({ _id: objectId });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (targetUser.role === "admin") {
      return NextResponse.json(
        { success: false, message: "Cannot delete admin account" },
        { status: 403 },
      );
    }

    await usersCollection.deleteOne({ _id: objectId });

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
