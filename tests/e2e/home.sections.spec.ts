import { expect, test } from "@playwright/test";

test.describe("home sections", () => {
  test("renders unique h1 and section order", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("[data-home-section='hero']")).toBeVisible();
    await expect(page.locator("[data-home-section='marquee']")).toBeVisible();
    await expect(page.locator("[data-home-section='services']")).toBeVisible();
    await expect(page.locator("[data-home-section='manifesto']")).toBeVisible();
    await expect(page.locator("[data-home-section='index']")).toBeVisible();
    await expect(page.locator("[data-home-section='footer']")).toBeVisible();

    const order = await page.locator("[data-home-section]").evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-home-section")),
    );
    expect(order).toEqual([
      "hero",
      "marquee",
      "services",
      "manifesto",
      "index",
      "footer",
    ]);

    const marquee = page.locator("[data-home-section='marquee']");
    await expect(marquee).toHaveAttribute("aria-hidden", "true");
    await expect(marquee).toHaveClass(/pointer-events-none/);
    const tabStops = await marquee.locator("a, button, [tabindex]").count();
    expect(tabStops).toBe(0);
  });
});
