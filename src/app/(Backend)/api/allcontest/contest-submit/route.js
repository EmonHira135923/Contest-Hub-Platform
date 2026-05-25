import { getPayments } from "@/app/(Backend)/lib/dbConnect";
import { logTracking } from "@/app/(Backend)/lib/logTracking";
import { verifyCreator } from "@/app/(Backend)/middlewares/IsCreator";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";
import { ObjectId } from "mongodb"; // 🟢 আইডি ম্যাচিং ফিক্সের জন্য প্রয়োজনীয়

export async function PUT(request) {
  try {
    // ১. ইউজার অথেনটিকেশন চেক করা
    const user = await verifyToken(request);
    if (!user || !user.email) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // ২. ফ্রন্টএন্ড থেকে পাঠানো ডাটা রিসিভ করা
    const body = await request.json();
    const { contestId, submissionLink, submissionNotes, trackingId } = body;

    if (!contestId || !submissionLink) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const paymentsCollection = await getPayments();

    // 🟢 ফিক্সড কুয়েরি ফিল্টার: ডাটাবেজের contestId অবজেক্ট নাকি স্ট্রিং—উভয় ফরম্যাটই চেক করবে
    const query = {
      paymentStatus: "paid",
      customer_email: user.email,
      $or: [
        { contestId: contestId },
        {
          contestId: ObjectId.isValid(contestId)
            ? new ObjectId(contestId)
            : contestId,
        },
      ],
    };

    // ফ্রন্টএন্ড থেকে trackingId পাঠানো হলে তা কুয়েরিতে যুক্ত হবে
    if (trackingId) {
      query.trackingId = trackingId;
    }

    // ৩. নির্দিষ্ট ইউজারের পেইড করা পেমেন্ট ডকুমেন্টে স্ট্যাটাস, লিংক ও নোটস আপডেট করা
    const result = await paymentsCollection.updateOne(query, {
      $set: {
        contestSubmissionStatus: "submitted",
        submissionLink: submissionLink.trim(),
        submissionNotes: submissionNotes ? submissionNotes.trim() : "", // 📝 নোটস এখানে সেভ হবে
        submittedAt: new Date(),
      },
    });

    if (trackingId && result.matchedCount > 0) {
      await logTracking(
        trackingId,
        "Payment Confirmed",
        "Your payment is successful. Waiting for courier pickup.",
      );
    }

    if (result.matchedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "No active paid registration found for this contest",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Contest assignment submitted successfully! 🎉",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Submission Error:", error.message);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    // ১. ইউজার অথেনটিকেশন চেক করা (নিরাপত্তার জন্য)
    const user = await verifyToken(request);
    if (!user || !user.email) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const isCreator = await verifyCreator(request);

    if (!isCreator) {
      return Response.json(
        {
          success: false,
          message: "Forbidden: Only creators can access this resource",
        },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(request.url);

    // পেজিনেশনের জন্য প্যারামিটার নেওয়া (অপশনাল কিন্তু বেস্ট প্র্যাকটিস)
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const limit = Math.max(Number(searchParams.get("limit") || 10), 1);
    const skip = (page - 1) * limit;

    const paymentsCollection = await getPayments();

    // ২. ফিল্টার তৈরি: শুধুমাত্র "submitted" স্ট্যাটাসের ডেটা আনা হবে
    let filter = {
      contestSubmissionStatus: "submitted",
    };

    // ৩. ডাটাবেজ থেকে কাউন্ট ও ডেটা কুয়েরি করা
    const totalCount = await paymentsCollection.countDocuments(filter);
    const totalPages = Math.max(Math.ceil(totalCount / limit), 1);

    const submittedContests = await paymentsCollection
      .find(filter)
      .sort({ submittedAt: -1 }) // একদম নতুন সাবমিশনগুলো আগে দেখাবে
      .skip(skip)
      .limit(limit)
      .toArray();

    return Response.json({
      success: true,
      count: submittedContests.length,
      totalCount,
      page,
      limit,
      totalPages,
      data: submittedContests,
    });
  } catch (error) {
    console.error("Fetch Submission Error:", error.message);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
