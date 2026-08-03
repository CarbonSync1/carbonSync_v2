"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { StepSidebar } from "./StepSidebar";
import { StepShell } from "./StepShell";
import { ReviewScreen } from "./ReviewScreen";
import { WorkspaceReady } from "./WorkspaceReady";
import { CompanyIdentityStep } from "./steps/CompanyIdentityStep";
import { LocationsOperationsStep } from "./steps/LocationsOperationsStep";
import { ReportingComplianceStep } from "./steps/ReportingComplianceStep";
import { DataIntegrationsStep } from "./steps/DataIntegrationsStep";
import { EmissionsProfileStep } from "./steps/EmissionsProfileStep";
import { ValueChainStep } from "./steps/ValueChainStep";
import { StrategyTeamStep } from "./steps/StrategyTeamStep";
import {
  EMPTY_ONBOARDING,
  clearOnboarding,
  loadOnboarding,
  saveOnboarding,
} from "@/lib/onboardingStorage";
import { STEP_INDEX, STEPS, validateStep } from "@/lib/onboardingValidation";
import type { OnboardingData, OnboardingKey, StepId } from "@/types/onboarding";

const SCREEN_COUNT = STEPS.length; // 7 steps, index 7 = review, 8 = done

const STEP_META: Record<StepId, { title: string; description: string }> = {
  company: {
    title: "Tell us about your company",
    description:
      "A few details about your legal entity and size. This anchors every report we produce for you.",
  },
  locations: {
    title: "Where do you operate?",
    description:
      "Your physical footprint — facilities, countries and fleet — drives most of your direct emissions.",
  },
  reporting: {
    title: "What are you reporting for?",
    description:
      "Frameworks, deadlines and audiences shape the reports, templates and evidence trails we configure.",
  },
  integrations: {
    title: "Where does your data live?",
    description:
      "Tell us about the systems you already use so we can wire them up. Nothing here is required to start.",
  },
  emissions: {
    title: "Your emissions profile",
    description:
      "The fuels and energy you consume determine which activity factors we apply from day one.",
  },
  valueChain: {
    title: "Who else is in your footprint?",
    description:
      "Value chain categories cover suppliers, travel, logistics, cloud and product flows.",
  },
  strategy: {
    title: "Your targets and your team",
    description:
      "Set ambition and bring colleagues in — we'll tailor dashboards and alerts to match.",
  },
};

const STEP_EYEBROW: Record<StepId, string> = {
  company: "Step 1 of 7 · Company identity",
  locations: "Step 2 of 7 · Locations & operations",
  reporting: "Step 3 of 7 · Reporting & compliance",
  integrations: "Step 4 of 7 · Data & integrations",
  emissions: "Step 5 of 7 · Emissions profile",
  valueChain: "Step 6 of 7 · Value chain",
  strategy: "Step 7 of 7 · Strategy & team",
};

type SavedState = "idle" | "saving" | "saved";

