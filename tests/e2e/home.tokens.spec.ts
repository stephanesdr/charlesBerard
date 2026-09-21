import { expect, test } from "@playwright/test";

function rgb(hex: string) {
  const value = hex.replace("#", "");
  const n = Number.parseInt(value, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

test.describe("home tokens", () => {
  test("uses Neue Montreal stack and Figma colors", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();

    const styles = await page.evaluate(() => {
      const body = getComputedStyle(document.body);
      return {
        fontFamily: body.fontFamily,
        background: body.backgroundColor,
        color: body.color,
      };
    });

    expect(styles.fontFamily).toMatch(/Neue Montreal/i);
    expect(styles.background).toBe(rgb("#fef5f9"));
    expect(styles.color).toBe(rgb("#212a37"));
  });
});
