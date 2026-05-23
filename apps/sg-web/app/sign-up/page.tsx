import type { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Create Account | SpendGate",
  description: "Create your SpendGate account to take control of your card spending",
};

export default function SignUpPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          SpendGate
        </Link>
      </div>
      <SignUpForm />
    </main>
  );
}
