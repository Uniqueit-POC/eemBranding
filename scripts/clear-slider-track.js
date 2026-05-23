const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const RE = /<div class="slider-track" id="sliderTrack">[\s\S]*?<\/div><!-- \/slider-track -->/;

const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html"));
let n = 0;

pages.forEach((file) => {
  const p = path.join(ROOT, file);
  let html = fs.readFileSync(p, "utf8");
  if (!html.includes('id="sliderTrack"') || !html.includes("sl-card")) return;
  const next = html.replace(
    RE,
    '<div class="slider-track" id="sliderTrack">\n\n                </div><!-- /slider-track -->'
  );
  if (next !== html) {
    fs.writeFileSync(p, next, "utf8");
    console.log("cleared slider", file);
    n++;
  }
});

console.log("Done:", n);
