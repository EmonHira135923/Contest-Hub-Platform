import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb"; // Import this!

export async function GET(request) {
  try {
    const usersCollection = await getUsers();

    // 1. cookie read (Fix: Add await)
    const cookieStore = await cookies(); 
    const token = cookieStore.get("accessToken")?.value;

    console.log("🔥 ACCESS TOKEN FROM COOKIE:", token);

    if (!token) {
      return Response.json(
        { success: false, message: "Unauthorized - no token" },
        { status: 401 }
      );
    }

    // 2. verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET_KEY);
      console.log("✅ TOKEN DECODED:", decoded);
    } catch (err) {
      return Response.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // 3. user find (Fix: Wrap ID in ObjectId)
    const user = await usersCollection.findOne({
      _id: new ObjectId(decoded.id), 
    });

    if (!user) {
      console.log("❌ USER NOT FOUND FOR ID:", decoded.id);
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 4. Safely remove password
    const { password, ...userWithoutPassword } = user;

    return Response.json(
      {
        success: true,
        user: {
          ...userWithoutPassword,
          _id: user._id.toString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("💥 SERVER ERROR:", error.message);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}