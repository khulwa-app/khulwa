import { Bell, Check, Loader2, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { Progress } from "@/components/shadcn/progress";
import { Slider } from "@/components/shadcn/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";

/**
 * Review-gate surface for the Nocturne foundation: palette, typography, icon scale, fields,
 * buttons, and surface hierarchy in one place. Not part of the product navigation.
 */

const SURFACES = [
  { name: "Canvas", value: "#080B0A", className: "bg-canvas" },
  { name: "Surface", value: "#101513", className: "bg-surface" },
  { name: "Surface elevated", value: "#1B2320", className: "bg-surface-elevated" },
  { name: "Surface interactive", value: "#232C28", className: "bg-surface-interactive" },
  { name: "Border", value: "#343C38", className: "bg-border" },
  { name: "Border strong", value: "#56615B", className: "bg-border-strong" },
];

const ACCENTS = [
  { name: "Primary action", value: "#7FA08D", className: "bg-primary" },
  { name: "Primary hover", value: "#90B19D", className: "bg-primary-hover" },
  { name: "Focus ring", value: "#90B19D", className: "bg-ring" },
  { name: "Success", value: "#6BC49A", className: "bg-success" },
  { name: "Warning", value: "#D6B071", className: "bg-warning" },
  { name: "Danger", value: "#D97A78", className: "bg-destructive" },
];

const TYPE_SAMPLES = [
  { label: "Marketing heading / 700", className: "text-4xl font-bold tracking-tight" },
  { label: "Page heading / 600", className: "text-2xl font-semibold" },
  { label: "Panel title / 600 · 14px", className: "text-sm font-semibold" },
  { label: "Control label / 500", className: "text-sm font-medium" },
  { label: "Supporting text / 400", className: "text-sm font-normal text-foreground-secondary" },
  { label: "Metadata / 400", className: "text-xs font-normal text-foreground-muted" },
];

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {hint ? <p className="text-xs text-foreground-muted">{hint}</p> : null}
      </div>
      {children}
    </section>
  );
}

export default function FoundationsPage() {
  return (
    <main className="bg-environment min-h-dvh font-sans text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16">
        <header className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-[0.18em] text-foreground-muted uppercase">Foundation</p>
          <h1 className="text-4xl font-bold tracking-tight">Nocturne</h1>
          <p className="max-w-xl text-sm text-foreground-secondary">
            A near-achromatic dark field with a single sage accent. Manrope Variable, Lucide at 18px, and shadcn
            primitives at native geometry.
          </p>
        </header>

        <Section title="Surfaces" hint="Neutrals carry the interface; elevation reads through luminance, not lines.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SURFACES.map((swatch) => (
              <div key={swatch.name} className="overflow-hidden rounded-lg border border-border">
                <div className={`h-16 ${swatch.className}`} />
                <div className="flex flex-col gap-0.5 bg-surface px-3 py-2">
                  <span className="text-xs font-medium">{swatch.name}</span>
                  <span className="text-xs text-foreground-muted tabular">{swatch.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Accent and state" hint="One hue only. Sage marks anything interactive; status colours stay exceptions.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ACCENTS.map((swatch) => (
              <div key={swatch.name} className="overflow-hidden rounded-lg border border-border">
                <div className={`h-16 ${swatch.className}`} />
                <div className="flex flex-col gap-0.5 bg-surface px-3 py-2">
                  <span className="text-xs font-medium">{swatch.name}</span>
                  <span className="text-xs text-foreground-muted tabular">{swatch.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography" hint="Manrope Variable, 400–700. 800 and 900 stay out of the application shell.">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
            {TYPE_SAMPLES.map((sample) => (
              <div key={sample.label} className="flex flex-col gap-1">
                <span className="text-xs text-foreground-muted">{sample.label}</span>
                <span className={sample.className}>Focus without friction</span>
              </div>
            ))}
            <div className="flex flex-col gap-1 border-t border-border pt-4">
              <span className="text-xs text-foreground-muted">Timer / 600 tabular</span>
              <span className="tabular text-7xl font-semibold">24:00</span>
            </div>
          </div>
        </Section>

        <Section title="Button variants" hint="Six variants, four text sizes, four icon sizes.">
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-6">
            <Button>
              <Sparkles />
              Begin focus
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>
              <Loader2 className="animate-spin motion-reduce:animate-none" />
              Working
            </Button>
            <Button size="icon" aria-label="Add task">
              <Plus />
            </Button>
            <Button size="icon" variant="ghost" aria-label="Notifications">
              <Bell />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-6">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </Section>

        <Section
          title="Button shape"
          hint="Pill is the default because a button is content-sized. A button stretched to fill its container must opt out with shape=&quot;rounded&quot;."
        >
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Content-sized · pill</Button>
              <Button variant="secondary">Also pill</Button>
            </div>
            <Button shape="rounded" className="w-full justify-start">
              Stretched to fill · shape=&quot;rounded&quot;
            </Button>
          </div>
        </Section>

        <Section title="Fields" hint="Tab through to check the focus ring: 3px sage at 50%, plus a solid ring border.">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="foundations-input">
                Task title
              </label>
              <Input id="foundations-input" placeholder="Write the audit summary" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="foundations-textarea">
                Note
              </label>
              <Textarea id="foundations-textarea" placeholder="Anything worth remembering after this session" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="foundations-invalid">
                Invalid state
              </label>
              <Input id="foundations-invalid" aria-invalid defaultValue="not-an-email" />
            </div>
          </div>
        </Section>

        <Section title="Controls" hint="Progress and slider render on surface, never on a blurred field.">
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6">
            <Progress value={62} />
            <Slider defaultValue={[45]} max={100} step={1} aria-label="Master volume" />
            <Tabs defaultValue="focus">
              <TabsList>
                <TabsTrigger value="focus">Focus</TabsTrigger>
                <TabsTrigger value="short">Short Break</TabsTrigger>
                <TabsTrigger value="long">Long Break</TabsTrigger>
              </TabsList>
              <TabsContent value="focus" className="pt-3 text-sm text-foreground-secondary">
                Break phases stay inside the Focus stage.
              </TabsContent>
              <TabsContent value="short" className="pt-3 text-sm text-foreground-secondary">
                Short Break reuses the same stage with a phase label.
              </TabsContent>
              <TabsContent value="long" className="pt-3 text-sm text-foreground-secondary">
                Long Break reuses the same stage with a phase label.
              </TabsContent>
            </Tabs>
          </div>
        </Section>

        <Section
          title="Shape and elevation"
          hint="Pill direction: anything you operate is fully rounded, anything that holds content keeps the radius scale."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface p-5 shadow-panel">
              <p className="text-sm font-semibold">Container · 20px</p>
              <p className="mt-1 text-xs text-foreground-muted">rounded-xl · shadow-panel</p>
              <div className="mt-4 rounded-full bg-surface-elevated px-4 py-2 text-xs">Row · pill</div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5 shadow-dock">
              <p className="text-sm font-semibold">Controls · pill</p>
              <p className="mt-1 text-xs text-foreground-muted">rounded-full · shadow-dock</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-[18px]" />
                </span>
                <span className="flex size-9 items-center justify-center rounded-full bg-surface-elevated text-foreground-secondary">
                  <Sparkles className="size-[18px]" />
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="text-sm font-semibold">Icon scale</p>
              <p className="mt-1 text-xs text-foreground-muted">16 · 18 · 20px, Lucide only</p>
              <div className="mt-4 flex items-end gap-4 text-foreground-secondary">
                <Sparkles className="size-4" />
                <Sparkles className="size-[18px]" />
                <Sparkles className="size-5" />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
