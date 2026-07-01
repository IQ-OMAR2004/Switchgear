import type { NextConfig } from "next";

// For GitHub Pages project sites the app is served under /<repo>. The deploy
// workflow sets NEXT_PUBLIC_BASE_PATH=/Switchgear; local dev leaves it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static HTML export so the site can be hosted on GitHub Pages.
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // The export target has no image optimization server.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  // Pin the workspace root (a stray lockfile in the home dir confuses inference).
  turbopack: {
    root: import.meta.dirname,
  },
  // three.js ships modern ESM; Next 16 handles it natively. No transpilePackages needed.
};

export default nextConfig;
