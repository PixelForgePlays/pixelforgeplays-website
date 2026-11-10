// Brief 1461: /sitemap.xml is rewritten here (vercel.json). Built at request time so a new builder
// page appears with no manual step.
//
// Builder pages: every entry in the PUBLISHED builders.lock.json with status "active" and a valid
// shortName, whose page b/<shortName>.html actually answers 200 on GitHub Pages. An active entrant
// whose page has not been generated yet is left out (listing a 404 in a sitemap is a crawl error),
// and the count is reported in the X-PFP-Sitemap header so a missing page is visible, not silent.
//
// If the lock cannot be read the static pages are still returned (never a 500), and the header
// says so.

const SITE = 'https://www.pixelforgeplays.com';
const PAGES = 'https://pixelforgeplays.github.io';
const LOCK_URL = PAGES + '/pixel-forge/builders.lock.json';
const SHORT_RX = /^[a-z0-9-]{1,32}$/;

// Mirrored paths on www.pixelforgeplays.com (served by the /pixel-forge and /pfp-tools rewrites)
// plus the two pages the website repo serves itself.
const STATIC_PATHS = [
  '/',
  '/standard.html',
  '/privacy.html',
  '/pixel-forge/tonight.html',
  '/pixel-forge/builders.html',
  '/pixel-forge/dashboard.html',
  '/pixel-forge/how-this-started.html',
  '/pfp-tools/',
  '/pfp-tools/get-graded/',
  '/pfp-tools/race/',
  '/pfp-tools/notes/',
  '/pfp-tools/rules/',
  '/pfp-tools/build/',
  '/pfp-tools/grade/',
  '/pfp-tools/luck/',
  '/pfp-tools/luck-or-skill/',
  '/pfp-tools/clv/',
  '/pfp-tools/closing-line-value/',
  '/pfp-tools/no-vig-calculator/',
  '/pfp-tools/price-cost/',
  '/pfp-tools/check-a-capper/',
  '/pfp-tools/test-a-betting-model/',
  '/pfp-tools/verify/',
  '/pfp-tools/freeze/'
];

async function fetchWithTimeout(url, opts, ms) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try {
    return await fetch(url, Object.assign({}, opts, { signal: ctl.signal }));
  } finally {
    clearTimeout(t);
  }
}

async function builderPaths() {
  const res = await fetchWithTimeout(LOCK_URL, { cache: 'no-store' }, 5000);
  if (!res.ok) throw new Error('lock HTTP ' + res.status);
  const lock = await res.json();
  const rows = Array.isArray(lock && lock.builders) ? lock.builders : null;
  if (!rows) throw new Error('lock has no builders array');
  const names = [];
  for (const b of rows) {
    if (!b || String(b.status || '') !== 'active') continue;
    const s = typeof b.shortName === 'string' ? b.shortName : '';
    if (SHORT_RX.test(s) && names.indexOf(s) < 0) names.push(s);
  }
  const checks = await Promise.all(names.map(async (s) => {
    try {
      const r = await fetchWithTimeout(PAGES + '/pixel-forge/b/' + s + '.html', { method: 'HEAD' }, 4000);
      return r.status === 200 ? s : null;
    } catch (e) {
      return null;
    }
  }));
  const live = checks.filter(Boolean).sort();
  return { active: names.length, live: live.map((s) => '/pixel-forge/b/' + s + '.html') };
}

function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = async function handler(req, res) {
  const today = new Date().toISOString().slice(0, 10);
  let paths = STATIC_PATHS.slice();
  let note;
  try {
    const b = await builderPaths();
    paths = paths.concat(b.live);
    note = 'builders active=' + b.active + ' listed=' + b.live.length;
  } catch (e) {
    note = 'builders unavailable: ' + String((e && e.message) || e).slice(0, 80);
  }
  const body = ['<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    .concat(paths.map((p) => '  <url><loc>' + xmlEscape(SITE + p) + '</loc><lastmod>' + today + '</lastmod></url>'))
    .concat(['</urlset>', '']).join('\n');
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.setHeader('X-PFP-Sitemap', note);
  res.statusCode = 200;
  res.end(body);
};
