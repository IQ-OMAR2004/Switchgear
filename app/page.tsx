import Link from "next/link";
import { ProductViewer3D } from "@/components/product-viewer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { BeaconMark } from "@/components/beacon-mark";
import { ArrowRight, BookIcon, CubeIcon, ShieldIcon } from "@/components/icons";
import { PRODUCTS } from "@/data/products";

const TRUST = [
  "IEC 62271-200",
  "ISO 9001:2015",
  "CESI type-tested",
  "Made in Saudi Arabia",
];

export default function HomePage() {
  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-10%] h-[36rem] w-[36rem] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--sky) 32%, transparent), transparent)",
          }}
        />
        <div className="wrap relative grid gap-10 pb-6 pt-16 md:pt-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <span className="mono inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-ink-2">
              <BeaconMark className="h-4 w-4 text-accent" /> A beacon for reliable power
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[1.04] text-ink">
              Reliable power,
              <br />
              made <span className="text-accent">clear</span>.
            </h1>
            <p className="mt-5 max-w-xl text-[1.1rem] leading-relaxed text-ink-2">
              Explore alfanar&apos;s medium-voltage switchgear in interactive 3D — see
              how every part works in plain language, then specify the right panel with
              datasheet-backed confidence.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/products/alfa-12" size="lg">
                Explore the alfa 12 in 3D <CubeIcon className="h-4 w-4" />
              </Button>
              <Button href="/range" variant="secondary" size="lg">
                See the full range
              </Button>
            </div>
            <ul className="mono mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-wider text-muted">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* hero viewer */}
          <Reveal className="lg:pl-4" delay={0.1}>
            <ProductViewer3D productName="alfa 12" />
          </Reveal>
        </div>
      </section>

      {/* ---------- dual purpose ---------- */}
      <section className="wrap mt-20 grid gap-5 md:grid-cols-2">
        {[
          {
            icon: <BookIcon className="h-5 w-5" />,
            kicker: "For learners",
            title: "Understand it",
            body: "Students, trainees and new engineers get plain-language explanations, guided exploded views and a glossary — the same friendly primer as the alfanar catalogue.",
            href: "/learn",
            cta: "Switchgear explained",
          },
          {
            icon: <ShieldIcon className="h-5 w-5" />,
            kicker: "For specifiers",
            title: "Specify it",
            body: "Buyers, utilities and consultants get exact ratings, configurations, standards and a clear path to a quote — with indicative figures clearly flagged.",
            href: "/range",
            cta: "Compare the range",
          },
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <Link
              href={c.href}
              className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-7 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_40px_-22px_rgba(var(--shadow-color),0.6)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-accent">
                {c.icon}
              </span>
              <span className="mono mt-5 text-[11px] uppercase tracking-[0.16em] text-accent">
                {c.kicker}
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 flex-1 text-[0.97rem] leading-relaxed text-ink-2">{c.body}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {c.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* ---------- the range ---------- */}
      <section className="wrap mt-24">
        <Reveal>
          <SectionHeading
            index="01"
            total="04"
            title="The alfa MV portfolio"
            intro="Primary substation switchgear and secondary ring-main units across the alfa range. alfa 12 leads with a full interactive 3D model; the rest follow."
          />
        </Reveal>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- quote band ---------- */}
      <section className="wrap mt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line bg-gradient-to-br from-[var(--navy)] to-[var(--navy-2)] px-7 py-12 text-center md:px-16 md:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(40rem 20rem at 80% -20%, color-mix(in srgb, var(--sky) 40%, transparent), transparent)",
              }}
            />
            <div className="relative">
              <BeaconMark className="mx-auto h-9 w-9 text-white" />
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-white">
                Ready to specify your switchboard?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[1.02rem] text-[#c8d9ea]">
                Tell us your voltage, current and fault level — alfanar&apos;s engineers
                will recommend the right alfa panel and prepare a quote.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/contact" size="lg" className="!bg-white !text-[var(--navy)] hover:!bg-[#eaf2fa]">
                  Request a quote
                </Button>
                <Button
                  href="/learn"
                  variant="ghost"
                  size="lg"
                  className="!text-white hover:!bg-white/10"
                >
                  Learn the basics first
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
