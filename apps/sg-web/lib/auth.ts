import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: {
    // Using in-memory for now - replace with Drizzle adapter when database is set up
    // import { drizzleAdapter } from "better-auth/adapters/drizzle";
    // adapter: drizzleAdapter(db),
    type: "sqlite",
    url: ":memory:",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  plugins: [nextCookies()],
});
