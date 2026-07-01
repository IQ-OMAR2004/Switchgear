import type { Metadata } from "next";
import Link from "next/link";
import { PRIMER_INTRO, ANALOGIES } from "@/data/primer";
import { PARTS } from "@/data/components";
import { GLOSSARY } from "@/data/glossary";
import { SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { CubeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Switchgear explained",
  description:
    "A plain-language guide to medium-voltage switchgear: what it is, what each part does, and a glossary — adapted from the alfanar catalogue primer.",
};

export default function LearnPage() {
  return (
    <div className="wrap pt-12">
      {/* intro */}
      <SectionHeading
        index="01"
        total="03"
        title="Switchgear, explained"
        intro="No jargon to start with. Here is what medium-voltage switchgear is, what it does, and how to read a panel — the same friendly primer as the alfanar catalogue."
      />

      <div className="mt-9 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4 text-[1.05rem] leading-relaxed text-ink-2">
          {PRIMER_INTRO.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <aside className="space-y-4">
          <h3 className="mono text-xs uppercase tracking-[0.16em] text-muted">
            Everyday analogies
          </h3>
          {ANALOGIES.map((a) => (
            <div key={a.title} className="rounded-[var(--radius)] border border-line bg-surface p-4">
              <h4 className="font-display text-sm font-semibold text-accent">{a.title}</h4>
              <p className="mt-1.5 text-sm text-ink-2">{a.body}</p>
            </div>
          ))}
        </aside>
      </div>

      {/* CTA to 3D */}
      <Reveal>
        <div className="mt-14 flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-line bg-panel/40 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-ink">
              See it instead of reading it
            </h3>
            <p className="mt-1.5 max-w-xl text-sm text-ink-2">
              Explode the alfa 12 panel in 3D and click any part to learn what it does.
            </p>
          </div>
          <Button href="/products/alfa-12" size="lg">
            Explore the alfa 12 <CubeIcon className="h-4 w-4" />
          </Button>
        </div>
      </Reveal>

      {/* component library */}
      <section id="components" className="mt-20 scroll-mt-24">
        <SectionHeading
          index="02"
          total="03"
          title="What each part does"
          intro="Every panel is built from the same family of parts. Here is each one in plain words, with the engineering note underneath."
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTS.map((part, i) => (
            <Reveal key={part.slug} delay={(i % 3) * 0.05}>
              <div className="flex h-full flex-col rounded-[var(--radius)] border border-line bg-surface p-5">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-semibold text-ink">{part.name}</h3>
                  {part.short && (
                    <span className="mono rounded border border-line px-1.5 py-0.5 text-[10px] text-muted">
                      {part.short}
                    </span>
                  )}
                </div>
                <p className="mt-2.5 flex-1 text-sm text-ink-2">{part.plain}</p>
                <p className="mono mt-3 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                  {part.technical}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* glossary */}
      <section id="glossary" className="mt-20 scroll-mt-24">
        <SectionHeading
          index="03"
          total="03"
          title="Glossary"
          intro="The acronyms and terms you will meet across the site, defined once."
        />
        <dl className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {GLOSSARY.map((g) => (
            <div key={g.term} className="border-b border-line pb-4">
              <dt className="font-display text-sm font-semibold text-accent">{g.term}</dt>
              <dd className="mt-1 text-sm text-ink-2">{g.definition}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-16 text-center text-sm text-muted">
        Ready to choose a panel?{" "}
        <Link href="/range" className="text-link underline">
          Browse the range
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="text-link underline">
          request a quote
        </Link>
        .
      </p>
    </div>
  );
}
