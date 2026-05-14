"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { ArrowRight01Icon, Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function OnboardingFormClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="clientId">Client ID</FieldLabel>
          <Input
            id="clientId"
            name="clientId"
            placeholder="Enter your Investec Client ID"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="clientSecret">Client Secret</FieldLabel>
          <Input
            id="clientSecret"
            name="clientSecret"
            type="password"
            placeholder="Enter your Client Secret"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="apiKey">API Key</FieldLabel>
          <Input
            id="apiKey"
            name="apiKey"
            type="password"
            placeholder="Enter your API Key"
            required
          />
          <FieldDescription>
            Find these in your Investec Online Banking under API Keys
          </FieldDescription>
        </Field>
      </FieldGroup>

      <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <HugeiconsIcon
              icon={Loading03Icon}
              className="animate-spin"
              data-icon="inline-start"
            />
            Connecting...
          </>
        ) : (
          <>
            Connect Account
            <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
          </>
        )}
      </Button>
    </form>
  );
}
