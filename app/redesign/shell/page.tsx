import type { Metadata } from "next";
import { ShellDemo } from "./shell-demo";

export const metadata: Metadata = {
  title: "Khulwa — Application shell",
  description: "Phase 3 review surface for the authenticated workspace shell and navigation.",
};

export default function ShellPage() {
  return <ShellDemo />;
}
