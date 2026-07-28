import type { Metadata } from "next";
import { HomeDemo } from "./home-demo";

export const metadata: Metadata = {
  title: "Riwaq — Home workspace",
  description: "Phase 4 review surface for the redesigned Home workspace.",
};

export default function HomePage() {
  return <HomeDemo />;
}
