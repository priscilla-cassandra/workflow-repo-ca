import { test, expect } from "@playwright/test";

test.describe("displayVenueList", () => {
  test("Waits for the venue list to load", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#venue-container")).toHaveText("Loading...");
  });

  test("Clicks the first venue, and venue details page loads with 'Venue details' in the heading", async ({
    page,
  }) => {
    await page.goto("/");

    await page.locator(".bg-cover").first().click();

    await expect(page).toHaveURL(/id=/);

    await expect(
      page.getByRole("heading", { level: 1, name: "Venue details" }),
    );
  });
});
