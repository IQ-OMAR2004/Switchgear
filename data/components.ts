/**
 * MV switchgear component library.
 * Plain-language + technical descriptions adapted from the alfanar
 * MV switchgear catalogue primer (original wording). Each part's `slug`
 * is the shared key used by the 3D model hotspots and the component pages.
 */

export interface PartInfo {
  /** stable id — shared with the 3D model and hotspots */
  slug: string;
  /** display name */
  name: string;
  /** short symbol shown in legends (e.g. "VCB") */
  short?: string;
  /** everyday-words explanation: what it is and what it does */
  plain: string;
  /** engineering note: spec / standard */
  technical: string;
}

export const PARTS: PartInfo[] = [
  {
    slug: "busbar",
    name: "Busbar",
    short: "BB",
    plain:
      "The shared copper bar that runs across the top of every panel, carrying the incoming power along the whole switchboard so each panel can tap off the supply it needs.",
    technical:
      "Flat copper bars bolted from panel to panel, supported by bushing-type insulators in a dedicated pressure-resistant compartment with a transverse partition between panels. Rated 630–3150 A with pressure relief directed upwards.",
  },
  {
    slug: "vacuum-circuit-breaker-alfa-v",
    name: "Vacuum circuit-breaker (alfa V)",
    short: "VCB",
    plain:
      'The automatic switch at the heart of the panel that can interrupt huge fault currents in milliseconds. It is the part that "trips" to clear a fault and protect the circuit.',
    technical:
      "Contacts open inside hermetically sealed, maintenance-free vacuum interrupters, quenching the arc at the first current zero. Rated up to 17.5 kV, short-circuit breaking 31.5 kA / 3 s (up to 50 kA in the duplex alfa DT), 3-cycle break time, endurance class E2/M2/C2, stored-energy spring mechanism, to IEC 62271-100.",
  },
  {
    slug: "withdrawable-truck",
    name: "Withdrawable truck",
    short: "TR",
    plain:
      "The wheeled carriage the breaker sits on, which rolls between positions so the breaker can be swapped out or tested safely with the door closed.",
    technical:
      "Three defined positions — service (connected), test (control circuits only) and disconnected (racked out) — with manual or motor racking and a low-voltage plug between the breaker and the fixed part. Coding prevents a lower-rated device entering a higher-rated panel.",
  },
  {
    slug: "disconnector-isolator",
    name: "Disconnector / isolator",
    short: "DS",
    plain:
      "A switch that creates a clear, safe gap to isolate a circuit. It is only operated when no load is flowing — its job is separation, not breaking current.",
    technical:
      "In the alfa design the isolating function is performed by racking the withdrawable breaker between the service and disconnected positions, in accordance with IEC 62271-102.",
  },
  {
    slug: "earthing-switch",
    name: "Earthing switch",
    short: "ES",
    plain:
      "A switch that deliberately connects a dead circuit to earth so it is safe to work on. A make-proof type can be closed even if the circuit was accidentally left live.",
    technical:
      "Manual or motor-operated make-proof earthing switch in the cable-connection compartment, interlocked to operate only when the breaker is disconnected, complying with IEC 62271-102.",
  },
  {
    slug: "current-transformer",
    name: "Current transformer (CT)",
    short: "CT",
    plain:
      "A ring that scales the large line current down to a small, safe value (such as 1 or 5 amps) that meters and the protection relay can read.",
    technical:
      "Block-type, cast-resin-insulated CTs with up to three secondary cores (separate metering and protection). Operating voltage up to 24 kV, primary up to 4000 A, metering class 0.2–1, protection class 5P/10P, to IEC 61869-2.",
  },
  {
    slug: "voltage-transformer",
    name: "Voltage transformer (VT)",
    short: "VT",
    plain:
      "Like the CT but for voltage — it scales the medium voltage down to a safe value (typically 110 V) for measurement and protection.",
    technical:
      "Inductive, cast-resin single-pole VTs, fixed or withdrawable with primary fuses. Primary up to 24 kV, secondary 110 V or 110 V/√3, accuracy 0.2/0.5/1.0, up to 200 VA, optional open-delta winding, to IEC 61869-3.",
  },
  {
    slug: "cable-connection-compartment",
    name: "Cable connection compartment",
    short: "CC",
    plain:
      "The compartment at the bottom of the panel where the power cables are bolted on, bringing power into the panel or sending it out to the load.",
    technical:
      "Houses single- or three-core cable terminations with an earthing busbar, make-proof earthing switch, spout bushings to the switching device and cable test access. Optional surge arresters, with pressure relief directed upwards.",
  },
  {
    slug: "low-voltage-compartment",
    name: "Low-voltage (relay/control) compartment",
    short: "LV",
    plain:
      'The safe-to-touch "brain box" on top of the panel, holding the protection relay, meters, indicator lamps and control switches so the breaker can always be tripped.',
    technical:
      "Fully partitioned from the HV part. Houses the protection relay (sensing CT/VT and commanding the trip), multifunction metering, TNC and Local/Remote selectors and annunciation. Runs on station-battery-backed DC, typically 125 V DC, plug-in wired.",
  },
  {
    slug: "pressure-relief-duct",
    name: "Pressure-relief duct",
    short: "PR",
    plain:
      "A safety path along the top of the panel. If an internal fault ever creates an arc, the hot gases are vented safely upwards, away from anyone standing in front of the panel.",
    technical:
      "Each metal-clad, pressure-resistant compartment withstands the pressure wave and vents hot gases upwards through the relief duct. Verified by internal-arc testing to IEC 62271-200, classification IAC A-FLR for a 1 s arc.",
  },
  {
    slug: "metal-shutters",
    name: "Metal shutters",
    short: "SH",
    plain:
      "Metal covers that slide shut over the live contacts the moment the breaker truck is rolled out, so there is nothing live to touch when working on the panel.",
    technical:
      "Positively-driven, earthed metallic shutters that cover the fixed-contact spouts when the breaker is withdrawn — part of the metal-clad partition concept (partition class PM) that keeps live parts inaccessible.",
  },
];

const PART_BY_SLUG = new Map(PARTS.map((p) => [p.slug, p]));

export function getPart(slug: string): PartInfo | undefined {
  return PART_BY_SLUG.get(slug);
}
