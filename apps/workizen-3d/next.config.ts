import type { NextConfig } from "next";

// 30 days — safe for versioned/hashed filenames; invalidate via CloudFront if filename unchanged
const IMMUTABLE = "public, max-age=2592000, immutable";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [
      // 3D models, textures, rigged characters — served from /public/assets/
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      // API routes must never be cached — reserved for chatbot/NPC integration
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
