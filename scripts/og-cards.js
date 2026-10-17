// Link-preview cards (public/og/hub.jpg, air.jpg; 1200×630, keep < 120 KB) in direction D:
// light ground, navy sentence-case headline, the B&W A320 with the live hangar screen, the
// teal forward line. Rendered by headless Chrome from HTML with the site's own fonts.
//
// Not a project dependency. To regenerate:
//   mkdir %TEMP%\og-tools && cd %TEMP%\og-tools && npm i puppeteer-core@23 sharp@0.33
//   NODE_PATH=%TEMP%\og-tools\node_modules node scripts/og-cards.js . public/og
// (Chrome path below is the Windows default.) Then bump ?v= on ogImage in the page metadata.
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');
const sharp = require('sharp');

const [, , REPO, OUT_] = process.argv;
const OUT = path.resolve(OUT_);
const REPO_ABS = path.resolve(REPO);
const pub = (p) => 'file:///' + path.join(REPO_ABS, 'public', p).replace(/\\/g, '/');

const CARDS = {
  hub: { headline: 'Fleet intelligence for assets that carry life limits.', sub: 'Aviation is live today. Drones, trucks, vessels and satellites next.' },
  air: { headline: 'Every aircraft’s next 24 months, on one screen.', sub: 'Maintenance, redelivery and reserves, projected forward.' },
};

const html = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Outfit;src:url(${pub('fonts/outfit-latin-var.woff2')}) format('woff2');font-weight:100 900}
@font-face{font-family:Poppins;src:url(${pub('fonts/poppins-latin-600.woff2')}) format('woff2');font-weight:600}
@font-face{font-family:Poppins;src:url(${pub('fonts/poppins-latin-500.woff2')}) format('woff2');font-weight:500}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#fff;font-family:Outfit;position:relative;overflow:hidden}
.bar{height:76px;background:#1E2D4A;display:flex;align-items:center;padding:0 56px}
.bar img{height:44px}
.copy{position:absolute;left:56px;top:124px;width:540px}
h1{font-weight:600;font-size:56px;line-height:1.06;letter-spacing:-0.025em;color:#1E2D4A;text-wrap:balance}
p{margin-top:22px;font-size:23px;line-height:1.45;color:#475569;max-width:500px}
.photo{position:absolute;right:56px;top:116px;width:500px;height:350px;object-fit:cover;object-position:center 45%;filter:grayscale(1)}
.screen{position:absolute;right:272px;top:322px;width:330px;background:#fff;border:1px solid #CBD5E1;padding:5px}
.screen img{display:block;width:100%}
.line{position:absolute;left:56px;right:56px;bottom:74px;height:1px;background:#CBD5E1}
.line i{position:absolute;left:0;right:0;top:-1px;height:3px;background:#00C4CC}
.marks{position:absolute;left:56px;right:56px;bottom:36px;display:flex;justify-content:space-between;font-family:Poppins;font-weight:600;font-size:17px;color:#1E2D4A}
.marks span:last-child{font-weight:500;color:#475569}
.cap{position:absolute;right:56px;top:482px;width:230px;text-align:right;font-size:16px;line-height:1.35;color:#64748B}
</style></head><body>
<div class="bar"><img src="${pub('images/logo-horizontal-darkbg.webp')}"></div>
<div class="copy"><h1>${c.headline}</h1><p>${c.sub}</p></div>
<img class="photo" src="${pub('images/hub/air.webp')}">
<div class="screen"><img src="${pub('media/fletaris-air-poster.webp')}"></div>
<div class="cap">The Fletaris Air hangar view, with example data</div>
<div class="line"><i></i></div>
<div class="marks"><span>Today</span><span>In 24 months</span></div>
</body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  for (const [name, c] of Object.entries(CARDS)) {
    const tmp = path.join(require('os').tmpdir(), `og-${name}.html`);
    fs.writeFileSync(tmp, html(c));
    await page.goto('file:///' + tmp.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ type: 'png' });
    const jpg = await sharp(png).jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toBuffer();
    fs.writeFileSync(path.join(OUT, `${name}.jpg`), jpg);
    console.log(name, jpg.length);
  }
  await browser.close();
})();
