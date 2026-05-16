import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getToken } from "next-auth/jwt";

const getAuthSecret = () =>
  process.env.NEXTAUTH_SECRET_KEY;

export const verifyToken = async (request) => {
  try {
    const authSecret = getAuthSecret();

    if (!authSecret) {
      console.log("VERIFY ERROR: NEXTAUTH_SECRET_KEY is not configured");
      return null;
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      try {
        const secret = new TextEncoder().encode(authSecret);
        const { payload } = await jwtVerify(accessToken, secret);
        return payload;
      } catch (error) {
        console.log("CUSTOM TOKEN VERIFY ERROR:", error.message);
      }
    }

    if (request) {
      const nextAuthToken = await getToken({
        req: request,
        secret: authSecret,
      });

      if (nextAuthToken?.email) {
        return {
          _id: nextAuthToken.id,
          id: nextAuthToken.id,
          name: nextAuthToken.name,
          email: nextAuthToken.email,
          role: nextAuthToken.role || "user",
          phone: nextAuthToken.phone,
          image: nextAuthToken.image,
          provider: nextAuthToken.provider,
        };
      }
    }

    return null;
  } catch (error) {
    console.log("VERIFY ERROR:", error.message);
    return null;
  }
};
