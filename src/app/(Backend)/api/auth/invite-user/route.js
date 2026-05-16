import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/app/(Backend)/lib/sendEmail";
import { getInvitationEmailTemplate } from "@/app/(Backend)/lib/genarateTemplate";

export async function POST(req) {
  try {
    const { email, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json(
        { success: false, message: "Email and Role are required" },
        { status: 400 },
      );
    }

    const { NEXTAUTH_SECRET_KEY, NEXT_PUBLIC_API_URL, EMAIL_USER, EMAIL_PASS } =
      process.env;

    if (!NEXTAUTH_SECRET_KEY || !NEXT_PUBLIC_API_URL || !EMAIL_USER || !EMAIL_PASS) {
      console.error(
        "Invitation API Error: NEXTAUTH_SECRET_KEY, NEXT_PUBLIC_API_URL, EMAIL_USER, and EMAIL_PASS must be configured",
      );
      return NextResponse.json(
        { success: false, message: "Invitation service is not configured" },
        { status: 500 },
      );
    }

    // ১. একটি সিকিউর টোকেন জেনারেট করুন (২৪ ঘণ্টা মেয়াদ)
    const token = jwt.sign(
      { email, role },
      NEXTAUTH_SECRET_KEY, // আপনার .env ফাইলে এটি থাকতে হবে
      { expiresIn: "24h" },
    );

    // ২. ইনভাইটেশন লিঙ্ক তৈরি (আপনার .env এর NEXT_PUBLIC_API_URL ব্যবহার করে)
    const inviteUrl = new URL("/auth/signup", NEXT_PUBLIC_API_URL);
    inviteUrl.searchParams.set("token", token);
    const inviteLink = inviteUrl.toString();

    // ৩. ইমেইল বডি জেনারেট করা
    const htmlBody = getInvitationEmailTemplate(inviteLink, role);

    // ৪. ইমেইল পাঠানো
    await sendEmail({
      to: email,
      subject: `Invitation to join ContestHub as ${role}`,
      html: htmlBody,
    });

    return NextResponse.json({
      success: true,
      message: "Invitation sent successfully!",
    });
  } catch (error) {
    console.error("Invitation API Error:", error);
    const message =
      error.message === "Failed to send email"
        ? "Failed to send invitation email"
        : "Internal Server Error";

    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
