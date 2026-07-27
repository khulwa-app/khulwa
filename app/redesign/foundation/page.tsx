import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khulwa — Sage Foundation",
  description: "Phase 1 review surface for the Khulwa design foundation.",
};

const sageScale = [
  ["100", "#D5E3D5", "bg-sage-100"],
  ["200", "#B7D1B1", "bg-sage-200"],
  ["300", "#9BC09A", "bg-sage-300"],
  ["400", "#7DA87A", "bg-sage-400"],
  ["500", "#5A8F5B", "bg-sage-500"],
  ["600", "#4E7D4F", "bg-sage-600"],
  ["700", "#3C6B3E", "bg-sage-700"],
  ["800", "#2B5930", "bg-sage-800"],
  ["900", "#1A4722", "bg-sage-900"],
  ["1000", "#0B3515", "bg-sage-1000"],
] as const;

function LeafMark() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M19.7 4.3C13.1 4.7 7.4 7.1 5.2 11.6c-1.6 3.3-.3 6.3 2.5 7.2 3.5 1.2 7-1.2 8.2-4.3.8-2.1.7-4.5.9-6.5-2.7 1.7-5.1 3.7-7 6.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="m9 7 8 5-8 5V7Z" fill="currentColor" />
    </svg>
  );
}

export default function FoundationPage() {
  return (
    <main
      className="khulwa-foundation min-h-dvh px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
      data-theme="khulwa"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-shell border border-sage-300 bg-base-100">
        <header className="flex min-h-16 items-center justify-between border-b border-sage-300 px-5 sm:px-8">
          <div className="flex shrink-0 items-center gap-3 text-sage-1000">
            <span className="grid size-9 place-items-center rounded-full bg-sage-100">
              <LeafMark />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-[-0.01em]">Khulwa</p>
              <p className="whitespace-nowrap text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-sage-700 sm:tracking-[0.16em]">
                Foundation 01
              </p>
            </div>
          </div>
          <span className="badge border-sage-300 bg-sage-100 px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-sage-800">
            <span className="hidden sm:inline">Sage&nbsp;</span>approved
          </span>
        </header>

        <section className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex min-h-[34rem] flex-col justify-between bg-sage-100 p-6 sm:p-10 lg:p-14">
            <div className="max-w-2xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-sage-700">
                Calm structure · deliberate focus
              </p>
              <h1 className="max-w-[13ch] text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-sage-1000">
                Make space for meaningful work.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-sage-800 sm:text-lg sm:leading-8">
                A quieter visual system for focus, reflection, and progress. Soft sage creates
                comfort; deep forest gives every action clarity.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button className="btn btn-primary h-12 min-h-12 rounded-control px-6 shadow-none" type="button">
                <PlayIcon />
                Begin a focus
              </button>
              <button
                className="btn h-12 min-h-12 rounded-control border-sage-400 bg-transparent px-6 text-sage-900 shadow-none hover:border-sage-600 hover:bg-sage-200"
                type="button"
              >
                Choose a space
              </button>
            </div>
          </div>

          <div className="flex min-h-[34rem] flex-col justify-between p-6 sm:p-10 lg:p-12">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">
                  Focus session
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-sage-1000">
                  Deep work
                </h2>
              </div>
              <span className="badge badge-outline border-sage-400 text-sage-800">Today</span>
            </div>

            <div className="my-10 text-center">
              <p className="khulwa-numeric text-[clamp(3.5rem,8vw,6.75rem)] font-medium leading-none tracking-[-0.08em] text-sage-1000">
                24:38
              </p>
              <p className="mt-4 text-sm font-medium text-sage-700">of 45 minutes</p>
              <progress
                aria-label="Focus session progress"
                className="progress progress-primary mt-7 h-2 w-full bg-sage-100"
                max="100"
                value="54"
              />
            </div>

            <div className="rounded-panel border border-sage-300 bg-sage-100/50 p-5">
              <label className="text-xs font-semibold uppercase tracking-[0.14em] text-sage-700" htmlFor="intention">
                Current intention
              </label>
              <input
                className="input mt-3 w-full border-sage-300 bg-base-100 text-sage-900 shadow-none placeholder:text-sage-600"
                defaultValue="Finish the product narrative"
                id="intention"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-sage-300 px-5 py-10 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">
                Typography
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-sage-1000">
                Instrument Sans
              </h2>
              <p className="mt-4 max-w-md leading-7 text-sage-800">
                Clean and composed without feeling clinical. Geist Mono brings precision to
                timers, streaks, and statistics.
              </p>
              <div className="mt-6 flex items-baseline gap-4">
                <span className="khulwa-numeric text-3xl font-medium tracking-[-0.05em] text-sage-1000">
                  07
                </span>
                <span className="text-sm text-sage-700">day focus streak</span>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">
                Serenity scale
              </p>
              <div className="grid grid-cols-2 overflow-hidden rounded-panel border border-sage-300 sm:grid-cols-5">
                {sageScale.map(([step, hex, colorClass]) => (
                  <div className={`${colorClass} min-h-24 p-3`} key={step}>
                    <p
                      className={`text-xs font-semibold ${Number(step) >= 700 ? "text-sage-100" : "text-sage-1000"}`}
                    >
                      {step}
                    </p>
                    <p
                      className={`khulwa-numeric mt-1 text-[0.6875rem] ${Number(step) >= 700 ? "text-sage-200" : "text-sage-800"}`}
                    >
                      {hex}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-sage-300 bg-sage-100/40 px-5 py-5 text-xs text-sage-700 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>Flat color · no gradients · light-first</p>
          <p>Tailwind CSS 4 · DaisyUI 5 · Phase 1</p>
        </footer>
      </div>
    </main>
  );
}
