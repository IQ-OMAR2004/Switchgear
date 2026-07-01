"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export function Tabs({ tabs }: { tabs: TabItem[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <div>
      <div
        role="tablist"
        aria-label="Product information"
        className="sticky top-[68px] z-20 -mx-1 flex gap-1 overflow-x-auto border-b border-line bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] px-1 py-2 backdrop-blur"
      >
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.label}
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActive((a) => (a + 1) % tabs.length);
                if (e.key === "ArrowLeft")
                  setActive((a) => (a - 1 + tabs.length) % tabs.length);
              }}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                selected
                  ? "bg-[var(--cta-bg)] text-[var(--cta-fg)]"
                  : "text-ink-2 hover:bg-panel hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          className="pt-8"
        >
          {i === active && tab.content}
        </div>
      ))}
    </div>
  );
}
