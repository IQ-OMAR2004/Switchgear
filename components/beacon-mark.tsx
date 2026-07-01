import { cn } from "@/lib/cn";
import { withBase } from "@/lib/base-path";

/**
 * The alfanar beacon — a restrained lighthouse / beam motif.
 * "alfanar" means "the lighthouse"; the mark pairs a beam of light with
 * faint beacon rings. Uses currentColor so it inherits text colour.
 */
export function BeaconMark({
  className,
  title = "alfanar beacon",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label={title}
      className={cn("h-7 w-7", className)}
    >
      {/* beacon rings */}
      <circle cx="16" cy="13" r="11" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.2" />
      <circle cx="16" cy="13" r="7" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1.2" />
      {/* beam */}
      <path d="M16 13 L29 7 L29 19 Z" fill="currentColor" fillOpacity="0.16" />
      {/* tower */}
      <path
        d="M13.4 30 L14.4 16.5 H17.6 L18.6 30 Z"
        fill="currentColor"
      />
      {/* light */}
      <circle cx="16" cy="13" r="3.1" fill="currentColor" />
      <circle cx="16" cy="13" r="3.1" fill="#E8B23A" fillOpacity="0.9" />
    </svg>
  );
}

/**
 * Full lockup using alfanar's OFFICIAL logo (globe + lowercase wordmark),
 * exactly as shown in the brand book: the blue lockup on light surfaces and
 * the reversed white lockup on dark — self-hosted from /public/brand.
 * A "MV Switchgear" division descriptor follows the master brand.
 */
export function Wordmark({
  className,
  showSub = true,
}: {
  className?: string;
  showSub?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBase("/brand/alfanar-logo-blue.svg")}
        alt="alfanar"
        className="block h-8 w-auto dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBase("/brand/alfanar-logo-white.svg")}
        alt="alfanar"
        className="hidden h-8 w-auto dark:block"
      />
      {showSub && (
        <span className="hidden items-center gap-2.5 sm:flex">
          <span className="h-5 w-px bg-line-strong" aria-hidden />
          <span className="mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
            MV Switchgear
          </span>
        </span>
      )}
    </span>
  );
}
