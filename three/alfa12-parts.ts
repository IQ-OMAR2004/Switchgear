/**
 * alfa 12 panel — 3D part definitions.
 *
 * Coordinate system (from the extracted geometry reference): origin at the
 * panel centre-bottom. Panel spans x[-0.5, 0.5], y[0, 2.3], z[-0.75, 0.75]
 * (z+ = toward the viewer / front). The model component recentres the whole
 * panel to the world origin for orbiting.
 *
 * Each labelled PartDef maps 1:1 to a component slug in data/components.ts, so
 * its hotspot opens the matching plain-language + technical description.
 */

export type Vec3 = [number, number, number];

export interface MeshSpec {
  type: "box" | "cyl";
  /** box: [w, h, d]  ·  cyl: [radiusTop, radiusBottom, height, segments] */
  args: number[];
  position: Vec3;
  rotation?: Vec3;
  color: string;
  metalness?: number;
  roughness?: number;
}

export interface PartDef {
  id: string; // matches a component slug
  label: string;
  num: number; // legend number
  /** offset applied to the whole group in the fully-exploded state */
  explode: Vec3;
  /** hotspot label anchor (assembled, centre-bottom coords) */
  anchor: Vec3;
  meshes: MeshSpec[];
  /** camera focus offset when this part is selected / toured */
  cam?: Vec3;
}

// shared material palette (from the geometry reference)
const GREY = "#c5c6c0"; // RAL 7035 body
const GREY_DK = "#6f7479";
const CHARCOAL = "#3a3e42";
const NAVY = "#1b3a6b"; // mimic line art
const COPPER = "#b87333";
const VCB_BODY = "#33415c";
const CT_BLUE = "#1f3f8f";
const EPOXY = "#7a2e1e";
const STEEL = "#9a9da0";

/** Enclosure = cabinet shell, doors, mimic, base. Fades out in exploded view. */
export const ENCLOSURE: { id: string; meshes: MeshSpec[] } = {
  id: "enclosure",
  meshes: [
    // back + sides + top shell (solid box; faded on explode)
    {
      type: "box",
      args: [1.0, 2.3, 1.5],
      position: [0, 1.15, 0],
      color: GREY,
      metalness: 0.25,
      roughness: 0.62,
    },
    // base plinth
    {
      type: "box",
      args: [1.02, 0.2, 1.52],
      position: [0, 0.1, 0],
      color: CHARCOAL,
      metalness: 0.3,
      roughness: 0.7,
    },
  ],
};

/** Front doors (separate so they swing/translate forward on explode). */
export const DOORS: { id: string; explode: Vec3; meshes: MeshSpec[] } = {
  id: "doors",
  explode: [0, 0, 0.9],
  meshes: [
    // HV main door
    {
      type: "box",
      args: [0.92, 1.32, 0.04],
      position: [0, 1.25, 0.755],
      color: GREY,
      metalness: 0.2,
      roughness: 0.55,
    },
    // raised mimic plate
    {
      type: "box",
      args: [0.46, 0.5, 0.012],
      position: [0, 1.35, 0.78],
      color: "#eef2f5",
      metalness: 0.05,
      roughness: 0.6,
    },
    // mimic line art (navy bars)
    { type: "box", args: [0.34, 0.022, 0.014], position: [0, 1.52, 0.79], color: NAVY },
    { type: "box", args: [0.022, 0.26, 0.014], position: [0, 1.4, 0.79], color: NAVY },
    { type: "box", args: [0.16, 0.022, 0.014], position: [0, 1.27, 0.79], color: NAVY },
    // racking / operating ports
    {
      type: "cyl",
      args: [0.045, 0.045, 0.03, 20],
      position: [0.26, 1.5, 0.785],
      rotation: [Math.PI / 2, 0, 0],
      color: CHARCOAL,
      metalness: 0.5,
      roughness: 0.5,
    },
    {
      type: "cyl",
      args: [0.045, 0.045, 0.03, 20],
      position: [0.26, 1.12, 0.785],
      rotation: [Math.PI / 2, 0, 0],
      color: CHARCOAL,
      metalness: 0.5,
      roughness: 0.5,
    },
    // cable / base front door
    {
      type: "box",
      args: [0.92, 0.5, 0.03],
      position: [0, 0.46, 0.745],
      color: GREY,
      metalness: 0.2,
      roughness: 0.55,
    },
  ],
};

