const fs = require('fs');
const path = require('path');

function enc(p) {
  return p.split('/').map(seg => encodeURIComponent(seg)).join('/').replace(/%2F/g, '/');
}

function card({ cat, featured, href, img, alt, badge, industry, title, desc, tags }) {
  const feat = featured ? ' featured' : '';
  const tagHtml = tags.map(t => `<span class="pf-tag">${t}</span>`).join('');
  return `
                <div class="pf-card${feat} reveal" data-cat="${cat}" data-href="${href}" role="link" tabindex="0">
                  <div class="pf-img">
                    <div class="pf-img-inner">
                      <img src="${enc(img)}" alt="${alt}" loading="lazy"
                        style="width:100%;height:100%;object-fit:cover;display:block;">
                    </div>
                    <div class="pf-overlay">
                      <div class="pf-overlay-cta">View Project <span class="pf-overlay-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span></div>
                    </div>
                    <div class="pf-badge">${badge}</div>
                  </div>
                  <div class="pf-body">
                    <div class="pf-industry">${industry}</div>
                    <h2 class="pf-title">${title}</h2>
                    <p class="pf-desc">${desc}</p>
                    <div class="pf-footer">
                      <div class="pf-tags">${tagHtml}</div>
                      <div class="pf-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
                    </div>
                  </div>
                </div>`;
}

const I = './assets/images/EEM-Portfolio';

