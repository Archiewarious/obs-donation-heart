// Собирает самодостаточный heart-obs.html: вшивает картинку 2.png прямо в файл
// (base64), чтобы виджет работал одним файлом без отдельных PNG и без tainted-canvas.
// Запуск: node embed.js
const fs = require('fs');
const path = require('path');

const IMG = process.argv[2] || '2.png';          // какую картинку вшить
const dir = __dirname;
const html = fs.readFileSync(path.join(dir, 'heart.html'), 'utf8');
const b64  = fs.readFileSync(path.join(dir, IMG)).toString('base64');
const dataUri = 'data:image/png;base64,' + b64;

const inject = '<body>\n<script>window.HEART_IMG=' + JSON.stringify(dataUri) + ';</script>';
const out = html.replace('<body>', inject);

fs.writeFileSync(path.join(dir, 'heart-obs.html'), out);
console.log('heart-obs.html собран, картинка ' + IMG + ' вшита (' +
  (Buffer.byteLength(out)/1048576).toFixed(1) + ' МБ).');
