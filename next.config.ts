import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   matcher: ["/admin/login", "/admin/:path*", "/login", '/register'],
   async rewrites() {
    return {
      beforeFiles: [
        // để nguyên /.well-known cho Next.js xử lý file tĩnh
      ],
      afterFiles: [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3000/api/:path*',
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
