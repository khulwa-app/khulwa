export function SpaceBackground({ tone = "bone" }: { tone?: "bone" | "night" | "juniper" }) {
  return <div aria-hidden className={tone === "night" ? "absolute inset-0 bg-sage-1000" : tone === "juniper" ? "absolute inset-0 bg-sage-800" : "absolute inset-0 bg-base-200"} />;
}
