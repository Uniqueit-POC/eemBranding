const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG = './assets/images/EEM-Portfolio';
const IMG_ROOT = path.join(ROOT, 'assets/images/EEM-Portfolio');
const catalogueTemplate = fs.readFileSync(path.join(ROOT, 'century-prowud-stylogue.html'), 'utf8');
const brandingTemplate = fs.readFileSync(path.join(ROOT, 'aaryan-tradelink.html'), 'utf8');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyAssetSync(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn('missing source:', src);
    return false;
  }
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  return true;
}

/** Copy new portfolio assets into All-catalogue (URL-safe names). */
function syncNewPortfolioAssets() {
  const syncJobs = [
    {
      destDir: path.join(IMG_ROOT, 'All-catalogue/century-prowud'),
      files: [
        ['All Catalogue/Century/Century 01.webp', 'century-01.webp'],
        ['All Catalogue/Century/Century 02.webp', 'century-02.webp'],
        ['All Catalogue/Century/Century 03.webp', 'century-03.webp'],
        ['All Catalogue/Century/Century 04.webp', 'century-04.webp'],
        ['All Catalogue/Century/Century 05.webp', 'century-05.webp'],
      ],
    },
    {
      destDir: path.join(IMG_ROOT, 'All-catalogue/ranberry-acrylic'),
      files: [
        ['All Catalogue/ranberry acrylic/ranberry new 01.webp', 'ranberry-acrylic-01.webp'],
        ['All Catalogue/ranberry acrylic/ranberry new 02.webp', 'ranberry-acrylic-02.webp'],
        ['All Catalogue/ranberry acrylic/ranberry new 03.webp', 'ranberry-acrylic-03.webp'],
        ['All Catalogue/ranberry acrylic/ranberry new 04.webp', 'ranberry-acrylic-04.webp'],
        ['All Catalogue/ranberry acrylic/ranberry new 05.webp', 'ranberry-acrylic-05.webp'],
        ['All Catalogue/ranberry acrylic/ranberry new 06.webp', 'ranberry-acrylic-06.webp'],
      ],
    },
    {
      destDir: path.join(IMG_ROOT, 'All-catalogue/alak-smart-security'),
      files: [
        ['All Logo Portfolio/Alak/alak 01.jpg', 'alak-01.jpg'],
        ['All Logo Portfolio/Alak/alak 02.jpg', 'alak-02.jpg'],
        ['All Logo Portfolio/Alak/alak 03.jpg', 'alak-03.jpg'],
        ['All Logo Portfolio/Alak/alak 04.jpg', 'alak-04.jpg'],
        ['All Logo Portfolio/Alak/alak 05.jpg', 'alak-05.jpg'],
        ['All Logo Portfolio/Alak/alak 06.jpg', 'alak-06.jpg'],
      ],
    },
    {
      destDir: path.join(IMG_ROOT, 'All-catalogue/sarvghn-engineering'),
      files: [
        ['All Logo Portfolio/sarvghn/sarvghn 01.webp', 'sarvghn-01.webp'],
        ['All Logo Portfolio/sarvghn/sarvghn 02.webp', 'sarvghn-02.webp'],
        ['All Logo Portfolio/sarvghn/sarvghn 03.webp', 'sarvghn-03.webp'],
        ['All Logo Portfolio/sarvghn/sarvghn 04.webp', 'sarvghn-04.webp'],
        ['All Logo Portfolio/sarvghn/sarvghn 05.webp', 'sarvghn-05.webp'],
        ['All Logo Portfolio/sarvghn/sarvghn 06.webp', 'sarvghn-06.webp'],
      ],
    },
  ];

  syncJobs.forEach((job) => {
    job.files.forEach(([relSrc, destName]) => {
      const ok = copyAssetSync(
        path.join(IMG_ROOT, relSrc),
        path.join(job.destDir, destName)
      );
      if (ok) console.log('synced', destName);
    });
  });
}

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
  const template =
    cfg.template === 'branding' ? brandingTemplate : catalogueTemplate;
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

  html = html.replace(/<body(\s*)>/i, '<body$1 class="portfolio-detail-page">');
  html = html.replace(
    /<div class="slider-track" id="sliderTrack">[\s\S]*?<\/div><!-- \/slider-track -->/,
    '<div class="slider-track" id="sliderTrack">\n\n                </div><!-- /slider-track -->'
  );
  html = html.replace(
    /<script src="assets\/vendor\/gsap[\s\S]*?<script src="assets\/js\/custom\.js"><\/script>\s*(?:<script>[\s\S]*?<\/script>\s*)?(?=<\/body>)/i,
    `<script src="assets/vendor/wow/wow.js"></script>
  <script src="assets/js/animation.js"></script>
  <script src="assets/js/portfolio-pages.js"></script>
  <script src="assets/js/custom.js"></script>

`
  );
  html = html.replace(/<link rel="stylesheet" href="\.\/assets\/css\/dev-style\.css"\s*\/?>\s*/gi, '');
  if (!html.includes('href="assets/css/dev-style.css"')) {
    html = html.replace(
      /(<link rel="stylesheet" href="assets\/css\/style\.css">)/,
      '$1\n  <link rel="stylesheet" href="assets/css/dev-style.css">'
    );
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('created', cfg.file);
}

