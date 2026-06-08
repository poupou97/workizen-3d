import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { PNG } from "pngjs";

const baseUrl = process.env.WORKIZEN_CAMPUS_URL ?? "http://localhost:3000";
const screenshotDir = new URL("../../../output/screenshots/", import.meta.url);

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "mobile", width: 390, height: 844 }
];

await mkdir(screenshotDir, { recursive: true });

const browser = await chromium.launch();

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("canvas", { state: "visible", timeout: 20000 });
    await page.waitForTimeout(1800);

    const canvas = page.locator("canvas").first();
    const canvasBuffer = await canvas.screenshot();
    const image = PNG.sync.read(canvasBuffer);
    let nonBackgroundSamples = 0;

    for (let y = 0; y < image.height; y += Math.max(1, Math.floor(image.height / 34))) {
      for (let x = 0; x < image.width; x += Math.max(1, Math.floor(image.width / 34))) {
        const index = (image.width * y + x) * 4;
        const red = image.data[index];
        const green = image.data[index + 1];
        const blue = image.data[index + 2];
        const alpha = image.data[index + 3];
        const looksLikeSky = red > 220 && green > 235 && blue > 240;

        if (alpha > 0 && !looksLikeSky) {
          nonBackgroundSamples += 1;
        }
      }
    }

    if (nonBackgroundSamples < 20) {
      throw new Error(`${viewport.name} canvas smoke check failed: ${nonBackgroundSamples} samples`);
    }

    const bodyText = await page.locator("body").innerText();

    for (const requiredText of ["Workizen HQ Campus", "Digital Citizen City", "Opportunity Marketplace"]) {
      if (!bodyText.includes(requiredText)) {
        throw new Error(`${viewport.name} missing required text: ${requiredText}`);
      }
    }

    await page.screenshot({
      path: new URL(`workizen-hq-campus-${viewport.name}.png`, screenshotDir).pathname,
      fullPage: true
    });

    if (viewport.name === "desktop") {
      await page.screenshot({
        path: new URL("workizen-hq-campus-visual-upgrade-v01.png", screenshotDir).pathname,
        fullPage: true
      });
    }

    await page.getByRole("button", { name: "Demo" }).click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: new URL(`workizen-hq-campus-demo-${viewport.name}.png`, screenshotDir).pathname,
      fullPage: true
    });

    if (viewport.name === "desktop") {
      await page.getByRole("button", { name: "AI Agent Lab" }).click();
      await page.waitForTimeout(250);
      const districtPanelText = await page.locator("aside").innerText();
      if (!districtPanelText.includes("AI Agent Lab") || !districtPanelText.includes("ACTIVE CITIZENS")) {
        throw new Error("District panel smoke check failed.");
      }

      await page.getByRole("button", { name: "Build WorkforceOS MVP" }).first().click();
      await page.waitForTimeout(250);
      const opportunityPanelText = await page.locator("aside").innerText();
      if (!opportunityPanelText.includes("Recommended Team")) {
        throw new Error("Opportunity panel smoke check failed.");
      }
    }

    await page.close();
  }
} finally {
  await browser.close();
}

console.log("Workizen HQ Campus smoke check passed for desktop, tablet, and mobile.");
