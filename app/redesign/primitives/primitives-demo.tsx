"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  Drawer,
  EmptyState,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  IconButton,
  Input,
  Menu,
  MenuItem,
  NativeScrollArea,
  Panel,
  PanelBody,
  PanelHeader,
  Pill,
  Progress,
  Select,
  Tabs,
  Textarea,
  Tooltip,
} from "@/components/ui";

function AddMark() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export function PrimitivesDemo() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [message, setMessage] = useState("No action selected yet.");

  return (
    <main className="khulwa-foundation min-h-dvh bg-base-200 px-4 py-4 sm:px-6 sm:py-6 lg:px-8" data-theme="khulwa">
      <div className="mx-auto max-w-6xl rounded-shell border border-sage-300 bg-base-100">
        <header className="flex flex-col gap-5 border-b border-sage-300 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">Phase 2 · application primitives</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-sage-1000 sm:text-5xl">A quiet system for every interaction.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-sage-800">One owned layer keeps controls, overlays, feedback, and accessibility coherent before the feature screens are rebuilt.</p>
          </div>
          <Pill>Preview only</Pill>
        </header>

        <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-2">
          <Panel>
            <PanelHeader>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage-700">Actions</p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-sage-1000">Clear hierarchy</h2>
              </div>
              <Tooltip content="Create a new focus intention">
                <IconButton aria-label="Add focus intention">
                  <AddMark />
                </IconButton>
              </Tooltip>
            </PanelHeader>
            <PanelBody className="grid gap-4">
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => setMessage("Primary action selected.")}>Begin focus</Button>
                <Button onClick={() => setMessage("Secondary action selected.")} tone="secondary">Save draft</Button>
                <Button onClick={() => setMessage("Quiet action selected.")} tone="quiet">Not now</Button>
                <Button onClick={() => setMessage("Destructive action selected.")} tone="danger">Discard</Button>
              </div>
              <p aria-live="polite" className="text-sm text-sage-700">{message}</p>
              <div className="flex flex-wrap gap-2">
                <Badge.Root emphasis="subtle" tone="primary"><Badge.Label>Deep work</Badge.Label></Badge.Root>
                <Pill tone="success">On track</Pill>
                <Pill tone="warning">Needs review</Pill>
              </div>
            </PanelBody>
          </Panel>

          <Panel>
            <PanelHeader>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage-700">Form controls</p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-sage-1000">Visible labels, useful states</h2>
              </div>
            </PanelHeader>
            <PanelBody className="grid gap-4">
              <Field>
                <FieldLabel htmlFor="focus-name" required>Focus intention</FieldLabel>
                <Input defaultValue="Outline the launch story" id="focus-name" />
                <FieldDescription>Use a specific outcome, not a vague category.</FieldDescription>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="focus-length">Length</FieldLabel>
                  <Select defaultValue="45" id="focus-length"><option value="25">25 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option></Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="reflection">Reflection</FieldLabel>
                  <Textarea id="reflection" placeholder="What matters in this session?" />
                </Field>
              </div>
              <label className="flex min-h-11 items-center gap-3 text-sm text-sage-800"><Checkbox defaultChecked /> Start ambient sound</label>
              <FieldError>Example error: choose a focus length before starting.</FieldError>
            </PanelBody>
          </Panel>

          <Panel>
            <PanelHeader>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage-700">Disclosure and overlays</p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-sage-1000">Keyboard-first layers</h2>
              </div>
            </PanelHeader>
            <PanelBody className="flex flex-wrap gap-3">
              <Menu label="Session options" trigger={<Button tone="secondary">Session options</Button>}>
                <MenuItem onSelect={() => setMessage("Session renamed.")}>Rename session</MenuItem>
                <MenuItem onSelect={() => setMessage("Session duplicated.")}>Duplicate session</MenuItem>
                <MenuItem destructive onSelect={() => setMessage("Session discarded.")}>Discard session</MenuItem>
              </Menu>
              <Button onClick={() => setDialogOpen(true)} tone="secondary">Open dialog</Button>
              <Button onClick={() => setDrawerOpen(true)} tone="quiet">Open drawer</Button>
            </PanelBody>
          </Panel>

          <Panel>
            <PanelHeader>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage-700">Feedback and states</p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-sage-1000">Progress without decoration</h2>
              </div>
            </PanelHeader>
            <PanelBody className="grid gap-6">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm"><span className="font-medium text-sage-900">Today&apos;s focus</span><span className="khulwa-numeric text-sage-700">54%</span></div>
                <Progress label="Today's focus progress" value={54} />
              </div>
              <Tabs
                label="Feedback examples"
                items={[
                  { value: "empty", label: "Empty", content: <EmptyState description="Start with one intention and Khulwa will keep the next step visible." title="No sessions yet" action={<Button size="sm">Create a session</Button>} /> },
                  { value: "guidance", label: "Guidance", content: <p className="leading-7 text-sage-800">Keep feedback close to the action, with language that explains what happened and what to do next.</p> },
                ]}
              />
            </PanelBody>
          </Panel>
        </div>

        <section className="border-t border-sage-300 p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">Native scroll behavior</p>
          <NativeScrollArea className="mt-4 h-32 rounded-panel border border-sage-300 bg-sage-100 p-4">
            <p className="leading-7 text-sage-800">This area uses the browser&apos;s native scrolling behavior, avoiding a library-owned scroll implementation. It remains a normal, accessible scroll region while the new visual system supplies the surrounding structure.</p>
            <p className="mt-6 leading-7 text-sage-800">Extra content confirms the region has a real overflow path without a nested visual scrollbar treatment.</p>
          </NativeScrollArea>
        </section>
      </div>

      <Dialog onOpenChange={setDialogOpen} open={dialogOpen} title="A focused confirmation">
        <p className="leading-7 text-sage-800">The native dialog manages focus and Escape dismissal. This is the standard base for confirmations and short decisions.</p>
        <div className="mt-6 flex justify-end gap-3"><Button onClick={() => setDialogOpen(false)} tone="quiet">Cancel</Button><Button onClick={() => setDialogOpen(false)}>Continue</Button></div>
      </Dialog>

      <Drawer onOpenChange={setDrawerOpen} open={drawerOpen} title="Session details">
        <p className="leading-7 text-sage-800">This side sheet is reserved for secondary detail and configuration. It gives the task itself more room than a full navigation change.</p>
      </Drawer>
    </main>
  );
}
