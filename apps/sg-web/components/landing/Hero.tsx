import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, CodeIcon, ShieldKeyIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center px-6 py-24 md:py-32 lg:py-40">
            {/* Subtle gradient background */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />

            <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
                {/* Badge */}
                <div className="mb-6 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
                    <HugeiconsIcon icon={ShieldKeyIcon} className="text-chart-1" />
                    <span>Investec Programmable Banking</span>
                </div>

                {/* Headline */}
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                    Take control of your
                    <br />
                    <span className="text-chart-1">card spending</span>
                </h1>

                {/* Subheadline */}
                <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground md:text-xl">
                    Create intelligent rules for your Investec cards. Block transactions, set
                    limits, and simulate scenarios before they happen.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Button size="lg" asChild>
                        <Link href="/onboarding">
                            Get Started
                            <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/dashboard">
                            <HugeiconsIcon icon={CodeIcon} data-icon="inline-start" />
                            View Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
