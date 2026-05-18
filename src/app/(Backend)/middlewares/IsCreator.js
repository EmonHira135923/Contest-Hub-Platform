import { verifyToken } from "./verifyToken";

export const verifyCreator = async (request, verifiedUser = null) => {
  try {
    const user = verifiedUser || (await verifyToken(request));

    if (user?.role !== "creator") {
      return null;
    }

    return user;
  } catch (error) {
    console.log("CREATOR VERIFY ERROR:", error.message);
    return null;
  }
};
