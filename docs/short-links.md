# Builder short links (`/b/<name>`)

**Rules:** names are permanent (never reused, never changed once live), lowercase is the canonical form, one name per entrant.

`pixelforgeplays.com/b/<name>` sends a graded entrant to their PFP builder page. Any capitalization works. Any unknown name goes to the builders page (https://pixelforgeplays.github.io/pixel-forge/builders.html).

| Name | Target | Live since |
|------|--------|------------|
| `kr` | https://pixelforgeplays.github.io/pixel-forge/builder.html?id=kr_nhl | 2026-10-23 (merged) |
| `jpetbets` | https://pixelforgeplays.github.io/pixel-forge/builder.html?id=jpetbets_nhl | 2026-10-23 |
| `ocelotanalytics` | https://pixelforgeplays.github.io/pixel-forge/builder.html?id=dan_nhl | 2026-10-23 |

## Adding a name

Add one line to `vercel.json`, **above** the `/b(/.*)?` catch-all (first match wins), then add a row to the table above:

```json
{ "source": "/b/([Dd][Aa][Nn]/?)", "destination": "https://pixelforgeplays.github.io/pixel-forge/builder.html?id=<entrant_id>", "statusCode": 307 },
```

Spell the name as one `[Xx]` pair per letter so every capitalization matches (Vercel redirect sources are case-sensitive). Digits and `-` are written as-is. Keep the trailing `/?` inside the parentheses so `/b/<name>/` works too.

All `/b/` links are 307 (temporary) so a target can be changed later without browsers holding a stale cached redirect.
