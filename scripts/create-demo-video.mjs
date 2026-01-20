import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const FRAMES_DIR = './public/demo-frames';
const OUTPUT_VIDEO = './public/demo-preview.mp4';
const VIEWPORT = { width: 1280, height: 720 }; // Desktop viewport

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
    // Take multiple frames for duration (at ~15fps)
    const framesForDuration = Math.ceil(duration * 15);
    for (let i = 0; i < framesForDuration; i++) {
      const filename = `frame-${String(frameNum).padStart(4, '0')}.png`;
      await page.screenshot({ path: path.join(FRAMES_DIR, filename) });
      frameNum++;
    }
  };

  // Scroll down the page while capturing frames
  const scrollAndCapture = async (scrollDistance, scrollDuration = 1500) => {
    const steps = Math.ceil(scrollDuration / 66); // ~15fps
    const scrollPerStep = scrollDistance / steps;

    for (let i = 0; i < steps; i++) {
      await page.evaluate((step) => {
        window.scrollBy(0, step);
      }, scrollPerStep);
      await screenshot(0.066); // Single frame
    }
  };

  // Helper to click button by text content
  const clickButtonByText = async (text) => {
    await page.evaluate((searchText) => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent && btn.textContent.toLowerCase().includes(searchText.toLowerCase())) {
          btn.click();
          return true;
        }
      }
      return false;
    }, text);
  };

  console.log('Starting desktop demo capture...');

  // ========== HOMEPAGE ==========
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await wait(500);

  // Accept cookies
  try {
    await clickButtonByText('Alles accepteren');
  } catch (e) {
    console.log('Cookie banner not found or already accepted');
  }
  await wait(500);

  await screenshot(2); // Show homepage hero

  // Scroll down homepage smoothly
  await scrollAndCapture(400, 1000);
  await screenshot(1);
  await scrollAndCapture(400, 1000);
  await screenshot(1);
  await scrollAndCapture(400, 1000);
  await screenshot(1);

  // Scroll back to top
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await wait(300);
  await screenshot(0.5);

  // ========== DIENSTEN PAGE ==========
  await page.goto('http://localhost:3000/diensten', { waitUntil: 'networkidle0', timeout: 30000 });
  await wait(500);
  await screenshot(1.5);

  // Scroll diensten smoothly
  await scrollAndCapture(500, 1200);
  await screenshot(1);
  await scrollAndCapture(500, 1200);
  await screenshot(1);
  await scrollAndCapture(500, 1200);
  await screenshot(0.5);

  // ========== PROJECTEN PAGE ==========
  await page.goto('http://localhost:3000/projecten', { waitUntil: 'networkidle0', timeout: 30000 });
  await wait(500);
  await screenshot(1.5);

  // Scroll projecten smoothly
  await scrollAndCapture(400, 1000);
  await screenshot(1);
  await scrollAndCapture(400, 1000);
  await screenshot(0.5);

  // ========== OVER ONS PAGE ==========
  await page.goto('http://localhost:3000/over-ons', { waitUntil: 'networkidle0', timeout: 30000 });
  await wait(500);
  await screenshot(1.5);

  // Scroll over-ons smoothly
  await scrollAndCapture(400, 1000);
  await screenshot(1);
  await scrollAndCapture(400, 1000);
  await screenshot(0.5);

  // ========== PROJECTPLANNER ==========
  await page.goto('http://localhost:3000/projectplanner', { waitUntil: 'networkidle0', timeout: 30000 });
  await wait(500);
  await screenshot(1.5);

  // Step 1: Select project type (Nieuwbouw)
  console.log('Projectplanner Step 1: Project Type');
  await clickButtonByText('Nieuwbouw');
  await wait(400);
  await screenshot(1);

  // Click Volgende
  await clickButtonByText('Volgende');
  await wait(500);
  await screenshot(1);

  // Step 2: Select client type (Overheid)
  console.log('Projectplanner Step 2: Client Type');
  await clickButtonByText('Overheid');
  await wait(400);
  await screenshot(1);

  // Click Volgende
  await clickButtonByText('Volgende');
  await wait(500);
  await screenshot(1);

  // Step 3: Select budget (€500K - €1M)
  console.log('Projectplanner Step 3: Budget');
  await clickButtonByText('€500K');
  await wait(400);
  await screenshot(1);

  // Click Volgende
  await clickButtonByText('Volgende');
  await wait(500);
  await screenshot(1);

  // Step 4: Select timeline (3-6 maanden)
  console.log('Projectplanner Step 4: Timeline');
  await clickButtonByText('3-6');
  await wait(400);
  await screenshot(1);

  // Click Volgende
  await clickButtonByText('Volgende');
  await wait(500);
  await screenshot(1);

  // Step 5: Select location (Oost-Vlaanderen)
  console.log('Projectplanner Step 5: Location');
  await clickButtonByText('Oost-Vlaanderen');
  await wait(400);
  await screenshot(1);

  // Click Volgende
  await clickButtonByText('Volgende');
  await wait(500);
  await screenshot(1.5);

  // Step 6: Contact Form
  console.log('Projectplanner Step 6: Contact Form');

  // Get all input fields and fill them one by one
  const inputs = await page.$$('input');
  console.log(`Found ${inputs.length} input fields`);

  // Fill name (first text input)
  if (inputs[0]) {
    await inputs[0].click();
    await inputs[0].type('Jan Vermeersch', { delay: 40 });
    await screenshot(0.5);
  }

  // Fill email (second input)
  if (inputs[1]) {
    await inputs[1].click();
    await inputs[1].type('jan.vermeersch@voorbeeld.be', { delay: 40 });
    await screenshot(0.5);
  }

  // Fill phone (third input)
  if (inputs[2]) {
    await inputs[2].click();
    await inputs[2].type('+32 478 12 34 56', { delay: 40 });
    await screenshot(0.5);
  }

  // Fill company (fourth input - optional)
  if (inputs[3]) {
    await inputs[3].click();
    await inputs[3].type('Gemeente Wetteren', { delay: 40 });
    await screenshot(0.5);
  }

  await screenshot(1);

  // Click submit button
  console.log('Submitting form...');
  await clickButtonByText('Verstuur');
  await wait(1500);
  await screenshot(2.5); // Show success message

  await browser.close();

  console.log(`Captured ${frameNum - 1} frames`);

  // Create video with ffmpeg (15fps for smoother playback)
  console.log('Creating video...');
  execSync(`ffmpeg -y -framerate 15 -i ${FRAMES_DIR}/frame-%04d.png -c:v libx264 -pix_fmt yuv420p -vf "scale=1280:720" ${OUTPUT_VIDEO}`, {
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
