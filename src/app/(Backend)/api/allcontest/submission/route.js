import { NextResponse } from "next/server";
import { getSubmission } from "@/app/(Backend)/lib/dbConnect";

// ==================== GET METHOD ====================
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // প্যাজিনেশন এবং লিমিট হ্যান্ডেলিং
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const limit = Math.max(Number(searchParams.get("limit") || 10), 1);
    const skip = (page - 1) * limit;

    const SubmissionCollection = await getSubmission();

    // ডিফল্ট ফিল্টার: শুধুমাত্র "submitted" স্ট্যাটাসের ডাটা রিট্রিভ হবে
    let filter = {
      contestSubmissionStatus: "submitted",
    };

    const totalCount = await SubmissionCollection.countDocuments(filter);
    const totalPages = Math.max(Math.ceil(totalCount / limit), 1);

    const submissions = await SubmissionCollection.find(filter)
      .sort({ submittedAt: -1 }) // নতুন সাবমিশন সবার আগে দেখাবে
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      count: submissions.length,
      totalCount,
      page,
      limit,
      totalPages,
      data: submissions,
    });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// ==================== POST METHOD ====================
export async function POST(request) {
  try {
    const SubmissionCollection = await getSubmission();
    const body = await request.json();

    const { submissionLink, submissionNotes, contestId, participantEmail } =
      body;

    // সার্ভার সাইড ভ্যালিডেশন
    if (
      !submissionLink ||
      !submissionNotes ||
      !contestId ||
      !participantEmail
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 },
      );
    }

    // নতুন সাবমিশন অবজেক্ট স্কিমা
    const newSubmission = {
      contestId,
      submissionLink: submissionLink.trim(),
      submissionNotes: submissionNotes.trim(),
      participantEmail: participantEmail.toLowerCase().trim(),
      submittedAt: new Date(),
      contestSubmissionStatus: "submitted",
    };

    const result = await SubmissionCollection.insertOne(newSubmission);

    return NextResponse.json(
      {
        success: true,
        message: "Contest entry submitted successfully! 🎉",
        insertedId: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
