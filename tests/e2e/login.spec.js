import { test, expect } from "@playwright/test";

test.describe("login", () => {
  test("user can log in", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/login/index.html");

    await page.locator('input[name="email"]').fill(process.env.TEST_USER_EMAIL);

    await page
      .locator('input[name="password"]')
      .fill(process.env.TEST_USER_PASSWORD);

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#logoutButton")).toBeVisible();
  });

  test("invalid credentials for login shows error message", async ({
    page,
  }) => {
    await page.goto("http://127.0.0.1:5500/login/index.html/");

    await page.locator('input[name="email"]').fill(process.env.TEST_USER_EMAIL);

    await page.locator('input[name="password"]').fill("incorrectpassword");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#message-container")).toContainText(
      "Login failed",
    );
  });
});
