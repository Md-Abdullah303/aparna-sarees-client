import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: '**',
  //     },
  //   ],
  // },
  async rewrites() {
    return [
      {
        source: "/api/server/:path*",
        destination: "http://localhost:5000/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
