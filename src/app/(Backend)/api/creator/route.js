import { NextResponse } from "next/server";
import { verifyToken } from "../../middlewares/verifyToken";
import { getCreator } from "../../lib/dbConnect";
import { verifyAdmin } from "../../middlewares/IsAdmin";

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
      updatedAt: new Date().toISOString(),
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


export async function GET(request) {
  try {
    // ১. সিকিউরিটি চেক
    const tokenUser = await verifyToken(request);
    const admin = await verifyAdmin(request);

    if (!tokenUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized-Access" },
        { status: 401 }
      );
    }

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Forbidden-Access" },
        { status: 403 }
      );
    }

    // ২. URL থেকে সব Query Parameters এক্সট্রাক্ট করা
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || ""; 
    const status = searchParams.get("status") || "";  
    const district = searchParams.get("district") || "";  
    const phone = searchParams.get("phone") || "";        
    const education = searchParams.get("education") || ""; 
    
    const page = parseInt(searchParams.get("page")) || 1;  
    const limit = 10; 
    const skip = (page - 1) * limit; 

    // ৩. ডাইনামিক কুয়েরি অবজেক্ট (Dynamic Query Object) তৈরি
    let query = {};

    // গ্লোবাল সার্চ (নাম অথবা ইমেইল)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    // স্ট্যাটাস ফিল্টার (Exact Match)
    if (status) {
      query.status = status;
    }

    // জেলা ফিল্টার (Case-insensitive Match)
    if (district) {
      query.district = { $regex: district, $options: "i" };
    }

    // ফোন নাম্বার ফিল্টার (Partial or Exact Match)
    if (phone) {
      query.phone = { $regex: phone, $options: "i" };
    }

    // শিক্ষাগত যোগ্যতা ফিল্টার (Exact Match)
    if (education) {
      query.education = education;
    }

    const creatorCollection = await getCreator();

    // ৪. ফিল্টার করা মোট ডকুমেন্টের সংখ্যা কাউন্ট করা
    const totalRequests = await creatorCollection.countDocuments(query);

    // ৫. ডাটাবেজ থেকে ফিল্টার, সর্ট এবং পেজিনেশন অনুযায়ী ডেটা আনা
    const requests = await creatorCollection
      .find(query)
      .sort({ appliedAt: -1 }) // লেটেস্ট ডেট আগে আসবে
      .skip(skip)
      .limit(limit)
      .toArray();

    // ৬. রেসপন্স রিটার্ন করা
    return NextResponse.json({
      success: true,
      meta: {
        totalData: totalRequests,
        totalPages: Math.ceil(totalRequests / limit),
        currentPage: page,
        limit: limit
      },
      data: requests,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
