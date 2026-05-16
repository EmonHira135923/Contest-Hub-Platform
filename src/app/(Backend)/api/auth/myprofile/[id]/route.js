import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";

export async function PATCH(request, { params }) {
  try {
    // ১. টোকেন ভেরিফিকেশন
    const Token = await verifyToken(request);

    if (!Token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized-Access" },
        { status: 401 },
      );
    }

    const { id } = await params;

    // ২. রিকোয়েস্ট বডি থেকে ডাটা নেওয়া
    const { name, phone, image } = await request.json();

    const usersCollection = await getUsers();
    const updateFields = {};

    // ৩. শুধুমাত্র পাঠানো ফিল্ডগুলো আপডেট অবজেক্টে যোগ করা
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (image) updateFields.image = image;

    // যদি কোনো ডাটাই না পাঠানো হয়
    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { message: "Nothing to update" },
        { status: 400 },
      );
    }

    // ৪. ডাটাবেস আপডেট
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      updatedData: updateFields,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { message: "Update failed", error: error.message },
      { status: 500 },
    );
  }
}
