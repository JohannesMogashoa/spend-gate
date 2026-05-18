"use client";

import dynamic from "next/dynamic";

const SignInForm = dynamic(() => import("@/components/auth/SignInForm"), { ssr: false });

export function SignInFormClientWrapper() {
    return <SignInForm />;
}
