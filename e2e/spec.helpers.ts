import type { Page } from "@playwright/test";

type TestContext = {
  email: string;
  password: string;
};

let cachedTestCtx: TestContext | null = null;

export function testContext(): TestContext {
  if (!cachedTestCtx) {
    const timestamp = new Date().getTime();
    cachedTestCtx = {
      email: `${timestamp}+testuser@example.com`,
      password: "tD20xt6h0m3!",
    };
  }
  return cachedTestCtx;
}

export async function signIn(page: Page, ctx: TestContext) {
  await page.goto("/");
  await page.getByRole("link", { name: "Log in" }).click();
  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill(ctx.email);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(ctx.password);
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByText(`Welcome, ${ctx.email}!`).isVisible();
}

export async function signUp(page: Page, ctx: TestContext) {
  await page.goto("/");
  await page.getByRole("link", { name: "Sign up" }).click();
  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill(ctx.email);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(ctx.password);
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Accept" }).click();
  await page.getByText(`Welcome, ${ctx.email}!`).isVisible();
}

export async function signOut(page: Page, ctx: TestContext) {
  await page.goto("/");
  await page.getByRole("link", { name: "Log out" }).click();
  await page.getByRole("link", { name: "Sign up" }).isVisible();
  await page.getByRole("link", { name: "Log in" }).isVisible();
}
