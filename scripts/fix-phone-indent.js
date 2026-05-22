const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const bad = /<\/li>\n<li class="flex items-start gap-12">\n  <i class="fa fa-phone text-primary mt-4"><\/i>\n  <a href="tel:\+919913535550"[\s\S]*?99135 35550<\/a>\n<\/li>/g;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === 'scripts') continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('tel:+919913535550')) continue;
  const fixed = html.replace(bad, (block) => {
    const before = html.substring(0, html.indexOf(block));
    const prevPhone = before.match(/(\n)([ \t]+)<li class="flex items-start gap-12">[\s\S]*?90818\s*13238[\s\S]*?<\/li>\s*$/);
    const indent = prevPhone ? prevPhone[2] : '                      ';
    const i = indent + '  ';
    return (
      `</li>\n${indent}<li class="flex items-start gap-12">\n` +
      `${i}<i class="fa fa-phone text-primary mt-4"></i>\n` +
      `${i}<a href="tel:+919913535550"\n` +
      `${i}  class="text-bodytext text-lg/23 font-light inline-block hover:text-primary link-hover sm:pb-12 pb-8">+91\n` +
      `${i}  99135 35550</a>\n` +
      `${indent}</li>`
    );
  });
  if (fixed !== html) {
    fs.writeFileSync(file, fixed, 'utf8');
    console.log('Fixed:', path.relative(root, file));
  }
}
