// Prefixes a public-folder asset path with the deploy base path.
//
// next/link and next/image apply basePath automatically, but raw <img>/<a>
// tags pointing at /public assets do not — use withBase() for those so they
// resolve correctly when the site is served under /<repo> on GitHub Pages.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBase(path: string): string {
  return `${BASE}${path}`;
}
