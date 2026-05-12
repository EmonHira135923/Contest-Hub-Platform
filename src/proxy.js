// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// const privateRoutes = ["/be-a-rider", "/send-parcel", "/dashboard", "/profile"];
// const adminRoutes = [
//   "/dashboard/users",
//   "/dashboard/users/add",
//   "/dashboard/rider/all-riders",
// ];
// const riderRoutes = [
//   "/dashboard/rider/assign-delivery",
//   "/dashboard/rider/complete-delivery",
// ];

//   const nextAuthToken =
//     request.cookies.get("next-auth.session-token")?.value ||
//     request.cookies.get("__Secure-next-auth.session-token")?.value;

//   const isAuthenticated = Boolean(accessToken || nextAuthToken);

//   const isPrivateRoute = privateRoutes.some((route) =>
//     reqpath.startsWith(route),
//   );

//   const isAdminRoute = adminRoutes.some((route) => reqpath.startsWith(route));
//   const isRiderRoute = riderRoutes.some((route) => reqpath.startsWith(route));

//   const isPaymentRoute =
//     reqpath.includes("payment-success") || reqpath.includes("payment-cancel");

//   // isAuthenticated না থাকলেও যদি পেমেন্ট রুট হয়, তবে তাকে রিডাইরেক্ট করো না
//   if (!isAuthenticated && isPrivateRoute) {
//     if (isPaymentRoute) {
//       return NextResponse.next(); // এখানে ঢুকতে দাও, আমরা পেজের ভেতর চেক করবো
//     }

//     const loginurl = new URL("/auth/login", request.url);
//     loginurl.searchParams.set("callbackUrl", reqpath);
//     return NextResponse.redirect(loginurl);
//   }

//   // Login না থাকলে private route block
//   if (!isAuthenticated && isPrivateRoute) {
//     const loginurl = new URL("/auth/login", request.url);
//     loginurl.searchParams.set("callbackUrl", reqpath);
//     return NextResponse.redirect(loginurl);
//   }

//   if (isAuthenticated && reqpath === "/") {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Admin route protection (only custom accessToken দিয়ে role check)
//   if (isAdminRoute) {
//     if (!accessToken) {
//       return NextResponse.redirect(new URL("/forbidden", request.url));
//     }

//     try {
//       const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

//       const { payload } = await jwtVerify(accessToken, secret);

//       const isAdmin = payload?.role === "admin";

//       if (!isAdmin) {
//         return NextResponse.redirect(new URL("/forbidden", request.url));
//       }
//     } catch (error) {
//       return NextResponse.redirect(new URL("/auth/login", request.url));
//     }
//   }

//   if (isRiderRoute) {
//     if (!accessToken) {
//       return NextResponse.redirect(new URL("/forbidden", request.url));
//     }

//     try {
//       const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

//       const { payload } = await jwtVerify(accessToken, secret);

//       const isAdmin = payload?.role === "rider";

//       if (!isAdmin) {
//         return NextResponse.redirect(new URL("/forbidden", request.url));
//       }
//     } catch (error) {
//       return NextResponse.redirect(new URL("/auth/login", request.url));
//     }
//   }

//   // Login করা থাকলে auth pages block
//   if (
//     isAuthenticated &&
//     (reqpath.startsWith("/auth/login") || reqpath.startsWith("/auth/register"))
//   ) {
//     console.log("Already logged in, redirecting dashboard");
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/be-a-rider/:path*",
//     "/send-parcel/:path*",
//     "/dashboard/:path*",
//     "/profile/:path*",
//     "/auth/:path*",
//   ],
// };

import { NextResponse } from "next/server";

export async function proxy(request) {
  // ১. কুকি থেকে টোকেন সংগ্রহ
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  //   2. Path Found
  const reqPath = request.nextUrl.pathname;
  const callbackURL = (new URL("/auth/login", request.url));

  console.log("Access Token Found:", accessToken, reqPath,callbackURL);

  if (!accessToken && reqPath.startsWith("/dashboard")) {
    return NextResponse.redirect(callbackURL);
  }

  return NextResponse.redirect(callbackURL);
}

export const config = {
  matcher: ["/about/:path*","/dashboard/:path"],

};
