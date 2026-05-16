import { verifyToken } from "./verifyToken";

export const verifyAdmin = async (request, verifiedUser = null) => {
  try {
    const user = verifiedUser || (await verifyToken(request));

    if (user?.role !== "admin") {
      return null;
    }

    return user;
  } catch (error) {
    console.log("ADMIN VERIFY ERROR:", error.message);
    return null;
  }
};
