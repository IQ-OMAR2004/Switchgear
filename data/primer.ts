/** Educational primer copy — "what is MV switchgear" + everyday analogies. */

export const PRIMER_INTRO: string[] = [
  'Medium-voltage (MV) switchgear is the equipment that sits inside a substation and manages electricity in the "middle" part of its journey from the power station to homes and businesses. Electricity leaves a power station at very high voltage and is stepped down stage by stage; medium voltage is the band in the middle, roughly 1,000 to 36,000 volts (1–36 kV). That is far too high to touch safely, but lower than the giant transmission lines overhead. Switchgear is what receives this power and hands it on in a controlled, protected way.',
  'A switchgear lineup does five jobs at once: it receives the incoming MV supply, divides it among several outgoing circuits, switches each circuit on and off, measures the voltage and current, and — most importantly — automatically disconnects any circuit that develops a fault, in a fraction of a second, before it can cause damage or injury. A useful comparison is the consumer unit or "fuse box" in a home: it takes one incoming supply and splits it into several protected circuits. MV switchgear does the same job, but for far higher voltage and current, inside earthed steel cabinets with much stronger protection.',
  "Physically, switchgear is built from panels (also called cubicles or bays) standing side by side, each one a steel cabinet handling a single circuit. A shared copper bar called the busbar runs across the top, carrying the incoming power so every panel can tap off it. The alfanar alfa series is factory-assembled, metal-enclosed, type-tested air-insulated switchgear for indoor use, built to the international standard IEC 62271-200. Each panel is divided into sealed compartments so a problem in one part stays contained, and all switching is done with the high-voltage door closed.",
];

export const ANALOGIES: { title: string; body: string }[] = [
  {
    title: "A scaled-up fuse box",
    body: 'A home consumer unit ("fuse box") takes one incoming supply and splits it into several protected circuits. MV switchgear does the same job for much higher voltage and current, inside earthed steel cabinets with far stronger protection and safety features.',
  },
  {
    title: "The busbar is a shared main pipe",
    body: "The busbar is like a main water pipe running along the switchboard that every tap (panel) connects to and draws from.",
  },
  {
    title: 'The relay is the "decision-maker"',
    body: 'The low-voltage compartment is the "brain box" of the panel. The protection relay constantly watches the CT and VT signals and commands the breaker to trip the instant it sees a fault.',
  },
  {
    title: "One line stands for three",
    body: "A single-line diagram (SLD) is a shorthand drawing in which one line represents all three phases of the circuit.",
  },
];
