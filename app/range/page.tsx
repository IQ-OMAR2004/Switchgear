import type { Metadata } from "next";
import { RangeGrid } from "@/components/range-grid";
import { SectionHeading } from "@/components/ui/primitives";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "The range",
  description:
    "Browse alfanar's alfa medium-voltage switchgear range — primary air- and gas-insulated panels and secondary ring-main units, with headline ratings.",
};

export default function RangePage() {
  return (
    <div className="wrap pt-12">
      <SectionHeading
        index="01"
        total="04"
        title="The alfa MV switchgear range"
        intro="From the air-insulated alfa 12 workhorse to the gas-insulated alfa GSF6 and the secondary alfa R ring-main unit. Filter by family and insulation; figures shown on display boards are flagged for confirmation."
      />
      <div className="mt-9">
        <RangeGrid products={PRODUCTS} />
      </div>
    </div>
  );
}
