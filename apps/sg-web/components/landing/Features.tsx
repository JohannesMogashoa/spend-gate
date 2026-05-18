import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Analytics01Icon,
    LockIcon,
    ShieldKeyIcon,
    TestTube01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const features = [
    {
        icon: ShieldKeyIcon,
        title: "Smart Rules",
        description:
            "Create conditional rules based on merchant, amount, time, or currency. Block or allow transactions automatically.",
    },
    {
        icon: Analytics01Icon,
        title: "Real-time Insights",
        description:
            "Monitor all card transactions as they happen. See what was approved, blocked, and why.",
    },
    {
        icon: TestTube01Icon,
        title: "Simulate First",
        description:
            "Test your rules against sample transactions before going live. No surprises, no regrets.",
    },
    {
        icon: LockIcon,
        title: "Secure by Design",
        description:
            "Your Investec credentials are encrypted and never stored. Full control remains with you.",
    },
];

export function Features() {
    return (
        <section className="px-6 py-20 md:py-28">
            <div className="mx-auto max-w-5xl">
                {/* Section header */}
                <div className="mb-12 text-center md:mb-16">
                    <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                        Everything you need to manage spend
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
                        SpendGate gives you the tools to define exactly how your cards behave, with
                        full transparency and control.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="grid gap-6 md:grid-cols-2">
                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            className="border-border/50 bg-card/50 transition-colors hover:border-border hover:bg-card"
                        >
                            <CardHeader>
                                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-chart-1/10">
                                    <HugeiconsIcon
                                        icon={feature.icon}
                                        className="size-5 text-chart-1"
                                    />
                                </div>
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    {feature.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
