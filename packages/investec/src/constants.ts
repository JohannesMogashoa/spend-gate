import { Credentials } from "./types";

const SANDBOX_DEFAULTS: Omit<Credentials, "cardKey" | "sandbox"> = {
    clientId: "yAxzQRFX97vOcyQAwluEU6H6ePxMA5eY",
    clientSecret: "4dY0PjEYqoBrZ99r",
    apiKey: "eUF4elFSRlg5N3ZPY3lRQXdsdUVVNkg2ZVB4TUE1ZVk6YVc1MlpYTjBaV010ZW1FdGNHSXRZV05qYjNWdWRITXRjMkZ1WkdKdmVBPT0=", // User must supply — not publicly shareable
    accountId: "user_account_id", // User must supply — not publicly shareable
};

const SANDBOX_BEARER_TOKEN =
    "Basic eUF4elFSRlg5N3ZPY3lRQXdsdUVVNkg2ZVB4TUE1ZVk6NGRZMFBqRVlxb0JyWjk5cg==";

export { SANDBOX_BEARER_TOKEN, SANDBOX_DEFAULTS };
