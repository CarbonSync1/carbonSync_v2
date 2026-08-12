import type { Metadata } from "next";

import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export const metadata: Metadata = {
  title: "Set up your workspace · CarbonSynq",
  description:
    "Configure your organization's carbon accounting workspace in a few minutes.",
};

export default function OnboardingPage() {
  return (
    <main className="onboarding-green bg-background">
      <OnboardingWizard />
    </main>
  );
}
