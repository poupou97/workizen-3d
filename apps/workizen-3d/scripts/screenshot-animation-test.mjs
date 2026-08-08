#!/usr/bin/env node
/**
 * Takes screenshots of /animation-test for Idle and Walk clips.
 * Outputs to output/screenshots/animation-test-*.png
 *
 * Usage:
 *   WORKIZEN_CAMPUS_URL=http://localhost:3000 node scripts/screenshot-animation-test.mjs
 */

import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE_URL = process.env.WORKIZEN_CAMPUS_URL ?? "http://localhost:3000";
const PAGE_URL = `${BASE_URL}/animation-test`;
const OUT_DIR = new URL("../../../output/screenshots/", import.meta.url);

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  console.log(`Navigating to ${PAGE_URL}`);
  await page.goto(PAGE_URL, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("canvas", { state: "visible", timeout: 20000 });

  // Wait for model to load and animation to start.
  await page.waitForTimeout(3500);

  // Screenshot: Idle
  await page.screenshot({
    path: new URL("animation-test-idle.png", OUT_DIR).pathname,
    fullPage: false,
  });
  console.log("Screenshot saved: animation-test-idle.png");

  // Click Walk button
  await page.getByRole("button", { name: /walk/i }).click();
  await page.waitForTimeout(2500);

  // Screenshot: Walk
  await page.screenshot({
    path: new URL("animation-test-walk.png", OUT_DIR).pathname,
    fullPage: false,
  });
  console.log("Screenshot saved: animation-test-walk.png");

  // Read HUD text to capture stats
  const hudText = await page.locator("div").filter({ hasText: "Animation Test" }).first().innerText().catch(() => "");
  console.log("HUD content:\n" + hudText);

  console.log("\nScreenshots done.");
} finally {
  await browser.close();
}
