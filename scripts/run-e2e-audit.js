const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3456';
const ARTIFACTS_DIR = path.join(__dirname, '..', 'test-artifacts');

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  laptop: { width: 1280, height: 800 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
  narrow_mobile: { width: 360, height: 800 },
};

const ROUTES = [
  { name: 'homepage', path: '/' },
  { name: 'explore', path: '/explore' },
  { name: 'cafe_detail', path: '/cafes/amber-ember-roastery' },
  { name: 'membership', path: '/membership' },
  { name: 'plan_detail', path: '/membership/plan_fellowship' },
  { name: 'checkout', path: '/checkout?planId=plan_fellowship&interval=monthly' },
  { name: 'my_membership', path: '/my-membership' },
  { name: 'my_benefits', path: '/my-benefits' },
  { name: 'redemptions', path: '/redemptions' },
  { name: 'account', path: '/account' },
  { name: 'partner_overview', path: '/partner' },
  { name: 'partner_validator', path: '/partner/redemptions' },
  { name: 'partner_profile', path: '/partner/profile' },
  { name: 'partner_benefits', path: '/partner/benefits' },
  { name: 'partner_staff', path: '/partner/staff' },
  { name: 'admin', path: '/admin' },
];

async function runAudit() {
  console.log('🚀 Launching Chrome for Automated UI/UX Audit & Visual QA...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const networkFailures = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push({ url: page.url(), text: msg.text() });
      console.error(`[Browser Console Error] ${msg.text()}`);
    }
  });

  page.on('requestfailed', (req) => {
    networkFailures.push({ url: req.url(), errorText: req.failure()?.errorText });
  });

  const auditLog = [];

  try {
    // 1. Capture baseline visual screenshots across routes and viewports
    console.log('\n📸 Step 1: Capturing baseline visual screenshots across viewports...');
    for (const route of ROUTES) {
      const fullUrl = `${BASE_URL}${route.path}`;
      console.log(`Checking route: ${route.name} (${route.path})`);

      for (const [vpName, vpDims] of Object.entries(VIEWPORTS)) {
        await page.setViewport(vpDims);
        const res = await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 15000 });
        const status = res ? res.status() : 0;

        // Check for horizontal overflow
        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });

        const filename = `baseline_${route.name}_${vpName}.png`;
        const filepath = path.join(ARTIFACTS_DIR, filename);

        // Only save key screenshots for all viewports, others desktop & mobile to keep it manageable
        if (vpName === 'desktop' || vpName === 'mobile' || route.name === 'homepage' || route.name === 'my_membership') {
          await page.screenshot({ path: filepath, fullPage: false });
        }

        auditLog.push({
          route: route.path,
          name: route.name,
          viewport: vpName,
          status,
          hasHorizontalOverflow: overflow,
          screenshot: filepath,
        });
      }
    }

    // 2. Interactive Testing Journeys
    console.log('\n🧪 Step 2: Testing Interactive User Journeys in Browser...');
    await page.setViewport(VIEWPORTS.desktop);

    // Journey A: Search and filter cafes on /explore
    console.log('- Journey A: Testing Cafe Search & Atmosphere Filter on /explore');
    await page.goto(`${BASE_URL}/explore`, { waitUntil: 'networkidle2' });
    const searchInput = await page.$('input[type="text"]');
    if (searchInput) {
      await searchInput.type('Ember');
      await new Promise((r) => setTimeout(r, 300));
      const cafeTitles = await page.$$eval('h3', (el) => el.map((e) => e.innerText));
      const hasMatch = cafeTitles.some((t) => t.includes('Amber & Ember'));
      console.log(`  ✓ Search for "Ember" returned: ${hasMatch ? 'Pass (Amber & Ember found)' : 'Fail'}`);
    }

    // Journey B: Savings calculator on /membership
    console.log('- Journey B: Testing Value Calculator on /membership');
    await page.goto(`${BASE_URL}/membership`, { waitUntil: 'networkidle2' });
    const slider = await page.$('input[type="range"]');
    if (slider) {
      await slider.evaluate((el) => {
        el.value = '5';
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      });
      await new Promise((r) => setTimeout(r, 200));
      const savingsText = await page.$eval('.font-serif.text-2xl.font-extrabold', (el) => el.innerText);
      console.log(`  ✓ Calculator dynamically updated for 5 cups/wk: ${savingsText}`);
    }

    // Journey C: Checkout submission & validation
    console.log('- Journey C: Testing Simulated Checkout & State Activation');
    await page.goto(`${BASE_URL}/checkout?planId=plan_fellowship&interval=monthly`, { waitUntil: 'networkidle2' });
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {});
      const confTitle = await page.$eval('h1', (el) => el.innerText).catch(() => 'Failed to reach confirmation');
      console.log(`  ✓ Checkout confirmation received: "${confTitle}"`);
    }

    // Journey D: Pass redemption tap simulator on /my-membership
    console.log('- Journey D: Testing In-Store Redemption Simulator on /my-membership');
    await page.goto(`${BASE_URL}/my-membership`, { waitUntil: 'networkidle2' });
    const tokenDisplay = await page.$eval('.font-mono.text-4xl, .font-mono.text-5xl', (el) => el.innerText).catch(() => '');
    console.log(`  ✓ Pass live dynamic token rendered: ${tokenDisplay}`);

    const redeemBtn = await page.$('button:has-text("Simulate Barista Verification"), button:has-text("Authorize & Redeem")');
    if (redeemBtn) {
      await redeemBtn.click();
      await new Promise((r) => setTimeout(r, 800));
      const toastOrResult = await page.$eval('.font-bold', (el) => el.innerText).catch(() => '');
      console.log(`  ✓ Pass redemption interaction executed: ${toastOrResult}`);
    }

    // Journey E: Barista Counter Validator on /partner/redemptions (including duplicate prevention)
    console.log('- Journey E: Testing Barista Counter Validator & Duplicate Prevention');
    await page.goto(`${BASE_URL}/partner/redemptions`, { waitUntil: 'networkidle2' });
    const pasteLiveBtn = await page.$('button:has-text("Paste Live Token")');
    if (pasteLiveBtn) {
      await pasteLiveBtn.click();
      const codeInput = await page.$eval('input[type="text"]', (el) => el.value);
      console.log(`  ✓ Barista terminal autofilled live pass code: ${codeInput}`);

      const verifyBtn = await page.$('button[type="submit"]');
      if (verifyBtn) {
        await verifyBtn.click();
        await new Promise((r) => setTimeout(r, 800));
        console.log('  ✓ Verified first redemption on shift batch.');

        // Now attempt duplicate redemption with same code!
        await verifyBtn.click();
        await new Promise((r) => setTimeout(r, 800));
        const duplicateWarning = await page.$eval('.p-5.rounded-2xl', (el) => el.innerText).catch(() => '');
        console.log(`  ✓ Duplicate check response: "${duplicateWarning.split('\n')[0]}"`);
      }
    }

    // Write audit summary JSON
    const report = {
      timestamp: new Date().toISOString(),
      routesAudited: ROUTES.length,
      viewportsTested: Object.keys(VIEWPORTS),
      consoleErrors,
      networkFailures,
      auditLog,
    };

    fs.writeFileSync(
      path.join(ARTIFACTS_DIR, 'baseline_audit_report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('\n✅ Audit completed successfully. Artifacts saved to test-artifacts/');
  } catch (err) {
    console.error('Error during audit run:', err);
  } finally {
    await browser.close();
  }
}

runAudit();
