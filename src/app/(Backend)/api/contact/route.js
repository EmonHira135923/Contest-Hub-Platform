import { NextResponse } from "next/server";
import { verifyToken } from "../../middlewares/verifyToken";
import { getContact } from "../../lib/dbConnect";
import { verifyAdmin } from "../../middlewares/IsAdmin";

export async function POST(request) {
  try {
    const isVerify = await verifyToken(request);

    if (!isVerify) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const ContactCollection = await getContact();

    // Insert document into MongoDB collection
    const result = await ContactCollection.insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(), // Useful for sorting in your admin dashboard
    });

    return NextResponse.json(
      { message: "Contact message saved successfully!", id: result.insertedId },
      { status: 201 },
    );
  } catch (error) {
    console.error("API CONTACT POST ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Could not save message." },
      { status: 500 },
    );
  }
}

/**
 * GET: Fetch all contact messages (Admin access ONLY)
 */
export async function GET(request) {
  try {
    const isVerify = await verifyToken(request);
    if (!isVerify) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 },
      );
    }

    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden. Admin access required." },
        { status: 403 },
      );
    }

    // Extract pagination parameters from URL query string
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page")) || 1);
    const limit = Math.max(1, parseInt(searchParams.get("limit")) || 10);
    const skip = (page - 1) * limit;

    const ContactCollection = await getContact();

    // Fetch total document count for metadata calculations
    const totalMessages = await ContactCollection.countDocuments();
    const totalPages = Math.ceil(totalMessages / limit);

    // Fetch chunked page rows
    const messages = await ContactCollection.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: messages,
        meta: {
          totalMessages,
          totalPages,
          currentPage: page,
          limit,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API CONTACT GET ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Could not fetch messages." },
      { status: 500 },
    );
  }
}
