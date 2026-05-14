import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Separator className="mb-8" />
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">SpendGate</span>
            <span>by Johannes Mogashoa</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/JohannesMogashoa/spend-gate"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
            <Link
              href="https://developer.investec.com/za/api-products/documentation/SA-PB-Card-Code"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Investec API
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
