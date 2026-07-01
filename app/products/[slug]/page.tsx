import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProduct, PRODUCTS } from "@/data/products";
import { getPart } from "@/data/components";
import { PARTS } from "@/three/alfa12-parts";
import { ProductViewer3D } from "@/components/product-viewer";
import { ProductCard } from "@/components/product-card";
import { Tabs } from "@/components/tabs";
import { Button } from "@/components/ui/button";
import { Chip, StatusBadge, IndicativeBadge } from "@/components/ui/primitives";
import { ArrowRight, DownloadIcon } from "@/components/icons";
import { withBase } from "@/lib/base-path";

const NUM_BY_SLUG = new Map(PARTS.map((p) => [p.id, p.num]));

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.tagline,
    openGraph: { title: product.name, description: product.tagline },
  };
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4 text-[1.02rem] leading-relaxed text-ink-2">
      {items.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  // ---- tab content (only meaningful for the modelled product) ----
  const overviewTab = (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <Paragraphs items={product.overview} />
      <div>
        <h3 className="mono text-xs uppercase tracking-[0.16em] text-muted">At a glance</h3>
        <ul className="mt-4 space-y-2.5">
          {product.atAGlance.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-ink-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const howTab = product.howItWorks ? (
    <div className="max-w-3xl">
      <Paragraphs items={product.howItWorks} />
    </div>
  ) : null;

  const insideTab = product.partSlugs ? (
    <div>
      <p className="mb-6 max-w-2xl text-[1.02rem] leading-relaxed text-ink-2">
        Each numbered part below matches a callout in the 3D model above. Explode the
        panel or take the tour to see where it sits, then read what it does.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {product.partSlugs.map((s) => {
          const part = getPart(s);
          if (!part) return null;
          const num = NUM_BY_SLUG.get(s);
          return (
            <div key={s} className="rounded-[var(--radius)] border border-line bg-surface p-5">
              <div className="flex items-center gap-2.5">
                {num != null && (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--cta-bg)] text-[11px] font-semibold text-[var(--cta-fg)]">
                    {num}
                  </span>
                )}
                <h4 className="font-display text-base font-semibold text-ink">{part.name}</h4>
              </div>
              <p className="mt-2.5 text-sm text-ink-2">{part.plain}</p>
              <p className="mono mt-2.5 border-t border-line pt-2.5 text-xs leading-relaxed text-muted">
                {part.technical}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;

  const techTab = product.specs ? (
    <div className="grid gap-7 md:grid-cols-2">
      {product.specs.map((group) => (
        <div key={group.group} className="rounded-[var(--radius)] border border-line bg-surface p-5">
          <h3 className="mono text-xs uppercase tracking-[0.16em] text-accent">{group.group}</h3>
          <dl className="mt-3 divide-y divide-[var(--line)]">
            {group.rows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-sm text-ink-2">{row.label}</dt>
                <dd className="text-right text-sm font-medium text-ink">
                  {row.value}
                  {row.indicative && <IndicativeBadge />}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  ) : null;

  const configTab = product.configurations ? (
    <div className="max-w-3xl">
      <p className="mb-6 text-[1.02rem] leading-relaxed text-ink-2">
        The {product.shortName} supports the standard MV feeder configurations, from
        incomers and outgoing feeders to couplers, risers and metering panels.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {product.configurations.map((c, i) => (
          <li
            key={i}
            className="flex gap-2.5 rounded-[var(--radius)] border border-line bg-surface px-4 py-3 text-sm text-ink-2"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  ) : null;

  const downloadsTab = (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-[var(--radius)] border border-line bg-surface p-6">
        <h3 className="font-display text-lg font-semibold text-ink">Datasheet</h3>
        <p className="mt-1.5 text-sm text-ink-2">
          Download the {product.name} datasheet for the full set of ratings, dimensions
          and configurations.
        </p>
        {product.datasheet ? (
          <a
            href={withBase(product.datasheet)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-[10px] border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <DownloadIcon className="h-4 w-4" /> Download PDF
          </a>
        ) : (
          <p className="mono mt-4 text-xs uppercase tracking-wider text-muted">
            Datasheet available on request
          </p>
        )}
      </div>
      <div className="rounded-[var(--radius)] border border-line bg-gradient-to-br from-[var(--navy)] to-[var(--navy-2)] p-6 text-white">
        <h3 className="font-display text-lg font-semibold">Request a quote</h3>
        <p className="mt-1.5 text-sm text-[#c8d9ea]">
          Share your ratings and project details and alfanar will prepare a tailored
          quotation.
        </p>
        <Button
          href="/contact"
          className="mt-4 !bg-white !text-[var(--navy)] hover:!bg-[#eaf2fa]"
        >
          Start a quote <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const tabs = [
    { label: "Overview", content: overviewTab },
    ...(howTab ? [{ label: "How it works", content: howTab }] : []),
    ...(insideTab ? [{ label: "Inside the panel", content: insideTab }] : []),
    ...(techTab ? [{ label: "Technical data", content: techTab }] : []),
    ...(configTab ? [{ label: "Configurations", content: configTab }] : []),
    { label: "Downloads & quote", content: downloadsTab },
  ];

  return (
    <>
      <article className="wrap pt-10">
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" className="mono text-xs text-muted">
          <Link href="/range" className="hover:text-accent">
            The range
          </Link>
          <span className="px-1.5">/</span>
          <span className="text-ink-2">{product.name}</span>
        </nav>

        {/* hero header */}
        <header className="mt-5 flex flex-col gap-4 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <StatusBadge status={product.status} />
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.2rem)] font-bold text-ink">
              {product.name}
            </h1>
            <p className="mt-2 max-w-2xl text-[1.05rem] text-ink-2">{product.tagline}</p>
          </div>
          <div className="flex gap-3">
            {product.datasheet && (
              <Button href={product.datasheet} variant="secondary">
                <DownloadIcon className="h-4 w-4" /> Datasheet
              </Button>
            )}
            <Button href="/contact">Request a quote</Button>
          </div>
        </header>

        {/* headline chips */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <Chip label="Rated voltage" value={product.headline.voltage} />
          <Chip label="Rated current" value={product.headline.current} />
          <Chip label="Short-circuit" value={product.headline.shortCircuit} />
          <Chip label="Classification" value={product.headline.classes} />
          <Chip label="Standard" value={product.headline.standard} />
        </div>

        {/* 3D explorer or notice */}
        <section className="mt-10" aria-label="3D model">
          {product.hasModel ? (
            <ProductViewer3D productName={product.shortName} />
          ) : (
            <div className="rounded-[var(--radius-lg)] border border-dashed border-line bg-panel/40 px-6 py-12 text-center">
              <p className="font-display text-lg font-semibold text-ink">
                Interactive 3D model coming soon
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-2">
                The full {product.name} page with an explorable 3D model is in
                production. Meanwhile, explore the fully-modelled{" "}
                <Link href="/products/alfa-12" className="text-link underline">
                  alfa 12
                </Link>{" "}
                or request details below.
              </p>
            </div>
          )}
        </section>

        {/* tabs */}
        <section className="mt-12">
          <Tabs tabs={tabs} />
        </section>

        {product.note && (
          <p className="mono mt-10 rounded-[var(--radius)] border border-line bg-panel/40 px-4 py-3 text-xs leading-relaxed text-muted">
            {product.note}
          </p>
        )}
      </article>

      {/* related */}
      <section className="wrap mt-20">
        <h2 className="font-display text-xl font-semibold text-ink">Related products</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
