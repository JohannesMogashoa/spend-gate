import type { Metadata } from "next";
import Link from "next/link";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | SpendGate",
  description: "Sign in to your SpendGate account",
};

export default function SignInPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          SpendGate
        </Link>
      </div>
      <SignInForm />
    </main>
  );
}
