import Link from "next/link";
import { Wordmark } from "@/components/beacon-mark";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Products",
    links: [
      { label: "The range", href: "/range" },
      { label: "alfa 12 / 12C", href: "/products/alfa-12" },
      { label: "Request a quote", href: "/contact" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Switchgear explained", href: "/learn" },
      { label: "Component library", href: "/learn#components" },
      { label: "Glossary", href: "/learn#glossary" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-panel/40">
      <div className="wrap py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm text-ink-2">
              A beacon for reliable power — interactive medium-voltage switchgear for
              engineers, specifiers and the people who learn from them.
            </p>
            <p className="mono mt-5 text-xs leading-relaxed text-muted">
              AR 04 Medium-Voltage Switchgear Factory
              <br />
              Riyadh, Kingdom of Saudi Arabia
              <br />
              <a
                href="https://www.alfanar.com"
                className="text-link hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.alfanar.com
              </a>
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mono text-xs uppercase tracking-[0.18em] text-muted">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-2 transition-colors hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© {2026} alfanar. Wordmark and brand shown for demonstration.</p>
          <p className="max-w-xl md:text-right">
            Data is indicative and provided by alfanar; confirm against the current
            datasheet before order. 3D models are stylised, original representations for
            explanation — not certified engineering drawings.
          </p>
        </div>
      </div>
    </footer>
  );
}
