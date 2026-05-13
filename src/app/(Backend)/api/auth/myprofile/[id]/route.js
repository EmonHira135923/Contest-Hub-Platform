import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { phone, image } = await request.json(); // Only allow these fields
    const usersCollection = await getUsers();

    const updateFields = {};
    if (phone) updateFields.phone = phone;
    if (image) updateFields.image = image;

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { message: "Nothing to update" },
        { status: 400 },
      );
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      updateFields,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Update failed", error: error.message },
      { status: 500 },
    );
  }
}
