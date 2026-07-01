/** Glossary of MV switchgear terms — adapted from the alfanar catalogue. */

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "MV",
    definition:
      "Medium voltage — the middle band of the electricity journey, roughly 1 to 36 kV; too high to touch safely but lower than transmission lines.",
  },
  {
    term: "LV",
    definition:
      "Low voltage — the control side of the panel; the safe-to-touch protection, control and metering circuits.",
  },
  {
    term: "VCB",
    definition:
      'Vacuum circuit-breaker — the automatic switch whose contacts open inside a sealed vacuum to interrupt fault current. "CB" is the general term for circuit-breaker.',
  },
  {
    term: "CT",
    definition:
      "Current transformer — scales the large line current down to a small, safe value (e.g. 1 or 5 A) for the meters and protection relay.",
  },
  {
    term: "VT",
    definition:
      "Voltage transformer — scales the medium voltage down to a safe value (typically 110 V) for measurement and protection.",
  },
  {
    term: "SLD",
    definition:
      "Single-line diagram — the standard shorthand drawing where one line represents all three phases of a circuit.",
  },
  {
    term: "LSC",
    definition:
      "Loss of service continuity — how much of the switchgear must be shut down to access one compartment; the alfa air-insulated range is class LSC 2B.",
  },
  {
    term: "PM",
    definition:
      "Partition class with metallic partitions — the compartments are separated by earthed metal walls rather than insulating barriers.",
  },
  {
    term: "IAC A-FLR",
    definition:
      "Internal-arc classification, accessibility type A, with arc-tested Front, Lateral and Rear faces — confirms hot gases from an internal arc are contained and vented safely away from the operator.",
  },
  {
    term: "IP",
    definition:
      "Ingress protection rating — a code (e.g. IP4X) stating how well the enclosure keeps out solid objects, fingers and water, per IEC 60529.",
  },
  {
    term: "RMU",
    definition:
      "Ring-main unit — a compact secondary-distribution switchgear unit (the alfa R type).",
  },
  { term: "trip", definition: "The breaker opening automatically to clear a fault." },
  {
    term: "busbar",
    definition:
      "The shared copper bar that carries power along the switchboard so each panel can tap off it.",
  },
  {
    term: "feeder",
    definition: "A panel that sends power out to a load such as a transformer or motor.",
  },
  { term: "incomer", definition: "A panel where power comes into the switchboard." },
  {
    term: "withdrawable",
    definition:
      "Mounted on a wheeled truck that can be racked between service, test and disconnected positions so the device can be removed or tested safely.",
  },
  {
    term: "interlock",
    definition:
      "A built-in mechanical or electrical safeguard that prevents an unsafe operating sequence — for example, allowing the breaker to rack only when it is open (per IEC 62271-200).",
  },
  {
    term: "arc",
    definition:
      "An electrical discharge across a gap. Inside the vacuum breaker the arc is deliberately quenched to break current; an unwanted internal arc is contained by the metal-clad design and vented upward.",
  },
  {
    term: "AIS / GIS",
    definition:
      "Air-insulated / gas-insulated switchgear — the two insulation approaches. The alfa air-insulated panels are metal-clad; the alfa GSF6 is the gas-insulated alternative.",
  },
];