const DETAIL_PAGES = [
  { file: 'iscon.html', title: 'Iscon', tag: 'Packaging Design', collection: 'Iscon Collection', alt: 'Iscon',
    headline: 'Packaging by <br> <em>Iscon</em>',
    p1: 'Premium packaging design for Iscon — clean layouts and strong product presentation across back design and retail-ready formats.',
    p2: 'Every panel is crafted for clarity, brand recall, and shelf impact. Durable visuals that work across print and production.',
    basePath: `${IMG}/All-catalogue/Iscon`, images: ['back-design-01.webp', 'back-design-02.webp', 'back-design-03.webp', 'back-design-04.webp'] },
  { file: 'vauric.html', title: 'Vauric', tag: 'Packaging Design', collection: 'Vauric Collection', alt: 'Vauric',
    headline: 'Packaging by <br> <em>Vauric</em>',
    p1: 'Vauric packaging design — modern structure, refined typography, and a cohesive look across the full product range.',
    p2: 'Built for brands that need packaging to feel premium, trustworthy, and instantly recognizable on the shelf.',
    basePath: `${IMG}/All-catalogue/Vauric`, images: ['vauric-0.webp', 'vauric-01.webp', 'vauric-02.webp', 'vauric-03.webp'] },
  { file: 'voxo.html', title: 'VOXO', tag: 'Packaging Design', collection: 'VOXO Collection', alt: 'VOXO',
    headline: 'Packaging by <br> <em>VOXO</em>',
    p1: 'VOXO packaging — bold graphics, structured hierarchy, and a contemporary identity system for product boxes and labels.',
    p2: 'Designed to stand out in competitive retail environments while keeping information clear and the brand memorable.',
    basePath: `${IMG}/All-catalogue/VOXO`, images: ['voxo-01.webp', 'voxo-02.webp', 'voxo-03.webp', 'voxo-04.webp', 'voxo-05.webp', 'voxo-06.webp'] },
  { file: 'iscon-gathiya.html', title: 'Iscon Gathiya', tag: 'Social Media Creative', collection: 'Iscon Gathiya', alt: 'Iscon Gathiya',
    headline: 'Social creatives for <br> <em>Iscon Gathiya</em>',
    p1: 'Engaging social media creatives for Iscon Gathiya — vibrant posts that celebrate tradition with a modern digital touch.',
    p2: 'Consistent visual language across campaigns, festivals, and product highlights for stronger audience connection.',
    basePath: `${IMG}/All-catalogue/Iscon Gathiya`, images: ['iscon-01.webp', 'iscon-02.webp', 'iscon-03.webp', 'iscon-04.webp', 'iscon-05.webp', 'iscon-06.webp'] },
  { file: 'puriteo.html', title: 'Puriteo', tag: 'Social Media Creative', collection: 'Puriteo', alt: 'Puriteo',
    headline: 'Social creatives for <br> <em>Puriteo</em>',
    p1: 'Puriteo social media design — fresh, clean visuals that communicate purity, quality, and everyday lifestyle appeal.',
    p2: 'Scroll-stopping posts and story-ready layouts built for consistent brand presence across platforms.',
    basePath: `${IMG}/All-catalogue/Puriteo`, images: ['puriteo-01.webp', 'puriteo-02.webp', 'puriteo-03.webp', 'puriteo-04.webp', 'puriteo-05.webp', 'puriteo-06.webp'] },
  { file: 'rosewood.html', title: 'Rosewood', tag: 'Social Media Creative', collection: 'Rosewood', alt: 'Rosewood',
    headline: 'Social creatives for <br> <em>Rosewood</em>',
    p1: 'Rosewood social creatives — warm tones, elegant layouts, and messaging tailored for premium interior audiences.',
    p2: 'Campaign-ready designs that highlight textures, finishes, and the aspirational lifestyle behind the brand.',
    basePath: `${IMG}/All-catalogue/Rosewood`, images: ['01.webp', '02.webp', '03.webp', '04.webp', '05.webp', '06.webp'] },
  { file: 'suntouch.html', title: 'Suntouch', tag: 'Social Media Creative', collection: 'Suntouch', alt: 'Suntouch',
    headline: 'Social creatives for <br> <em>Suntouch</em>',
    p1: 'Suntouch social media creatives — bright, energetic visuals designed to boost engagement and brand recall online.',
    p2: 'Flexible templates for product features, offers, and seasonal campaigns across social channels.',
    basePath: `${IMG}/All-catalogue/Suntouch`, images: ['sun-touch-01.webp', 'sun-touch-02.webp', 'sun-touch-03.webp', 'sun-touch-04.webp', 'sun-touch-05.webp', 'sun-touch-06.webp'] },
  { file: '3d-rendering-portfolio.html', title: '3D Rendering', tag: '3D Rendering', collection: '3D Rendering Projects', alt: '3D Rendering',
    headline: 'Photoreal <br> <em>3D Rendering</em>',
    p1: 'High-quality 3D renders that bring products and spaces to life — realistic materials, lighting, and composition for marketing and sales.',
    p2: 'From laminates to interiors, every render is built to showcase detail, depth, and the true character of the design.',
    basePath: `${IMG}/3D-New-Size`, images: ['3D-01.webp', '3D-02.webp', '3D-03.webp', '3D-04.webp', '3D-05.webp', '3D-06.webp'] },
  { file: 'smart-home.html', title: 'SmartHomes', tag: 'Logo Design', collection: 'SmartHomes', alt: 'SmartHomes',
    headline: 'Smart living <br> <em>SmartHomes</em>',
    p1: 'SmartHomes logo — clean, futuristic branding for a company using technology to make life more comfortable.',
    p2: 'A design that communicates smart, energy-wise, and always connected living for modern homeowners.',
    basePath: `${IMG}/All-catalogue/smart home`, images: ['smart-home-01.webp', 'smart-home-02.webp', 'smart-home-03.webp', 'smart-home-04.webp', 'smart-home-05.webp', 'smart-home-06.webp'] },
  { file: 'vividus.html', title: 'Vividus', tag: 'Logo Design', collection: 'Vividus', alt: 'Vividus',
    headline: 'Bold identity <br> <em>Vividus</em>',
    p1: 'Vividus — bold, impactful branding for a high-end laminate brand that creates striking designs.',
    p2: 'Clean, sophisticated, and always in style — built for lasting recognition across every touchpoint.',
    basePath: `${IMG}/All-catalogue/vividums 01`, images: ['vividums-01.webp', 'vividums-02.webp', 'vividums-03.webp', 'vividums-04.webp', 'vividums-05.webp', 'vividums-06.webp'] },
  { file: 'ranberry-south.html', title: 'Ranberry South', tag: 'Catalogue Design', collection: 'Ranberry South Collection', alt: 'Ranberry South',
    headline: 'Ranberry <br> <em>New South</em>',
    p1: 'Ranberry New South — deeper tones and richer textures tailored for premium commercial and residential interiors.',
    p2: 'A southern edition catalogue with updated finishes designed for bold, contemporary spaces.',
    basePath: `${IMG}/All-catalogue/ranberry new south`, images: ['01-ran-berry.webp', '02-ran-berry.webp', '03-ran-berry.webp', '04-ran-berry.webp', '05-ran-berry.webp', '06-ran-berry.webp'] },
  { file: 'kianna.html', title: 'Kiana Acrylic Master Collection', tag: 'Catalogue Design', collection: 'Kiana Acrylic Master Collection', alt: 'Kiana Acrylic',
    headline: 'Kiana Acrylic <br> <em>Master Collection</em>',
    p1: "The design strategy blends contemporary geometry with expressive, main-character artistry to highlight the brand's vibrant identity. Moving away from standard monochromatic industrial covers, this layout uses a refreshing, sophisticated sage green palette that bridges natural serenity with modern design.",
    p2: 'The visual narrative is split dynamically by a fluid, curved horizon line: the upper section reveals a serene, gold-veined marble landscape, while a vibrant, multi-colored bird in full flight serves as a striking metaphor for creative freedom and the brand\'s tagline, "Add Colour to Your Life."',
    basePath: `${IMG}/All-catalogue/kiana acrylic`, images: ['kiana-acrylic-01.webp', 'kiana-acrylic-02.webp', 'kiana-acrylic-03.webp', 'kiana-acrylic-04.webp', 'kiana-acrylic-05.webp', 'kiana-acrylic-06.webp'], force: true },
  { file: 'century-prowud-stylogue.html', title: 'Century Prowud Stylogue Neo', tag: 'Catalogue Design', collection: 'Century Prowud Collection', alt: 'Century Prowud Stylogue',
    headline: "Century Prowud's <br> <em>Stylogue Neo Vol. 2.0</em>",
    p1: 'The design objective was to elevate a traditional product catalogue into a premium visual narrative for contemporary living. The cover bypasses standard product grids for a striking minimalist metaphor: an abstract, multi-textured wooden egg cradled by raw, organic driftwood.',
    p2: 'Each layer showcases distinct prelam grains and hues—from earthy tones to moss greens and deep charcoals—symbolising the collection\'s diversity and natural origins. Clean typography and a neutral palette position pre-laminated boards as essential elements of high-end interior art and modern architectural surfacing.',
    basePath: `${IMG}/All-catalogue/century-prowud`, images: ['century-01.webp', 'century-02.webp', 'century-03.webp', 'century-04.webp', 'century-05.webp'], force: true },
  { file: 'dazzle-berry-colours-trend.html', title: 'Dazzle Berry Colours Trend', tag: 'Catalogue Design', collection: 'Dazzle Berry Colours Trend', alt: 'Dazzle Berry Colours Trend',
    headline: "Dazzle Berry's <br> <em>Colours Trend</em>",
    p1: "Dazzle Berry's Colours Trend (Pastel & Crystal) Collection explores high-energy vibrancy designed to break through traditional surfacing portfolios—embracing a bold, radiant marigold yellow canvas that commands attention.",
    p2: 'A multi-coloured bird in dynamic flight symbolises the expansive palette, elegantly framed by an intricate golden mandala that adds heritage and structural art to the composition.',
    basePath: `${IMG}/All-catalogue/dazzle-berry-pastel-crystal`, images: ['01.webp', '02.webp', '03.webp', '04.webp', '05.webp', '06.webp'], force: true },
  { file: 'acrylic-by-ranberry.html', title: 'Acrylic by Ranberry', tag: 'Catalogue Design', collection: 'Acrylic by Ranberry', alt: 'Acrylic by Ranberry',
    headline: 'Acrylic by <br> <em>Ranberry</em>',
    p1: 'Acrylic by Ranberry is a refined surface collection with a sleek high-gloss finish—clear and deep like a mirror—making laminates look luxurious and modern in any space.',
    p2: 'Durable, scratch-resistant, and easy to clean, these surfaces suit kitchens, wardrobes, retail, and commercial environments. The collection turns every room into an elegant, stylish statement.',
    basePath: `${IMG}/All-catalogue/ranberry-acrylic`, images: ['ranberry-acrylic-01.webp', 'ranberry-acrylic-02.webp', 'ranberry-acrylic-03.webp', 'ranberry-acrylic-04.webp', 'ranberry-acrylic-05.webp', 'ranberry-acrylic-06.webp'], force: true },
  { file: 'alak-smart-security.html', title: 'ALAK Smart Security', tag: 'Logo Design', collection: 'ALAK Smart Security', alt: 'ALAK Smart Security', template: 'branding',
    headline: 'ALAK <br> <em>Smart Security</em>',
    p1: 'The brand identity for ALAK Smart Security translates complex digital protection into a sleek, high-impact visual signature on a deep tech-noir background.',
    p2: "Custom typography weaves security into the letterforms—a fluid magenta 'A' cradles a fingerprint emblem, while shield and smart-lock icons integrate into the 'A' and 'K' to reinforce data and physical defence.",
    basePath: `${IMG}/All-catalogue/alak-smart-security`, images: ['alak-01.jpg', 'alak-02.jpg', 'alak-03.jpg', 'alak-04.jpg', 'alak-05.jpg', 'alak-06.jpg'], force: true },
  { file: 'sarvghn-engineering.html', title: 'Sarvghn Engineering', tag: 'Logo Design', collection: 'Sarvghn Engineering', alt: 'Sarvghn Engineering', template: 'branding',
    headline: 'Sarvghn <br> <em>Engineering</em>',
    p1: 'Sarvghn Engineering is anchored in industrial precision, structural integrity, and architectural permanence—communicating synergy, cyclical perfection, and robust solutions.',
    p2: "A sophisticated geometric monogram fuses 'S' and 'E' into a continuous interlocking emblem, paired with bold heavy-weight typography that radiates stability and authoritative industrial presence.",
    basePath: `${IMG}/All-catalogue/sarvghn-engineering`, images: ['sarvghn-01.webp', 'sarvghn-02.webp', 'sarvghn-03.webp', 'sarvghn-04.webp', 'sarvghn-05.webp', 'sarvghn-06.webp'], force: true },
];

syncNewPortfolioAssets();
DETAIL_PAGES.forEach(buildDetailPage);

// Verify Iscon files exist
const isconDir = path.join(ROOT, 'assets/images/EEM-Portfolio/All-catalogue/Iscon');
if (fs.existsSync(isconDir)) {
  console.log('Iscon files:', fs.readdirSync(isconDir).slice(0, 6));
}

console.log('Detail pages done');
