/**
 * alfanar "alfa" MV switchgear product catalogue.
 *
 * Numbers are sourced from alfanar datasheets + the alfanar MV switchgear
 * catalogue. Where a figure is only seen on an alfanar factory display board
 * (not yet datasheet-confirmed) it carries `indicative: true` and the product
 * `status` is "board". alfa 12 / 12C is fully datasheet-backed.
 *
 * In this build only alfa 12 has a full product page + interactive 3D model
 * (`hasModel: true`). The others are catalogue summaries used by the range and
 * comparison views; their full pages + 3D follow in the next milestone.
 */

export type ProductFamily = "primary" | "secondary" | "device";
export type Insulation = "air" | "gas";
export type DataStatus = "datasheet" | "board";

export interface SpecRow {
  label: string;
  value: string;
  /** seen on display board only — show a "confirm" badge */
  indicative?: boolean;
}

export interface SpecGroup {
  group: string;
  rows: SpecRow[];
}

export interface Product {
  slug: string;
  name: string;
  /** wordmark form, e.g. "alfa 12" */
  shortName: string;
  family: ProductFamily;
  insulation: Insulation;
  /** one-line positioning */
  tagline: string;
  status: DataStatus;
  /** whole product is board-only / indicative */
  indicative?: boolean;
  /** does this product have an interactive 3D model + full page in this build? */
  hasModel: boolean;

  /** headline chips for cards / comparison */
  headline: {
    voltage: string;
    current: string;
    shortCircuit: string;
    classes: string;
    standard: string;
  };

  atAGlance: string[];
  overview: string[];
  howItWorks?: string[];
  configurations?: string[];
  specs?: SpecGroup[];
  /** component slugs present in this product (drives the 3D hotspots) */
  partSlugs?: string[];
  /** public path to a downloadable datasheet, if bundled */
  datasheet?: string;
  /** extra disclosure note */
  note?: string;
}

