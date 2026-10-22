# Brief 1231: Homepage clarity fixes. Phase A plan

This file is the Phase A plan. It is read only work. Nothing in the site has changed yet.
This file is deleted before the Phase B PR. It is never merged.

Line numbers are from `main` at commit 40adec0.

## A1. Terms used before they are explained (index.html)

"Closing line":
- Line 11 (meta description, not visible): "graded against the closing line."
- Line 13 (og:description, not visible): "graded against the closing line."
- Line 22 (twitter:description, not visible): "graded against the closing line."
- Line 63 (hero, first visible use): "Every pick is posted before the game starts, then graded against the closing line."
- Line 107 (hook): "The closing line does."
- Line 108 is where it is finally explained: "The closing line is the last price a sportsbook offers before a game starts."

"The close" (never explained on the page as short for the closing line):
- Line 85 (live tile label, only shown when lab data loads): "Beat the close"
- Line 116: "3. Let the close decide."
- Line 172: "Is this record luck? Did you beat the close?"

"Beat the close":
- Line 85 (tile label): "Beat the close"
- Line 172: "Did you beat the close?"

"The Standard":
- Line 56 (nav label): "Standard"
- Line 91 (live tile label): "Racing for the Standard"
- Line 102 explains it: "The Standard is the bar a rule has to clear before we would sell its picks."
- Line 123: "No rule has passed the Standard yet."

Problem: lines 91 and 102 sit inside the live lab section. That section stays hidden when lab.json fails to load or is over 24 hours old. Then the first visible use is line 123, with no explanation.

## A2. Signup form sport list (index.html lines 138 to 144)

```
<option value="">Select one (optional)</option>
<option value="NHL">NHL</option>
<option value="Soccer">Soccer</option>
<option value="NBA">NBA</option>
<option value="College basketball">College basketball</option>
<option value="MLB">MLB</option>
<option value="Other">Other</option>
```

What the lab races now: NHL, NBA, soccer, and UFC (lab only, not racing for the Standard).
Source: the brief, cross-checked against standard.html lines 133 to 142. That section lists NHL moneyline (N5), NHL totals (N2), soccer moneyline (S2) and NBA moneyline (B2, B3). It does not mention UFC, which fits UFC being lab only.

I could not read lab.json itself. This session's network blocks pixelforgeplays.github.io. See NOT PROVEN.

Stale entries:
- "College basketball": no rule races it. The site never mentions it anywhere else.
- "MLB": not racing now. Its season ended September 27, 2026. It reopens on Opening Day 2027 (standard.html line 142).
- Missing: "UFC".

## A3. "you hear first, at founders' pricing"

- index.html line 123: "If one ever does, you hear first, at founders' pricing."
- Close variant, privacy.html line 51: "to tell you first if a rule ever clears the bar." No pricing claim. I propose no change there.
- No other match for "founder" in the repo.

## A4. Lab Notes in the nav

The nav on every page is: Home, Lab, Builders, Rules, Tools, Standard. No page has a Lab Notes link.
Missing on all four pages:
- index.html (nav lines 50 to 57)
- privacy.html (nav lines 31 to 38)
- 404.html (nav lines 22 to 29)
- standard.html (nav lines 31 to 38). Sealed. It stays missing here.

Fit check: I added a seventh link "Notes" to the homepage nav at 375px in a headless browser. The nav stays 335px wide with no overflow. It is tight but fits.

## A5. Names for (a) how far a pick beat the close and (b) the vig free close

Targets: (a) "beat the close by (pts)", short "pts". (b) "fair close".

(a) On the pages this brief may edit:
- index.html line 116: "beats the closing line by the margin we published in advance". No number is shown on the homepage.
- index.html line 85 tile "Beat the close" shows a count ("X of Y"), not a size. Different idea. Not a variant of (a).
- "pts" and "points": not used on index.html, privacy.html or 404.html.

(a) On standard.html (sealed, report only): "closing line value" (lines 49, 50, 64, 146, 148, 167, 182, 198, 304 to 314, 435, 440, 454 and more), "CLV" (line 454), "average closing line value" (lines 50, 198), "mean closing line value" (lines 182, 304 to 310, 440), "points" (lines 50, 182, 440, 455), "+1.5 points" (lines 50, 182, 440, 455).

(b): No page uses "fair close", "no-vig", "vig free" or "devig".

