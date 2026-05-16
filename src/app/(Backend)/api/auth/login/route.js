import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const userCollection = await getUsers();
    const body = await request.json();

    const { email, password } = body;

    // 1. validation
    if (!email || !password) {
      return Response.json(
        { success: false, message: "Missing email or password" },
        { status: 400 },
      );
    }

    // 2. find user
    const normalizedEmail = email.toLowerCase().trim();
    const user =
      (await userCollection.findOne({ email: normalizedEmail })) ||
      (await userCollection.findOne({ email: email.trim() }));

    if (!user) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 },
      );
    }

    if (typeof user.password !== "string" || !user.password) {
      return Response.json(
        {
          success: false,
          message:
            "This account does not have a password. Please login with Google/GitHub or reset your password.",
        },
        { status: 400 },
      );
    }

    // 3. password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 },
      );
    }

    // 4. JWT payload
    const payload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.NEXTAUTH_SECRET_KEY, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.NEXTAUTH_REFRESH_KEY, {
      expiresIn: "7d",
    });

    // 5. set cookies
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
      path: "/",
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    // 6. remove password safely
    const { password: _, ...userWithoutPassword } = user;

    return Response.json(
      {
        success: true,
        message: "Login successful",
        user: {
          ...userWithoutPassword,
          _id: user._id.toString(),
        },
        accessToken,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Login Failed",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
