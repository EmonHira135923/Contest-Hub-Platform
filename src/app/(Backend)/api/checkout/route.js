import Stripe from "stripe";
import { generateTrackingId } from "@/app/(Backend)/lib/generateTrackingId";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    // ১. কনটেস্টের রেজিস্ট্রেশন ফি (Registration Fee) ভ্যালিডেশন
    const amount = Math.round(Number(body.registrationFee) * 100);
    if (isNaN(amount) || amount <= 0) {
      return Response.json(
        { error: "Invalid registration fee amount" },
        { status: 400 },
      );
    }

    // ২. ট্র্যাকিং আইডি নিশ্চিত করা
    const finalTrackingId = body.trackingId || generateTrackingId();

    const appUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    // ৩. স্ট্রাইপ চেকআউট সেশন তৈরি
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amount,
            product_data: {
              name: body.title || "Contest Registration",
              description: `Tracking ID: ${finalTrackingId} | Category: ${body.category || "General"}`,
              images: body.image ? [body.image] : [], // চেকআউট পেজে ব্যানার শো করার জন্য
            },
          },
          quantity: 1,
        },
      ],
      customer_email: body.userEmail, // রেজিস্টার্ড ইউজারের ইমেইল
      mode: "payment",

      // ৪. মেটাডেটা (Webhook বা সাকসেস পেজে ব্যবহারের ডেটা)
      metadata: {
        contestId: body.contestId,
        contestTitle: body.title,
        userEmail: body.userEmail,
        userName: body.userName || "Participant",
        trackingId: finalTrackingId,
        transactioId: body.pay,
        contestSubmissionStatus: "not-submitted",
      },

      // ৫. ডাইনামিক সাকসেস ইউআরএল পাথ রিডাইরেকশন
      success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&trackingId=${finalTrackingId}`,
      cancel_url: `${appUrl}/payment/cancel`,
    });

    // console.log(
    //   `Checkout Session Created for Contest [${body}] with Tracking ID:`,
    //   finalTrackingId,
    // );

    console.log("Stripe payment", body);

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
