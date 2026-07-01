import Link from "next/link";
import type { Product } from "@/data/products";
import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/cn";

const FAMILY_LABEL: Record<Product["family"], string> = {
  primary: "Primary",
  secondary: "Secondary",
  device: "Device",
};

export function ProductCard({ product }: { product: Product }) {
  const { slug, name, tagline, family, insulation, headline, hasModel, status } = product;
  return (
    <Link
      href={`/products/${slug}`}
      className="group relative flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_40px_-22px_rgba(var(--shadow-color),0.6)]"
    >
      <div className="flex items-center gap-2">
        <span className="mono rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
          {FAMILY_LABEL[family]}
        </span>
        <span className="mono rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
          {insulation === "air" ? "Air-insulated" : "Gas-insulated"}
        </span>
        {status === "board" && (
          <span
            title="Per alfanar display board — confirm against the datasheet"
            className="mono rounded-full bg-[color-mix(in_srgb,var(--gold)_22%,transparent)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#75590f] dark:text-[var(--gold)]"
          >
            Board · confirm
          </span>
        )}
        {hasModel && (
          <span className="mono ml-auto rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent">
            3D
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-xl font-semibold text-ink">{name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{tagline}</p>

      <dl className="mono mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
        {[
          { k: "Voltage", v: headline.voltage },
          { k: "Current", v: headline.current.split(" · ")[0] ?? headline.current },
          { k: "Fault", v: headline.shortCircuit },
        ].map((s) => (
          <div key={s.k}>
            <dt className="text-[9px] uppercase tracking-wider text-muted">{s.k}</dt>
            <dd className="mt-0.5 text-[0.78rem] font-medium text-ink">{s.v}</dd>
          </div>
        ))}
      </dl>

      <div
        className={cn(
          "mt-4 flex items-center gap-1.5 text-sm font-medium",
          status === "datasheet" ? "text-link" : "text-muted",
        )}
      >
        <span className="text-accent transition-colors group-hover:text-accent">
          {hasModel ? "Explore in 3D" : "View details"}
        </span>
        <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
