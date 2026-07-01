"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, ContactShadows } from "@react-three/drei";
import type { Group } from "three";
import {
  PARTS,
  ENCLOSURE,
  DOORS,
  PANEL_CENTER_OFFSET,
  type MeshSpec,
} from "@/three/alfa12-parts";

function Prim({ spec, highlight }: { spec: MeshSpec; highlight: number }) {
  return (
    <mesh position={spec.position} rotation={spec.rotation} castShadow receiveShadow>
      {spec.type === "box" ? (
        <boxGeometry args={spec.args as [number, number, number]} />
      ) : (
        <cylinderGeometry args={spec.args as [number, number, number, number]} />
      )}
      <meshStandardMaterial
        color={spec.color}
        metalness={spec.metalness ?? 0.4}
        roughness={spec.roughness ?? 0.5}
        emissive={highlight > 0 ? "#0a82c6" : "#000000"}
        emissiveIntensity={highlight}
      />
    </mesh>
  );
}

export interface HotspotMarkerProps {
  num: number;
  label: string;
  active: boolean;
  onSelect: () => void;
}

export function HotspotMarker({ num, label, active, onSelect }: HotspotMarkerProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`${num}. ${label}`}
      className={[
        "group/hs pointer-events-auto flex select-none items-center gap-0 whitespace-nowrap",
      ].join(" ")}
    >
      <span
        className={[
          "grid h-6 w-6 place-items-center rounded-full border text-[11px] font-semibold transition-all",
          active
            ? "scale-110 border-transparent bg-[var(--cta-bg)] text-[var(--cta-fg)] shadow-[0_0_0_4px_rgba(10,130,198,0.25)]"
            : "border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)] group-hover/hs:bg-[var(--cta-bg)] group-hover/hs:text-[var(--cta-fg)]",
        ].join(" ")}
      >
        {num}
      </span>
      <span
        className={[
          "ml-1 overflow-hidden rounded-md border border-line bg-[var(--surface)] px-2 py-1 text-[11px] font-medium text-[var(--ink)] transition-all",
          active
            ? "max-w-[220px] opacity-100"
            : "max-w-0 border-transparent px-0 opacity-0 group-hover/hs:max-w-[220px] group-hover/hs:border-line group-hover/hs:px-2 group-hover/hs:opacity-100",
        ].join(" ")}
      >
        {label}
      </span>
    </button>
  );
}

export interface PanelModelProps {
  explodeTarget: number; // 0..1
  selectedId: string | null;
  hoveredId: string | null;
  showLabels: boolean;
  reduced: boolean;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}

export function PanelModel({
  explodeTarget,
  selectedId,
  hoveredId,
  showLabels,
  reduced,
  onSelect,
  onHover,
}: PanelModelProps) {
  const groupRefs = useRef<(Group | null)[]>([]);
  const enclosureRef = useRef<Group>(null);
  const doorsRef = useRef<Group>(null);
  const tRef = useRef(0);

  useFrame((_, dt) => {
    const ease = reduced ? 1 : Math.min(1, dt * 4.5);
    tRef.current += (explodeTarget - tRef.current) * ease;
    const t = tRef.current;

    PARTS.forEach((p, i) => {
      const g = groupRefs.current[i];
      if (g) g.position.set(p.explode[0] * t, p.explode[1] * t, p.explode[2] * t);
    });
    if (doorsRef.current) {
      doorsRef.current.position.set(
        DOORS.explode[0] * t,
        DOORS.explode[1] * t,
        DOORS.explode[2] * t,
      );
    }
    if (enclosureRef.current) {
      const fading = t > 0.002;
      const o = fading ? 1 - t * 0.86 : 1;
      enclosureRef.current.traverse((c) => {
        const mesh = c as unknown as { material?: { transparent: boolean; opacity: number; depthWrite: boolean } };
        if (mesh.material) {
          // restore the opaque fast path once the panel is fully assembled
          mesh.material.transparent = fading;
          mesh.material.opacity = o;
          mesh.material.depthWrite = !fading;
        }
      });
    }
  });

  // reset any leaked hover cursor if we unmount mid-hover
  useEffect(
    () => () => {
      document.body.style.cursor = "auto";
    },
    [],
  );

  // Internal parts would float over the closed cabinet when assembled, so only
  // the two externally-visible parts are labelled until the panel is exploded.
  // This also removes the need for per-frame raycast occlusion entirely.
  const showFor = (id: string) =>
    showLabels &&
    (explodeTarget > 0.08 ||
      id === "low-voltage-compartment" ||
      id === "pressure-relief-duct");

  return (
    <group position={PANEL_CENTER_OFFSET}>
      <group ref={enclosureRef}>
        {ENCLOSURE.meshes.map((m, i) => (
          <Prim key={`enc-${i}`} spec={m} highlight={0} />
        ))}
      </group>
      <group ref={doorsRef}>
        {DOORS.meshes.map((m, i) => (
          <Prim key={`door-${i}`} spec={m} highlight={0} />
        ))}
      </group>

      {PARTS.map((p, i) => {
        const sel = selectedId === p.id;
        const hov = hoveredId === p.id;
        const hl = sel ? 0.55 : hov ? 0.28 : 0;
        return (
          <group
            key={p.id}
            ref={(el) => {
              groupRefs.current[i] = el;
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHover(p.id);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              onHover(null);
              document.body.style.cursor = "auto";
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(p.id);
            }}
          >
            {p.meshes.map((m, j) => (
              <Prim key={j} spec={m} highlight={hl} />
            ))}
            {showFor(p.id) && (
              <Html position={p.anchor} center zIndexRange={[40, 0]}>
                <HotspotMarker
                  num={p.num}
                  label={p.label}
                  active={sel}
                  onSelect={() => onSelect(p.id)}
                />
              </Html>
            )}
          </group>
        );
      })}

      {/* Bake the contact shadow only while the geometry changes (keyed on the
          explode amount); camera auto-rotate does not affect a top-down shadow,
          so it stays frozen at rest instead of re-rendering every frame. */}
      <ContactShadows
        key={Math.round(explodeTarget * 100)}
        frames={60}
        position={[0, 0.01, 0]}
        opacity={0.32}
        scale={4}
        blur={2.6}
        far={3}
        resolution={512}
      />
    </group>
  );
}
