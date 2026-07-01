import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";
import { SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Tell alfanar your voltage, current and fault level and the switchgear team will recommend the right alfa panel and prepare a quote.",
};

export default function ContactPage() {
  return (
    <div className="wrap grid gap-10 pt-12 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <SectionHeading title="Request a quote" />
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-2">
          Share your ratings and project details. alfanar&apos;s engineers will
          recommend the right alfa panel — air- or gas-insulated, primary or secondary —
          and prepare a tailored quotation.
        </p>

        <div className="mt-8 space-y-4 text-sm text-ink-2">
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Factory
            </div>
            <p className="mt-1">
              AR 04 Medium-Voltage Switchgear Factory
              <br />
              Riyadh, Kingdom of Saudi Arabia
            </p>
          </div>
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.16em] text-muted">Web</div>
            <a
              href="https://www.alfanar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-link hover:underline"
            >
              www.alfanar.com
            </a>
          </div>
        </div>
      </div>

      <QuoteForm />
    </div>
  );
}
