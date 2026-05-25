import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET_KEY || "");

// 🟢 ফিক্সড: ট্রেইলিং স্ল্যাশ (/) গুলো বাদ দেওয়া হয়েছে
const privateRoutes = [
  "/leaderboard",
  "/dashboard",
  "/profile",
  "/all-contests",
  "/payment",
];

export async function proxy(request) {
  const reqPath = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;
  const nextAuthToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const loginUrl = new URL("/auth/login", request.url);
  const dashboardUrl = new URL("/dashboard", request.url);

  let hasValidAccessToken = false;
  let shouldClearCustomTokens = false;

  if (accessToken) {
    try {
      await jwtVerify(accessToken, secret);
      hasValidAccessToken = true;
    } catch (err) {
      console.error("JWT Verification Error:", err.message);
      shouldClearCustomTokens = true;
    }
  }

  const isAuthenticated = hasValidAccessToken || Boolean(nextAuthToken);
  const isAuthRoute = reqPath.startsWith("/auth/");

  // 🟢 ফিক্সড রাউট ম্যাচিং লজিক
  const isPrivateRoute = privateRoutes.some(
    (route) => reqPath === route || reqPath.startsWith(`${route}/`),
  );

  // 💡 গুরুত্বপূর্ণ ফিক্স: যদি ইউজার পেমেন্ট সাকসেস বা ক্যান্সেল পেজে ব্যাক করে,
  // তাকে জোর করে লগইনে পাঠানোর আগে সেশন রিলোডের সুযোগ দিন (NextResponse.next() করুন)
  if (
    (reqPath.startsWith("/payment/success") ||
      reqPath.startsWith("/payment/cancel")) &&
    !isAuthenticated
  ) {
    return NextResponse.next();
  }

  if (isAuthenticated && isAuthRoute) {
    const response = NextResponse.redirect(dashboardUrl);
    return shouldClearCustomTokens
      ? clearCustomAuthCookies(response)
      : response;
  }

  if (!isAuthenticated && isPrivateRoute) {
    const response = NextResponse.redirect(loginUrl);
    return shouldClearCustomTokens
      ? clearCustomAuthCookies(response)
      : response;
  }

  if (shouldClearCustomTokens) {
    return clearCustomAuthCookies(NextResponse.next());
  }

  return NextResponse.next();
}

const clearCustomAuthCookies = (response) => {
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
};

export const config = {
  matcher: [
    "/",
    "/leaderboard/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/all-contests/:path*",
    "/payment/:path*",
    "/auth/:path*",
  ],
};
