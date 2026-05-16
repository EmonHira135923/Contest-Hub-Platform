import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { verifyAdmin } from "@/app/(Backend)/middlewares/IsAdmin";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, image, phone } = body;

    const usersCollection = await getUsers();

    if (!email || !password || !name || !phone) {
      return Response.json(
        {
          success: false,
          message: "Missing name or email or password or phone",
        },
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

    // অথেন্টিকেশন এবং অ্যাডমিন ভেরিফিকেশন (আপনার আগের লজিক)
    const Token = await verifyToken(request);
    const admin = await verifyAdmin(request, Token);

    if (!Token) {
      return Response.json(
        { success: false, message: "Unauthorized-Access" },
        { status: 401 }
      );
    }

    if (!admin) {
      return Response.json(
        { success: false, message: "Forbidden Access" },
        { status: 403 }
      );
    }

    // ১. সার্চ এবং পেজিনেশন প্যারামিটারগুলো ইউআরএল থেকে ধরা
    const { searchParams } = new URL(request.url);
    const search = (searchParams.get("search") || "").trim();
    const page = Math.max(Number.parseInt(searchParams.get("page"), 10) || 1, 1);
    const limit = Math.max(
      Number.parseInt(searchParams.get("limit"), 10) || 10,
      1,
    );
    const skip = (page - 1) * limit;

    // ২. সার্চ কুয়েরি তৈরি করা (Name, Email, Role, Phone, Provider, ID)
    let query = {};
    if (search) {
      const searchConditions = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { provider: { $regex: search, $options: "i" } },
      ];

      if (ObjectId.isValid(search)) {
        searchConditions.push({ _id: new ObjectId(search) });
      }

      query = {
        $or: searchConditions,
      };
    }

    // ৩. টোটাল ইউজারের সংখ্যা বের করা (ফ্রন্টএন্ডে পেজ কাউন্ট দেখানোর জন্য)
    const totalUsers = await usersCollection.countDocuments(query);

    // ৪. ডাটা ফেচ করা (Pagination + Projection)
    const users = await usersCollection
      .find(query, { projection: { password: 0 } })
      .skip(skip)
      .limit(limit)
      .toArray();

    return Response.json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      meta: {
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        limit,
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
