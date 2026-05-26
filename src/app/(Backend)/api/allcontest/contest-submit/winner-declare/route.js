import { getAllContests, getPayments } from "@/app/(Backend)/lib/dbConnect";
import { verifyCreator } from "@/app/(Backend)/middlewares/IsCreator";
import { verifyToken } from "@/app/(Backend)/middlewares/verifyToken";
import { ObjectId } from "mongodb";

export async function PUT(request) {
  try {
    // ১. ইউজার ও ক্রিয়েটর অথেনটিকেশন চেক
    const user = await verifyToken(request);
    const isCreator = await verifyCreator(request);

    if (!user || !user.email) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    if (!isCreator) {
      return Response.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    // ২. ফ্রন্টএন্ড থেকে পাঠানো ডাটা রিসিভ করা (contestId এবং winnerEmail)
    const body = await request.json();
    const { contestId, winnerEmail } = body;

    if (!contestId || !winnerEmail) {
      return Response.json(
        {
          success: false,
          message: "Missing required fields: contestId or winnerEmail",
        },
        { status: 400 },
      );
    }

    const contestCollection = await getAllContests();
    const paymentCollection = await getPayments();

    // ৩. contestId দিয়ে অল-কনটেস্ট কালেকশন থেকে ডেডলাইন খুঁজে বের করা
    const contest = await contestCollection.findOne({
      _id: new ObjectId(contestId),
    });

    if (!contest) {
      return Response.json(
        { success: false, message: "Contest not found" },
        { status: 404 },
      );
    }

    // ৪. ডেডলাইন চেক লজিক (কনটেস্ট শেষ হয়েছে কি না) ⏰
    const now = new Date();
    const deadline = new Date(contest.deadline);

    if (now < deadline) {
      return Response.json(
        {
          success: false,
          message:
            "Cannot declare a winner before the contest deadline has passed!",
        },
        { status: 400 },
      );
    }

    // ৫. পেমেন্ট কালেকশনে উইনারের ডক আপডেট করা (isWinner: true)
    const paymentUpdate = await paymentCollection.updateOne(
      {
        contestId: contestId, // পেমেন্ট ডকের স্ট্রিং contestId এর সাথে মিলবে
        customer_email: winnerEmail, // উইনারের ইমেইল
        paymentStatus: "paid", // শুধুমাত্র পেইড মেম্বাররাই উইনার হতে পারবে
      },
      {
        $set: {
          isWinner: true,
          wonAt: new Date(),
        },
      },
    );

    // যদি পেমেন্ট কালেকশনে এই ইমেইল বা কনটেস্টের কোনো ম্যাচ না পাওয়া যায়
    if (paymentUpdate.matchedCount === 0) {
      return Response.json(
        {
          success: false,
          message:
            "No active paid registration found for this user in this contest",
        },
        { status: 404 },
      );
    }

    // ৬. অল-কনটেস্ট কালেকশনে উইনারের ইনফো এবং স্ট্যাটাস 'completed' আপডেট করা 🏆
    await contestCollection.updateOne(
      { _id: new ObjectId(contestId) },
      {
        $set: {
          contestStatus: "completed", // কনটেস্টটি এখন ক্লোজ বা কমপ্লিট
          winner: {
            email: winnerEmail,
            declaredAt: new Date(),
            prize: contest.prize, // প্রাইজ ইনফো কনটেস্ট ডক থেকে নেওয়া হচ্ছে
          },
        },
      },
    );

    return Response.json(
      {
        success: true,
        message: "Winner declared and contest completed successfully! 🎉🏆",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Winner Declaration Error:", error.message);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