export const PARTS: PartDef[] = [
  {
    id: "low-voltage-compartment",
    label: "Low-voltage (control) compartment",
    num: 1,
    explode: [0, 0.85, 0.2],
    anchor: [0, 2.05, 0.25],
    cam: [0.4, 0.6, 2.4],
    meshes: [
      {
        type: "box",
        args: [0.94, 0.44, 0.55],
        position: [0, 2.05, -0.12],
        color: GREY,
        metalness: 0.2,
        roughness: 0.55,
      },
      // relay / meter window
      {
        type: "box",
        args: [0.34, 0.24, 0.02],
        position: [0, 2.07, 0.17],
        color: "#10151b",
        metalness: 0.1,
        roughness: 0.3,
      },
      // indicator lamps
      { type: "cyl", args: [0.018, 0.018, 0.03, 12], position: [-0.28, 2.07, 0.17], rotation: [Math.PI / 2, 0, 0], color: "#39d98a" },
      { type: "cyl", args: [0.018, 0.018, 0.03, 12], position: [-0.22, 2.07, 0.17], rotation: [Math.PI / 2, 0, 0], color: "#e0685a" },
    ],
  },
  {
    id: "pressure-relief-duct",
    label: "Pressure-relief duct",
    num: 2,
    explode: [0, 0.95, -0.1],
    anchor: [0, 2.28, -0.1],
    cam: [0, 0.8, 2.2],
    meshes: [
      {
        type: "box",
        args: [1.0, 0.16, 1.3],
        position: [0, 2.27, -0.1],
        color: GREY,
        metalness: 0.25,
        roughness: 0.6,
      },
      // relief flap
      {
        type: "box",
        args: [0.9, 0.02, 0.5],
        position: [0, 2.36, -0.25],
        color: GREY_DK,
        metalness: 0.3,
        roughness: 0.6,
      },
    ],
  },
  {
    id: "busbar",
    label: "Main busbar",
    num: 3,
    explode: [0, 0.7, -0.55],
    anchor: [0.35, 2.0, -0.45],
    cam: [0.2, 0.7, 2.1],
    meshes: [
      { type: "box", args: [1.0, 0.05, 0.025], position: [0, 2.06, -0.42], color: COPPER, metalness: 0.8, roughness: 0.3 },
      { type: "box", args: [1.0, 0.05, 0.025], position: [0, 1.96, -0.45], color: COPPER, metalness: 0.8, roughness: 0.3 },
      { type: "box", args: [1.0, 0.05, 0.025], position: [0, 1.86, -0.48], color: COPPER, metalness: 0.8, roughness: 0.3 },
      // dropper to breaker
      { type: "box", args: [0.04, 0.55, 0.04], position: [0, 1.6, -0.42], color: COPPER, metalness: 0.8, roughness: 0.3 },
    ],
  },
  {
    id: "metal-shutters",
    label: "Metal shutters",
    num: 4,
    explode: [0, 0.05, -0.5],
    anchor: [-0.32, 1.4, -0.22],
    cam: [-0.4, 0.3, 2.0],
    meshes: [
      { type: "box", args: [0.7, 0.34, 0.02], position: [0, 1.42, -0.25], color: STEEL, metalness: 0.6, roughness: 0.4 },
      { type: "box", args: [0.7, 0.34, 0.02], position: [0, 0.92, -0.25], color: STEEL, metalness: 0.6, roughness: 0.4 },
      // hazard stripe
      { type: "box", args: [0.7, 0.04, 0.022], position: [0, 1.25, -0.245], color: "#e8b23a" },
    ],
  },
  {
    id: "disconnector-isolator",
    label: "Disconnector / isolating contacts",
    num: 5,
    explode: [0, 0.0, -0.62],
    anchor: [0.3, 1.15, -0.3],
    cam: [0.4, 0.3, 1.9],
    meshes: [
      // two rows of three tulip-contact bushings (busbar-side + cable-side)
      ...[-0.25, 0, 0.25].flatMap((x): MeshSpec[] => [
        { type: "cyl", args: [0.05, 0.05, 0.16, 18], position: [x, 1.4, -0.32], rotation: [Math.PI / 2, 0, 0], color: EPOXY, metalness: 0.2, roughness: 0.5 },
        { type: "cyl", args: [0.05, 0.05, 0.16, 18], position: [x, 0.9, -0.32], rotation: [Math.PI / 2, 0, 0], color: EPOXY, metalness: 0.2, roughness: 0.5 },
      ]),
    ],
  },
  {
    id: "vacuum-circuit-breaker-alfa-v",
    label: "Vacuum circuit-breaker (alfa V)",
    num: 6,
    explode: [0, 0, 1.0],
    anchor: [0, 1.3, 0.32],
    cam: [0.3, 0.4, 1.7],
    meshes: [
      // body
      { type: "box", args: [0.7, 0.6, 0.55], position: [0, 1.15, 0.02], color: VCB_BODY, metalness: 0.5, roughness: 0.45 },
      // three vacuum interrupter poles
      ...[-0.22, 0, 0.22].map((x): MeshSpec => ({
        type: "cyl",
        args: [0.06, 0.06, 0.42, 20],
        position: [x, 1.32, 0.12],
        color: EPOXY,
        metalness: 0.25,
        roughness: 0.5,
      })),
      // rear primary spouts
      ...[-0.22, 0, 0.22].map((x): MeshSpec => ({
        type: "cyl",
        args: [0.05, 0.05, 0.18, 18],
        position: [x, 1.15, -0.26],
        rotation: [Math.PI / 2, 0, 0],
        color: COPPER,
        metalness: 0.85,
        roughness: 0.3,
      })),
    ],
  },
  {
    id: "withdrawable-truck",
    label: "Withdrawable truck",
    num: 7,
    explode: [0, -0.1, 1.1],
    anchor: [0, 0.78, 0.34],
    cam: [0.2, 0.1, 1.7],
    meshes: [
      { type: "box", args: [0.8, 0.16, 0.65], position: [0, 0.78, 0.05], color: CHARCOAL, metalness: 0.4, roughness: 0.55 },
      // wheels
      ...[
        [-0.34, 0.72, 0.28],
        [0.34, 0.72, 0.28],
        [-0.34, 0.72, -0.2],
        [0.34, 0.72, -0.2],
      ].map((p): MeshSpec => ({
        type: "cyl",
        args: [0.05, 0.05, 0.05, 16],
        position: p as Vec3,
        rotation: [0, 0, Math.PI / 2],
        color: "#222",
        metalness: 0.3,
        roughness: 0.7,
      })),
    ],
  },
  {
    id: "current-transformer",
    label: "Current transformers (CTs)",
    num: 8,
    explode: [-0.15, -0.1, -0.6],
    anchor: [-0.28, 0.7, -0.35],
    cam: [-0.4, 0.0, 1.8],
    meshes: [
      ...[0.78, 0.6, 0.42].map((y): MeshSpec => ({
        type: "cyl",
        args: [0.1, 0.1, 0.07, 24],
        position: [0, y, -0.35],
        color: CT_BLUE,
        metalness: 0.2,
        roughness: 0.5,
      })),
    ],
  },
  {
    id: "voltage-transformer",
    label: "Voltage transformer (VT)",
    num: 9,
    explode: [0.25, 0, -0.6],
    anchor: [0.3, 0.95, -0.45],
    cam: [0.5, 0.1, 1.8],
    meshes: [
      { type: "box", args: [0.34, 0.4, 0.3], position: [0.26, 0.95, -0.45], color: "#404040", metalness: 0.3, roughness: 0.55 },
      ...[-0.07, 0.07].map((dx): MeshSpec => ({
        type: "cyl",
        args: [0.03, 0.03, 0.1, 14],
        position: [0.26 + dx, 1.2, -0.45],
        color: COPPER,
        metalness: 0.85,
        roughness: 0.3,
      })),
    ],
  },
  {
    id: "earthing-switch",
    label: "Make-proof earthing switch",
    num: 10,
    explode: [0, -0.35, -0.5],
    anchor: [-0.3, 0.5, -0.4],
    cam: [-0.4, -0.1, 1.8],
    meshes: [
      { type: "box", args: [0.7, 0.12, 0.22], position: [0, 0.5, -0.4], color: STEEL, metalness: 0.6, roughness: 0.4 },
      ...[-0.25, 0, 0.25].map((x): MeshSpec => ({
        type: "box",
        args: [0.03, 0.22, 0.03],
        position: [x, 0.65, -0.4],
        color: COPPER,
        metalness: 0.85,
        roughness: 0.3,
      })),
    ],
  },
  {
    id: "cable-connection-compartment",
    label: "Cable connection compartment",
    num: 11,
    explode: [0, -0.55, 0.2],
    anchor: [0, 0.4, -0.42],
    cam: [0.2, -0.3, 1.8],
    meshes: [
      // gland plate
      { type: "box", args: [0.8, 0.04, 0.4], position: [0, 0.16, -0.42], color: GREY_DK, metalness: 0.4, roughness: 0.5 },
      // three cable terminations
      ...[-0.25, 0, 0.25].map((x): MeshSpec => ({
        type: "cyl",
        args: [0.045, 0.06, 0.5, 16],
        position: [x, 0.42, -0.42],
        color: "#202020",
        metalness: 0.2,
        roughness: 0.7,
      })),
      // red heat-shrink lugs
      ...[-0.25, 0, 0.25].map((x): MeshSpec => ({
        type: "cyl",
        args: [0.035, 0.035, 0.08, 14],
        position: [x, 0.68, -0.42],
        color: "#8a2418",
        metalness: 0.3,
        roughness: 0.5,
      })),
    ],
  },
];

/** Panel recentre offset so the model orbits about its middle. */
export const PANEL_CENTER_OFFSET: Vec3 = [0, -1.15, 0];

export const LEGEND = PARTS.map((p) => ({ num: p.num, label: p.label, id: p.id }));
