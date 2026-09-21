import { expect, test } from "@playwright/test";

test.describe("home quality", () => {
  test("images, overflow, reduced motion and LCP", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const overflow = await page.evaluate(() => ({
      html: getComputedStyle(document.documentElement).overflow,
      body: getComputedStyle(document.body).overflow,
    }));
    expect(overflow.html).toBe("visible");
    expect(overflow.body).toBe("visible");

    const imageAudit = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll("img"));
      return images.map((img) => ({
        alt: img.getAttribute("alt"),
        sizes: img.getAttribute("sizes"),
        loading: img.getAttribute("loading"),
        fetchpriority: img.getAttribute("fetchpriority"),
      }));
    });

    if (imageAudit.length > 0) {
      for (const image of imageAudit) {
        expect(image.alt).not.toBeNull();
        expect(image.sizes).toBeTruthy();
      }
    }

    await expect(page.locator("[data-lcp='true']")).toHaveCount(1);

    const animatedChars = page.locator("[data-char]");
    if (await animatedChars.count()) {
      const opacity = await animatedChars.first().evaluate((el) =>
        getComputedStyle(el).opacity,
      );
      expect(Number(opacity)).toBeGreaterThan(0.9);
    }

    const color = await page.evaluate(
      () => getComputedStyle(document.body).color,
    );
    expect(color).toBe("rgb(33, 42, 55)");
  });
});
