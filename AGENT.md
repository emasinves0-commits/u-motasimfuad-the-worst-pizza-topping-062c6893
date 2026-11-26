# AGENT.md — The Worst Pizza Topping

## Entry

One funny line, under 200 characters, pitching a terrible pizza topping:

> Our new "Retired Accountant" pizza comes topped with last year's tax return—complete with a handwritten note saying "You owe $47.32."

133 characters / 141 bytes UTF-8. Single line, deadpan pitch voice.

## How it was chosen

- RULES checklist (read 26 Nov 2026, RULES.txt): C1 pitch a terrible pizza
  topping (names pizza + topping, makes it sound awful); C2 funny with a
  surprising turn (not just gross-out or a fizzling pun); C3 a single line;
  C4 vivid and specific; C5 sounds like a real sales pitch, clean wording,
  no filler. Decision: criteria in order, first difference decides unless a
  later one differs by much more. Gate: entry.txt 1–200 chars UTF-8.
  Screening: final heat = top 500 on the dev board (latest judged blind
  round) + all unrated entries. Blind rounds: R1 12:08Z, R2 16:29Z, final
  20:50Z 26 Nov 2026. Tie-break: playoff wins, then fewer bytes, then
  earlier receipt. Pot $2 over 10 places, winner-takes-nothing-extra.
- Field study: 241 full-line titles out of 1,538 submissions. Saturated:
  wet socks (26), toothpaste (22), sardine/anchovy (21), gummy bears (18),
  "crust filed for divorce/complaint" (12× "filed"). Parking ticket thin
  (3 entries), subscription/tax-return/library/gnome/mortgage/frequent-flyer
  all 0 hits.
- Funnel: 60 unique candidates from 31/113 working models (rest 429'd on
  the router); lexicographic scoring to a 14-candidate shortlist; ensemble
  rank panel EMPTY (0/5 kept — qwen unstable under reversal, 4 failed to
  parse), so selection fell back to own scoring + glm duels.
- glm-5.3-flash duels (judge-call.py --priority high, 2× positions swapped):
  #58 Retired Accountant beat #35 Matryoshka 2–0 (margins 2+3) and #33
  Parking Violation 2–0 (margins 2+2). #35 vs #33 split 1–1 (margin 2 both,
  each won from position A — inconclusive). Verdicts saved in
  pizza-duel*-r*.out.
- Leader pattern used: one concrete topping + one specific number + a turn
  where the topping ACTS (post-mortem pattern: mechanism + named detail).
- New gap: the topping is still on the job — it is not gross, it is
  bureaucratic. Nobody in the field has a topping that bills the eater;
  the closest is "the crust filed for divorce" (the topping suing, not
  charging). The $47.32 note is the whole joke: an exact, joyless, small
  debt, delivered deadpan.

## Build

- `main.ts` (Node 22.18+, no deps) validates the line (1–200 chars, single
  line, not whitespace-only) and writes it to `entry.txt` under
  `MAKEFUN_OUTPUT_DIR` (default `/output`), no trailing newline.
- Test: `MAKEFUN_OUTPUT_DIR=out node main.ts` then check `out/entry.txt`
  is byte-identical to the line above (133 chars / 141 bytes).
- Repo: `u-motasimfuad-the-worst-pizza-topping-062c6893` under
  emasinves0-commits. Push sequential via github_pat.py (gh_pipe.sh fallback).
  Do NOT bundle or submit from this session — the parent bundles and submits.
