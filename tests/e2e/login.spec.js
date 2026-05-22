import { test, expect } from "@playwright/test";

test.describe("login", () => {
  test("user can log in", async ({ page }) => {
    await page.goto("/login/index.html");

    await page.locator('input[name="email"]').fill(process.env.TEST_USER_EMAIL);

    await page
      .locator('input[name="password"]')
      .fill(process.env.TEST_USER_PASSWORD);

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/index.html/);
  });

  test("invalid credentials for login shows error message", async ({
    page,
  }) => {
    await page.goto("/login/index.html");

    await page.locator('input[name="email"]').fill(process.env.TEST_USER_EMAIL);

    await page.locator('input[name="password"]').fill("incorrectpassword");

    await page.getByRole("button", { name: "Login" }).click();

    //Wait for the API to respond before checking that the error message is displayed
    await page.waitForResponse((response) =>
      response.url().includes("auth/login"),
    );

    await expect(page.getByRole("alert")).toBeVisible();

    //const errorMessage = page.locator("#message-container");
    //await expect(errorMessage).toContainText("Invalid email or password");
  });
});
