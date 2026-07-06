// ============================================================================
//  Помощник виджета "сердце-донат".
//   1) отдаёт файлы папки (heart-obs.html) на http://localhost:8123
//   2) сам ходит в API DonationAlerts (сервер -> без CORS) и отдаёт живой
//      прогресс сбора по адресу /goal?token=...&goal=...
//
//  Токен и цель можно передавать прямо в ссылке OBS — тогда чтобы сменить
//  сбор, достаточно поменять ссылку браузер-источника (ничего не редактируя).
//  Значения ниже используются как запасные, если в ссылке их нет.
// ============================================================================

// --- НАСТРОЙКИ ---------------------------------------------------------------
// Токен и номер цели берутся из файла "ссылка-на-сбор.txt" (вставь туда ссылку
// своего виджета-цели DonationAlerts). Эти значения — запасные (обычно пустые).
const DEFAULT_TOKEN = '';   // напр. взять из ?token=... своей ссылки
const DEFAULT_GOAL  = '';   // напр. число из .../widget/goal/ЧИСЛО
const PORT          = 8123;
// -----------------------------------------------------------------------------

const http = require('http');
const fs   = require('fs');
const path = require('path');
const { URL } = require('url');
const { execFile } = require('child_process');

// Само-выход, чтобы НИКОГДА не висеть в фоне без дела:
//  - OBS закрыли -> выходим через ~15 сек;
//  - OBS так и не открылся за ~3 мин после старта -> тоже выходим.
const TEST = process.argv.includes('--exit-test');   // ускоренные таймеры для проверки
const CHECK_MS = TEST ? 2000 : 15000;
const NO_OBS_LIMIT = TEST ? 3 : 12;                  // 12 проверок * 15с = 3 мин
let sawObs = false, checksWithoutObs = 0;
setInterval(() => {
  execFile('tasklist', ['/FI', 'IMAGENAME eq obs64.exe', '/NH'], (e, out) => {
    const running = !e && /obs64\.exe/i.test(out);
    if (running) { sawObs = true; checksWithoutObs = 0; return; }
    if (sawObs) process.exit(0);                     // OBS был и закрылся
    if (++checksWithoutObs >= NO_OBS_LIMIT) process.exit(0); // OBS не появился
  });
}, CHECK_MS);

const ROOT = __dirname;
const MIME = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css',
  '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.json':'application/json' };

const DA = 'https://www.donationalerts.com';
const bearers = {};                 // кэш bearer-токенов по widget-токену
const LINK_FILE = 'link.txt';

// Берём token и номер цели прямо из ссылки в файле "link.txt".
// Чтобы сменить сбор — просто вставь туда новую ссылку и сохрани. Перезапуск не нужен.
function readConfig(){
  try{
    const txt = fs.readFileSync(path.join(ROOT, LINK_FILE), 'utf8');
    const g = txt.match(/goal\/(\d+)/);
    const t = txt.match(/token=([A-Za-z0-9_\-]+)/);
    return { token: t && t[1], goal: g && g[1] };
  }catch{ return {}; }
}

async function exchangeToken(widgetToken){
  const r = await fetch(`${DA}/api/v1/token/widget?token=${encodeURIComponent(widgetToken)}`, { headers:{Accept:'application/json'} });
  const j = await r.json();
  if (!j?.data?.token) throw new Error('token exchange failed (проверь токен)');
  return j.data.token;
}

async function fetchGoal(widgetToken, goalId){
  if (!bearers[widgetToken]) bearers[widgetToken] = await exchangeToken(widgetToken);
  const call = () => fetch(`${DA}/api/v1/donationgoal/${goalId}?include_timestamps=1`,
    { headers:{ Accept:'application/json', Authorization:'Bearer '+bearers[widgetToken] } });
  let r = await call();
  if (r.status === 401) { bearers[widgetToken] = await exchangeToken(widgetToken); r = await call(); }
  const d = (await r.json())?.data || {};
  return { raised:+d.raised_amount||0, goal:+d.goal_amount||0, currency:d.currency||'', title:d.title||'' };
}

http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (u.pathname === '/goal') {
    const cfg = readConfig();                                       // ссылка из файла
    const token = u.searchParams.get('token') || cfg.token || DEFAULT_TOKEN;
    const goal  = u.searchParams.get('goal')  || cfg.goal  || DEFAULT_GOAL;
    try {
      const g = await fetchGoal(token, goal);
      res.writeHead(200, { 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*', 'Cache-Control':'no-store' });
      res.end(JSON.stringify(g));
    } catch (e) {
      res.writeHead(502, { 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*' });
      res.end(JSON.stringify({ error:String(e.message||e) }));
    }
    return;
  }

  let p = decodeURIComponent(u.pathname);
  if (p === '/') p = '/heart-obs.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Access-Control-Allow-Origin':'*' });
    res.end(data);
  });
}).on('error', () => process.exit(0))   // порт занят (помощник уже работает) — тихо выйти, дублей не плодить
  .listen(PORT, () => {
  console.log('\n  Сердце-донат: помощник работает на http://localhost:' + PORT);
  console.log('  В OBS адрес браузер-источника:');
  console.log('    http://localhost:' + PORT + '/heart-obs.html?obs=1\n');
});