export const ALFA12: Product = {
  slug: "alfa-12",
  name: "alfa 12 / 12C",
  shortName: "alfa 12",
  family: "primary",
  insulation: "air",
  tagline:
    "Compact, air-insulated, metal-clad primary switchgear up to 17.5 kV — one family, two current ratings.",
  status: "datasheet",
  hasModel: true,
  headline: {
    voltage: "≤ 17.5 kV",
    current: "12 → 3150 A · 12C → 1250 A",
    shortCircuit: "31.5 kA / 3 s",
    classes: "LSC 2B · PM · IAC A-FLR",
    standard: "IEC 62271-200",
  },
  atAGlance: [
    "Up to 17.5 kV rated voltage; air-insulated, metal-clad, withdrawable design",
    "Withdrawable alfa V vacuum circuit-breaker, shared across alfa 12 and alfa 12C",
    "Five isolated compartments — busbar, switching device, cable, low-voltage, instrument transformers",
    "alfa 12: feeder and busbar up to 3150 A; alfa 12C (compact): up to 1250 A",
    "Short-circuit withstand 31.5 kA for 3 s; 80 kA peak / making current",
    "LSC 2B, partition class PM, internal arc IAC A-FLR (1 s)",
    "Maintenance-free vacuum interruption with logical mechanical interlocking",
    "Closed-door rack-in / rack-out of the breaker for full personnel safety",
    "Make-proof earthing switch to IEC 62271-102 on a continuous earthing busbar",
    "Block-type CTs (IEC 61869-2) and cast-resin VTs (IEC 61869-3)",
    "Degree of protection IP4X / IP41; copper busbars; Alu-Zinc enclosure",
    "One family, two ratings — mix full-current incomers and economical feeders in one lineup",
  ],
  overview: [
    "The alfanar alfa 12 / alfa 12C is a compact, air-insulated, metal-clad medium-voltage switchgear panel for indoor primary distribution up to 17.5 kV. Both panels are withdrawable, factory-assembled and type-tested to the latest IEC 62271-200 series, and both are built on a five-compartment architecture — busbar, switching device, cable connection, low-voltage and instrument-transformer compartments — so a fault in any one part stays contained. The result is high personal and operating safety, optimal availability and low lifecycle cost in a footprint engineered for tight substation rooms.",
    "The alfa 12 and alfa 12C share the same withdrawable alfa V vacuum circuit-breaker, the same logical mechanical interlocking and the same maintenance-free vacuum interruption — they differ only in current envelope. The alfa 12 carries the busbar at up to 3150 A for full-current incomers and heavy feeders, while the cost-optimised alfa 12C is rated up to 1250 A for economical feeders. Because they share enclosure, interlocks, switching device and spare parts, a single lineup can mix both panels with identical operation and a common spares inventory.",
    "Engineered for demanding networks, the panel is classified LSC 2B for loss of service continuity, partition class PM for all-metallic partitions and shutters, and IAC A-FLR for internal-arc protection — pressure is released safely upwards while doors and covers stay closed. Block-type current transformers to IEC 61869-2 and cast-resin voltage transformers to IEC 61869-3, a make-proof earthing switch to IEC 62271-102, and closed-door racking of the breaker complete a switchboard suited to utilities, oil and gas, water, industry, infrastructure and renewable-energy substations.",
  ],
  howItWorks: [
    "Power flows into the substation through an incomer panel, runs along the shared copper busbar that bonds every panel together, and leaves through protected feeder circuits to transformers, motors and other loads. Inside each panel the busbar taps down through a copper dropper to the withdrawable alfa V vacuum circuit-breaker, which sits on a wheeled truck that moves between service, test and disconnected positions — so the breaker can be racked in or out, tested and exchanged with the door closed and the operator fully protected.",
    "Measurement and protection are continuous. Block-type current transformers scale the line current and cast-resin voltage transformers scale the busbar voltage down to safe, standard values that feed the protection relay in the low-voltage compartment on top. Running on a battery-backed DC control supply, the relay constantly watches the CT and VT signals and commands the breaker to trip the instant it detects a short-circuit or earth fault — the contacts open within a sealed vacuum, extinguishing the arc almost instantly, with a rated operating sequence of O-0.3s-CO-3min-CO and short-circuit withstand up to 31.5 kA for 3 seconds.",
    "Safety is built into the mechanics, not bolted on. Automatically operating metallic shutters cover the live isolating contacts the moment the breaker truck is withdrawn; logical mechanical interlocking prevents any out-of-sequence operation; and a make-proof earthing switch lets a dead circuit be bonded to the earthing busbar before work begins. If an internal arc ever occurs, the IAC A-FLR design vents the hot gases upward through pressure-relief flaps while the enclosure stays earthed and closed, protecting personnel at the front, sides and rear.",
  ],
  configurations: [
    "Incomer (IF) — breaker, disconnector, CTs and optional cable VT, bringing the supply onto the busbar",
    "Outgoing / load feeder (OF) — breaker to a load, transformer or motor",
    "Bus coupler (BC) — ties two busbar sections through a breaker for main-tie-main schemes",
    "Bus riser (BR) — links busbar levels without a breaker",
    "Bus VT / metering (BVT) — busbar VT and CT for measurement and protection reference",
    "Transformer feeder — distribution-transformer protection",
    "Motor feeder — frequent switching with anti-pumping and surge protection",
    "Capacitor feeder — power-factor banks with class C2 capacitive switching",
    "Earthing panel — high-speed / make-proof earthing",
  ],
  specs: [
    {
      group: "Ratings",
      rows: [
        { label: "Rated voltage", value: "12 / 17.5 kV (service 11 / 13.8 kV)" },
        { label: "Rated frequency", value: "50 / 60 Hz" },
        { label: "Rated normal current — alfa 12", value: "up to 3150 A" },
        { label: "Rated normal current — alfa 12C", value: "up to 1250 A" },
        { label: "Rated busbar current", value: "630 – 3150 A" },
      ],
    },
    {
      group: "Insulation level (17.5 kV class)",
      rows: [
        { label: "Power-frequency withstand (1 min)", value: "38 kV" },
        { label: "Lightning-impulse withstand", value: "95 kVp" },
        { label: "Across isolating distance", value: "45 kV / 110 kVp" },
      ],
    },
    {
      group: "Short-circuit performance",
      rows: [
        { label: "Short-time withstand current", value: "up to 31.5 kA / 3 s" },
        { label: "Peak / making current", value: "80 kA" },
        { label: "Internal-arc fault", value: "31.5 kA (1 s)" },
        { label: "Operating sequence", value: "O – 0.3 s – CO – 3 min – CO" },
      ],
    },
    {
      group: "Classification",
      rows: [
        { label: "Loss of service continuity", value: "LSC 2B" },
        { label: "Partition class", value: "PM (metallic partitions + shutters)" },
        { label: "Internal-arc classification", value: "IAC A-FLR (1 s)" },
        { label: "Capacitive switching class", value: "C2", indicative: true },
        { label: "Degree of protection", value: "IP4X / IP41" },
      ],
    },
    {
      group: "Construction",
      rows: [
        { label: "Enclosure", value: "Alu-Zinc sheet steel" },
        { label: "Main & dropper busbar", value: "Copper" },
        { label: "Control voltage", value: "125 V DC (110 V optional)" },
        { label: "Ambient temperature", value: "up to 40 °C" },
      ],
    },
    {
      group: "Dimensions (W × H × D)",
      rows: [
        { label: "alfa 12C (compact)", value: "600 × 2200 × 1450 mm" },
        { label: "alfa 12 ≤ 1250 A", value: "650 × 2000 × 1750 mm" },
        { label: "alfa 12 > 1250 A / with VT", value: "1000 × 2500 × 1750 mm" },
        { label: "Weight", value: "Confirm with alfanar", indicative: true },
      ],
    },
    {
      group: "Standards",
      rows: [
        { label: "Switchgear", value: "IEC 62271-1 / -100 / -102 / -200" },
        { label: "Instrument transformers", value: "IEC 61869-2 / -3" },
        { label: "Protection / ingress", value: "IEC 60529 · IEC 61850" },
        { label: "Quality", value: "ISO 9001:2015" },
      ],
    },
  ],
  partSlugs: [
    "busbar",
    "vacuum-circuit-breaker-alfa-v",
    "withdrawable-truck",
    "disconnector-isolator",
    "earthing-switch",
    "current-transformer",
    "voltage-transformer",
    "cable-connection-compartment",
    "low-voltage-compartment",
    "pressure-relief-duct",
    "metal-shutters",
  ],
  datasheet: "/datasheets/alfa-12-datasheet.pdf",
  note: "Specifications are indicative and provided by alfanar; confirm against the current datasheet before order. The 3D model is a stylised, original representation for explanation — not a certified engineering drawing.",
};

