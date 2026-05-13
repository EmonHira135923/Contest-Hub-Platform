import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";

// GET USER BY ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const usersCollection = await getUsers();
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// UPDATE USER (Role, Phone, Image)
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const usersCollection = await getUsers();

    // Admin can change everything: role, phone, image
    const updateData = { ...body };
    delete updateData._id; // Ensure ID is not overwritten

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    return NextResponse.json({ message: "User updated successfully", result });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const usersCollection = await getUsers();

    // 1. Target user-ke khunje ber kora (jake delete kora hobe)
    const targetUser = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!targetUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 2. Role Check: Admin arekjon Admin-ke delete korte parbe na
    if (targetUser.role === "admin") {
      return NextResponse.json(
        { message: "Security Alert: Admin accounts cannot be deleted!" },
        { status: 403 },
      );
    }

    /**
     * NOTE: Request jini pathachhen (Admin), tar ID jodi 'id' er soman hoy,
     * taholeo delete bondho kora dorkar.
     * Eita amra frontend thekeo handle korte pari ba Auth Session theke.
     */

    // 3. Delete execution
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      message: `User ${targetUser.name} deleted successfully`,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
