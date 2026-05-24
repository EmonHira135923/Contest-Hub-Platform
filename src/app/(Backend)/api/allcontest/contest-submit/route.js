import { getPayments } from "@/app/(Backend)/lib/dbConnect";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";

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
    const { contestId, submissionLink, submissionNotes } = body;

    if (!contestId || !submissionLink) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const paymentsCollection = await getPayments();

    // ৩. নির্দিষ্ট ইউজারের পেইড করা পেমেন্ট ডকুমেন্টে স্ট্যাটাস, লিংক ও নোটস আপডেট করা
    const result = await paymentsCollection.updateOne(
      {
        contestId: contestId,
        customer_email: user.email,
        paymentStatus: "paid",
      },
      {
        $set: {
          contestSubmissionStatus: "submitted",
          submissionLink: submissionLink.trim(),
          submissionNotes: submissionNotes ? submissionNotes.trim() : "", // 📝 নোটস এখানে সেভ হবে
          submittedAt: new Date(),
        },
      },
    );

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
