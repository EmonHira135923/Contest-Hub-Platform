import { getTracking } from "./dbConnect";

export const logTracking = async (trackingId, status) => {
  try {
    const trackingCollection = await getTracking();

    const log = {
      trackingId,
      status,
      details: status.split("-").join(" "),
      createdAt: new Date(),
    };

    const result = await trackingCollection.insertOne(log);

    return {
      success: true,
      message: "Tracking logged successfully",
      data: result,
    };
  } catch (error) {
    console.error("Error in logTracking:", error);

    // এরর রিটার্ন করা যাতে কলিং ফাংশন বুঝতে পারে কিছু ভুল হয়েছে
    return {
      success: false,
      message: "Failed to log tracking information",
      error: error.message,
    };
  }
};