Conflict to flag. standard.html says the close is NOT made vig free:
- Line 168: "We do not strip out the sportsbook's built-in cut, sometimes called the vig."
- Line 457: "We leave it in on both sides when we compare our price to the close."
So "fair close" would describe a different number than the one the Standard grades on. I propose no "fair close" wording on this site until Casey decides. The dashboard and tools pages may use these names. Those live in other repos that this session cannot read.

## A6. "Race your model against ours"

- index.html line 173: `<a class="pfp-card" href="https://www.pixelforgeplays.com/builders"><span class="font-semibold">Race your model against ours</span>...`
- vercel.json line 3 sends `/builders` with a 301 to `https://pixelforgeplays.github.io/pixel-forge/builders.html`.
- The same target is used by the nav (line 53, direct link) and line 70 (`/builders`).
- I could not load the target page to confirm it is live. See NOT PROVEN.

## A7. Proposed edits (file, line, old, new)

1. index.html line 63
   - Old: "Every pick is posted before the game starts, then graded against the closing line. We do not know yet whether our rules beat that price. You will see either way."
   - New: "Every pick is posted before the game starts. Then it is graded against the close. The close is the last price before the game starts. We do not know yet whether our rules beat that price. You will see either way."

2. index.html line 107
   - Old: "The closing line does."
   - New: "The close does."

3. index.html line 108
   - Old: "The closing line is the last price a sportsbook offers before a game starts. Getting a better price than that one is the sign we look for. It shows up before wins and losses do."
   - New: "The close is also called the closing line. Getting a better price than the close is the sign we look for. It shows up before wins and losses do."

4. index.html line 116
   - Old: "We only sell a rule's picks if it beats the closing line by the margin we published in advance."
   - New: "We only sell a rule's picks if it beats the close by the margin we published in advance."

5. index.html line 123 (covers A1 for the Standard, and A3)
   - Old: "Short notes when something changes. No rule has passed the Standard yet. If one ever does, you hear first, at founders' pricing. No spam."
   - New: "Short notes when something changes. The Standard is the bar a rule must clear before we sell its picks. No rule has cleared it yet. If one ever does, you hear first. No spam."

6. index.html lines 139 to 144 (sport list)
   - Old: NHL, Soccer, NBA, College basketball, MLB, Other
   - New: NHL, NBA, Soccer, UFC, Other
   - New markup:
     ```
     <option value="NHL">NHL</option>
     <option value="NBA">NBA</option>
     <option value="Soccer">Soccer</option>
     <option value="UFC">UFC</option>
     <option value="Other">Other</option>
     ```
   - Note: old signups keep their old Buttondown metadata values. Nothing breaks.
   - Option for Casey: keep MLB, since it returns in 2027.

7. Nav Lab Notes link (A4). Insert after the Tools link, before Standard, in:
   - index.html after line 55
   - privacy.html after line 36
   - 404.html after line 27
   - New: `<a href="https://www.pixelforgeplays.com/notes" class="py-3 -my-3 hover:text-white">Notes</a>`
   - `/notes` already redirects to `https://pixelforgeplays.github.io/pfp-tools/notes/` (vercel.json line 8).
   - Question for Casey: should it go to that notes page, or to the signup form at `/#lab-notes`?
   - standard.html stays without it. That page will be the one nav without Notes.

8. A5 names: no edit proposed. The homepage shows no "pts" figure. The only "fair close" question conflicts with the Standard (see A5).

9. A6: no edit proposed. The link works through the redirect.

Not proposed: meta, og and twitter descriptions (lines 11, 13, 22). They are search and share text, not page text. The brief says leave the share image alone, and these sit next to it.

## Things noticed on standard.html (no change made)

- Lines 168 and 457 say the close keeps the vig. That conflicts with the "fair close" (vig free) target name.
- Its nav (lines 31 to 38) has no Lab Notes link. If edit 7 ships, it will be the only page without one.
- It uses "closing line value" and "points" throughout. No "pts".

## NOT PROVEN

- lab.json was not read. The network here blocks pixelforgeplays.github.io. The A2 sport list comes from the brief and standard.html.
- The builders page and `/notes` page were not loaded.
- The other repos (pixel-forge dashboard, pfp-tools) could not be searched for A5 names.
- No Vercel preview was checked yet. That happens in Phase B.
