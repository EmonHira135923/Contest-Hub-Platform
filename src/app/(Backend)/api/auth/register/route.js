import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, image, phone } = body;

    const usersCollection = await getUsers();

    if (!email || !password || !name || !phone) {
      return Response.json(
        { success: false, message: "Missing name or email or password or phone" },
        { status: 400 },
      );
    }

    // ১. ইউজার অলরেডি আছে কিনা চেক করুন
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // ২. পাসওয়ার্ড হ্যাশ করা
    const hashedPassword = await bcrypt.hash(password, 10);

    // ৩. ডাটাবেসে সেভ করা
    const newUser = {
      name,
      email,
      phone,
      image,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
      updatedAt: null,
    };

    const result = await usersCollection.insertOne(newUser);

    return new Response(
      JSON.stringify({
        success: true,
        message: "User created successfully",
        data: result,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function GET(request) {
  try {
    const usersCollection = await getUsers();

    // পাসওয়ার্ড ফিল্ডটি বাদ দিয়ে (projection: 0) সব ডাটা আনা হচ্ছে
    const users = await usersCollection
      .find({}, { projection: { password: 0 } })
      .toArray();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Users fetched successfully",
        data: users,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
