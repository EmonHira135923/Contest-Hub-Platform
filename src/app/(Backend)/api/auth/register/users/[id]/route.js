import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { verifyAdmin } from "@/app/(Backend)/middlewares/IsAdmin";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";

const allowedRoles = ["admin", "creator", "user"];

const getObjectId = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return new ObjectId(id);
};

const authorizeAdmin = async (request) => {
  const token = await verifyToken(request);

  if (!token) {
    return {
      response: NextResponse.json(
        { success: false, message: "Unauthorized-Access" },
        { status: 401 },
      ),
    };
  }

  const admin = await verifyAdmin(request, token);

  if (!admin) {
    return {
      response: NextResponse.json(
        { success: false, message: "Forbidden Access" },
        { status: 403 },
      ),
    };
  }

  return { token, admin };
};

export async function GET(request, { params }) {
  try {
    const auth = await authorizeAdmin(request);
    if (auth.response) return auth.response;

    const { id } = await params;
    const objectId = getObjectId(id);

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

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    // ১. অ্যাডমিন অথোরাইজেশন চেক
    const auth = await authorizeAdmin(request);
    if (auth.response) return auth.response;

    // auth অবজেক্ট থেকে বর্তমানে লগইন করা অ্যাডমিনের তথ্য নেওয়া (আপনার auth লজিক অনুযায়ী)
    // সাধারণত authorizeAdmin বা verifyToken থেকে ইউজারের আইডি পাওয়া যায়
    const currentAdminId = auth?.user?.id || auth?.id;

    const { id } = await params;
    const objectId = getObjectId(id);

    if (!objectId) {
      return NextResponse.json(
        { success: false, message: "Invalid user id" },
        { status: 400 },
      );
    }

    // ২. চেক: অ্যাডমিন কি নিজের আইডি এডিট করার চেষ্টা করছে?
    if (currentAdminId && currentAdminId.toString() === objectId.toString()) {
      return NextResponse.json(
        {
          success: false,
          message: "Security Alert: You cannot change your own role!",
        },
        { status: 403 },
      );
    }

    const { role } = await request.json();

    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role" },
        { status: 400 },
      );
    }

    const usersCollection = await getUsers();

    // ৩. ডাটাবেজ আপডেট
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
      message: "User role updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("PATCH_ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const auth = await authorizeAdmin(request);
    if (auth.response) return auth.response;

    const { id } = await params;
    const objectId = getObjectId(id);

    if (!objectId) {
      return NextResponse.json(
        { success: false, message: "Invalid user id" },
        { status: 400 },
      );
    }

    const usersCollection = await getUsers();
    const targetUser = await usersCollection.findOne(
      { _id: objectId },
      { projection: { password: 0 } },
    );

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const requesterId = auth.token?.id || auth.token?._id;

    if (requesterId && requesterId.toString() === id) {
      return NextResponse.json(
        { success: false, message: "You cannot delete your own account" },
        { status: 403 },
      );
    }

    if (targetUser.role === "admin") {
      return NextResponse.json(
        { success: false, message: "Admin accounts cannot be deleted" },
        { status: 403 },
      );
    }

    await usersCollection.deleteOne({ _id: objectId });

    return NextResponse.json({
      success: true,
      message: `User ${targetUser.name || targetUser.email} deleted successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
