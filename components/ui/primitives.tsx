import { cn } from "@/lib/cn";

export function Chip({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[10px] border border-line bg-surface px-3 py-2",
        className,
      )}
    >
      <div className="mono text-[10px] uppercase tracking-[0.14em] text-muted">{label}</div>
      <div className="mt-0.5 font-display text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}

export function StatusBadge({ status }: { status: "datasheet" | "board" }) {
  const isDatasheet = status === "datasheet";
  return (
    <span
      className={cn(
        "mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider",
        isDatasheet
          ? "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-accent"
          : "bg-[color-mix(in_srgb,var(--gold)_22%,transparent)] text-[#75590f] dark:text-[var(--gold)]",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isDatasheet ? "bg-accent" : "bg-[var(--gold)]",
        )}
      />
      {isDatasheet ? "Datasheet-backed" : "Display board — confirm"}
    </span>
  );
}

export function IndicativeBadge() {
  return (
    <span
      title="Per alfanar display board — confirm against the datasheet"
      className="mono ml-2 inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--gold)_22%,transparent)] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[#75590f] dark:text-[var(--gold)]"
    >
      confirm
    </span>
  );
}

export function SectionHeading({
  index,
  total,
  title,
  intro,
  className,
}: {
  index?: string;
  total?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {index && (
        <div className="mono mb-3 text-xs tracking-[0.16em] text-accent">
          § {index}
          {total ? ` / ${total}` : ""}
        </div>
      )}
      <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold text-ink">
        {title}
      </h2>
      {intro && <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-2">{intro}</p>}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}
