/**
 * One-time / repeatable project consolidation:
 * - Move Portfolio.html <style> into dev-style.css
 * - Clean portfolio detail pages (scripts, slider HTML, head links)
 * - Remove obsolete HTML files
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DEV_STYLE = path.join(ROOT, "assets/css/dev-style.css");

const OBSOLETE_HTML = [
  "lucullian.html",
  "greta-soical.html",
  "greta-lam-stylish-collection.html",
];

const PORTFOLIO_SCRIPTS = `  <script src="assets/vendor/wow/wow.js"></script>
  <script src="assets/js/animation.js"></script>
  <script src="assets/js/portfolio-pages.js"></script>
  <script src="assets/js/custom.js"></script>
`;

function extractPortfolioStyles() {
  const portfolioPath = path.join(ROOT, "Portfolio.html");
  let html = fs.readFileSync(portfolioPath, "utf8");
  const m = html.match(/<style>([\s\S]*?)<\/style>/);
  if (!m) {
    console.log("Portfolio.html: no inline <style> block");
    return;
  }

  let dev = fs.readFileSync(DEV_STYLE, "utf8");
  const marker = "/* ── Portfolio listing page (Portfolio.html) ── */";
  if (!dev.includes(marker)) {
    dev += "\n\n" + marker + "\n" + m[1].trim() + "\n";
    fs.writeFileSync(DEV_STYLE, dev, "utf8");
    console.log("Appended portfolio listing styles to dev-style.css");
  }

  html = html.replace(/<style>[\s\S]*?<\/style>\s*/i, "");
  if (!html.includes('class="portfolio-layout"')) {
    html = html.replace(/<body([^>]*)>/i, '<body$1 class="portfolio-layout">');
  }
  fs.writeFileSync(portfolioPath, html, "utf8");
  console.log("Removed inline <style> from Portfolio.html");
}

function normalizeHead(html) {
  html = html.replace(
    /<link rel="stylesheet" href="\.\/assets\/css\/dev-style\.css"\s*\/?>\s*/gi,
    ""
  );
  if (!html.includes('href="assets/css/dev-style.css"')) {
    html = html.replace(
      /(<link rel="stylesheet" href="assets\/css\/style\.css">)/,
      '$1\n  <link rel="stylesheet" href="assets/css/dev-style.css">'
    );
  }
  html = html.replace(
    /<link rel="stylesheet" href="\.\/assets\/css\/video-showcase\.css"\s*\/?>\s*/gi,
    ""
  );
  return html;
}

function cleanPortfolioDetailPage(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  if (!html.includes('id="pgGrid"')) return false;

  let changed = false;

  if (!/<body[^>]*class="[^"]*portfolio-detail-page/.test(html)) {
    html = html.replace(/<body(\s*)>/i, '<body$1 class="portfolio-detail-page">');
    changed = true;
  }

  const trackRe =
    /<div class="slider-track" id="sliderTrack">[\s\S]*?<\/div><!-- \/slider-track -->/;
  if (html.includes("sl-card") && trackRe.test(html)) {
    html = html.replace(
      trackRe,
      '<div class="slider-track" id="sliderTrack">\n\n                </div><!-- /slider-track -->'
    );
    changed = true;
  }

  const inlineScriptRe =
    /<script>\s*\/\* Our Work slider[\s\S]*?<\/script>\s*(?=<\/body>)/i;
  if (inlineScriptRe.test(html)) {
    html = html.replace(inlineScriptRe, "");
    changed = true;
  }

  const scriptsBlockRe = /(<script src="assets\/vendor\/gsap[\s\S]*?)(<\/body>)/i;
  if (scriptsBlockRe.test(html)) {
    html = html.replace(scriptsBlockRe, PORTFOLIO_SCRIPTS + "\n$2");
    changed = true;
  } else if (!html.includes("portfolio-pages.js")) {
    html = html.replace(
      /<script src="assets\/js\/portfolio-related\.js"><\/script>\s*/i,
      ""
    );
    html = html.replace(
      /<script src="assets\/js\/custom\.js"><\/script>/i,
      '<script src="assets/js/portfolio-pages.js"></script>\n  <script src="assets/js/custom.js"></script>'
    );
    changed = true;
  }

  html = html.replace(
    /<script src="assets\/js\/portfolio-related\.js"><\/script>\s*/gi,
    '<script src="assets/js/portfolio-pages.js"></script>\n  '
  );

  const norm = normalizeHead(html);
  if (norm !== html) {
    html = norm;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, "utf8");
    return true;
  }
  return false;
}

function removeObsoleteFiles() {
  OBSOLETE_HTML.forEach((name) => {
    const p = path.join(ROOT, name);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log("Removed", name);
    }
  });
  ["Portfolio copy 2.html", "Portfolio copy.html", "index copy 2.html", "index copy.html"].forEach(
    (name) => {
      const p = path.join(ROOT, name);
      if (fs.existsSync(p)) {
        fs.unlinkSync(p);
        console.log("Removed", name);
      }
    }
  );
}

extractPortfolioStyles();
removeObsoleteFiles();

const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html"));
let cleaned = 0;
pages.forEach((file) => {
  if (cleanPortfolioDetailPage(path.join(ROOT, file))) {
    console.log("cleaned", file);
    cleaned++;
  }
});

console.log("Detail pages cleaned:", cleaned);
