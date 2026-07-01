"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import { useReducedMotion } from "framer-motion";
import { PanelModel } from "@/three/PanelModel";
import { PARTS, PANEL_CENTER_OFFSET, type PartDef } from "@/three/alfa12-parts";
import { getPart } from "@/data/components";
import { useTheme } from "@/components/theme-provider";
import { ArrowRight, CloseIcon, CubeIcon, PlayIcon, ResetIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type Focus = { target: [number, number, number]; pos: [number, number, number] };

const DEFAULT_CAM: [number, number, number] = [2.5, 0.9, 3.2];

function partFocus(p: PartDef, explodeT: number): Focus {
  const ax = p.anchor[0] + p.explode[0] * explodeT;
  const ay = p.anchor[1] + p.explode[1] * explodeT + PANEL_CENTER_OFFSET[1];
  const az = p.anchor[2] + p.explode[2] * explodeT;
  const cam = p.cam ?? [0.6, 0.4, 2.2];
  return { target: [ax, ay, az], pos: [ax + cam[0], ay + cam[1], az + cam[2]] };
}

/** Eases the camera + orbit target toward a focus point (selection / tour). */
function CameraRig({
  focus,
  controlsRef,
  reduced,
}: {
  focus: Focus | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  reduced: boolean;
}) {
  const tgt = useMemo(() => new Vector3(), []);
  const pos = useMemo(() => new Vector3(), []);
  useFrame((state) => {
    const c = controlsRef.current;
    if (!focus || !c) return;
    tgt.set(...focus.target);
    pos.set(...focus.pos);
    const k = reduced ? 1 : 0.07;
    c.target.lerp(tgt, k);
    state.camera.position.lerp(pos, k);
    c.update();
  });
  return null;
}

type OrbitControlsImpl = React.ComponentRef<typeof OrbitControls>;

function Scene({
  theme,
  explode,
  selectedId,
  hoveredId,
  showLabels,
  reduced,
  autoRotate,
  focus,
  onSelect,
  onHover,
  onUserInteract,
}: {
  theme: "light" | "dark";
  explode: number;
  selectedId: string | null;
  hoveredId: string | null;
  showLabels: boolean;
  reduced: boolean;
  autoRotate: boolean;
  focus: Focus | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
  onUserInteract: () => void;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const isDark = theme === "dark";

  return (
    <>
      <color attach="background" args={[isDark ? "#0a1b2c" : "#eaf2fa"]} />
      <hemisphereLight
        intensity={isDark ? 0.5 : 0.9}
        color={isDark ? "#9fc3e6" : "#ffffff"}
        groundColor={isDark ? "#0a1622" : "#cdd9e6"}
      />
      <ambientLight intensity={isDark ? 0.35 : 0.5} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={isDark ? 1.1 : 1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 3, -4]} intensity={isDark ? 0.4 : 0.6} color="#37a7e0" />

      <PanelModel
        explodeTarget={explode}
        selectedId={selectedId}
        hoveredId={hoveredId}
        showLabels={showLabels}
        reduced={reduced}
        onSelect={onSelect}
        onHover={onHover}
      />

      <CameraRig focus={focus} controlsRef={controlsRef} reduced={reduced} />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan
        enableDamping
        dampingFactor={0.08}
        minDistance={1.6}
        maxDistance={7}
        maxPolarAngle={Math.PI * 0.92}
        autoRotate={autoRotate}
        autoRotateSpeed={0.7}
        onStart={onUserInteract}
      />
    </>
  );
}

export default function ProductViewer({ productName = "alfa 12" }: { productName?: string }) {
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;
  const { theme, mounted } = useTheme();

  const [explode, setExplode] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [touring, setTouring] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [focus, setFocus] = useState<Focus | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedPart = selectedId ? getPart(selectedId) : null;

  const select = useCallback(
    (id: string | null) => {
      setSelectedId(id);
      if (!id) {
        setFocus(null);
        return;
      }
      const p = PARTS.find((x) => x.id === id);
      if (!p) return;
      // every selection path (canvas click, hotspot, legend) behaves the same:
      // auto-explode if still assembled so the part is actually visible, and
      // frame the camera against that exploded position (not the assembled one).
      const targetExplode = explode < 0.2 ? 0.55 : explode;
      if (targetExplode !== explode) setExplode(targetExplode);
      setFocus(partFocus(p, targetExplode));
    },
    [explode],
  );

  const onUserInteract = useCallback(() => {
    setInteracting(true);
    setFocus(null); // hand control back to the user
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setInteracting(false), 3500);
  }, []);

  // guided tour — the effect only schedules the next step; all state changes
  // happen at start (below) or inside the timer callback.
  useEffect(() => {
    if (!touring) return;
    const dwell = reduced ? 2600 : 3400;
    const timer = setTimeout(() => {
      const next = tourIndex + 1;
      if (next >= PARTS.length) {
        setTouring(false);
        return;
      }
      const p = PARTS[next];
      setTourIndex(next);
      if (p) {
        setSelectedId(p.id);
        setFocus(partFocus(p, 0.62));
      }
    }, dwell);
    return () => clearTimeout(timer);
  }, [touring, tourIndex, reduced]);

  const startTour = useCallback(() => {
    setShowLabels(true);
    setExplode(0.62);
    setTourIndex(0);
    const first = PARTS[0];
    if (first) {
      setSelectedId(first.id);
      setFocus(partFocus(first, 0.62));
    }
    // reduced-motion users get a static reveal of the first part, no autoplay
    if (!reduced) setTouring(true);
  }, [reduced]);

  const stopTour = useCallback(() => setTouring(false), []);

  const reset = useCallback(() => {
    setTouring(false);
    setExplode(0);
    setSelectedId(null);
    setHoveredId(null);
    setFocus({ target: [0, 0, 0], pos: DEFAULT_CAM });
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setFocus(null), 600);
  }, []);

  // clear any pending timers on unmount (route change / StrictMode)
  useEffect(
    () => () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const autoRotate =
    !reduced && !touring && explode < 0.05 && !selectedId && !interacting;

  return (
    <figure
      role="group"
      aria-label={`Interactive 3D model of the ${productName} switchgear panel`}
      className="m-0 grid gap-3 lg:grid-cols-[1fr_15rem]"
    >
      {/* ---- canvas + overlays ---- */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-[var(--scene-bg)] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[34rem]">
        {mounted && (
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: DEFAULT_CAM, fov: 35 }}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            className="!absolute inset-0"
            role="img"
            aria-label={`Interactive 3D model of the ${productName} switchgear panel. Use the parts list to explore each component.`}
          >
            <Scene
              theme={theme}
              explode={explode}
              selectedId={selectedId}
              hoveredId={hoveredId}
              showLabels={showLabels}
              reduced={reduced}
              autoRotate={autoRotate}
              focus={focus}
              onSelect={select}
              onHover={setHoveredId}
              onUserInteract={onUserInteract}
            />
          </Canvas>
        )}

        {/* drag hint */}
        <div className="mono pointer-events-none absolute left-3 top-3 rounded-md bg-[color-mix(in_srgb,var(--surface)_75%,transparent)] px-2 py-1 text-[10px] uppercase tracking-wider text-muted backdrop-blur">
          {autoRotate ? "Drag to explore · auto-rotating" : "Drag · scroll to zoom"}
        </div>

        {/* selected part info card */}
        {selectedPart && (
          <div
            role="status"
            aria-live="polite"
            className="absolute bottom-3 left-3 right-3 max-w-md rounded-[var(--radius)] border border-line bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] p-4 shadow-[0_16px_40px_-20px_rgba(var(--shadow-color),0.6)] backdrop-blur-md sm:right-auto"
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-display text-base font-semibold text-ink">
                {selectedPart.name}
              </h4>
              <button
                type="button"
                onClick={() => select(null)}
                aria-label="Close part details"
                className="-mr-1 -mt-1 rounded-md p-1 text-muted hover:text-ink"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-sm text-ink-2">{selectedPart.plain}</p>
            <p className="mono mt-2 border-t border-line pt-2 text-xs leading-relaxed text-muted">
              {selectedPart.technical}
            </p>
          </div>
        )}

        {/* controls bar */}
        <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
          <div className="flex gap-1.5">
            {!touring ? (
              <button
                type="button"
                onClick={startTour}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-[color-mix(in_srgb,var(--surface)_85%,transparent)] px-2.5 py-1.5 text-xs font-medium text-ink backdrop-blur hover:border-accent hover:text-accent"
              >
                <PlayIcon className="h-3.5 w-3.5" /> Take the tour
              </button>
            ) : (
              <button
                type="button"
                onClick={stopTour}
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent bg-[var(--cta-bg)] px-2.5 py-1.5 text-xs font-medium text-[var(--cta-fg)] backdrop-blur"
              >
                <CloseIcon className="h-3.5 w-3.5" /> Stop tour
              </button>
            )}
            <button
              type="button"
              onClick={reset}
              aria-label="Reset view"
              title="Reset view"
              className="inline-flex items-center justify-center rounded-lg border border-line bg-[color-mix(in_srgb,var(--surface)_85%,transparent)] p-1.5 text-ink backdrop-blur hover:border-accent hover:text-accent"
            >
              <ResetIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* explode slider */}
        <div className="absolute bottom-3 right-3 hidden w-44 rounded-[var(--radius)] border border-line bg-[color-mix(in_srgb,var(--surface)_85%,transparent)] p-3 backdrop-blur sm:block">
          <div className="mono flex items-center justify-between text-[10px] uppercase tracking-wider text-muted">
            <span>Exploded view</span>
            <span>{Math.round(explode * 100)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(explode * 100)}
            onChange={(e) => {
              setExplode(Number(e.target.value) / 100);
              setTouring(false);
            }}
            aria-label="Exploded view amount"
            className="mt-2 w-full accent-[var(--accent)]"
          />
          <label className="mt-2 flex cursor-pointer items-center justify-between text-xs text-ink-2">
            <span>Show labels</span>
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="h-4 w-4 accent-[var(--accent)]"
            />
          </label>
        </div>
      </div>

      {/* ---- legend (keyboard-accessible part stepper) ---- */}
      <figcaption className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-3">
        <div className="mb-2 flex items-center gap-2 px-1">
          <CubeIcon className="h-4 w-4 text-accent" />
          <span className="mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Main parts
          </span>
        </div>
        <ul className="flex max-h-[30rem] flex-col gap-0.5 overflow-y-auto pr-1">
          {PARTS.map((p) => {
            const active = selectedId === p.id;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(p.id)}
                  onBlur={() => setHoveredId(null)}
                  onClick={() => {
                    setTouring(false);
                    select(active ? null : p.id);
                  }}
                  aria-pressed={active}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[0.82rem] transition-colors",
                    active ? "bg-panel text-accent" : "text-ink-2 hover:bg-panel/60 hover:text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-semibold",
                      active
                        ? "border-transparent bg-[var(--cta-bg)] text-[var(--cta-fg)]"
                        : "border-line text-muted",
                    )}
                  >
                    {p.num}
                  </span>
                  <span className="leading-tight">{p.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={() => (explode > 0.1 ? setExplode(0) : setExplode(0.7))}
          className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
        >
          {explode > 0.1 ? "Re-assemble panel" : "Explode the panel"}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <p className="sr-only">
          Use this list to step through each part with the keyboard. Activating a part
          selects and highlights it in the 3D model and opens its description.
        </p>
      </figcaption>
    </figure>
  );
}