export function OnboardingWizard() {
  const router = useRouter();

  const [data, setData] = React.useState<OnboardingData>(() => {
    const saved = loadOnboarding();
    return saved?.data ?? EMPTY_ONBOARDING;
  });
  const [index, setIndex] = React.useState<number>(() => {
    const saved = loadOnboarding();
    if (!saved?.data) return 0;
    if (saved.finished) return SCREEN_COUNT + 1;
    return saved.currentStep ? Math.min(STEP_INDEX[saved.currentStep], SCREEN_COUNT) : 0;
  });
  const [direction, setDirection] = React.useState(1);
  const [completed, setCompleted] = React.useState<boolean[]>(() => {
    const saved = loadOnboarding();
    if (!saved?.data) return STEPS.map(() => false);
    if (saved.finished === true) return STEPS.map(() => true);
    return STEPS.map(
      (step) => saved.completedSteps?.includes(step.id) ?? false
    );
  });
  const [furthest, setFurthest] = React.useState<number>(() => {
    const saved = loadOnboarding();
    if (!saved?.data) return 0;
    if (saved.finished) return SCREEN_COUNT;
    return saved.currentStep ? Math.max(0, Math.min(STEP_INDEX[saved.currentStep], SCREEN_COUNT)) : 0;
  });
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [savedState, setSavedState] = React.useState<SavedState>("idle");
  const [submitting, setSubmitting] = React.useState(false);

  const currentStepId = index < SCREEN_COUNT ? STEPS[index].id : null;
  const isReview = index === SCREEN_COUNT;
  const isDone = index === SCREEN_COUNT + 1;

  const markDirty = React.useCallback(() => setSavedState("saving"), []);

  React.useEffect(() => {
    const t = window.setTimeout(() => {
      saveOnboarding({
        data,
        currentStep: currentStepId ?? STEPS[0].id,
        completedSteps: STEPS.filter((_, i) => completed[i]).map((s) => s.id),
        ...(isDone ? { finished: true as const } : {}),
      });
      setSavedState("saved");
      const reset = window.setTimeout(() => setSavedState("idle"), 1800);
      return () => window.clearTimeout(reset);
    }, 450);
    return () => window.clearTimeout(t);
  }, [data, completed, index, currentStepId, isDone]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  const update = React.useCallback(
    <K extends OnboardingKey>(
      group: K,
      patch: Partial<OnboardingData[K]>
    ) => {
      markDirty();
      setData((prev) => ({ ...prev, [group]: { ...prev[group], ...patch } }));
    },
    [markDirty]
  );

  const errors = React.useMemo(
    () => (currentStepId ? validateStep(currentStepId, data) : {}),
    [currentStepId, data]
  );

  const err = React.useCallback(
    (field: string) =>
      errors[field] && touched[field] ? errors[field] : undefined,
    [errors, touched]
  );

  const touch = React.useCallback((field: string) => {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  }, []);

  const goTo = (next: number, dir: number) => {
    markDirty();
    setDirection(dir);
    setIndex(next);
    setFurthest((f) => Math.max(f, next));
    setTouched({});
  };

  const handleContinue = () => {
    if (currentStepId && index < SCREEN_COUNT) {
      const stepErrors = validateStep(currentStepId, data);
      if (Object.keys(stepErrors).length > 0) {
        setTouched(Object.fromEntries(Object.keys(stepErrors).map((k) => [k, true])));
        return;
      }
      setCompleted((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    }
    goTo(index + 1, 1);
  };

  const handleBack = () => {
    if (index === 0) return;
    goTo(index - 1, -1);
  };

  const handleEdit = (step: StepId) => {
    goTo(STEP_INDEX[step], -1);
  };

  const handleComplete = () => {
    markDirty();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setCompleted(STEPS.map(() => true));
      saveOnboarding({
        data,
        currentStep: "strategy",
        completedSteps: STEPS.map((s) => s.id),
        finished: true,
      });
      setIndex(SCREEN_COUNT + 1);
    }, 900);
  };

  const enterDashboard = () => {
    clearOnboarding();
    router.push("/dashboard");
  };

  if (isDone) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <WorkspaceReady
          brandName={data.company.brandName || data.company.legalName}
          onEnterDashboard={enterDashboard}
          onInvite={enterDashboard}
        />
      </div>
    );
  }

  if (isReview) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <StepSidebar
          currentIndex={STEPS.length}
          completedSteps={completed}
          furthest={furthest}
          onStepClick={(i) => goTo(i, -1)}
          savedState={savedState}
        />
        <main className="lg:pl-[300px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ReviewScreen
                data={data}
                completedSteps={completed}
                onEdit={handleEdit}
                onBack={handleBack}
                onComplete={handleComplete}
                submitting={submitting}
              />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  }

  const meta = STEP_META[currentStepId!];
  const stepIndex = index + 1;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StepSidebar
        currentIndex={index}
        completedSteps={completed}
        furthest={furthest}
        onStepClick={(i) => goTo(i, i > index ? 1 : -1)}
        savedState={savedState}
      />

      <main className="lg:pl-[300px]">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepShell
              eyebrow={STEP_EYEBROW[currentStepId!]}
              title={meta.title}
              description={meta.description}
              showBack={index > 0}
              onBack={handleBack}
              onContinue={handleContinue}
              continueLabel={stepIndex === SCREEN_COUNT ? "Review setup" : "Continue"}
            >
              {currentStepId === "company" && (
                <CompanyIdentityStep data={data} update={update} err={err} touch={touch} />
              )}
              {currentStepId === "locations" && (
                <LocationsOperationsStep data={data} update={update} err={err} touch={touch} />
              )}
              {currentStepId === "reporting" && (
                <ReportingComplianceStep data={data} update={update} err={err} touch={touch} />
              )}
              {currentStepId === "integrations" && (
                <DataIntegrationsStep data={data} update={update} err={err} touch={touch} />
              )}
              {currentStepId === "emissions" && (
                <EmissionsProfileStep data={data} update={update} err={err} touch={touch} />
              )}
              {currentStepId === "valueChain" && (
                <ValueChainStep data={data} update={update} err={err} touch={touch} />
              )}
              {currentStepId === "strategy" && (
                <StrategyTeamStep data={data} update={update} err={err} touch={touch} />
              )}
            </StepShell>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
