import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";

const BASE = "https://alfanar-switchgear.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/range", "/learn", "/contact"].map((r) => ({
    url: `${BASE}${r}`,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
  const products = PRODUCTS.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...routes, ...products];
}
