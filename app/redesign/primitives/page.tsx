import type { Metadata } from "next";
import { PrimitivesDemo } from "./primitives-demo";

export const metadata: Metadata = {
  title: "Khulwa — Primitives",
  description: "Phase 2 review surface for the framework-neutral UI boundary.",
};

export default function PrimitivesPage() {
  return <PrimitivesDemo />;
}
