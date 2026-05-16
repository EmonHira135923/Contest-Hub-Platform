import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getToken } from "next-auth/jwt";

export const verifyToken = async (request) => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

    if (token) {
      try {
        const { payload } = await jwtVerify(token, secret);

        return payload;
      } catch (error) {
        console.log("CUSTOM TOKEN VERIFY ERROR:", error.message);
      }
    }

    if (request) {
      const nextAuthToken = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (nextAuthToken?.email) {
        return {
          _id: nextAuthToken.id,
          id: nextAuthToken.id,
          name: nextAuthToken.name,
          email: nextAuthToken.email,
          role: nextAuthToken.role,
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
