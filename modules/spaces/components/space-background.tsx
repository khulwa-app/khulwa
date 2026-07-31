/** Static Deep Juniper environment — no animated blur fields, nothing repainting during a session. */
export function SpaceBackground() {
  return <div aria-hidden className="bg-environment pointer-events-none absolute inset-0 z-0" />;
}
