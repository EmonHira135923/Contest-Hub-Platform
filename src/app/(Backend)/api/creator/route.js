import { NextResponse } from "next/server";
import { verifyToken } from "../../middlewares/verifyToken";
import { getCreator } from "../../lib/dbConnect";

// ==================== POST: Submit Application ====================
export async function POST(request) {
  try {
    // ১. ইউজার অথেনটিকেশন চেক
    const tokenUser = await verifyToken(request);

    if (!tokenUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Please log in first." },
        { status: 401 },
      );
    }

    const data = await request.json();
    const creatorCollection = await getCreator();

    // ২. চেক করা হচ্ছে ইউজার অলরেডি অ্যাপ্লাই করেছে কিনা
    const existingApplication = await creatorCollection.findOne({
      email: tokenUser.email,
    });

    if (existingApplication) {
      if (existingApplication.status === "pending") {
        return NextResponse.json(
          {
            success: false,
            message: "আপনার একটি আবেদন ইতিমধ্যেই পেন্ডিং রয়েছে।",
          },
          { status: 400 },
        );
      }
      if (existingApplication.status === "approved") {
        return NextResponse.json(
          { success: false, message: "আপনি ইতিমধ্যেই একজন ক্রিয়েটর।" },
          { status: 400 },
        );
      }
    }

    // ৩. ফিল্ড ভ্যালিডেশন ও ডেটা ফিল্টারিং (নিরাপত্তার জন্য)
    const { phone, education, region, district, ojLink, hasDevice } = data;

    if (
      !phone ||
      !education ||
      !region ||
      !district ||
      !ojLink ||
      hasDevice !== "yes"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "সবগুলো প্রয়োজনীয় তথ্য সঠিকভাবে প্রদান করুন।",
        },
        { status: 400 },
      );
    }

    // ৪. ফাইনাল পেলোড তৈরি (ইউজারের নিজস্ব ডেটা ব্যাকএন্ড থেকে ফোর্স করা হচ্ছে)
    const newApplication = {
      userId: tokenUser.id || tokenUser._id,
      name: tokenUser.name,
      email: tokenUser.email,
      phone,
      education,
      region,
      district,
      ojLink,
      hasDevice,
      status: "pending",
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const result = await creatorCollection.insertOne(newApplication);

    return NextResponse.json({
      success: true,
      message: "আপনার আবেদনটি সফলভাবে জমা হয়েছে!",
      data: { ...newApplication, _id: result.insertedId },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// ==================== GET: Fetch All Applications ====================
export async function GET(request) {
  try {
    // সিকিউরিটি চেক: রিকোয়েস্টকারী ইউজার অ্যাডমিন কিনা (ঐচ্ছিক, আপনার প্রজেক্টের রুলস অনুযায়ী)
    const tokenUser = await verifyToken(request);

    if (!tokenUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized-Access" },
        { status: 401 },
      );
    }

    const creatorCollection = await getCreator();

    // ডাটাবেজ থেকে সব রিকোয়েস্ট লেটেস্ট ডেট অনুযায়ী সর্ট করে আনা হচ্ছে
    const requests = await creatorCollection
      .find()
      .sort({ appliedAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
