"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronsUpDown,
  CloudUpload,
  Lock,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { STEPS } from "@/lib/onboardingValidation";

type SavedState = "idle" | "saving" | "saved";

interface StepSidebarProps {
  currentIndex: number;
  completedSteps: boolean[];
  furthest: number;
  onStepClick: (index: number) => void;
  savedState: SavedState;
}

interface StageDef {
  label: string;
  substeps: string[];
}

const STAGES: StageDef[] = [
  {
    label: "Company",
    substeps: ["Company identity", "Organization", "Financials"],
  },
  {
    label: "Operations",
    substeps: ["Locations", "Facilities", "Vehicles", "Energy"],
  },
  { label: "Compliance", substeps: [] },
  { label: "Data", substeps: [] },
  { label: "Emissions", substeps: [] },
  { label: "Value chain", substeps: [] },
  { label: "Team", substeps: [] },
];

function SavedBadge({ state }: { state: SavedState }) {
  if (state === "idle") return null;
  return (
    <motion.span
      key={state}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/80 px-2.5 py-1 text-xs font-medium text-muted-foreground"
    >
      {state === "saving" ? (
        <CloudUpload className="size-3.5 animate-pulse" />
      ) : (
        <Check className="size-3.5 text-primary" strokeWidth={3} />
      )}
      {state === "saving" ? "Saving…" : "Saved"}
    </motion.span>
  );
}

interface ProgressState {
  done: number;
  total: number;
  pct: number;
}

function computeProgress(completedSteps: boolean[]): ProgressState {
  const total = STEPS.length;
  const done = completedSteps.filter(Boolean).length;
  return { done, total, pct: Math.round((done / total) * 100) };
}

