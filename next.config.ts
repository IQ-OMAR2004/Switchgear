import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Pin the workspace root (a stray lockfile in the home dir confuses inference).
  turbopack: {
    root: import.meta.dirname,
  },
  // three.js ships modern ESM; Next 16 handles it natively. No transpilePackages needed.
};

export default nextConfig;
