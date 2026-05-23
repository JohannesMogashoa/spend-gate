"use client";
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  // Don't show header on auth pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="cursor-pointer">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            SpendGate
          </h1>
          <p className="text-xs text-muted-foreground">
            Programmable Card Rules
          </p>
        </Link>

        <nav className="flex items-center gap-3">
          {isPending ? (
            <div className="h-8 w-20 animate-pulse rounded bg-muted" />
          ) : session?.user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <span className="text-xs text-muted-foreground">
                {session.user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