function ProgressHeader({ done, total }: Pick<ProgressState, "done" | "total">) {
  const pct = Math.round((done / total) * 100);
  return (
    <div className="px-4 pt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          Workspace setup
        </h2>
        <span className="text-xs font-semibold tabular-nums text-foreground">
          {pct}%
        </span>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {total} sections · {done} of {total} complete
      </p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

interface StageRowProps {
  index: number;
  stage: StageDef;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  isLast: boolean;
  onSelect: () => void;
}

function StageRow({
  index,
  stage,
  isCompleted,
  isCurrent,
  isLocked,
  isLast,
  onSelect,
}: StageRowProps) {
  return (
    <li className="flex gap-3">
      <div className="flex w-6 shrink-0 flex-col items-center">
        <span
          className={cn(
            "relative z-10 flex size-6 items-center justify-center rounded-full border-2 bg-background transition-colors duration-300",
            isCompleted && "border-emerald-500 bg-emerald-500 text-white",
            isCurrent &&
              "border-primary bg-primary text-white shadow-[0_0_0_4px_rgba(99,91,255,0.15)]",
            isLocked && "border-border text-muted-foreground/50",
            !isCurrent &&
              !isCompleted &&
              !isLocked &&
              "border-border text-muted-foreground"
          )}
        >
          {isCompleted ? (
            <Check className="size-3.5" strokeWidth={3} />
          ) : (
            <span className="text-[0.6875rem] font-semibold leading-none">
              {index + 1}
            </span>
          )}
          {isCurrent && (
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-primary/20"
            />
          )}
        </span>
        {!isLast && (
          <span
            className={cn(
              "mt-2 w-px flex-1 bg-border transition-colors duration-300",
              isCompleted && "bg-emerald-500/60",
              isCurrent && "bg-primary/50"
            )}
          />
        )}
      </div>

      <div className="min-w-0 flex-1 pb-5">
        {isCurrent ? (
          <div
            aria-current="step"
            className="flex w-full items-center justify-between gap-2 rounded-lg bg-accent-muted px-2.5 py-2"
          >
            <span className="truncate text-[0.875rem] font-semibold text-primary">
              {stage.label}
            </span>
            {stage.substeps.length > 0 && (
              <ChevronDown className="size-4 shrink-0 text-primary" />
            )}
          </div>
        ) : (
          <button
            type="button"
            disabled={isLocked}
            onClick={onSelect}
            className={cn(
              "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
              isCompleted && "cursor-pointer hover:bg-muted/70",
              isLocked && "cursor-default"
            )}
          >
            <span
              className={cn(
                "truncate text-[0.875rem] font-medium",
                isCompleted ? "text-foreground" : "text-muted-foreground/70"
              )}
            >
              {stage.label}
            </span>
            {isLocked ? (
              <Lock className="size-3.5 shrink-0 text-muted-foreground/40" />
            ) : (
              isCompleted && (
                <Check
                  className="size-3.5 shrink-0 text-emerald-500"
                  strokeWidth={3}
                />
              )
            )}
          </button>
        )}

        <AnimatePresence initial={false}>
          {isCurrent && stage.substeps.length > 0 && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-1.5 space-y-0.5 border-l-2 border-primary/15 pl-3">
                {stage.substeps.map((s) => (
                  <li key={s} className="flex items-center gap-2 py-1">
                    <span className="size-1 shrink-0 rounded-full bg-primary/50" />
                    <span className="truncate text-[0.8125rem] text-muted-foreground">
                      {s}
                    </span>
                  </li>
                ))}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

interface TimelineProps {
  currentIndex: number;
  completedSteps: boolean[];
  furthest: number;
  onStepClick: (index: number) => void;
}

function StageTimeline({
  currentIndex,
  completedSteps,
  furthest,
  onStepClick,
}: TimelineProps) {
  return (
    <ol className="flex flex-col">
      {STAGES.map((stage, i) => (
        <StageRow
          key={stage.label}
          index={i}
          stage={stage}
          isCompleted={completedSteps[i]}
          isCurrent={currentIndex === i}
          isLocked={i > furthest}
          isLast={i === STAGES.length - 1}
          onSelect={() => onStepClick(i)}
        />
      ))}
    </ol>
  );
}

function BrandLink({ compact }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
        compact && "gap-2"
      )}
      aria-label="CarbonSynq home"
    >
      <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
        <Sparkles className="size-4" />
      </span>
      <span className="text-[0.9375rem] font-bold tracking-tight text-foreground">
        CarbonSynq
      </span>
      <span className="hidden rounded-full border border-border bg-muted px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-muted-foreground sm:inline">
        Setup
      </span>
    </Link>
  );
}

function DesktopSidebar({
  currentIndex,
  completedSteps,
  furthest,
  onStepClick,
  savedState,
}: StepSidebarProps) {
  const progress = computeProgress(completedSteps);
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[300px] flex-col border-r border-border bg-background lg:flex">
      <div className="flex h-16 shrink-0 items-center border-b border-border px-5">
        <BrandLink />
      </div>

      <div className="shrink-0 border-b border-border">
        <ProgressHeader done={progress.done} total={progress.total} />
      </div>

      <nav className="custom-scrollbar flex-1 overflow-y-auto px-3 pb-4 pt-5">
        <StageTimeline
          currentIndex={currentIndex}
          completedSteps={completedSteps}
          furthest={furthest}
          onStepClick={onStepClick}
        />
      </nav>

      <div className="flex shrink-0 items-center justify-between border-t border-border px-5 py-3.5">
        <span className="text-xs text-muted-foreground">
          Autosaved to browser
        </span>
        <SavedBadge state={savedState} />
      </div>
    </aside>
  );
}

function MobileExperience({
  currentIndex,
  completedSteps,
  furthest,
  onStepClick,
  savedState,
}: StepSidebarProps) {
  const [open, setOpen] = React.useState(false);
  const progress = computeProgress(completedSteps);
  const isReview = currentIndex >= STAGES.length;
  const stageLabel = isReview ? null : STAGES[currentIndex]?.label ?? null;
  const stepLine = isReview
    ? "Review & finish"
    : `Step ${currentIndex + 1} of ${STAGES.length} · ${stageLabel}`;

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl lg:hidden">
        <div className="flex h-14 items-center justify-between gap-3 px-4">
          <BrandLink compact />
          <SavedBadge state={savedState} />
        </div>
        <div className="px-4 pb-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-secondary/70 px-3.5 py-2.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
          >
            <span className="flex flex-col">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
                {stepLine}
              </span>
              <span className="text-[0.8125rem] font-semibold text-foreground">
                Tap to open progress
              </span>
            </span>
            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
          </button>
          <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={false}
              animate={{ width: `${progress.pct}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-2xl border-t border-border bg-background shadow-2xl lg:hidden"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    Workspace setup
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {progress.pct}% complete
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close progress"
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="custom-scrollbar flex-1 overflow-y-auto px-3 py-4">
                <StageTimeline
                  currentIndex={currentIndex}
                  completedSteps={completedSteps}
                  furthest={furthest}
                  onStepClick={(i) => {
                    onStepClick(i);
                    setOpen(false);
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function StepSidebar(props: StepSidebarProps) {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileExperience {...props} />
    </>
  );
}
