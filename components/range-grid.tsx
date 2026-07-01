"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/cn";

type FamilyFilter = "all" | "primary" | "secondary" | "device";
type InsulationFilter = "all" | "air" | "gas";

const FAMILY: { key: FamilyFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "device", label: "Device" },
];
const INSULATION: { key: InsulationFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "air", label: "Air-insulated" },
  { key: "gas", label: "Gas-insulated" },
];

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="mono mr-1 text-[11px] uppercase tracking-wider text-muted">{label}</span>
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          aria-pressed={value === o.key}
          onClick={() => onChange(o.key)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            value === o.key
              ? "border-transparent bg-[var(--cta-bg)] text-[var(--cta-fg)]"
              : "border-line text-ink-2 hover:border-accent hover:text-accent",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function RangeGrid({ products }: { products: Product[] }) {
  const [family, setFamily] = useState<FamilyFilter>("all");
  const [insulation, setInsulation] = useState<InsulationFilter>("all");

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (family === "all" || p.family === family) &&
          (insulation === "all" || p.insulation === insulation),
      ),
    [products, family, insulation],
  );

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
        <FilterRow label="Family" options={FAMILY} value={family} onChange={setFamily} />
        <FilterRow
          label="Insulation"
          options={INSULATION}
          value={insulation}
          onChange={setInsulation}
        />
      </div>

      <div aria-live="polite">
        <p className="sr-only">{filtered.length} products match the current filters.</p>
        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-muted">
            No products match these filters.
          </p>
        )}
      </div>
    </div>
  );
}
