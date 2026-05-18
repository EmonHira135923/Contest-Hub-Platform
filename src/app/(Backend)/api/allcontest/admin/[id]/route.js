import { getAllContests } from "@/app/(Backend)/lib/dbConnect";
import { verifyAdmin } from "@/app/(Backend)/middlewares/IsAdmin";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// ১. GET: নির্দিষ্ট একটি কন্টেস্টের ডিটেইলস ডাটা ফেচ করার জন্য
export async function GET(request, { params }) {
  try {
    const isUser = await verifyToken(request);
    const isAdmin = await verifyAdmin(request);

    if (!isUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 },
      );
    }

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Forbiden access" },
        { status: 403 },
      );
    }

    const { id } = await params;

    // ID ভ্যালিডেশন
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid Contest ID format" },
        { status: 400 },
      );
    }

    const contestCollection = await getAllContests();
    const contest = await contestCollection.findOne({ _id: new ObjectId(id) });

    if (!contest) {
      return NextResponse.json(
        { success: false, message: "Contest not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: contest,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error occurred",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// ২. PATCH: Approve / Reject স্ট্যাটাস আপডেট করার এপিআই
export async function PATCH(request, { params }) {
  try {
    const isUser = await verifyToken(request);
    const isAdmin = await verifyAdmin(request);

    if (!isUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 },
      );
    }

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Forbiden access" },
        { status: 403 },
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { action } = body; // action: 'approved' অথবা 'rejected'

    if (!action || !["approved", "rejected"].includes(action)) {
      return NextResponse.json(
        { success: false, message: "Invalid action payload" },
        { status: 400 },
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid Contest ID format" },
        { status: 400 },
      );
    }

    const contestCollection = await getAllContests();

    // ডাটাবেজে স্ট্যাটাস আপডেট করা হচ্ছে
    const result = await contestCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { adminStatus: action } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Contest not found to update" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Contest state updated to ${action} successfully!`,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error occurred",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// ৩. DELETE: ডাটাবেজ থেকে কন্টেস্ট পার্মানেন্টলি রিমুভ করার এপিআই
export async function DELETE(request, { params }) {
  try {
    const isUser = await verifyToken(request);
    const isAdmin = await verifyAdmin(request);

    if (!isUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 },
      );
    }

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Forbiden access" },
        { status: 403 },
      );
    }

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid Contest ID format" },
        { status: 400 },
      );
    }

    const contestCollection = await getAllContests();

    // ডাটাবেজ থেকে ডিলিট করা হচ্ছে
    const result = await contestCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Contest not found to delete" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contest removed from system successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error occurred",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
