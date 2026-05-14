import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft01Icon,
  Add01Icon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
  Time01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

// Mock data for demonstration
const stats = [
  { label: "Active Rules", value: "12", change: "+2 this week" },
  { label: "Transactions Today", value: "47", change: "23 blocked" },
  { label: "Total Blocked", value: "R 4,250", change: "This month" },
];

const recentTransactions = [
  {
    id: 1,
    merchant: "Amazon",
    amount: "R 599.00",
    status: "approved",
    time: "2 min ago",
  },
  {
    id: 2,
    merchant: "Netflix",
    amount: "R 199.00",
    status: "blocked",
    time: "15 min ago",
  },
  {
    id: 3,
    merchant: "Woolworths",
    amount: "R 1,245.50",
    status: "approved",
    time: "1 hour ago",
  },
  {
    id: 4,
    merchant: "Uber Eats",
    amount: "R 185.00",
    status: "pending",
    time: "2 hours ago",
  },
];

const activeRules = [
  { id: 1, name: "Block Online Gambling", enabled: true, triggers: 156 },
  { id: 2, name: "Limit Foreign Currency", enabled: true, triggers: 23 },
  { id: 3, name: "Weekend Spending Cap", enabled: false, triggers: 0 },
];

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: typeof CheckmarkCircle02Icon }> = {
    approved: { variant: "secondary", icon: CheckmarkCircle02Icon },
    blocked: { variant: "destructive", icon: Cancel01Icon },
    pending: { variant: "outline", icon: Time01Icon },
  };
  const { variant, icon } = variants[status] || variants.pending;

  return (
    <Badge variant={variant} className="gap-1 capitalize">
      <HugeiconsIcon icon={icon} />
      {status}
    </Badge>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <HugeiconsIcon icon={ArrowLeft01Icon} data-icon="inline-start" />
                Back
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <Button size="sm">
            <HugeiconsIcon icon={Add01Icon} data-icon="inline-start" />
            New Rule
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two column layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest card activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{tx.merchant}</span>
                      <span className="text-sm text-muted-foreground">
                        {tx.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm">{tx.amount}</span>
                      <StatusBadge status={tx.status} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Rules */}
          <Card>
            <CardHeader>
              <CardTitle>Active Rules</CardTitle>
              <CardDescription>Your spending controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {activeRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{rule.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {rule.triggers} triggers
                      </span>
                    </div>
                    <Badge variant={rule.enabled ? "default" : "outline"}>
                      {rule.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
