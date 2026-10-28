const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3456';
const ARTIFACTS_DIR = path.join(__dirname, '..', 'test-artifacts');
const BRAIN_SCREENSHOTS_DIR = '/Users/haritmishra/.gemini/antigravity/brain/018c7e82-6253-419d-a903-bfdbf0605306/screenshots';

async function verifyFontsAndButtons() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

  // 1. Inspect Computed Fonts
  const fontInspection = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const editorialQuote = document.querySelector('.font-editorial');
    const monoToken = document.querySelector('.font-mono');
    const body = document.body;
    const button = document.querySelector('button.btn-tactile, button');

    return {
      h1Font: h1 ? window.getComputedStyle(h1).fontFamily : null,
      editorialFont: editorialQuote ? window.getComputedStyle(editorialQuote).fontFamily : null,
      monoFont: monoToken ? window.getComputedStyle(monoToken).fontFamily : null,
      bodyFont: window.getComputedStyle(body).fontFamily,
      buttonFont: button ? window.getComputedStyle(button).fontFamily : null,
      buttonShadow: button ? window.getComputedStyle(button).boxShadow : null,
      buttonRadius: button ? window.getComputedStyle(button).borderRadius : null,
      buttonBorder: button ? window.getComputedStyle(button).border : null,
    };
  });

  console.log('=== COMPUTED TYPOGRAPHY & BUTTON STYLES ===');
  console.log(JSON.stringify(fontInspection, null, 2));

  // 2. Capture Hero Buttons & Typography Close-up
  const heroCtaSection = await page.$('section');
  if (heroCtaSection) {
    const heroBtnPath = path.join(ARTIFACTS_DIR, 'improved_hero_fonts_and_buttons.png');
    await heroCtaSection.screenshot({ path: heroBtnPath });
    fs.copyFileSync(heroBtnPath, path.join(BRAIN_SCREENSHOTS_DIR, 'improved_hero_fonts_and_buttons.png'));
    console.log('Captured improved_hero_fonts_and_buttons.png');
  }

  // 3. Inspect Membership Plan Buttons
  await page.goto(`${BASE_URL}/membership`, { waitUntil: 'networkidle2' });
  const membershipSection = await page.$('main');
  if (membershipSection) {
    const memPath = path.join(ARTIFACTS_DIR, 'improved_membership_buttons.png');
    await page.screenshot({ path: memPath });
    fs.copyFileSync(memPath, path.join(BRAIN_SCREENSHOTS_DIR, 'improved_membership_buttons.png'));
    console.log('Captured improved_membership_buttons.png');
  }

  // 4. Inspect Barista Counter Terminal Buttons
  await page.goto(`${BASE_URL}/partner/redemptions`, { waitUntil: 'networkidle2' });
  const terminalPath = path.join(ARTIFACTS_DIR, 'improved_terminal_buttons.png');
  await page.screenshot({ path: terminalPath });
  fs.copyFileSync(terminalPath, path.join(BRAIN_SCREENSHOTS_DIR, 'improved_terminal_buttons.png'));
  console.log('Captured improved_terminal_buttons.png');

  await browser.close();
  console.log('Verification completed.');
}

verifyFontsAndButtons();
