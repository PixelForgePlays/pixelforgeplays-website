# Builder short links (`/b/<name>`)

**Rules:** names are permanent (never reused, never changed once live), lowercase is the canonical form, one name per entrant.

`pixelforgeplays.com/b/<name>` sends a graded entrant to their PFP builder page:

- `kr`, `jpetbets` and `ocelotanalytics` work in any capitalization (e.g. `/b/KR`).
- Any other lowercase name (`a-z`, `0-9`, `-`, up to 32 characters) goes to `https://pixelforgeplays.github.io/pixel-forge/b/<name>.html`. A name with no page there yet shows a GitHub 404 for now.
- Anything else (mixed case for other names, other characters, longer names, deeper paths, bare `/b`) goes to the builders page (https://pixelforgeplays.github.io/pixel-forge/builders.html).

A trailing slash is accepted in all cases.

| Name | Target | Live since |
|------|--------|------------|
| `kr` | https://pixelforgeplays.github.io/pixel-forge/b/kr.html | 2026-10-23 (merged) |
| `jpetbets` | https://pixelforgeplays.github.io/pixel-forge/b/jpetbets.html | 2026-10-23 |
| `ocelotanalytics` | https://pixelforgeplays.github.io/pixel-forge/b/ocelotanalytics.html | 2026-10-23 |

## Adding a name

No website change is needed for new names. Any lowercase name (`a-z`, `0-9`, `-`, up to 32 characters) works automatically once its page exists at `https://pixelforgeplays.github.io/pixel-forge/b/<name>.html`. The generic `/b/:name` rule in `vercel.json` handles it.

Names are claimed in `builders.lock.json` in the bot repo, not here. The table above is kept as a record of the first names that went live.

Mixed-case links (e.g. `/b/KR`) only work for the three names with literal rules: `kr`, `jpetbets` and `ocelotanalytics`. A mixed-case link for any other name doesn't match the generic rule and falls back to the builders page.

All `/b/` links are 308 (permanent), like the other page short links, so search engines pass the link on to the target page. A browser caches a 308, so a `/b/<name>` that pointed at a page that did not exist yet keeps going there in that browser until its cache clears.

## Since Brief 1461 (same-domain targets)

Every short link now lands on www.pixelforgeplays.com, not github.io. vercel.json rewrites `/pixel-forge/*` and `/pfp-tools/*` to the same paths on pixelforgeplays.github.io (a proxy, the address bar stays on www), and each short link is a same-domain redirect onto that mirror, e.g. `/b/kr` -> `/pixel-forge/b/kr.html`. Wherever this page says `https://pixelforgeplays.github.io/pixel-forge/...`, the live target is now `https://www.pixelforgeplays.com/pixel-forge/...`. `/sitemap.xml` is built per request by `api/sitemap.js` from the published builders.lock.json.
