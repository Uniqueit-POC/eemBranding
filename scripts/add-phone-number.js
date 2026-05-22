/**
 * Add +91 99135 35550 to footer and contact-us phone sections.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const NEW_TEL = '+919913535550';

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

function indentFrom(match) {
  const m = match.match(/^(\s*)<li/i);
  return m ? m[1] : '                      ';
}

function buildPhoneLi(indent) {
  const i = indent + '  ';
  return (
    `${indent}<li class="flex items-start gap-12">\n` +
    `${i}<i class="fa fa-phone text-primary mt-4"></i>\n` +
    `${i}<a href="tel:${NEW_TEL}"\n` +
    `${i}  class="text-bodytext text-lg/23 font-light inline-block hover:text-primary link-hover sm:pb-12 pb-8">+91\n` +
    `${i}  99135 35550</a>\n` +
    `${indent}</li>`
  );
}

function addFooterPhones(html) {
  if (html.includes(NEW_TEL)) return html;
  const re =
    /<li class="flex items-start gap-12">[\s\S]*?fa-phone[\s\S]*?90818\s*13238\s*<\/a>\s*<\/li>/g;
  return html.replace(re, (match) => match + '\n' + buildPhoneLi(indentFrom(match)));
}

function addContactCardPhone(html) {
  if (!html.includes('contact-hero') || html.includes(NEW_TEL)) return html;
  return html.replace(
    /(<div class="card-value">\s*<a href="tel:\+919081813238">\s*\+91 90818 13238\s*<\/a>\s*)(<\/div>)/,
    '$1      <a href="tel:' +
      NEW_TEL +
      '">\n        +91 99135 35550\n      </a>\n    $2'
  );
}

let updated = 0;
for (const file of walk(root)) {
  if (file.includes('index copy')) continue;
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;
  html = addFooterPhones(html);
  html = addContactCardPhone(html);
  if (html !== orig) {
    fs.writeFileSync(file, html, 'utf8');
    updated++;
    console.log('Updated:', path.relative(root, file));
  }
}
console.log('Done. Files updated:', updated);