const projects = [
  // Catalogue
  { cat: 'catalogue', featured: true, href: 'century-prowud-stylogue.html', img: `${I}/All-catalogue/Arica/Arica-01.webp`, alt: 'Arica', badge: 'Catalogue', industry: 'Laminate Design', title: 'Arica', desc: 'The Art by Arica — premium laminate catalogue with textures from warm wood to modern stone.', tags: ['Catalogue', 'Laminate'] },
  { cat: 'catalogue', href: 'atina.html', img: `${I}/All-catalogue/atina/atina01.webp`, alt: 'Atina', badge: 'Catalogue', industry: 'Laminate Design', title: 'Atina', desc: 'Face the future of laminates by Atina — modern textures and strong finishes for creative interiors.', tags: ['Catalogue', 'Laminate'] },
  { cat: 'catalogue', href: 'asa-decosheets.html', img: `${I}/All-catalogue/dazzle-berry-asa/dazzle-berry-asa-01.webp`, alt: 'ASA Decosheets', badge: 'Catalogue', industry: 'Laminate Design', title: 'ASA Decosheets', desc: 'ASA Decosheets by Dazzle Berry — durable surfaces for indoor and outdoor design.', tags: ['Catalogue', 'ASA'] },
  { cat: 'catalogue', href: 'dazzle-berry-colours-trend.html', img: `${I}/All-catalogue/dazzle-berry-pastel-crystal/01.webp`, alt: 'Dazzle Berry Colours Trend', badge: 'Catalogue', industry: 'Laminate Design', title: "Dazzle Berry's Colours Trend", desc: 'Pastel & Crystal collection — bold marigold canvas, dynamic bird motif, and golden mandala framing.', tags: ['Catalogue', 'Pastel'] },
  { cat: 'catalogue', href: 'century-prowud-stylogue.html', img: `${I}/All-catalogue/century-prowud/century-01.webp`, alt: 'Century Prowud Stylogue', badge: 'Catalogue', industry: 'Laminate Design', title: "Century Prowud's Stylogue Neo", desc: 'Premium catalogue design — minimalist wooden egg metaphor and sophisticated neutral palette.', tags: ['Catalogue', 'Premium'] },
  { cat: 'catalogue', href: 'acrylic-by-ranberry.html', img: `${I}/All-catalogue/ranberry-acrylic/ranberry-acrylic-01.webp`, alt: 'Acrylic by Ranberry', badge: 'Catalogue', industry: 'Acrylic Design', title: 'Acrylic by Ranberry', desc: 'High-gloss acrylic surfaces — luxurious mirror-like finish, durable and easy to maintain.', tags: ['Catalogue', 'Acrylic'] },
  { cat: 'catalogue', href: 'bliss.html', img: `${I}/All-catalogue/kooyoo/kooyoo-01.webp`, alt: 'Bliss Decor', badge: 'Catalogue', industry: 'Laminate Design', title: 'Bliss Decor', desc: 'The Strength Transcend by Bliss Decor — elegant, scratch-resistant laminates built to last.', tags: ['Catalogue', 'Laminate'] },
  { cat: 'catalogue', href: 'greta.html', img: `${I}/All-catalogue/greta/greeta-0.8-01.webp`, alt: 'Greta Lam Stylish', badge: 'Catalogue', industry: 'Laminate Design', title: 'Greta Lam Stylish', desc: 'Greta Lam Stylish Collection — Art Deco-inspired geometry with a premium, high-end persona.', tags: ['Catalogue', 'Laminate'] },
  { cat: 'catalogue', href: 'greta.html', img: `${I}/All-catalogue/greta-1/greta-01.webp`, alt: 'Greta Lam', badge: 'Catalogue', industry: 'Laminate Design', title: 'Greta Lam', desc: 'Greta Lam — warm cream and terracotta palette with timeless cultural sophistication.', tags: ['Catalogue', 'Texture'] },
  { cat: 'catalogue', href: 'live-in-colour.html', img: `${I}/All-catalogue/kaptone/kaptone-01.webp`, alt: 'Live in Colour', badge: 'Catalogue', industry: 'Laminate Design', title: 'Live in Colour', desc: 'Live in Colour by Kaptone — bold colours and modern finishes that make spaces pop.', tags: ['Catalogue', 'Colour'] },
  { cat: 'catalogue', href: 'kianna.html', img: `${I}/All-catalogue/kiana acrylic/kiana-acrylic-01.webp`, alt: 'Kiana Acrylic Master Collection', badge: 'Catalogue', industry: 'Acrylic Design', title: 'Kiana Acrylic Master Collection', desc: 'Sage green palette, gold-veined marble, and a bird in flight — geometry meets expressive colour for Kiana Acrylic.', tags: ['Catalogue', 'Acrylic'] },
  { cat: 'catalogue', href: 'luxe-style.html', img: `${I}/All-catalogue/kooyoo/kooyoo-01.webp`, alt: 'Luxe Style', badge: 'Catalogue', industry: 'Laminate Design', title: 'Luxe Style', desc: 'Luxe Style — high-end looks with classy textures and timeless elegance.', tags: ['Catalogue', 'Luxury'] },
  { cat: 'catalogue', href: 'trends-by-ranberry.html', img: `${I}/All-catalogue/ranberry new/ranberry-new-01.webp`, alt: 'Trends by Ranberry', badge: 'Catalogue', industry: 'Laminate Design', title: 'Trends by Ranberry', desc: 'Trends by Ranberry — forward-thinking laminates inspired by modern design lifestyles.', tags: ['Catalogue', 'Laminate'] },
  { cat: 'catalogue', href: 'ranberry-south.html', img: `${I}/All-catalogue/ranberry new south/01-ran-berry.webp`, alt: 'Ranberry South', badge: 'Catalogue', industry: 'Laminate Design', title: 'Ranberry New South', desc: 'Ranberry New South — deeper tones for premium commercial and residential interiors.', tags: ['Catalogue', 'Commercial'] },
  { cat: 'catalogue', href: 'acrylic-by-rang-in.html', img: `${I}/All-catalogue/kiana acrylic/kiana-acrylic-01.webp`, alt: 'Acrylic by Rang-In', badge: 'Catalogue', industry: 'Acrylic Design', title: 'Acrylic by Rang-In', desc: 'Acrylic by Rang-In — sleek high-gloss surfaces, durable and easy to clean.', tags: ['Catalogue', 'Acrylic'] },
  { cat: 'catalogue', href: 'rang-in-matt-book.html', img: `${I}/All-catalogue/rangin/rangin-01.webp`, alt: 'Rang In Matt Book', badge: 'Catalogue', industry: 'Laminate Design', title: 'Rang In Matt Book', desc: 'Rang In Matt Book Signature Edition — calm matte finishes for modern minimal interiors.', tags: ['Catalogue', 'Matte'] },
  { cat: 'catalogue', href: 'ranwood-face-of-grandeur.html', img: `${I}/All-catalogue/ranwood/ranwood-01.webp`, alt: 'Ranwood', badge: 'Catalogue', industry: 'Wood Laminate', title: 'Ranwood – Face of Grandeur', desc: 'Ranwood Face of Grandeur — premium wood-inspired laminates with authentic grain detail.', tags: ['Catalogue', 'Wood'] },
  { cat: 'catalogue', href: 'ranwood-masterpiece-of-prestige.html', img: `${I}/All-catalogue/ranwood rega/ranwood-01.webp`, alt: 'Ranwood Masterpiece', badge: 'Catalogue', industry: 'Wood Laminate', title: 'Ranwood – Masterpiece', desc: 'Ranwood Masterpiece of Prestige — fancy wood-look laminates with meticulous detail.', tags: ['Catalogue', 'Wood', 'Luxury'] },
  // Packaging
  { cat: 'packaging', href: 'iscon.html', img: `${I}/All-catalogue/Iscon/back-design-01.webp`, alt: 'Iscon', badge: 'Packaging', industry: 'Packaging Design', title: 'Iscon', desc: 'Iscon packaging — structured back designs and retail-ready product presentation.', tags: ['Packaging', 'Print'] },
  { cat: 'packaging', href: 'vauric.html', img: `${I}/All-catalogue/Vauric/vauric-0.webp`, alt: 'Vauric', badge: 'Packaging', industry: 'Packaging Design', title: 'Vauric', desc: 'Vauric packaging design — modern, refined product boxes and label systems.', tags: ['Packaging', 'Brand'] },
  { cat: 'packaging', href: 'voxo.html', img: `${I}/All-catalogue/VOXO/voxo-01.webp`, alt: 'VOXO', badge: 'Packaging', industry: 'Packaging Design', title: 'VOXO', desc: 'VOXO packaging — bold graphics and clear hierarchy for standout shelf presence.', tags: ['Packaging', 'Retail'] },
  // Social
  { cat: 'social', href: 'iscon-gathiya.html', img: `${I}/All-catalogue/Iscon Gathiya/iscon-01.webp`, alt: 'Iscon Gathiya', badge: 'Social Media', industry: 'Social Creative', title: 'Iscon Gathiya', desc: 'Social creatives for Iscon Gathiya — vibrant posts with a modern digital touch.', tags: ['Social', 'Food'] },
  { cat: 'social', href: 'puriteo.html', img: `${I}/All-catalogue/Puriteo/puriteo-01.webp`, alt: 'Puriteo', badge: 'Social Media', industry: 'Social Creative', title: 'Puriteo', desc: 'Puriteo social media — fresh visuals that communicate purity and quality.', tags: ['Social', 'Lifestyle'] },
  { cat: 'social', href: 'rosewood.html', img: `${I}/All-catalogue/Rosewood/01.webp`, alt: 'Rosewood', badge: 'Social Media', industry: 'Social Creative', title: 'Rosewood', desc: 'Rosewood social creatives — warm, elegant posts for premium interior brands.', tags: ['Social', 'Interiors'] },
  { cat: 'social', href: 'suntouch.html', img: `${I}/All-catalogue/Suntouch/sun-touch-01.webp`, alt: 'Suntouch', badge: 'Social Media', industry: 'Social Creative', title: 'Suntouch', desc: 'Suntouch social media — bright, energetic campaign-ready designs.', tags: ['Social', 'Campaign'] },
  // 3D
  { cat: 'rendering', href: '3d-rendering-portfolio.html', img: `${I}/3D-New-Size/3D-01.webp`, alt: '3D Rendering', badge: '3D Rendering', industry: '3D Visualization', title: '3D Rendering Projects', desc: 'Photoreal 3D renders — realistic materials and lighting for products and spaces.', tags: ['3D', 'Render'] },
  // Branding (All Projects only)
  { cat: 'branding', href: 'aaryan-tradelink.html', img: `${I}/All-catalogue/aaryan/aaryan-01.webp`, alt: 'Aaryan Tradelink', badge: 'Logo Design', industry: 'Logo Design', title: 'Aaryan Tradelink', desc: 'Trust and strength — clean, professional logo for reliable trade networks.', tags: ['Logo', 'Branding'] },
  { cat: 'branding', href: 'arrow-paper-products.html', img: `${I}/All-catalogue/arrow/arrow-01.webp`, alt: 'Arrow Paper Products', badge: 'Logo Design', industry: 'Logo Design', title: 'Arrow Paper Products', desc: 'Precision and reliability — sharp logo design always moving forward.', tags: ['Logo', 'Branding'] },
  { cat: 'branding', href: 'moxello-realty.html', img: `${I}/All-catalogue/Moxello realty/moxello-realty.webp`, alt: 'Moxello Realty', badge: 'Logo Design', industry: 'Logo Design', title: 'Moxello Realty', desc: 'Innovation and structure — modern realty branding with clean balanced shapes.', tags: ['Logo', 'Realty'] },
  { cat: 'branding', href: 'mybankloan-ai.html', img: `${I}/All-catalogue/mybankloan.ai/01.webp`, alt: 'MYBANKLOAN.AI', badge: 'Logo Design', industry: 'Logo Design', title: 'MYBANKLOAN.AI', desc: 'Speed and trust — clean fintech branding that feels fast and secure.', tags: ['Logo', 'Fintech'] },
  { cat: 'branding', href: 'prospact-design-studio.html', img: `${I}/All-catalogue/prospact design studio/prospact-design-studio-01.webp`, alt: 'Prospact Design Studio', badge: 'Logo Design', industry: 'Logo Design', title: 'Prospact Design Studio', desc: 'Creative and functional — studio identity for beautiful, useful spaces.', tags: ['Logo', 'Studio'] },
  { cat: 'branding', href: 'rang-in-logo.html', img: `${I}/All-catalogue/rangin/rangin-01.webp`, alt: 'Rang-In', badge: 'Logo Design', industry: 'Logo Design', title: 'Rang-In', desc: 'High-end laminate brand identity — versatile, elegant, and forward-looking.', tags: ['Logo', 'Branding'] },
  { cat: 'branding', href: 'smart-home.html', img: `${I}/All-catalogue/smart home/smart-home-01.webp`, alt: 'SmartHomes', badge: 'Logo Design', industry: 'Logo Design', title: 'SmartHomes', desc: 'Futuristic smart-home branding — connected, comfortable living.', tags: ['Logo', 'Tech'] },
  { cat: 'branding', href: 'vividus.html', img: `${I}/All-catalogue/vividums 01/vividums-01.webp`, alt: 'Vividus', badge: 'Logo Design', industry: 'Logo Design', title: 'Vividus', desc: 'Bold impactful branding — sophisticated laminate identity built to last.', tags: ['Logo', 'Branding'] },
  { cat: 'branding', href: 'alak-smart-security.html', img: `${I}/All-catalogue/alak-smart-security/alak-01.jpg`, alt: 'ALAK Smart Security', badge: 'Logo Design', industry: 'Logo Design', title: 'ALAK Smart Security', desc: 'Tech-noir security branding — magenta typography with fingerprint, shield, and smart-lock motifs.', tags: ['Logo', 'Security'] },
  { cat: 'branding', href: 'sarvghn-engineering.html', img: `${I}/All-catalogue/sarvghn-engineering/sarvghn-01.webp`, alt: 'Sarvghn Engineering', badge: 'Logo Design', industry: 'Logo Design', title: 'Sarvghn Engineering', desc: 'Industrial monogram fusing S and E — precision, permanence, and authoritative engineering presence.', tags: ['Logo', 'Engineering'] },
];

const html = projects.map(card).join('\n');
fs.writeFileSync(path.join(__dirname, 'portfolio-grid-snippet.html'), html.trim(), 'utf8');
console.log('Cards:', projects.length);
console.log('Written portfolio-grid-snippet.html');
