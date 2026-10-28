const puppeteer = require('puppeteer-core');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function check404() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  const failed = [];
  page.on('response', (res) => {
    if (res.status() >= 400) {
      failed.push({ url: res.url(), status: res.status() });
    }
  });

  await page.goto('http://localhost:3456/', { waitUntil: 'networkidle2' });
  console.log('Failed requests on /:', JSON.stringify(failed, null, 2));
  await browser.close();
}

check404();
