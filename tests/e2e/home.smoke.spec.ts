import { expect, test } from "@playwright/test";

test.describe("home smoke", () => {
  test("homepage responds and shows header + project index", async ({
    page,
  }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();

    await expect(page.locator("header.site-header")).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Navigation principale" }),
    ).toBeVisible();
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(
      page.locator("#main-content a[href^='/projets/']").first(),
    ).toBeVisible();
  });
});
