import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

// Secret key encode করা হচ্ছে
const SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET_KEY);

const privateRoutes = ["/leaderboard", "/dashboard", "/profile"];

export async function proxy(request) {
  const reqPath = request.nextUrl.pathname;

  // ১. কুকি থেকে টোকেন সংগ্রহ (Custom + NextAuth)
  const accessToken = request.cookies.get("accessToken")?.value;
  const nextAuthToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  // লগইন এবং ড্যাশবোর্ড URL তৈরি
  const loginUrl = new URL("/auth/login", request.url);
  const dashboardUrl = new URL("/dashboard", request.url);

  const isAuthenticated = Boolean(accessToken || nextAuthToken);

  if (isAuthenticated) {
    if (reqPath.startsWith("/auth/")) {
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // প্রাইভেট রুট চেক করা
  const isPrivateRoute = privateRoutes.some((route) =>
    reqPath.startsWith(route),
  );

  // ২. অথেনটিকেশন চেক এবং রিডাইরেক্ট লজিক

  // যদি লগইন থাকে এবং হোমপেজ বা লগইন/রেজিস্টার পেজে যেতে চায়
  if (isAuthenticated) {
    if (reqPath.startsWith("/auth/")) {
      console.log("Already logged in, redirecting to dashboard");
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // যদি লগইন না থাকে এবং প্রাইভেট রুটে যেতে চায়
  if (!isAuthenticated && isPrivateRoute) {
    console.log("Not authenticated, redirecting to login");
    return NextResponse.redirect(loginUrl);
  }

  // ৩. Custom Access Token ভেরিফিকেশন লজিক
  if (accessToken) {
    try {
      await jwtVerify(accessToken, SECRET);
      return NextResponse.next();
    } catch (err) {
      console.error("JWT Verification Error:", err.message);
      // টোকেন ইনভ্যালিড বা এক্সপায়ার হলে কুকি ক্লিয়ার করে লগইন পেজে পাঠানো ভালো
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("accessToken");
      return response;
    }
  }

  // ৪. সোশ্যাল লগইন (NextAuth) থাকলে সরাসরি যেতে দেওয়া
  if (nextAuthToken) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// ৫. Matcher কনফিগারেশন
export const config = {
  // এখানে প্রাইভেট রুট এবং লগইন/রেজিস্টার রুটগুলোও রাখতে হবে যাতে রিডাইরেক্ট কাজ করে
  matcher: [
    "/",
    "/leaderboard/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/auth/:path*",
  ],
};
