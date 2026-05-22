const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
const re = /src=["']([^"']+)["']/gi;
const broken = [];

for (const page of pages) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  if (!html.includes('intro-sec')) continue;
  let m;
  while ((m = re.exec(html))) {
    const src = m[1];
    if (!/assets\/images\/EEM-Portfolio/i.test(src)) continue;
    const p = path.join(ROOT, decodeURIComponent(src.replace(/^\.\//, '')));
    if (!fs.existsSync(p)) broken.push({ page, src });
  }
}

console.log('Broken:', broken.length);
broken.forEach((b) => console.log(b.page + ' -> ' + b.src));
