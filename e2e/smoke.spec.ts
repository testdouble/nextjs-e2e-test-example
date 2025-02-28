import { test } from '@playwright/test';
import {
  testContext,
  signUp,
  signOut,
  signIn,
} from './spec.helpers';

const ctx = testContext();

test('smoke', async ({ page }) => {
  await signUp(page, ctx);
  await signOut(page, ctx);
  await signIn(page, ctx);
});
