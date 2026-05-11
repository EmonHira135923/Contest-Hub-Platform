import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // accessToken কুকি রিমুভ করা
    cookieStore.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // কুকিটি সাথে সাথে এক্সপায়ার হয়ে যাবে
      path: "/",
    });

    // refreshToken কুকি রিমুভ করা
    cookieStore.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    return Response.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Logout failed", error: error.message },
      { status: 500 },
    );
  }
}
