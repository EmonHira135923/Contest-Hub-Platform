import { getCreator, getUsers } from "@/app/(Backend)/lib/dbConnect";
import { verifyAdmin } from "@/app/(Backend)/middlewares/IsAdmin";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const creatorCollection = await getCreator();

    // টোকেন এবং এডমিন ভেরিফিকেশন মিডলওয়্যার কল করা
    const Token = await verifyToken(request);
    const admin = await verifyAdmin(request);

    // যদি টোকেন না থাকে বা ইনভ্যালিড হয়
    if (!Token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access. Token missing." },
        { status: 401 },
      );
    }

    // যদি ইউজার এডমিন না হয়
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Forbidden access. Admins only." },
        { status: 403 },
      );
    }

    const usersCollection = await getUsers();

    // নির্দিষ্ট ক্রিয়েটর অ্যাপ্লিকেশন আইডি অনুযায়ী ডাটা খোঁজা
    const application = await creatorCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 },
      );
    }

    // সফল হলে অ্যাপ্লিকেশনের ডাটা রিটার্ন করা
    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// ==========================================
// 2. PATCH: Update Application Status & Sync User Role
// ==========================================
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { status } = await request.json(); // ফ্রন্টএন্ড থেকে 'approved' অথবা 'rejected' আসবে

    const creatorCollection = await getCreator();

    // টোকেন এবং এডমিন ভেরিফিকেশন মিডলওয়্যার কল করা
    const Token = await verifyToken(request);
    const admin = await verifyAdmin(request);

    // যদি টোকেন না থাকে বা ইনভ্যালিড হয়
    if (!Token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access. Token missing." },
        { status: 401 },
      );
    }

    // যদি ইউজার এডমিন না হয়
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Forbidden access. Admins only." },
        { status: 403 },
      );
    }

    const usersCollection = await getUsers();

    // ১. অ্যাপ্লিকেশনটি খুঁজে বের করা
    const application = await creatorCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 },
      );
    }

    // ২. এডমিন যেন নিজের অ্যাপ্লিকেশন নিজে আপডেট করতে না পারে (Token এর id দিয়ে চেক)
    if (application.userId === Token.id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Operation forbidden. You cannot update your own application status!",
        },
        { status: 403 },
      );
    }

    // ৩. অ্যাপ্লিকেশনের স্ট্যাটাস আপডেট করা
    await creatorCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date().toISOString() } },
    );

    // ৪. স্ট্যাটাস অনুযায়ী ইউজার কালেকশনে রোল (Role) হ্যান্ডেল করা
    if (status === "approved") {
      // একসেপ্ট হলে ইউজারের রোল আপডেট হয়ে 'creator' হবে
      await usersCollection.updateOne(
        { _id: new ObjectId(application.userId) },
        { $set: { role: "creator" } },
      );
    } else if (status === "rejected") {
      // রিজেক্ট হলে ইউজারের রোল নরমাল 'user' হয়ে যাবে
      await usersCollection.updateOne(
        { _id: new ObjectId(application.userId) },
        { $set: { role: "user" } },
      );
    }

    return NextResponse.json({
      success: true,
      message: `Application ${status} and user role synced.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// ==========================================
// 3. DELETE: Remove Creator Application Request
// ==========================================
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const creatorCollection = await getCreator();

    // টোকেন এবং এডমিন ভেরিফিকেশন মিডলওয়্যার কল করা
    const Token = await verifyToken(request);
    const admin = await verifyAdmin(request);

    // যদি টোকেন না থাকে বা ইনভ্যালিড হয়
    if (!Token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access. Token missing." },
        { status: 401 },
      );
    }

    // যদি ইউজার এডমিন না হয়
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Forbidden access. Admins only." },
        { status: 403 },
      );
    }

    // অ্যাপ্লিকেশনটি ডিলিট করা
    const deleteResult = await creatorCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Request not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Creator request deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
