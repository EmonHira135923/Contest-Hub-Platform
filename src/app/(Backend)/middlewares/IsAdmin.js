import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getToken } from "next-auth/jwt";

export const verifyAdmin = async (request) => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

        const { payload } = await jwtVerify(token, secret);

        if (payload?.role !== "admin") {
          return null;
        }

        return payload;
      } catch (error) {
        console.log("CUSTOM ADMIN TOKEN VERIFY ERROR:", error.message);
      }
    }

    if (request) {
      const nextAuthToken = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (nextAuthToken?.role === "admin") {
        return nextAuthToken;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};
