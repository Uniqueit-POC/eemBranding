const fs = require('fs');
const path = require('path');

const portfolioPath = path.join(__dirname, '..', 'Portfolio.html');
const gridSnippet = fs.readFileSync(path.join(__dirname, 'portfolio-grid-snippet.html'), 'utf8');

let html = fs.readFileSync(portfolioPath, 'utf8');

const startMarker = '<div class="portfolio-grid" id="portfolioGrid">';
const endMarker = '      <!-- ── MARQUEE ── -->';

const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Markers not found');
  process.exit(1);
}

const before = html.slice(0, startIdx + startMarker.length);
const after = html.slice(endIdx);

const newGrid = '\n\n' + gridSnippet.trim() + '\n\n              </div>\n            </div>\n      </section>\n\n            </div><!-- /.portfolio-main -->\n          </div><!-- /.portfolio-layout -->\n\n      ';

html = before + newGrid + after.replace(/^\s*/, '');

fs.writeFileSync(portfolioPath, html, 'utf8');
console.log('Portfolio.html grid patched');
