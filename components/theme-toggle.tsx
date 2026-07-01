"use client";

import { useTheme } from "@/components/theme-provider";
import { MoonIcon, SunIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={mounted ? isDark : undefined}
      title={isDark ? "Light mode" : "Dark mode"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent",
        className,
      )}
    >
      {/* render both, reveal by theme, to avoid hydration flash */}
      <SunIcon className={cn("h-[18px] w-[18px]", isDark ? "block" : "hidden")} />
      <MoonIcon className={cn("h-[18px] w-[18px]", isDark ? "hidden" : "block")} />
    </button>
  );
}
