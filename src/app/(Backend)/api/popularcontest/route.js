import { getAllContests } from "../../lib/dbConnect";

export async function GET(request) {
  try {
    const ContestCollection = await getAllContests();

    // participants অনুযায়ী সর্ট (High to Low) এবং লিমিট ৬
    const result = await ContestCollection.find()
      .sort({ participants: -1 }) // -1 মানে ডিসেন্ডিং অর্ডার (বেশি থেকে কম)
      .limit(6)
      .toArray();

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}