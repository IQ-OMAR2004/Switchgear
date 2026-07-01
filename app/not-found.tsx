import { Button } from "@/components/ui/button";
import { BeaconMark } from "@/components/beacon-mark";

export default function NotFound() {
  return (
    <div className="wrap grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <BeaconMark className="mx-auto h-12 w-12 text-accent" />
        <h1 className="mt-5 font-display text-4xl font-bold text-ink">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-2">
          The page you&apos;re looking for has been racked out. Let&apos;s get you back to
          a live circuit.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/range" variant="secondary">
            The range
          </Button>
        </div>
      </div>
    </div>
  );
}
