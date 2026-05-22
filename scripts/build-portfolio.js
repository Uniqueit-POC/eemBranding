const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG = './assets/images/EEM-Portfolio';
const template = fs.readFileSync(path.join(ROOT, 'arica.html'), 'utf8');

function enc(p) {
  return p.split('/').map(seg => encodeURIComponent(seg)).join('/').replace(/%2F/g, '/');
}

function galleryHtml(basePath, images, alt) {
  const b = enc(basePath);
  let out = '';
  if (images.length >= 2) {
    out += `                <div class="pg-item" data-index="1" style="grid-row: span 2;">
                  <img src="${b}/${images[1]}" alt="${alt} 02" style="height:100%;object-fit:cover;">
                  <div class="pg-zoom"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>
                </div>\n`;
  }
  for (let i = 2; i < Math.min(6, images.length); i++) {
    out += `                <div class="pg-item" data-index="${i}">
                  <img src="${b}/${images[i]}" alt="${alt} ${String(i + 1).padStart(2, '0')}">
                  <div class="pg-zoom"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>
                </div>\n`;
  }
  return out;
}

function buildDetailPage(cfg) {
  const filePath = path.join(ROOT, cfg.file);
  if (fs.existsSync(filePath) && !cfg.force) {
    console.log('skip exists', cfg.file);
    return;
  }
  const b = enc(cfg.basePath);
  const introImg = `                <div class="intro-img">
                  <img src="${b}/${cfg.images[0]}" alt="${cfg.alt} Cover">
                </div>`;
  const intro = `                <div>
                  <span class="intro-tag">${cfg.tag}</span>
                  <h1 class="intro-h lg:text-[80px]/90 sm:text-5xl text-4xxl lg:mb-30 mb-10 text-white headline">
                      ${cfg.headline}
                  </h1>
                  <p class="intro-p">${cfg.p1}</p>
                  <p class="intro-p">${cfg.p2}</p>
                </div>`;

  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>${cfg.title} – EEM Branding Portfolio</title>`);
  html = html.replace(
    /(<section class="intro-sec">[\s\S]*?<div class="intro-grid">\s*)<div class="intro-img">[\s\S]*?<\/div>\s*<div>[\s\S]*?<\/div>(\s*<\/div>\s*<\/div>\s*<\/section>)/,
    `$1${introImg}\n${intro}$2`
  );
  const gridInner = galleryHtml(cfg.basePath, cfg.images, cfg.alt);
  const gridSection = `          <section class="grid-sec">
            <div class="container">
              <div class="sec-header" style="margin-bottom:32px">
                <div>
                  <div class="sec-label">${cfg.collection}</div>
                  <h1 class="intro-h lg:text-[80px]/90 sm:text-5xl text-4xxl lg:mb-30 mb-10 text-white headline">
                      Project <em> Gallery </em>
                  </h1>
                </div>
              </div>
              <div class="pg-grid" id="pgGrid">
${gridInner}
              </div>
            </div>
          </section>`;
  html = html.replace(/<section class="grid-sec">[\s\S]*?<\/section>\s*(?=<!-- ── LIGHTBOX|<!-- ════════════════════════════════════════\s+SECTION 1)/, gridSection + '\n\n          ');
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('created', cfg.file);
}

const DETAIL_PAGES = [
  { file: 'iscon.html', title: 'Iscon', tag: 'Packaging Design', collection: 'Iscon Collection', alt: 'Iscon',
    headline: 'Packaging by <br> <em>Iscon</em>',
    p1: 'Premium packaging design for Iscon — clean layouts and strong product presentation across back design and retail-ready formats.',
    p2: 'Every panel is crafted for clarity, brand recall, and shelf impact. Durable visuals that work across print and production.',
    basePath: `${IMG}/All-catalogue/Iscon`, images: ['back-design-01.webp', 'back-design-02.webp', 'back-design-03.webp', 'back-design-04.webp'], force: true },
  { file: 'vauric.html', title: 'Vauric', tag: 'Packaging Design', collection: 'Vauric Collection', alt: 'Vauric',
    headline: 'Packaging by <br> <em>Vauric</em>',
    p1: 'Vauric packaging design — modern structure, refined typography, and a cohesive look across the full product range.',
    p2: 'Built for brands that need packaging to feel premium, trustworthy, and instantly recognizable on the shelf.',
    basePath: `${IMG}/All-catalogue/Vauric`, images: ['vauric-0.webp', 'vauric-01.webp', 'vauric-02.webp', 'vauric-03.webp'], force: true },
  { file: 'voxo.html', title: 'VOXO', tag: 'Packaging Design', collection: 'VOXO Collection', alt: 'VOXO',
    headline: 'Packaging by <br> <em>VOXO</em>',
    p1: 'VOXO packaging — bold graphics, structured hierarchy, and a contemporary identity system for product boxes and labels.',
    p2: 'Designed to stand out in competitive retail environments while keeping information clear and the brand memorable.',
    basePath: `${IMG}/All-catalogue/VOXO`, images: ['voxo-01.webp', 'voxo-02.webp', 'voxo-03.webp', 'voxo-04.webp', 'voxo-05.webp', 'voxo-06.webp'], force: true },
  { file: 'iscon-gathiya.html', title: 'Iscon Gathiya', tag: 'Social Media Creative', collection: 'Iscon Gathiya', alt: 'Iscon Gathiya',
    headline: 'Social creatives for <br> <em>Iscon Gathiya</em>',
    p1: 'Engaging social media creatives for Iscon Gathiya — vibrant posts that celebrate tradition with a modern digital touch.',
    p2: 'Consistent visual language across campaigns, festivals, and product highlights for stronger audience connection.',
    basePath: `${IMG}/All-catalogue/Iscon Gathiya`, images: ['iscon-01.webp', 'iscon-02.webp', 'iscon-03.webp', 'iscon-04.webp', 'iscon-05.webp', 'iscon-06.webp'], force: true },
  { file: 'puriteo.html', title: 'Puriteo', tag: 'Social Media Creative', collection: 'Puriteo', alt: 'Puriteo',
    headline: 'Social creatives for <br> <em>Puriteo</em>',
    p1: 'Puriteo social media design — fresh, clean visuals that communicate purity, quality, and everyday lifestyle appeal.',
    p2: 'Scroll-stopping posts and story-ready layouts built for consistent brand presence across platforms.',
    basePath: `${IMG}/All-catalogue/Puriteo`, images: ['puriteo-01.webp', 'puriteo-02.webp', 'puriteo-03.webp', 'puriteo-04.webp', 'puriteo-05.webp', 'puriteo-06.webp'], force: true },
  { file: 'rosewood.html', title: 'Rosewood', tag: 'Social Media Creative', collection: 'Rosewood', alt: 'Rosewood',
    headline: 'Social creatives for <br> <em>Rosewood</em>',
    p1: 'Rosewood social creatives — warm tones, elegant layouts, and messaging tailored for premium interior audiences.',
    p2: 'Campaign-ready designs that highlight textures, finishes, and the aspirational lifestyle behind the brand.',
    basePath: `${IMG}/All-catalogue/Rosewood`, images: ['01.webp', '02.webp', '03.webp', '04.webp', '05.webp', '06.webp'], force: true },
  { file: 'suntouch.html', title: 'Suntouch', tag: 'Social Media Creative', collection: 'Suntouch', alt: 'Suntouch',
    headline: 'Social creatives for <br> <em>Suntouch</em>',
    p1: 'Suntouch social media creatives — bright, energetic visuals designed to boost engagement and brand recall online.',
    p2: 'Flexible templates for product features, offers, and seasonal campaigns across social channels.',
    basePath: `${IMG}/All-catalogue/Suntouch`, images: ['sun-touch-01.webp', 'sun-touch-02.webp', 'sun-touch-03.webp', 'sun-touch-04.webp', 'sun-touch-05.webp', 'sun-touch-06.webp'], force: true },
  { file: '3d-rendering-portfolio.html', title: '3D Rendering', tag: '3D Rendering', collection: '3D Rendering Projects', alt: '3D Rendering',
    headline: 'Photoreal <br> <em>3D Rendering</em>',
    p1: 'High-quality 3D renders that bring products and spaces to life — realistic materials, lighting, and composition for marketing and sales.',
    p2: 'From laminates to interiors, every render is built to showcase detail, depth, and the true character of the design.',
    basePath: `${IMG}/3D-New-Size`, images: ['3D-01.webp', '3D-02.webp', '3D-03.webp', '3D-04.webp', '3D-05.webp', '3D-06.webp'], force: true },
  { file: 'smart-home.html', title: 'SmartHomes', tag: 'Logo Design', collection: 'SmartHomes', alt: 'SmartHomes',
    headline: 'Smart living <br> <em>SmartHomes</em>',
    p1: 'SmartHomes logo — clean, futuristic branding for a company using technology to make life more comfortable.',
    p2: 'A design that communicates smart, energy-wise, and always connected living for modern homeowners.',
    basePath: `${IMG}/All-catalogue/smart home`, images: ['smart-home-01.webp', 'smart-home-02.webp', 'smart-home-03.webp', 'smart-home-04.webp', 'smart-home-05.webp', 'smart-home-06.webp'], force: true },
  { file: 'vividus.html', title: 'Vividus', tag: 'Logo Design', collection: 'Vividus', alt: 'Vividus',
    headline: 'Bold identity <br> <em>Vividus</em>',
    p1: 'Vividus — bold, impactful branding for a high-end laminate brand that creates striking designs.',
    p2: 'Clean, sophisticated, and always in style — built for lasting recognition across every touchpoint.',
    basePath: `${IMG}/All-catalogue/vividums 01`, images: ['vividums-01.webp', 'vividums-02.webp', 'vividums-03.webp', 'vividums-04.webp', 'vividums-05.webp', 'vividums-06.webp'], force: true },
  { file: 'ranberry-south.html', title: 'Ranberry South', tag: 'Catalogue Design', collection: 'Ranberry South Collection', alt: 'Ranberry South',
    headline: 'Ranberry <br> <em>New South</em>',
    p1: 'Ranberry New South — deeper tones and richer textures tailored for premium commercial and residential interiors.',
    p2: 'A southern edition catalogue with updated finishes designed for bold, contemporary spaces.',
    basePath: `${IMG}/All-catalogue/ranberry new south`, images: ['01-ran-berry.webp', '02-ran-berry.webp', '03-ran-berry.webp', '04-ran-berry.webp', '05-ran-berry.webp', '06-ran-berry.webp'], force: true },
];

DETAIL_PAGES.forEach(buildDetailPage);

// Verify Iscon files exist
const isconDir = path.join(ROOT, 'assets/images/EEM-Portfolio/All-catalogue/Iscon');
if (fs.existsSync(isconDir)) {
  console.log('Iscon files:', fs.readdirSync(isconDir).slice(0, 6));
}

console.log('Detail pages done');
