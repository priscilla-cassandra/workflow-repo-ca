import { test, expect } from "@playwright/test";

test.describe("displayVenueList", () => {
  test("Waits for the venue list to load", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/");

    await expect(page.locator("#venue-container")).toHaveText("Loading...");
  });
});
