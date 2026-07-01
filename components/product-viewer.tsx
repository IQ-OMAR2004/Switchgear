"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { StaticPanelFallback } from "@/three/StaticPanelFallback";

const Viewer = dynamic(() => import("@/three/ProductViewer"), {
  ssr: false,
  loading: () => <ViewerSkeleton />,
});

function ViewerSkeleton() {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_15rem]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-[var(--scene-bg)] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[34rem]">
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-3 text-muted">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-[var(--accent)]" />
            <span className="mono text-xs uppercase tracking-wider">Loading 3D model…</span>
          </div>
        </div>
      </div>
      <div className="hidden rounded-[var(--radius-lg)] border border-line bg-surface lg:block" />
    </div>
  );
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!window.WebGLRenderingContext || !gl) return false;
    // release the probe context so it doesn't consume a limited WebGL slot
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

// WebGL capability is a client-only constant — read it via an external-store
// snapshot (server renders the skeleton, client resolves to ok/fallback).
const noopSubscribe = () => () => {};
function clientStatus(): "ok" | "fallback" {
  return hasWebGL() ? "ok" : "fallback";
}
function serverStatus(): "loading" {
  return "loading";
}

export function ProductViewer3D({ productName }: { productName?: string }) {
  const status = useSyncExternalStore(noopSubscribe, clientStatus, serverStatus);

  if (status === "fallback") return <StaticPanelFallback productName={productName} />;
  if (status === "loading") return <ViewerSkeleton />;
  return <Viewer productName={productName} />;
}
