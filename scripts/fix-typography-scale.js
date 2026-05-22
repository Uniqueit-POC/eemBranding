/**

 * Restore contextual font sizes (16 / 18 / 22) after the 22px blanket bump.

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



const cssVarFix = (html) =>

  html

    .replace(/--fs-xs:\s*22px/g, '--fs-xs: 0.75rem')

    .replace(/--fs-sm:\s*22px/g, '--fs-sm: 0.875rem')

    .replace(/--fs-base:\s*22px/g, '--fs-base: 1rem');



const inlineRules = [

  [/\.intro-tag\s*\{[^}]*font-size:\s*22px/gi, (m) => m.replace(/font-size:\s*22px/i, 'font-size: 16px')],

  [/\.sec-label\s*\{[^}]*font-size:\s*22px/gi, (m) => m.replace(/font-size:\s*22px/i, 'font-size: 16px')],

  [/\.intro-p\s*\{[^}]*font-size:\s*22px/gi, (m) => m.replace(/font-size:\s*22px/i, 'font-size: 18px')],

  [/\.sl-card-title\s*\{[^}]*font-size:\s*22px/gi, (m) => m.replace(/font-size:\s*22px/i, 'font-size: 18px')],

  [/\.sl-card-sub\s*\{[^}]*font-size:\s*22px/gi, (m) => m.replace(/font-size:\s*22px/i, 'font-size: 16px')],

  [/\.pm-block\s*\{[^}]*font-size:\s*22px/gi, (m) => m.replace(/font-size:\s*22px/i, 'font-size: 16px')],

  [/\.pf-badge\s*\{[^}]*font-size:\s*22px/gi, (m) => m.replace(/font-size:\s*22px/i, 'font-size: 16px')],

  [/\.pf-tag\s*\{[^}]*font-size:\s*22px/gi, (m) => m.replace(/font-size:\s*22px/i, 'font-size: 16px')],

];



let touched = 0;



for (const file of walk(root)) {

  if (file.includes('index copy') || file.includes('Portfolio copy')) continue;

  let html = fs.readFileSync(file, 'utf8');

  const orig = html;

  html = cssVarFix(html);

  for (const [re, fn] of inlineRules) html = html.replace(re, fn);

  html = html.replace(

    /<p style="font-size: 22px;/g,

    '<p style="font-size: 18px;'

  );

  if (html !== orig) {

    fs.writeFileSync(file, html, 'utf8');

    touched++;

    console.log('Fixed:', path.relative(root, file));

  }

}



const devPath = path.join(root, 'assets/css/dev-style.css');

let dev = fs.readFileSync(devPath, 'utf8');

const devMap = [

  [/\n \.eyebrow \{[\s\S]*?font-size: 22px;/, '\n .eyebrow {\n   display: inline-flex;\n   align-items: center;\n   gap: 12px;\n   margin-bottom: 28px;\n   color: var(--primary);\n   font-size: 16px;'],

  [/\.dskd-card-num \{\s*font-size: 22px;/, '.dskd-card-num {\n   font-size: 16px;'],

  [/\.dskd-organ-stands-for \{\s*font-size: 22px;/, '.dskd-organ-stands-for {\n   font-size: 18px;'],

  [/\.dskd-bullet-label \{\s*font-size: 22px;/, '.dskd-bullet-label {\n   font-size: 16px;'],

  [/\.dskd-bullet-val \{\s*color: var\(--dark\);\s*font-size: 22px;/, '.dskd-bullet-val {\n   color: var(--dark);\n   font-size: 18px;'],

  [/\.hero-eyebrow \{\s*font-family: var\(--font-body\);\s*font-size: 22px;/, '.hero-eyebrow {\n   font-family: var(--font-body);\n   font-size: 16px;'],

  [/\.hero-subtitle \{\s*margin-top: 16px;\s*font-size: 22px;/, '.hero-subtitle {\n   margin-top: 16px;\n   font-size: 18px;'],

  [/\.card-label \{\s*font-size: 22px;/, '.card-label {\n   font-size: 16px;'],

  [/\.card-title \{\s*font-family: var\(--font-heading\);\s*font-size: 22px;/, '.card-title {\n   font-family: var(--font-heading);\n   font-size: 22px;'],

  [/\.card-value \{\s*font-size: 22px;/, '.card-value {\n   font-size: 18px;'],

  [/\.form-left p \{\s*font-size: 22px;/, '.form-left p {\n   font-size: 18px;'],

  [/\.meta-text \{\s*font-size: 22px;/, '.meta-text {\n   font-size: 16px;'],

  [/\.form-group label \{\s*display: block;\s*font-size: 22px;/, '.form-group label {\n   display: block;\n   font-size: 16px;'],

  [/border-radius: var\(--radius\);\s*padding: 13px 16px;\s*font-size: 22px;/g, 'border-radius: var(--radius);\n   padding: 13px 16px;\n   font-size: 18px;'],

  [/padding: 16px 32px;\s*font-size: 22px;/g, 'padding: 16px 32px;\n   font-size: 18px;'],

  [/\.map-header span \{\s*font-size: 22px;/, '.map-header span {\n   font-size: 16px;'],

  [/\.map-overlay-card \.oc-label \{\s*font-size: 22px;/, '.map-overlay-card .oc-label {\n   font-size: 16px;'],

  [/\.map-overlay-card \.oc-name \{\s*font-family: var\(--font-heading\);\s*font-size: 22px;/, '.map-overlay-card .oc-name {\n   font-family: var(--font-heading);\n   font-size: 22px;'],

  [/\.map-overlay-card \.oc-addr \{\s*font-size: 22px;/, '.map-overlay-card .oc-addr {\n   font-size: 18px;'],

  [/\.nav-btn p \{\s*text-align: left;\s*font-size: 22px;/g, '.nav-btn p {\n   text-align: left;\n   font-size: 16px;'],

  [/\.tags-label \{\s*font-size: 22px;/, '.tags-label {\n   font-size: 16px;'],

  [/\.tag-pill[^}]*font-size: 22px;/g, (m) => m.replace('font-size: 22px', 'font-size: 16px')],

  [/\.card-date \{\s*font-size: 22px;/, '.card-date {\n   font-size: 16px;'],

  [/\.card-author \{\s*font-size: 22px;/, '.card-author {\n   font-size: 16px;'],

];



let devOrig = dev;

for (const [re, rep] of devMap) {

  dev = typeof rep === 'function' ? dev.replace(re, rep) : dev.replace(re, rep);

}



// Remaining generic 22px in dev-style (not width/height/margin) → contextual default

dev = dev.replace(/([^-])font-size: 22px/g, (match, before, offset, str) => {

  const slice = str.slice(Math.max(0, offset - 120), offset + 40);

  if (/\.card-title|\.oc-name|footer h4/i.test(slice)) return match;

  if (/letter-spacing|uppercase|eyebrow|label|tag|badge|meta|num|date|author|sidebar/i.test(slice)) {

    return before + 'font-size: 16px';

  }

  return before + 'font-size: 18px';

});



const stylePath = path.join(root, 'assets/css/style.css');

let style = fs.readFileSync(stylePath, 'utf8');

style = style.replace(

  /\.pxl-testimonial-carousel\.layout-1 \.item-description[^}]*font-size: 22px/g,

  (m) => m.replace(/font-size: 22px/g, 'font-size: 18px')

);

style = style.replace(

  /\.custom-create-card-heading \{\s*color: #1B2D00;\s*font-size: 22px;/,

  '.custom-create-card-heading {\n        color: #1B2D00;\n        font-size: 18px;'

);



if (dev !== devOrig) fs.writeFileSync(devPath, dev, 'utf8');

fs.writeFileSync(stylePath, style, 'utf8');



console.log('HTML files fixed:', touched);

console.log('dev-style.css and style.css updated');


