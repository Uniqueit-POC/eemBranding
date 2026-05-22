/**

 * Add typography-system.css after dev-style.css (contextual 16/18/22 scale).

 */

const fs = require('fs');

const path = require('path');



const root = path.join(__dirname, '..');



function walk(dir, files = []) {

  for (const name of fs.readdirSync(dir)) {

    if (name === 'node_modules' || name === '.git' || name === 'scripts') continue;

    const full = path.join(dir, name);

    if (fs.statSync(full).isDirectory()) walk(full, files);

    else if (name.endsWith('.html')) files.push(full);

  }

  return files;

}



function normalizeFonts(html) {

  return html

    .replace(/font-family:\s*'Barlow Condensed',\s*sans-serif/gi, "font-family: 'Hanken Grotesk', sans-serif")

    .replace(/font-family:\s*"Barlow Condensed",\s*sans-serif/gi, "font-family: 'Hanken Grotesk', sans-serif");

}



let linked = 0;

let normalized = 0;



for (const file of walk(root)) {

  if (file.includes('index copy') || file.includes('Portfolio copy')) continue;

  let html = fs.readFileSync(file, 'utf8');

  const orig = html;



  if (html.includes('dev-style.css') && !html.includes('typography-system.css')) {

    const usesRelative = html.includes('./assets/css/dev-style.css');

    const href = usesRelative

      ? './assets/css/typography-system.css'

      : 'assets/css/typography-system.css';

    const tag = `<link rel="stylesheet" href="${href}">`;

    if (/<\/style>/i.test(html) && /<style/i.test(html)) {

      html = html.replace(/<\/style>/i, `</style>\n  ${tag}`);

    } else {

      html = html.replace(

        /<link rel="stylesheet" href="[^"]*dev-style\.css"[^>]*>/i,

        (m) => `${m}\n  ${tag}`

      );

    }

  }



  html = normalizeFonts(html);



  if (html !== orig) {

    fs.writeFileSync(file, html, 'utf8');

    if (!orig.includes('typography-system.css') && html.includes('typography-system.css')) linked++;

    normalized++;

    console.log('Updated:', path.relative(root, file));

  }

}



console.log('Typography link added:', linked, '| Files touched:', normalized);


