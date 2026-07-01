"use client";

import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type State = "idle" | "submitting" | "success" | "error";

const field =
  "w-full rounded-[10px] border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:border-accent focus-visible:outline-none";
const labelCls = "mb-1.5 block text-sm font-medium text-ink-2";

export function QuoteForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // honeypot
    if (data["company_website"]) return;

    if (!data.name || !data.email) {
      setError("Please provide your name and email.");
      setState("error");
      return;
    }

    setState("submitting");
    setError(null);

    const endpoint = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT;
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // no endpoint configured — simulate success in this demo build
        await new Promise((r) => setTimeout(r, 700));
      }
      setState("success");
      form.reset();
    } catch {
      setError("Something went wrong sending your request. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-accent">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l4 4L19 6" />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">Request received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-2">
          Thank you — alfanar&apos;s switchgear team will be in touch. (This is a
          demonstration build; no message was actually sent unless a quote endpoint is
          configured.)
        </p>
        <Button onClick={() => setState("idle")} variant="secondary" className="mt-5">
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-8">
      {/* honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="name">
            Full name <span className="text-danger">*</span>
          </label>
          <input id="name" name="name" required className={field} placeholder="Jane Engineer" />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">
            Email <span className="text-danger">*</span>
          </label>
          <input id="email" name="email" type="email" required className={field} placeholder="jane@utility.com" />
        </div>
        <div>
          <label className={labelCls} htmlFor="company">
            Company / organisation
          </label>
          <input id="company" name="company" className={field} placeholder="National Utility Co." />
        </div>
        <div>
          <label className={labelCls} htmlFor="product">
            Product of interest
          </label>
          <select id="product" name="product" className={field} defaultValue="alfa-12">
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
            <option value="not-sure">Not sure — please advise</option>
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="voltage">
            Rated voltage
          </label>
          <input id="voltage" name="voltage" className={field} placeholder="e.g. 13.8 kV" />
        </div>
        <div>
          <label className={labelCls} htmlFor="current">
            Rated current
          </label>
          <input id="current" name="current" className={field} placeholder="e.g. 1250 A" />
        </div>
        <div>
          <label className={labelCls} htmlFor="fault">
            Fault level
          </label>
          <input id="fault" name="fault" className={field} placeholder="e.g. 31.5 kA / 3 s" />
        </div>
        <div>
          <label className={labelCls} htmlFor="quantity">
            Quantity (panels)
          </label>
          <input id="quantity" name="quantity" type="number" min={1} className={field} placeholder="e.g. 8" />
        </div>
      </div>

      <div className="mt-5">
        <label className={labelCls} htmlFor="message">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={cn(field, "resize-y")}
          placeholder="Tell us about the substation, environment and timeline."
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-6 flex items-center gap-4">
        <Button type="submit" size="lg" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending…" : "Send request"}
        </Button>
        <p className="text-xs text-muted">
          We&apos;ll only use your details to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}
