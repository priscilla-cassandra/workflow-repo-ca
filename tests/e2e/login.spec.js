import { test, expect } from "@playwright/test";
import { CONFIG } from "../../js/config.js";

test.describe("login", () => {
  test("user can log in", async ({ page }) => {
    await page.goto(`${CONFIG.apiUrl}auth/login`);

    await page.locator('input[name="email"]').fill(process.env.TEST_USER_EMAIL);

    await page
      .locator('input[name="password"]')
      .fill(process.env.TEST_USER_PASSWORD);

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  });
});
