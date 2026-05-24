import { ObjectId } from "mongodb";
import Stripe from "stripe";
import { getPayments, getAllContests } from "../../lib/dbConnect";
import { verifyToken } from "../../middlewares/verifyToken";
import { logTracking } from "../../lib/logTracking";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return Response.json({ error: "No session ID found" }, { status: 400 });
    }

    // ২. স্ট্রাইপ থেকে পেমেন্ট সেশন রিট্রিভ করা
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return Response.json(
        { success: false, message: "Payment not verified" },
        { status: 400 },
      );
    }

    const {
      contestId,
      contestTitle,
      userEmail,
      userName,
      trackingId: newTrackingId,
    } = session.metadata;

    // ৫. ডাটাবেস কালেকশন কানেক্ট করা
    const paymentsCollection = await getPayments();
    const contestCollection = await getAllContests();

    // *** গুরুত্বপূর্ণ: ডুপ্লিকেট পেমেন্ট চেক ***
    const existingPayment = await paymentsCollection.findOne({
      transactionId: session.payment_intent,
    });
    if (existingPayment) {
      return Response.json({
        success: true,
        message: "Payment already processed",
        trackingId: newTrackingId,
        transactionId: existingPayment.transactionId,
      });
    }

    // ৬. পেমেন্ট রেকর্ডের ডাটা অবজেক্ট তৈরি
    const paymentRecord = {
      contestId,
      contestTitle,
      transactionId: session.payment_intent,
      amount: session.amount_total / 100,
      customerName: userName || session.customer_details?.name || "Participant",
      currency: session.currency,
      customer_email: session.customer_email || userEmail,
      trackingId: newTrackingId,
      paymentStatus: "paid",
      paidAt: new Date(),
    };

    // ৭. কনটেস্ট পার্টিসিপেন্ট কাউন্ট ইনক্রিমেন্ট
    const contestUpdate = {
      $inc: { participantsCount: 1 },
      $set: { updatedAt: new Date() },
    };

    // ৮. ডাটাবেসে পেমেন্ট ডাটা সেভ এবং ট্র্যাকিং লগ তৈরি
    // এখানে logTracking ফাংশনটি আপনার ট্র্যাকিং সিস্টেমের টাইমলাইনে প্রথম এন্ট্রি দিবে
    await logTracking(
      newTrackingId,
      "pending-pickup",
      "Your payment is successful. Waiting for courier pickup.",
    );
    await paymentsCollection.insertOne(paymentRecord);

    // ৯. পার্সেল কালেকশনে তথ্য আপডেট করা
    const result = await contestCollection.updateOne(
      { _id: new ObjectId(contestId) },
      contestUpdate,
    );

    return Response.json(
      {
        success: true,
        message: "Payment confirmed & tracking started",
        trackingId: newTrackingId,
        transactionId: session.payment_intent,
        data: result,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Payment Confirmation Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const user = await verifyToken(request);

    if (!user || !user.email) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const contestId = searchParams.get("contestId");
    const page = parseInt(searchParams.get("page")) || 1;

    const limit = 10;
    const skip = (page - 1) * limit;

    const paymentsCollections = await getPayments();

    const query = {
      customer_email: user.email,
    };

    if (contestId) {
      query.contestId = contestId;
    }

    if (search) {
      query.$or = [
        { transactionId: { $regex: search, $options: "i" } },
        { parcelName: { $regex: search, $options: "i" } },
        { customerName: { $regex: search, $options: "i" } },
        { customer_phone: { $regex: search, $options: "i" } },
        { paymentStatus: { $regex: search, $options: "i" } },
      ];
    }

    const result = await paymentsCollections
      .find(query)
      .sort({ paidAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await paymentsCollections.countDocuments(query);

    return Response.json({
      success: true,
      result,
      total,
      page,
      limit,
    });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
