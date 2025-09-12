import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   matcher: ["/admin/login", "/admin/:path*", "/login", '/signup'],
  /* config options here */
};

export default nextConfig;
