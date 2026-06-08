import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { PNG } from "pngjs";

const baseUrl = process.env.WORKIZEN_DEMO_URL ?? "http://localhost:3000";
const screenshotDir = new URL("../../../output/screenshots/", import.meta.url);

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 }
];

await mkdir(screenshotDir, { recursive: true });

const browser = await chromium.launch();

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("canvas", { state: "visible", timeout: 15000 });
    await page.waitForTimeout(1200);

    const canvas = page.locator("canvas").first();
    const canvasBuffer = await canvas.screenshot();
    const image = PNG.sync.read(canvasBuffer);
    let nonBackgroundSamples = 0;

    for (let y = 0; y < image.height; y += Math.max(1, Math.floor(image.height / 30))) {
      for (let x = 0; x < image.width; x += Math.max(1, Math.floor(image.width / 30))) {
        const index = (image.width * y + x) * 4;
        const red = image.data[index];
        const green = image.data[index + 1];
        const blue = image.data[index + 2];
        const alpha = image.data[index + 3];
        const looksLikePageBackground =
          Math.abs(red - 248) <= 5 && Math.abs(green - 251) <= 5 && Math.abs(blue - 255) <= 5;

        if (alpha > 0 && !looksLikePageBackground) {
          nonBackgroundSamples += 1;
        }
      }
    }

    const canvasStats = { hasCanvas: true, nonBackgroundSamples };

    if (!canvasStats.hasCanvas || canvasStats.nonBackgroundSamples < 2) {
      throw new Error(
        `${viewport.name} canvas smoke check failed: ${JSON.stringify(canvasStats)}`
      );
    }

    await page.screenshot({
      path: new URL(`workizen-3d-citizen-plaza-${viewport.name}.png`, screenshotDir).pathname,
      fullPage: true
    });

    if (viewport.name === "desktop") {
      await page.getByRole("button", { name: "Enter Citizen Plaza" }).click();
      await canvas.click({ position: { x: 720, y: 380 } });
      await page.waitForTimeout(400);
      const citizenPanelText = await page.locator("aside").innerText();

      if (!citizenPanelText.includes("Knowledge Citizen")) {
        throw new Error("Citizen click smoke check failed.");
      }

      await canvas.click({ position: { x: 720, y: 650 } });
      await page.waitForTimeout(400);
      const buildingPanelText = await page.locator("aside").innerText();

      if (!buildingPanelText.includes("Team Office")) {
        throw new Error("Building click smoke check failed.");
      }
    }

    await page.close();
  }
} finally {
  await browser.close();
}

console.log("Canvas smoke check passed for desktop and mobile viewports.");
