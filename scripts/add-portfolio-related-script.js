const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));

for (const file of pages) {
  const filePath = path.join(ROOT, file);
  let html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('id="sliderTrack"')) continue;

  let changed = false;

  if (html.includes('/* Our Work slider — portfolio-related.js */')) {
    html = html.replace(
      '/* Our Work slider — portfolio-related.js */',
      '/* Our Work slider (see assets/js/portfolio-related.js) */'
    );
    changed = true;
  }

  if (!html.includes('src="assets/js/portfolio-pages.js"')) {
    html = html.replace(
      '<script src="assets/js/custom.js"></script>',
      '<script src="assets/js/portfolio-pages.js"></script>\n  <script src="assets/js/custom.js"></script>'
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('script added', file);
  }
}

console.log('Done');
