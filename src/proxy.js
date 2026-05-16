import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET_KEY || "");
const privateRoutes = ["/leaderboard", "/dashboard", "/profile"];

const clearCustomAuthCookies = (response) => {
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
};

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
  const isPrivateRoute = privateRoutes.some((route) =>
    reqPath.startsWith(route),
  );

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

export const config = {
  matcher: [
    "/",
    "/leaderboard/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/auth/:path*",
  ],
};
