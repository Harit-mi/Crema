const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3456';
const ARTIFACTS_DIR = path.join(__dirname, '..', 'test-artifacts');
const BRAIN_SCREENSHOTS_DIR = '/Users/haritmishra/.gemini/antigravity/brain/018c7e82-6253-419d-a903-bfdbf0605306/screenshots';

const ROUTES_TO_CAPTURE = [
  { name: 'home', path: '/' },
  { name: 'explore', path: '/explore' },
  { name: 'cafe_detail', path: '/cafes/amber-ember-roastery' },
  { name: 'membership_plans', path: '/membership' },
  { name: 'checkout', path: '/checkout?planId=plan_fellowship&interval=monthly' },
  { name: 'checkout_confirmation', path: '/checkout/confirmation?planId=plan_fellowship&interval=monthly&total=36.81' },
  { name: 'my_membership_pass', path: '/my-membership' },
  { name: 'my_benefits', path: '/my-benefits' },
  { name: 'redemptions_history', path: '/redemptions' },
  { name: 'partner_terminal', path: '/partner/redemptions' },
  { name: 'admin_operations', path: '/admin' },
];

async function capture() {
  if (!fs.existsSync(ARTIFACTS_DIR)) fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
  if (!fs.existsSync(BRAIN_SCREENSHOTS_DIR)) fs.mkdirSync(BRAIN_SCREENSHOTS_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  for (const route of ROUTES_TO_CAPTURE) {
    // Desktop 1440x900
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle2', timeout: 15000 });
    const deskFilename = `redesign_${route.name}_desktop.png`;
    const deskPath = path.join(ARTIFACTS_DIR, deskFilename);
    await page.screenshot({ path: deskPath, fullPage: false });
    fs.copyFileSync(deskPath, path.join(BRAIN_SCREENSHOTS_DIR, deskFilename));
    console.log(`Saved ${deskFilename}`);

    // Mobile 390x844
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle2', timeout: 15000 });
    const mobFilename = `redesign_${route.name}_mobile.png`;
    const mobPath = path.join(ARTIFACTS_DIR, mobFilename);
    await page.screenshot({ path: mobPath, fullPage: false });
    fs.copyFileSync(mobPath, path.join(BRAIN_SCREENSHOTS_DIR, mobFilename));
    console.log(`Saved ${mobFilename}`);
  }

  await browser.close();
  console.log('Finished capturing all redesign screenshots.');
}

capture();
