import { getAllContests, getPayments, getUsers } from "../../lib/dbConnect";
import { verifyToken } from "../../middlewares/verifyToken";

export async function GET(request) {
  try {
    // ১. ইউজার অথেন্টিকেশন ও টোকেন ভেরিফিকেশন
    const user = await verifyToken(request);

    if (!user || !user.email) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ২. URL থেকে কুয়েরি প্যারামিটার এবং পেজিনেশন ডেটা নেওয়া
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const contestId = searchParams.get("contestId");

    const page = Math.max(parseInt(searchParams.get("page")) || 1, 1);
    const limit = Math.max(parseInt(searchParams.get("limit")) || 10, 1);
    const skip = (page - 1) * limit;

    const paymentsCollections = await getPayments();

    // ৩. মেইন ফিল্টার কুয়েরি (শুধুমাত্র পেইড পেমেন্ট ট্র্যাক করার জন্য)
    let matchQuery = {
      paymentStatus: "paid",
    };

    if (contestId) {
      matchQuery.contestId = contestId;
    }

    if (search) {
      matchQuery.$or = [
        { transactionId: { $regex: search, $options: "i" } },
        { customerName: { $regex: search, $options: "i" } },
        { customer_email: { $regex: search, $options: "i" } },
      ];
    }

    // ৪. এগ্রিগেশন পাইপলাইন (৩টি টেবিল মার্জ, সর্টিং এবং পেজিনেশন)
    const pipeline = [
      // ফিল্টারিং করা হচ্ছে
      { $match: matchQuery },
      
      // contestId স্ট্রিং থেকে ObjectId তে কনভার্ট (যদি আপনার ডাটাবেজে ObjectId থাকে)
      {
        $addFields: {
          convertedContestId: { $toObjectId: "$contestId" }
        }
      },

      // 🌟 ফিক্সড: "AllContest" কালেকশনের সাথে জয়েন (আপনার dbConnect এর নাম অনুযায়ী)
      {
        $lookup: {
          from: "AllContest", 
          localField: "convertedContestId",
          foreignField: "_id",
          as: "contestDetails"
        }
      },
      { $unwind: { path: "$contestDetails", preserveNullAndEmptyArrays: true } },

      // 🌟 ফিক্সড: "User" কালেকশনের সাথে কাস্টমার ইমেইল দিয়ে জয়েন (আপনার dbConnect এর নাম অনুযায়ী)
      {
        $lookup: {
          from: "User", 
          localField: "customer_email",
          foreignField: "email",
          as: "userDetails"
        }
      },
      { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },

      // ৫. লিডারবোর্ড সর্টিং লজিক: 
      // প্রথমে বিজয়ীরা আসবে, এরপর যার wonAt সময় কম (আগে বিজয়ী হয়েছে) সে সবার উপরে থাকবে
      {
        $sort: {
          isWinner: -1,     // true মানগুলো আগে আসবে (1st, 2nd, 3rd পডিয়ামের জন্য)
          "wonAt": 1,       // পুরাতন বা কম সময় (আগে ডিক্লেয়ার হওয়া বিজয়ী) শীর্ষে থাকবে
          "paidAt": 1       // যদি টাই হয়, তবে যে আগে জয়েন করেছে সে অগ্রাধিকার পাবে
        }
      },

      // ৬. পেজিনেশন (Skip এবং Limit ডাটাবেজ লেভেলে)
      { $skip: skip },
      { $limit: limit },

      // ৭. প্রজেকশন: ক্লায়েন্টের জন্য ক্লিন রেসপন্স ফরম্যাট তৈরি
      {
        $project: {
          _id: 1,
          contestId: 1,
          transactionId: 1,
          customerName: 1,
          customer_email: 1,
          paymentStatus: 1,
          contestSubmissionStatus: 1,
          isWinner: 1,
          wonAt: 1,
          submittedAt: 1,
          
          // ইউজার কালেকশনের স্কিমা অনুযায়ী সরাসরি রিয়েল ইমেজ নেওয়া হচ্ছে
          customerImage: { $ifNull: ["$userDetails.image", null] },
          
          // কনটেস্ট কালেকশন থেকে ডাটা নেওয়া হচ্ছে
          contestTitle: { $ifNull: ["$contestDetails.title", "$contestTitle"] },
          contestPrize: "$contestDetails.prize",
          contestImage: "$contestDetails.image",
          registrationFee: "$contestDetails.registrationFee",
          mainContestStatus: "$contestDetails.contestStatus",
          contestWinnerInfo: "$contestDetails.winner"
        }
      }
    ];

    // এগ্রিগেশন কুয়েরি রান করা
    const result = await paymentsCollections.aggregate(pipeline).toArray();
    
    // টোটাল কাউন্ট বের করা পেজিনেশনের হিসাবের জন্য
    const total = await paymentsCollections.countDocuments(matchQuery);
    const totalPages = Math.ceil(total / limit);

    // ৮. রেসপন্স রিটার্ন
    return Response.json({
      success: true,
      result,
      total,
      page,
      limit,
      totalPages: Math.max(totalPages, 1),
    });

  } catch (err) {
    console.error("Leaderboard API Error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}