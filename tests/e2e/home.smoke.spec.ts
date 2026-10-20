import { expect, test } from "@playwright/test";

test.describe("home smoke", () => {
  test("homepage responds and shows header + project index", async ({
    page,
  }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();

    await expect(page.locator("header.site-header")).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "HOME" })).toBeVisible();
    await expect(page.getByRole("link", { name: "ABOUT" })).toHaveAttribute(
      "href",
      "/about",
    );
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }).getByRole("link"),
    ).toHaveCount(2);
    await expect(page.locator("header.site-header > a")).toHaveCount(0);
    const navOffset = await page
      .getByRole("navigation", { name: "Main navigation" })
      .evaluate((nav) => {
        const rect = nav.getBoundingClientRect();
        return Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);
      });
    expect(navOffset).toBeLessThan(2);
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.locator("[data-project-cover]").first()).toBeVisible();
    await expect(page.locator("[data-project-link]")).toHaveCount(0);
  });

  test("serves the English About URL and redirects the former URL", async ({
    page,
  }) => {
    await page.goto("/about");
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "CHARLES",
    );

    await page.goto("/a-propos");
    await expect(page).toHaveURL(/\/about$/);
  });
});
