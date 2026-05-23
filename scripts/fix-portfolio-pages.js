const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const FILE_REPLACEMENTS = {
  'aaryan-tradelink.html': [
    [/All-catalogue\/aaryan-tradelink\/aaryan-tradelink-01\.webp/g, 'All-catalogue/aaryan/aaryan-01.webp'],
    [/All-catalogue\/aaryan-tradelink\/aaryan-tradelink-02\.webp/g, 'All-catalogue/aaryan/aaryan-02.webp'],
    [/All-catalogue\/aaryan-tradelink\/aaryan-tradelink03\.webp/g, 'All-catalogue/aaryan/aaryan-03.webp'],
    [/All-catalogue\/aaryan-tradelink\/aaryan-tradelink04\.webp/g, 'All-catalogue/aaryan/aaryan-04.webp'],
    [/All-catalogue\/aaryan-tradelink\/aaryan-tradelink05\.webp/g, 'All-catalogue/aaryan/aaryan-05.webp'],
    [/All-catalogue\/aaryan-tradelink\/aaryan-tradelink06\.webp/g, 'All-catalogue/aaryan/aaryan-06.webp']
  ],
  'arrow-paper-products.html': [
    [/All-catalogue\/arrow-paper-products\/arrow-paper-products-01\.webp/g, 'All-catalogue/arrow/arrow-01.webp'],
    [/All-catalogue\/arrow-paper-products\/arrow-paper-products-02\.webp/g, 'All-catalogue/arrow/arrow-02.webp'],
    [/All-catalogue\/arrow-paper-products\/arrow-paper-products03\.webp/g, 'All-catalogue/arrow/arrow-03.webp'],
    [/All-catalogue\/arrow-paper-products\/arrow-paper-products04\.webp/g, 'All-catalogue/arrow/arrow-04.webp'],
    [/All-catalogue\/arrow-paper-products\/arrow-paper-products05\.webp/g, 'All-catalogue/arrow/arrow-05.webp'],
    [/All-catalogue\/arrow-paper-products\/arrow-paper-products06\.webp/g, 'All-catalogue/arrow/arrow-06.webp']
  ],
  'acrylic-by-rang-in.html': [
    [/All-catalogue\/acrylic-by-rang-in\/acrylic-by-rang-in-01\.webp/g, 'All-catalogue/kiana acrylic/kiana-acrylic-01.webp'],
    [/All-catalogue\/acrylic-by-rang-in\/acrylic-by-rang-in-02\.webp/g, 'All-catalogue/kiana acrylic/kiana-acrylic-02.webp'],
    [/All-catalogue\/acrylic-by-rang-in\/acrylic-by-rang-in03\.webp/g, 'All-catalogue/kiana acrylic/kiana-acrylic-03.webp'],
    [/All-catalogue\/acrylic-by-rang-in\/acrylic-by-rang-in04\.webp/g, 'All-catalogue/kiana acrylic/kiana-acrylic-04.webp'],
    [/All-catalogue\/acrylic-by-rang-in\/acrylic-by-rang-in05\.webp/g, 'All-catalogue/kiana acrylic/kiana-acrylic-05.webp'],
    [/All-catalogue\/acrylic-by-rang-in\/acrylic-by-rang-in06\.webp/g, 'All-catalogue/kiana acrylic/kiana-acrylic-06.webp']
  ],
  'bliss.html': [
    [/All-catalogue\/bliss-decor\/bliss-decor-01\.webp/g, 'All-catalogue/kooyoo/kooyoo-01.webp'],
    [/All-catalogue\/bliss-decor\/bliss-decor-02\.webp/g, 'All-catalogue/kooyoo/kooyoo-02.webp'],
    [/All-catalogue\/bliss-decor\/bliss-decor03\.webp/g, 'All-catalogue/kooyoo/kooyoo-03.webp'],
    [/All-catalogue\/bliss-decor\/bliss-decor04\.webp/g, 'All-catalogue/kooyoo/kooyoo-04.webp'],
    [/All-catalogue\/bliss-decor\/bliss-decor05\.webp/g, 'All-catalogue/kooyoo/kooyoo-05.webp'],
    [/All-catalogue\/bliss-decor\/bliss-decor06\.webp/g, 'All-catalogue/kooyoo/kooyoo-06.webp']
  ],
  'luxe-style.html': [
    [/All-catalogue\/luxe-style\/luxe-style-01\.webp/g, 'All-catalogue/kooyoo/kooyoo-01.webp'],
    [/All-catalogue\/luxe-style\/luxe-style-02\.webp/g, 'All-catalogue/kooyoo/kooyoo-02.webp'],
    [/All-catalogue\/luxe-style\/luxe-style03\.webp/g, 'All-catalogue/kooyoo/kooyoo-03.webp'],
    [/All-catalogue\/luxe-style\/luxe-style04\.webp/g, 'All-catalogue/kooyoo/kooyoo-04.webp'],
    [/All-catalogue\/luxe-style\/luxe-style05\.webp/g, 'All-catalogue/kooyoo/kooyoo-05.webp'],
    [/All-catalogue\/luxe-style\/luxe-style06\.webp/g, 'All-catalogue/kooyoo/kooyoo-06.webp']
  ],
  'rang-in-matt-book.html': [
    [/All-catalogue\/rangin\/-in-matt-book\/rang-in-matt-book-02\.webp/g, 'All-catalogue/rangin/rangin-02.webp'],
    [/All-catalogue\/rangin\/-in-matt-book\/rang-in-matt-book03\.webp/g, 'All-catalogue/rangin/rangin-03.webp'],
    [/All-catalogue\/rangin\/-in-matt-book\/rang-in-matt-book04\.webp/g, 'All-catalogue/rangin/rangin-04.webp'],
    [/All-catalogue\/rangin\/-in-matt-book\/rang-in-matt-book05\.webp/g, 'All-catalogue/rangin/rangin-05.webp'],
    [/All-catalogue\/rangin\/-in-matt-book\/rang-in-matt-book06\.webp/g, 'All-catalogue/rangin/rangin-06.webp']
  ],
  'ranwood-face-of-grandeur.html': [
    [/ranwood\/ranwood03\.webp/g, 'ranwood/ranwood-03.webp'],
    [/ranwood\/ranwood04\.webp/g, 'ranwood/ranwood-04.webp'],
    [/ranwood\/ranwood05\.webp/g, 'ranwood/ranwood-05.webp'],
    [/ranwood\/ranwood06\.webp/g, 'ranwood/ranwood-06+.webp']
  ],
  'ranwood-masterpiece-of-prestige.html': [
    [/All-catalogue\/ranwood-masterpiece\/ranwood-masterpiece-01\.webp/g, 'All-catalogue/ranwood rega/ranwood-01.webp'],
    [/All-catalogue\/ranwood-masterpiece\/ranwood-masterpiece-02\.webp/g, 'All-catalogue/ranwood rega/ranwood-02.webp'],
    [/All-catalogue\/ranwood-masterpiece\/ranwood-masterpiece03\.webp/g, 'All-catalogue/ranwood rega/ranwood-03.webp'],
    [/All-catalogue\/ranwood-masterpiece\/ranwood-masterpiece04\.webp/g, 'All-catalogue/ranwood rega/ranwood-04.webp'],
    [/All-catalogue\/ranwood-masterpiece\/ranwood-masterpiece05\.webp/g, 'All-catalogue/ranwood rega/ranwood-05.webp'],
    [/All-catalogue\/ranwood-masterpiece\/ranwood-masterpiece06\.webp/g, 'All-catalogue/ranwood rega/ranwood-06.webp']
  ],
  'ranwood-rega.html': [
    [/All-catalogue\/ranwood-masterpiece\/ranwood-masterpiece-01\.webp/g, 'All-catalogue/ranwood rega/ranwood-01.webp'],
    [/All-catalogue\/ranwood-masterpiece\/ranwood-masterpiece-02\.webp/g, 'All-catalogue/ranwood rega/ranwood-02.webp'],
    [/All-catalogue\/ranwood-masterpiece\/ranwood-masterpiece03\.webp/g, 'All-catalogue/ranwood rega/ranwood-03.webp'],
    [/All-catalogue\/ranwood-masterpiece\/ranwood-masterpiece04\.webp/g, 'All-catalogue/ranwood rega/ranwood-04.webp'],
    [/All-catalogue\/ranwood-masterpiece\/ranwood-masterpiece05\.webp/g, 'All-catalogue/ranwood rega/ranwood-05.webp'],
    [/All-catalogue\/ranwood-masterpiece\/ranwood-masterpiece06\.webp/g, 'All-catalogue/ranwood rega/ranwood-06.webp']
  ],
  'trends-by-ranberry.html': [
    [/All-catalogue\/trends-by-ranberry\/trends-by-ranberry-01\.webp/g, 'All-catalogue/ranberry new/ranberry-new-01.webp'],
    [/All-catalogue\/trends-by-ranberry\/trends-by-ranberry-02\.webp/g, 'All-catalogue/ranberry new/ranberry-new-02.webp'],
    [/All-catalogue\/trends-by-ranberry\/trends-by-ranberry03\.webp/g, 'All-catalogue/ranberry new/ranberry-new-03.webp'],
    [/All-catalogue\/trends-by-ranberry\/trends-by-ranberry04\.webp/g, 'All-catalogue/ranberry new/ranberry-new-04.webp'],
    [/All-catalogue\/trends-by-ranberry\/trends-by-ranberry05\.webp/g, 'All-catalogue/ranberry new/ranberry-new-05.webp'],
    [/All-catalogue\/trends-by-ranberry\/trends-by-ranberry06\.webp/g, 'All-catalogue/ranberry new/ranberry-new-06.webp']
  ],
  'vanshlam.html': [
    [/All-catalogue\/trends-by-ranberry\/trends-by-ranberry-01\.webp/g, 'All-catalogue/ranberry new/ranberry-new-01.webp'],
    [/All-catalogue\/trends-by-ranberry\/trends-by-ranberry-02\.webp/g, 'All-catalogue/ranberry new/ranberry-new-02.webp'],
    [/All-catalogue\/trends-by-ranberry\/trends-by-ranberry03\.webp/g, 'All-catalogue/ranberry new/ranberry-new-03.webp'],
    [/All-catalogue\/trends-by-ranberry\/trends-by-ranberry04\.webp/g, 'All-catalogue/ranberry new/ranberry-new-04.webp'],
    [/All-catalogue\/trends-by-ranberry\/trends-by-ranberry05\.webp/g, 'All-catalogue/ranberry new/ranberry-new-05.webp'],
    [/All-catalogue\/trends-by-ranberry\/trends-by-ranberry06\.webp/g, 'All-catalogue/ranberry new/ranberry-new-06.webp']
  ],
  'lucullian.html': [
    [/dazzle-berry-asa\/dazzle-berry-asa-01\.webp/g, 'dazzle-berry-pastel-crystal/01.webp'],
    [/dazzle-berry-asa\/dazzle-berry-asa-02\.webp/g, 'dazzle-berry-pastel-crystal/02.webp'],
    [/dazzle-berry-asa\/dazzle-berry-asa-03\.webp/g, 'dazzle-berry-pastel-crystal/03.webp'],
    [/dazzle-berry-asa\/dazzle-berry-asa-04\.webp/g, 'dazzle-berry-pastel-crystal/04.webp'],
    [/dazzle-berry-asa\/dazzle-berry-asa-05\.webp/g, 'dazzle-berry-pastel-crystal/05.webp'],
    [/dazzle-berry-asa\/dazzle-berry-asa-06\.webp/g, 'dazzle-berry-pastel-crystal/06.webp'],
    [/atina\/atina 01\.webp/g, 'atina/atina01.webp']
  ]
};

const SLIDER_SCRIPT_RE = /\/\* ════════════════════════════════════════\s+SLIDER[\s\S]*?window\.addEventListener\('resize', \(\) => goTo\(current\)\);\s*\}\)\(\);/;

const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));

for (const file of pages) {
  const filePath = path.join(ROOT, file);
  let html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('id="sliderTrack"')) continue;

  let changed = false;

  if (FILE_REPLACEMENTS[file]) {
    FILE_REPLACEMENTS[file].forEach(([from, to]) => {
      if (from.test(html)) {
        html = html.replace(from, to);
        changed = true;
      }
    });
  }

  if (SLIDER_SCRIPT_RE.test(html)) {
    html = html.replace(
      SLIDER_SCRIPT_RE,
      '/* Our Work slider (see assets/js/portfolio-pages.js) */'
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
    console.log('updated', file);
  }
}

console.log('Done');
