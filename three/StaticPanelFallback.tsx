import { PARTS } from "@/three/alfa12-parts";

/**
 * Accessible, no-WebGL fallback: an annotated schematic of the alfa 12 panel
 * with the same numbered legend as the 3D model. Renders without JavaScript,
 * so the educational content is never blocked by 3D.
 */

// approximate 2D callout positions (front + cut-away schematic, 0..100 space)
const POS: Record<string, [number, number]> = {
  "low-voltage-compartment": [50, 12],
  "pressure-relief-duct": [50, 5],
  busbar: [74, 22],
  "metal-shutters": [34, 44],
  "disconnector-isolator": [70, 50],
  "vacuum-circuit-breaker-alfa-v": [50, 56],
  "withdrawable-truck": [50, 70],
  "current-transformer": [26, 76],
  "voltage-transformer": [74, 78],
  "earthing-switch": [30, 88],
  "cable-connection-compartment": [50, 92],
};

export function StaticPanelFallback({ productName = "alfa 12" }: { productName?: string }) {
  return (
    <figure className="m-0 grid gap-3 lg:grid-cols-[1fr_15rem]">
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line bg-[var(--scene-bg)] p-4">
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-label={`Annotated schematic of the ${productName} switchgear panel showing its main parts`}
          className="mx-auto h-auto w-full max-w-[26rem]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* cabinet outline */}
          <rect x="20" y="3" width="60" height="94" rx="2" fill="var(--surface)" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="0.6" />
          {/* compartments */}
          <rect x="22" y="6" width="56" height="13" rx="1" fill="var(--panel)" stroke="var(--line)" strokeWidth="0.4" />
          <rect x="22" y="20" width="56" height="26" rx="1" fill="var(--panel-2)" stroke="var(--line)" strokeWidth="0.4" />
          <rect x="22" y="47" width="56" height="28" rx="1" fill="var(--panel)" stroke="var(--line)" strokeWidth="0.4" />
          <rect x="22" y="76" width="56" height="19" rx="1" fill="var(--panel-2)" stroke="var(--line)" strokeWidth="0.4" />
          {/* busbar */}
          <line x1="26" y1="24" x2="74" y2="24" stroke="var(--copper)" strokeWidth="1.4" />
          {/* breaker block */}
          <rect x="40" y="52" width="20" height="14" rx="1.5" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="0.5" />
          {/* callout markers */}
          {PARTS.map((p) => {
            const pos = POS[p.id];
            if (!pos) return null;
            return (
              <g key={p.id}>
                <circle cx={pos[0]} cy={pos[1]} r="2.6" fill="var(--accent)" />
                <text
                  x={pos[0]}
                  y={pos[1] + 0.9}
                  textAnchor="middle"
                  fontSize="2.6"
                  fontWeight="700"
                  fill="#ffffff"
                >
                  {p.num}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="mono mt-2 text-center text-[10px] uppercase tracking-wider text-muted">
          Static schematic — interactive 3D unavailable on this device
        </p>
      </div>

      <figcaption className="rounded-[var(--radius-lg)] border border-line bg-surface p-3">
        <span className="mono mb-2 block px-1 text-[11px] uppercase tracking-[0.16em] text-muted">
          Main parts
        </span>
        <ol className="space-y-1">
          {PARTS.map((p) => (
            <li key={p.id} className="flex items-center gap-2.5 px-2 py-1 text-[0.82rem] text-ink-2">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line text-[10px] font-semibold text-muted">
                {p.num}
              </span>
              <span className="leading-tight">{p.label}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
