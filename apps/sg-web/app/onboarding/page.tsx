import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft01Icon, ShieldKeyIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { OnboardingFormClient } from "@/components/onboarding/OnboardingFormClient";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <HugeiconsIcon icon={ArrowLeft01Icon} data-icon="inline-start" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-chart-1/10">
              <HugeiconsIcon icon={ShieldKeyIcon} className="size-6 text-chart-1" />
            </div>
            <CardTitle className="text-2xl">Connect Your Account</CardTitle>
            <CardDescription>
              Enter your Investec API credentials to get started. Your data is
              encrypted and never stored on our servers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OnboardingFormClient />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