/** Catalogue summaries — full pages + 3D follow in the next milestone. */
export const OTHER_PRODUCTS: Product[] = [
  {
    slug: "alfa-v",
    name: "alfa V",
    shortName: "alfa V",
    family: "device",
    insulation: "air",
    tagline: "The withdrawable vacuum circuit-breaker at the heart of the AIS panels.",
    status: "datasheet",
    hasModel: false,
    headline: {
      voltage: "≤ 17.5 kV",
      current: "1250 / 3150 A",
      shortCircuit: "31.5 – 50 kA / 3 s",
      classes: "E2 · M2 · C2",
      standard: "IEC 62271-100",
    },
    atAGlance: [
      "Maintenance-free sealed vacuum interrupters",
      "Stored-energy spring operating mechanism",
      "Endurance class E2 / M2 / C2",
      "Types VL-12H32A13 / VH-12H32D32",
    ],
    overview: [
      "alfa V is the withdrawable vacuum circuit-breaker used across the alfa air-insulated range. Its contacts open inside hermetically sealed vacuum interrupters, quenching the arc at the first current zero, for fast, maintenance-free interruption. It is rated 31.5 kA / 3 s in the datasheet-backed alfa 12 / 12C panels, with up to 50 kA available in the duplex alfa DT configuration.",
    ],
    note: "The 50 kA short-circuit rating applies to the duplex alfa DT panel; the alfa 12 / 12C panels that house alfa V are rated 31.5 kA / 3 s. Confirm device ratings against the alfanar datasheet.",
  },
  {
    slug: "alfa-40",
    name: "alfa 40",
    shortName: "alfa 40",
    family: "primary",
    insulation: "air",
    tagline: "Primary air-insulated switchgear for higher fault levels, up to 40 kA.",
    status: "board",
    indicative: true,
    hasModel: false,
    headline: {
      voltage: "≤ 17.5 kV",
      current: "≤ 3150 A",
      shortCircuit: "40 kA / 3 s",
      classes: "LSC 2B · A-FLR",
      standard: "IEC 62271-200",
    },
    atAGlance: [
      "Higher short-circuit rating (40 kA) for stiff networks",
      "Air-insulated, metal-clad, withdrawable design",
    ],
    overview: [
      "alfa 40 extends the primary air-insulated range to a 40 kA fault level for stiffer networks, keeping the same withdrawable, metal-clad architecture.",
    ],
    note: "Ratings shown are from the alfanar display board — confirm against the datasheet.",
  },
  {
    slug: "alfa-dt",
    name: "alfa DT",
    shortName: "alfa DT",
    family: "primary",
    insulation: "air",
    tagline: "Duplex primary AIS — two vacuum breakers back-to-back, up to 50 kA.",
    status: "board",
    indicative: true,
    hasModel: false,
    headline: {
      voltage: "≤ 17.5 kV",
      current: "≤ 3150 A",
      shortCircuit: "50 kA / 3 s",
      classes: "LSC 2B · A-FLR",
      standard: "IEC 62271-200",
    },
    atAGlance: [
      "Two vacuum circuit-breakers in a duplex (back-to-back) arrangement",
      "Highest fault rating in the AIS range (50 kA)",
    ],
    overview: [
      "alfa DT is a duplex primary air-insulated panel carrying two vacuum circuit-breakers back-to-back for high-density, high-fault-level applications.",
    ],
    note: "Ratings shown are from the alfanar display board (labelled 'alfa D1') — confirm against the datasheet.",
  },
  {
    slug: "alfa-gsf6",
    name: "alfa GSF6",
    shortName: "alfa GSF6",
    family: "primary",
    insulation: "gas",
    tagline: "Primary gas-insulated switchgear — a compact, sealed alternative.",
    status: "board",
    indicative: true,
    hasModel: false,
    headline: {
      voltage: "≤ 24 kV",
      current: "≤ 2500 A",
      shortCircuit: "40 kA / 3 s",
      classes: "LSC 2A · A-FLR",
      standard: "IEC 62271-200",
    },
    atAGlance: [
      "Gas-insulated, sealed-tank construction",
      "Compact footprint for space-constrained sites",
      "Distinct from the alfa R secondary RMU",
    ],
    overview: [
      "alfa GSF6 is the primary gas-insulated member of the range — a sealed-tank design for compact, environment-protected installations. It is a different product from the secondary alfa R ring-main unit (which is the 36 kV product).",
    ],
    note: "Ratings are read from the alfanar factory display board: ≤ 24 kV, ≤ 2500 A, 40 kA / 3 s, gas-insulated. Confirm against the datasheet. (Not to be confused with the secondary alfa R RMU, which is rated to 36 kV.)",
  },
  {
    slug: "alfa-r",
    name: "alfa R",
    shortName: "alfa R",
    family: "secondary",
    insulation: "gas",
    tagline: "Secondary ring-main unit (RMU) up to 36 kV, with an SF₆-free option.",
    status: "datasheet",
    hasModel: false,
    headline: {
      voltage: "≤ 36 kV",
      current: "630 A",
      shortCircuit: "21 – 25 kA / 1 s",
      classes: "LSC 2 · PM · A-FLR",
      standard: "IEC 62271-200",
    },
    atAGlance: [
      "Compact secondary-distribution ring-main unit",
      "SF₆-free dry-air option up to 24 kV",
      "Load-break switch = alfa L; Smart RMU + Compact RMU variants",
    ],
    overview: [
      "alfa R is the secondary ring-main unit for distribution networks — a compact unit combining ring load-break switches and a breaker way, with an SF₆-free dry-air option up to 24 kV.",
    ],
  },
];

export const PRODUCTS: Product[] = [ALFA12, ...OTHER_PRODUCTS];

const PRODUCT_BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return PRODUCT_BY_SLUG.get(slug);
}
