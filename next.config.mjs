/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // এটি Cloudinary-এর সব ইমেজের পারমিশন দিবে
      },
    ],
  },
};

export default nextConfig;