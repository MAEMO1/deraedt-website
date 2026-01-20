import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const FRAMES_DIR = './public/demo-frames';
const OUTPUT_VIDEO = './public/demo-preview.mp4';
const VIEWPORT = { width: 390, height: 844 };

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Ensure frames directory exists
if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

// Clean old frames
fs.readdirSync(FRAMES_DIR).forEach(file => {
  fs.unlinkSync(path.join(FRAMES_DIR, file));
});

async function captureDemo() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  let frameNum = 1;

  const screenshot = async (duration = 1) => {
    // Take multiple frames for duration (at ~10fps = 10 frames per second)
    const framesForDuration = Math.ceil(duration * 10);
    for (let i = 0; i < framesForDuration; i++) {
      const filename = `frame-${String(frameNum).padStart(4, '0')}.png`;
      await page.screenshot({ path: path.join(FRAMES_DIR, filename) });
      frameNum++;
    }
  };

  console.log('Starting demo capture...');

  // Homepage
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  // Close cookie banner if present
  try {
    await page.click('button:has-text("Alleen")');
  } catch (e) {}
  await wait(500);
  await screenshot(2); // 2 seconds on homepage

  // Scroll homepage
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'smooth' }));
  await wait(500);
  await screenshot(1.5);

  // Navigate to projecten
  await page.goto('http://localhost:3000/projecten', { waitUntil: 'networkidle0', timeout: 30000 });
  await wait(500);
  await screenshot(1.5);

  // Scroll projecten
  await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'smooth' }));
  await wait(500);
  await screenshot(1.5);

  // Navigate to projectplanner
  await page.goto('http://localhost:3000/projectplanner', { waitUntil: 'networkidle0', timeout: 30000 });
  await wait(500);
  await screenshot(1.5);

  // Select Nieuwbouw
  await page.evaluate(() => {
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Nieuwbouw')) btn.click();
    });
  });
  await wait(300);
  await screenshot(1);

  // Click Volgende
  await page.evaluate(() => {
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Volgende')) btn.click();
    });
  });
  await wait(500);
  await screenshot(1);

  // Select Overheid
  await page.evaluate(() => {
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Overheid')) btn.click();
    });
  });
  await wait(300);
  await screenshot(1);

  // Click Volgende
  await page.evaluate(() => {
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Volgende')) btn.click();
    });
  });
  await wait(500);
  await screenshot(1.5);

  // Select budget option
  await page.evaluate(() => {
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('€500K')) btn.click();
    });
  });
  await wait(300);
  await screenshot(1);

  await browser.close();

  console.log(`Captured ${frameNum - 1} frames`);

  // Create video with ffmpeg
  console.log('Creating video...');
  execSync(`ffmpeg -y -framerate 10 -i ${FRAMES_DIR}/frame-%04d.png -c:v libx264 -pix_fmt yuv420p -vf "scale=390:844" ${OUTPUT_VIDEO}`, {
    stdio: 'inherit'
  });

  console.log(`Video created: ${OUTPUT_VIDEO}`);

  // Clean up frames
  fs.readdirSync(FRAMES_DIR).forEach(file => {
    fs.unlinkSync(path.join(FRAMES_DIR, file));
  });
  fs.rmdirSync(FRAMES_DIR);
}

captureDemo().catch(console.error);
