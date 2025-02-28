import { test as setup } from "@playwright/test";
import { signUp, testContext } from "./spec.helpers";

// https://playwright.dev/docs/auth
// we cache the auth state in a file so we can reuse it across tests
// without having to log the user in again
const AUTH_FILE = "./playwright/.auth/user.json";
const ctx = testContext();

setup("sign up, persist session to disk", async ({ page }) => {
  await signUp(page, ctx);
  await page.context().storageState({ path: AUTH_FILE });
});
