import { test, expect } from "@playwright/test";

test.describe("createMenu", () => {
  test("user can navigate to the home page", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/login/index.html");

    await page.getByRole("link", { name: "Home" }).click();

    await expect(
      page.getByRole("heading", { level: 1, name: "Welcome to this site" }),
    );
  });
});
